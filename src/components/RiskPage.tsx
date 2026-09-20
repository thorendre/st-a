import { useState, useMemo, useEffect } from 'react';
import { useLang } from '../hooks/useLang';
import { useRiskStore } from '../hooks/useRiskStore';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { Risk, Likelihood, Consequence, RiskStatus, RiskCategory, RiskProject } from '../types';
import { defaultRiskCategories, riskBanks, RiskBank } from '../data/riskCategories';
import { allPlatformBaselines } from '../data/platformBaselines';
import { iso27001Controls } from '../data/iso27001';
import { nsmControls } from '../data/nsm';
import { nistControls } from '../data/nist';
import { soc2Controls } from '../data/soc2';
import { nis2Controls } from '../data/nis2';
import {
    Plus, Trash2, ChevronDown, ChevronRight, Edit3, Shield, AlertTriangle,
    FolderPlus, Eye, EyeOff, X, Check, ArrowRight, BookOpen, Database,
    ExternalLink, RefreshCw, Layers, ShieldCheck, Zap
} from 'lucide-react';

const LIKELIHOOD_LABELS: Record<string, Record<Likelihood, string>> = {
    nb: { 1: 'Svært lav', 2: 'Lav', 3: 'Moderat', 4: 'Høy', 5: 'Svært høy' },
};

const CONSEQUENCE_LABELS: Record<string, Record<Consequence, string>> = {
    nb: { 1: 'Ubetydelig', 2: 'Lav', 3: 'Moderat', 4: 'Alvorlig', 5: 'Kritisk' },
};

const STATUS_LABELS: Record<string, Record<RiskStatus, string>> = {
    nb: { open: 'Åpen', mitigated: 'Mitigert', accepted: 'Akseptert', closed: 'Lukket' },
};

function getRiskColor(likelihood: number, consequence: number): string {
    const score = likelihood * consequence;
    if (score <= 4) return 'var(--accent-green)';
    if (score <= 9) return 'var(--accent-amber)';
    if (score <= 16) return '#ea580c'; // Muted dark orange
    return 'var(--accent-red)';
}

function getRiskBgColor(likelihood: number, consequence: number): string {
    const score = likelihood * consequence;
    if (score <= 4) return 'rgba(21, 128, 61, 0.08)';
    if (score <= 9) return 'rgba(217, 119, 6, 0.08)';
    if (score <= 16) return 'rgba(234, 88, 12, 0.08)';
    return 'rgba(185, 28, 28, 0.08)';
}

function getCellBgColor(l: number, c: number): string {
    const score = l * c;
    if (score <= 4) return 'rgba(21, 128, 61, 0.05)';
    if (score <= 9) return 'rgba(217, 119, 6, 0.05)';
    if (score <= 16) return 'rgba(234, 88, 12, 0.06)';
    return 'rgba(185, 28, 28, 0.07)';
}

function InlineRiskControlsEditor({
    risk,
    onSave,
    onCreateJiraTask,
    t,
}: {
    risk: Risk;
    onSave: (updates: Partial<Risk>) => void;
    onCreateJiraTask?: () => void;
    t: (key: string) => string;
}) {
    const [existing, setExisting] = useState(risk.existingControls || '');
    const [planned, setPlanned] = useState(risk.plannedControls || '');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setExisting(risk.existingControls || '');
        setPlanned(risk.plannedControls || '');
    }, [risk.id, risk.existingControls, risk.plannedControls]);

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSave({
            existingControls: existing,
            plannedControls: planned,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                    <label htmlFor={`inline-exist-${risk.id}`} className="risk-label" style={{ marginBottom: '4px' }}>
                        {t('risk.existing_controls_label')}
                    </label>
                    <textarea
                        id={`inline-exist-${risk.id}`}
                        className="risk-input"
                        rows={2}
                        value={existing}
                        onChange={e => setExisting(e.target.value)}
                        placeholder="Dokumenter eksisterende sikkerhetstiltak..."
                        style={{ width: '100%', fontSize: '12px' }}
                    />
                </div>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label htmlFor={`inline-planned-${risk.id}`} className="risk-label" style={{ margin: 0 }}>
                            {t('risk.planned_controls_label')}
                        </label>
                        {risk.jiraIssueKey ? (
                            <span style={{
                                fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px',
                                padding: '1px 6px', borderRadius: '4px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', fontWeight: 600
                            }}>
                                <ExternalLink size={10} /> Jira: {risk.jiraIssueKey} ({risk.jiraStatus || 'IN PROGRESS'})
                            </span>
                        ) : onCreateJiraTask ? (
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); onCreateJiraTask(); }}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: '#2563eb', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px'
                                }}
                            >
                                + Lag Jira Task
                            </button>
                        ) : null}
                    </div>
                    <textarea
                        id={`inline-planned-${risk.id}`}
                        className="risk-input"
                        rows={2}
                        value={planned}
                        onChange={e => setPlanned(e.target.value)}
                        placeholder="Dokumenter planlagte risikoreduserende tiltak..."
                        style={{ width: '100%', fontSize: '12px' }}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                {saved && (
                    <span style={{ fontSize: '11px', color: 'var(--accent-green)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <Check size={12} /> {t('risk.controls_saved')}
                    </span>
                )}
                <button
                    type="button"
                    className="risk-btn risk-btn-primary"
                    style={{ fontSize: '11px', padding: '4px 12px' }}
                    onClick={handleSave}
                >
                    <Check size={12} /> {t('risk.save_controls')}
                </button>
            </div>
        </div>
    );
}

const emptyRisk: Omit<Risk, 'id' | 'categoryId'> = {
    title: '',
    description: '',
    threat: '',
    vulnerability: '',
    likelihood: 3,
    consequence: 3,
    kScore: 3,
    iScore: 3,
    tScore: 3,
    aScore: 3,
    existingControls: '',
    plannedControls: '',
    owner: '',
    status: 'open',
    scope: 'system_specific',
};

export function RiskPage() {
    const { lang, t } = useLang();
    const {
        store, activeProject, createProject, setActiveProject, deleteProject, updateProject,
        addCategory, toggleCategory, removeCategory, importDefaultCategory,
        addRisk, updateRisk, deleteRisk, addRisksFromBank, getAllRisks, getRiskLevel,
        syncWithJira, createJiraTaskForRisk,
    } = useRiskStore();

    const { state } = useAssessmentStore();

    const [showNewProject, setShowNewProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');
    const [newProjectSystemId, setNewProjectSystemId] = useState('');
    const [newProjectBaselinePlatform, setNewProjectBaselinePlatform] = useState<string>('platform-k8s');
    const [newProjectJira, setNewProjectJira] = useState(false);
    const [newProjectJiraKey, setNewProjectJiraKey] = useState('SEC');
    const [jiraSyncSuccess, setJiraSyncSuccess] = useState(false);
    const [scopeFilter, setScopeFilter] = useState<'all' | 'system_specific' | 'inherited_platform'>('system_specific');
    const [editingProject, setEditingProject] = useState<RiskProject | null>(null);
    const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
    const [editingRisk, setEditingRisk] = useState<(Omit<Risk, 'id' | 'categoryId'> & { categoryId?: string; id?: string }) | null>(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [newCatDesc, setNewCatDesc] = useState('');
    const [showImportCat, setShowImportCat] = useState(false);
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<RiskStatus | 'all'>('all');

    // Risk bank state
    const [showBankModal, setShowBankModal] = useState(false);
    const [activeBankId, setActiveBankId] = useState<string>(riskBanks[0]?.id || '');
    const [selectedBankEntries, setSelectedBankEntries] = useState<Set<string>>(new Set());
    const [bankTargetCategory, setBankTargetCategory] = useState<string>('');

    // Enterprise baseline live stats from ISMS assessments
    const baselineStats = useMemo(() => {
        const calcDone = (controls: { id: string }[]) => {
            if (!controls.length) return 0;
            const done = controls.filter(c => {
                const s = state.assessments[c.id]?.status;
                return s === 'Implemented' || s === 'Not Applicable';
            }).length;
            return Math.round((done / controls.length) * 100);
        };
        return {
            isoPct: calcDone(iso27001Controls),
            nsmPct: calcDone(nsmControls),
            nistPct: calcDone(nistControls),
            soc2Pct: calcDone(soc2Controls),
            nis2Pct: calcDone(nis2Controls),
        };
    }, [state.assessments]);

    const allRisks = useMemo(() => getAllRisks(activeProject), [activeProject]);

    const systemSpecificCount = useMemo(() => allRisks.filter(r => r.scope !== 'inherited_platform').length, [allRisks]);
    const inheritedPlatformCount = useMemo(() => allRisks.filter(r => r.scope === 'inherited_platform').length, [allRisks]);

    const filteredRisks = useMemo(() => {
        return allRisks.filter(r => {
            if (scopeFilter === 'system_specific' && r.scope === 'inherited_platform') return false;
            if (scopeFilter === 'inherited_platform' && r.scope !== 'inherited_platform') return false;
            if (filterCategory !== 'all' && r.categoryId !== filterCategory) return false;
            if (filterStatus !== 'all' && r.status !== filterStatus) return false;
            return true;
        });
    }, [allRisks, scopeFilter, filterCategory, filterStatus]);

    // Compute matrix data (Total Risk: Likelihood x Consequence)
    const matrixRisks = useMemo(() => {
        const grid: Record<string, Risk[]> = {};
        for (let l = 1; l <= 5; l++) {
            for (let c = 1; c <= 5; c++) {
                grid[`${l}-${c}`] = [];
            }
        }
        filteredRisks.forEach(r => {
            grid[`${r.likelihood}-${r.consequence}`]?.push(r);
        });
        return grid;
    }, [filteredRisks]);

    // Stats
    const stats = useMemo(() => {
        const levels = { low: 0, medium: 0, high: 0, critical: 0 };
        filteredRisks.forEach(r => {
            levels[getRiskLevel(r.likelihood, r.consequence)]++;
        });
        return { total: filteredRisks.length, ...levels };
    }, [filteredRisks]);

    const getCatName = (cat: RiskCategory) => cat.name;

    // ─── No project selected ───
    if (!activeProject) {
        return (
            <div className="animate-fade">
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
                        {t('risk.title')}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                        {t('risk.subtitle')}
                    </p>
                </div>

                {/* Project list */}
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: 600 }}>{t('risk.projects')}</h2>
                        <button className="risk-btn risk-btn-primary" onClick={() => setShowNewProject(true)}>
                            <Plus size={14} /> {t('risk.new_project')}
                        </button>
                    </div>

                    {store.projects.length === 0 && !showNewProject && (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <Shield size={36} style={{ opacity: 0.3, marginBottom: '12px' }} />
                            <p style={{ fontSize: '13px' }}>{t('risk.no_projects')}</p>
                        </div>
                    )}

                    {store.projects.map(p => {
                        const linkedSys = state.systems?.find(s => s.id === p.systemId);
                        return (
                            <div key={p.id} className="risk-project-card" onClick={() => setActiveProject(p.id)}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.name}</div>
                                        {linkedSys && (
                                            <span className="domain-tag domain-technological" style={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center', 
                                                gap: '4px',
                                                fontSize: '10px',
                                                padding: '1px 6px',
                                                borderRadius: '4px',
                                                fontWeight: 500
                                            }}>
                                                <Database size={10} />
                                                {linkedSys.name}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                        {p.description || <span style={{ fontStyle: 'italic', opacity: 0.7 }}>Ingen beskrivelse</span>} · {p.categories.reduce((acc, c) => acc + c.risks.length, 0)} {t('risk.risks_count')} · {p.categories.length} {t('risk.categories_count')}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <button className="risk-btn-icon" onClick={(e) => { e.stopPropagation(); setEditingProject(p); }}
                                        title="Rediger prosjekt">
                                        <Edit3 size={14} />
                                    </button>
                                    <button className="risk-btn-icon" onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }}
                                        title={t('risk.delete')}>
                                        <Trash2 size={14} />
                                    </button>
                                    <ArrowRight size={16} style={{ color: 'var(--text-muted)', marginLeft: '4px' }} />
                                </div>
                            </div>
                        );
                    })}

                    {showNewProject && (
                        <div className="risk-new-form" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div>
                                <label htmlFor="new-proj-name" className="risk-label" style={{ marginBottom: '4px' }}>Prosjektnavn</label>
                                <input id="new-proj-name" type="text" placeholder={t('risk.project_name')} value={newProjectName}
                                    onChange={e => setNewProjectName(e.target.value)}
                                    style={{ width: '100%' }} className="risk-input" />
                            </div>
                            <div>
                                <label htmlFor="new-proj-desc" className="risk-label" style={{ marginBottom: '4px' }}>Beskrivelse</label>
                                <input id="new-proj-desc" type="text" placeholder={t('risk.project_desc')} value={newProjectDesc}
                                    onChange={e => setNewProjectDesc(e.target.value)}
                                    style={{ width: '100%' }} className="risk-input" />
                            </div>
                            {state.systems && state.systems.length > 0 && (
                                <div>
                                    <label htmlFor="new-proj-system" className="risk-label" style={{ marginBottom: '4px' }}>Tilknyttet IT-system</label>
                                    <select id="new-proj-system" className="risk-input" value={newProjectSystemId}
                                        onChange={e => setNewProjectSystemId(e.target.value)}
                                        style={{ width: '100%' }}>
                                        <option value="">Ingen (Generelt prosjekt)</option>
                                        {state.systems.map(sys => (
                                            <option key={sys.id} value={sys.id}>{sys.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Platform baseline selector */}
                            <div>
                                <label htmlFor="new-proj-platform" className="risk-label" style={{ marginBottom: '4px' }}>
                                    Underliggende Plattform / Grunnlag (Arvet risikovurdering)
                                </label>
                                <select
                                    id="new-proj-platform"
                                    className="risk-input"
                                    value={newProjectBaselinePlatform}
                                    onChange={e => setNewProjectBaselinePlatform(e.target.value)}
                                    style={{ width: '100%' }}
                                >
                                    {allPlatformBaselines.map(pb => (
                                        <option key={pb.id} value={pb.id}>
                                            {pb.platformType === 'kubernetes' ? '⚡ ' : pb.platformType === 'cloud' ? '☁️ ' : '🏢 '}
                                            {pb.name}
                                        </option>
                                    ))}
                                    {store.projects.length > 0 && (
                                        <optgroup label="Bruk eksisterende risikoprosjekt som plattform">
                                            {store.projects.map(p => (
                                                <option key={p.id} value={p.id}>📁 {p.name}</option>
                                            ))}
                                        </optgroup>
                                    )}
                                    <option value="none">Frittstående (Ingen arvet plattform – standard sjekkliste)</option>
                                </select>
                                <div style={{
                                    marginTop: '6px',
                                    padding: '8px 10px',
                                    background: 'rgba(16, 185, 129, 0.08)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.4
                                }}>
                                    <strong style={{ color: 'var(--accent-teal)' }}>🛡️ Flerlags risikostyring:</strong> Plattformen ivaretar infrastruktur- og driftstiltak. <strong>ISO 27001, NSM, NIST CSF, SOC 2 og NIS2</strong> ivaretar virksomhetens baseline. Dette prosjektet fokuserer på <strong>systemspesifikk restrisiko</strong>.
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: '#2563eb' }}>
                                    <input
                                        type="checkbox"
                                        checked={newProjectJira}
                                        onChange={e => setNewProjectJira(e.target.checked)}
                                        style={{ accentColor: '#2563eb' }}
                                    />
                                    Opprett tilknyttet Jira Epic for prosjektet
                                </label>
                                {newProjectJira && (
                                    <div style={{ marginTop: '6px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <label className="risk-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>Jira Prosjektnøkkel:</label>
                                        <input
                                            type="text"
                                            value={newProjectJiraKey}
                                            onChange={e => setNewProjectJiraKey(e.target.value.toUpperCase())}
                                            className="risk-input"
                                            style={{ width: '80px', padding: '4px 8px', fontSize: '12px', textTransform: 'uppercase' }}
                                            placeholder="SEC"
                                        />
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                            Vil generere f.eks. {(newProjectJiraKey || 'SEC').toUpperCase()}-101 i Jira
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                <button className="risk-btn risk-btn-primary"
                                    onClick={() => {
                                        if (newProjectName.trim()) {
                                            const epicKey = newProjectJira ? `${(newProjectJiraKey || 'SEC').toUpperCase().trim()}-${Math.floor(100 + Math.random() * 900)}` : undefined;
                                            const epicUrl = epicKey ? `https://jira.company.com/browse/${epicKey}` : undefined;
                                            createProject(
                                                newProjectName.trim(),
                                                newProjectDesc.trim(),
                                                newProjectBaselinePlatform === 'none',
                                                newProjectSystemId || undefined,
                                                epicKey,
                                                epicUrl,
                                                newProjectBaselinePlatform
                                            );
                                            setNewProjectName(''); setNewProjectDesc(''); setNewProjectSystemId(''); setNewProjectBaselinePlatform('platform-k8s'); setNewProjectJira(false); setShowNewProject(false);
                                        }
                                    }}>
                                    <Check size={14} /> {t('risk.create')}
                                </button>
                                <button className="risk-btn" onClick={() => { setShowNewProject(false); setNewProjectName(''); setNewProjectDesc(''); setNewProjectSystemId(''); setNewProjectBaselinePlatform('platform-k8s'); setNewProjectJira(false); }}>
                                    {t('risk.cancel')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ─── Active project view ───
    const enabledCategories = activeProject.categories.filter(c => c.enabled);

    // Which default categories are NOT yet imported?
    const availableTemplates = defaultRiskCategories.filter(dc =>
        !activeProject.categories.some(c => c.name === dc.name)
    );

    return (
        <div className="animate-fade">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <button className="risk-btn" onClick={() => setActiveProject(null)} style={{ marginBottom: '8px', fontSize: '12px' }}>
                        ← {t('risk.back_to_projects')}
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{activeProject.name}</h1>
                        {state.systems?.find(s => s.id === activeProject.systemId) && (
                            <span className="domain-tag domain-technological" style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '4px',
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontWeight: 500
                            }}>
                                <Database size={11} />
                                {state.systems.find(s => s.id === activeProject.systemId)?.name}
                            </span>
                        )}
                        {activeProject.baselinePlatformName && (
                            <span className="domain-tag" style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '4px',
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontWeight: 600,
                                background: 'rgba(99, 102, 241, 0.1)',
                                color: '#6366f1',
                                border: '1px solid rgba(99, 102, 241, 0.25)'
                            }}>
                                <Layers size={11} />
                                Plattform: {activeProject.baselinePlatformName}
                            </span>
                        )}
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{activeProject.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {activeProject.jiraEpicKey && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <a
                                href={activeProject.jiraEpicUrl || `https://jira.atlassian.net/browse/${activeProject.jiraEpicKey}`}
                                target="_blank"
                                rel="noreferrer"
                                className="status-badge"
                                style={{
                                    background: 'rgba(0, 82, 204, 0.12)',
                                    color: '#2684FF',
                                    borderColor: 'rgba(0, 82, 204, 0.3)',
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    textDecoration: 'none',
                                    fontWeight: 600
                                }}
                            >
                                <ExternalLink size={13} />
                                Epic: {activeProject.jiraEpicKey}
                            </a>
                            <button
                                onClick={() => {
                                    syncWithJira(activeProject.id);
                                    setJiraSyncSuccess(true);
                                    setTimeout(() => setJiraSyncSuccess(false), 2000);
                                }}
                                className="btn-secondary"
                                style={{ padding: '6px 10px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                title="Synkroniser tiltaksstatuser fra Jira"
                            >
                                <RefreshCw size={12} className={jiraSyncSuccess ? 'animate-spin' : ''} />
                                {jiraSyncSuccess ? 'Synkronisert!' : 'Synk Jira'}
                            </button>
                        </div>
                    )}
                    <span className="status-badge" style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        borderColor: 'var(--border)',
                        padding: '6px 12px',
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <Shield size={14} style={{ color: 'var(--accent-teal)' }} />
                        {t('risk.total_score')}
                    </span>
                </div>
            </div>

            {/* Enterprise Baseline Banner */}
            <div className="card" style={{
                padding: '12px 18px',
                marginBottom: '16px',
                background: 'var(--card-inner-bg)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={20} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} />
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Virksomhetens Felles Grunnsikring (Organisatorisk Baseline)
                            <span style={{ fontSize: '10px', color: 'var(--accent-teal)', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)' }}>
                                Felles for alle systemer
                            </span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            Overordnede sikkerhetspolicyer, tilgangsstyring, fysisk sikring og hendelseshåndtering ivaretas sentralt i ISMS-et.
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="status-badge" style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderColor: 'rgba(59, 130, 246, 0.25)' }}>
                        ISO 27001: <strong>{baselineStats.isoPct}%</strong>
                    </span>
                    <span className="status-badge" style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(13, 148, 136, 0.1)', color: '#0d9488', borderColor: 'rgba(13, 148, 136, 0.25)' }}>
                        NSM Grunnprinsipper: <strong>{baselineStats.nsmPct}%</strong>
                    </span>
                    <span className="status-badge" style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', borderColor: 'rgba(37, 99, 235, 0.25)' }}>
                        NIST CSF: <strong>{baselineStats.nistPct}%</strong>
                    </span>
                    <span className="status-badge" style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', borderColor: 'rgba(124, 58, 237, 0.25)' }}>
                        SOC 2: <strong>{baselineStats.soc2Pct}%</strong>
                    </span>
                    <span className="status-badge" style={{ fontSize: '11px', padding: '3px 8px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', borderColor: 'rgba(168, 85, 247, 0.25)' }}>
                        NIS2: <strong>{baselineStats.nis2Pct}%</strong>
                    </span>
                </div>
            </div>

            {/* Scope Filter Toggles */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'inline-flex', gap: '4px', background: 'var(--bg-tertiary)', padding: '3px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <button
                        onClick={() => setScopeFilter('system_specific')}
                        style={{
                            padding: '4px 10px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: 'pointer',
                            background: scopeFilter === 'system_specific' ? 'var(--card-bg)' : 'transparent',
                            color: scopeFilter === 'system_specific' ? 'var(--accent-teal)' : 'var(--text-secondary)',
                            boxShadow: scopeFilter === 'system_specific' ? 'var(--shadow-sm)' : 'none',
                            display: 'inline-flex', alignItems: 'center', gap: '5px'
                        }}
                    >
                        <Zap size={13} />
                        Kun systemspesifikk risiko ({systemSpecificCount})
                    </button>
                    <button
                        onClick={() => setScopeFilter('inherited_platform')}
                        style={{
                            padding: '4px 10px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: 'pointer',
                            background: scopeFilter === 'inherited_platform' ? 'var(--card-bg)' : 'transparent',
                            color: scopeFilter === 'inherited_platform' ? '#6366f1' : 'var(--text-secondary)',
                            boxShadow: scopeFilter === 'inherited_platform' ? 'var(--shadow-sm)' : 'none',
                            display: 'inline-flex', alignItems: 'center', gap: '5px'
                        }}
                    >
                        <Layers size={13} />
                        Arvet plattformrisiko ({inheritedPlatformCount})
                    </button>
                    <button
                        onClick={() => setScopeFilter('all')}
                        style={{
                            padding: '4px 10px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: 'pointer',
                            background: scopeFilter === 'all' ? 'var(--card-bg)' : 'transparent',
                            color: scopeFilter === 'all' ? 'var(--text-primary)' : 'var(--text-secondary)',
                            boxShadow: scopeFilter === 'all' ? 'var(--shadow-sm)' : 'none',
                            display: 'inline-flex', alignItems: 'center', gap: '5px'
                        }}
                    >
                        Samlet løsningsrisiko ({allRisks.length})
                    </button>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Fokus:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                        {scopeFilter === 'system_specific' && 'Systemspesifikk restrisiko (applikasjonskode, data, API)'}
                        {scopeFilter === 'inherited_platform' && 'Arvet fra plattform (ivaretatt av underliggende drift)'}
                        {scopeFilter === 'all' && 'Samlet risikoprofil (både applikasjon og arvet plattform)'}
                    </strong>
                </div>
            </div>

            {/* Stats bar */}
            <div className="risk-stats-grid">
                <div className="card" style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700 }}>{stats.total}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('risk.total')}</div>
                </div>
                <div className="card" style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-red)' }}>{stats.critical}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('risk.critical')}</div>
                </div>
                <div className="card" style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#ea580c' }}>{stats.high}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('risk.high')}</div>
                </div>
                <div className="card" style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-gold)' }}>{stats.medium}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('risk.medium')}</div>
                </div>
                <div className="card" style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent-green)' }}>{stats.low}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('risk.low')}</div>
                </div>
            </div>

            {/* Main content: sidebar + matrix + table */}
            <div className="risk-main-grid">
                {/* Category sidebar */}
                <div>
                    <div className="card" style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <h3 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                                {t('risk.categories')}
                            </h3>
                        </div>
                        {activeProject.categories.map(cat => (
                            <div key={cat.id} className="risk-cat-item">
                                <button className="risk-btn-icon" onClick={() => toggleCategory(activeProject.id, cat.id)}
                                    title={cat.enabled ? t('risk.hide') : t('risk.show')}
                                    style={{ color: cat.enabled ? 'var(--accent-teal)' : 'var(--text-muted)' }}>
                                    {cat.enabled ? <Eye size={13} /> : <EyeOff size={13} />}
                                </button>
                                <span style={{
                                    flex: 1, fontSize: '12px', fontWeight: 500,
                                    opacity: cat.enabled ? 1 : 0.5,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }} onClick={() => setFilterCategory(filterCategory === cat.id ? 'all' : cat.id)}
                                title={getCatName(cat)}>
                                    {getCatName(cat)}
                                    <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>({cat.risks.length})</span>
                                </span>
                                <button className="risk-btn-icon" onClick={() => removeCategory(activeProject.id, cat.id)}
                                    title={t('risk.remove')}>
                                    <X size={12} />
                                </button>
                            </div>
                        ))}

                        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button className="risk-btn" style={{ fontSize: '11px', width: '100%', justifyContent: 'center' }}
                                onClick={() => setShowAddCategory(!showAddCategory)}>
                                <Plus size={12} /> {t('risk.add_category')}
                            </button>
                            {availableTemplates.length > 0 && (
                                <button className="risk-btn" style={{ fontSize: '11px', width: '100%', justifyContent: 'center' }}
                                    onClick={() => setShowImportCat(!showImportCat)}>
                                    <FolderPlus size={12} /> {t('risk.import_template')}
                                </button>
                            )}
                        </div>

                        {showAddCategory && (
                            <div style={{ marginTop: '8px' }}>
                                <input type="text" className="risk-input" placeholder={t('risk.cat_name')}
                                    value={newCatName} onChange={e => setNewCatName(e.target.value)}
                                    style={{ width: '100%', marginBottom: '6px', fontSize: '12px' }} />
                                <input type="text" className="risk-input" placeholder={t('risk.cat_desc')}
                                    value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)}
                                    style={{ width: '100%', marginBottom: '6px', fontSize: '12px' }} />
                                <button className="risk-btn risk-btn-primary" style={{ width: '100%', fontSize: '11px', justifyContent: 'center' }}
                                    onClick={() => {
                                        if (newCatName.trim()) {
                                            addCategory(activeProject.id, { name: newCatName.trim(), description: newCatDesc.trim() });
                                            setNewCatName(''); setNewCatDesc(''); setShowAddCategory(false);
                                        }
                                    }}>
                                    <Check size={12} /> {t('risk.create')}
                                </button>
                            </div>
                        )}

                        {showImportCat && (
                            <div style={{ marginTop: '8px' }}>
                                {availableTemplates.map(tmpl => (
                                    <button key={tmpl.id} className="risk-template-item"
                                        onClick={() => { importDefaultCategory(activeProject.id, tmpl.id); setShowImportCat(false); }}>
                                        <span style={{ fontSize: '12px', fontWeight: 500 }}>{getCatName(tmpl)}</span>
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>+{tmpl.risks.length}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Filter by status */}
                        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                {t('risk.filter_status')}
                            </h3>
                            <select className="status-select" style={{ width: '100%', fontSize: '12px' }}
                                value={filterStatus} onChange={e => setFilterStatus(e.target.value as RiskStatus | 'all')}>
                                <option value="all">{t('risk.all_statuses')}</option>
                                <option value="open">{STATUS_LABELS[lang]?.open || 'Open'}</option>
                                <option value="mitigated">{STATUS_LABELS[lang]?.mitigated || 'Mitigated'}</option>
                                <option value="accepted">{STATUS_LABELS[lang]?.accepted || 'Accepted'}</option>
                                <option value="closed">{STATUS_LABELS[lang]?.closed || 'Closed'}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Matrix + Table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* 5×5 Risk Matrix */}
                    <div className="card" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                            {t('risk.matrix_title')}
                        </h3>
                        <div className="matrix-scroll-wrapper">
                            <div className="matrix-scroll-content">
                                <div style={{ display: 'flex', gap: '4px' }}>
                            {/* Y-axis label */}
                            <div style={{
                                writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                                fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '0 8px 0 0', letterSpacing: '0.05em', textTransform: 'uppercase',
                            }}>
                                {t('risk.likelihood')}
                            </div>
                            <div style={{ flex: 1 }}>
                                {/* Matrix grid - rows from 5 (top) to 1 (bottom) */}
                                <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(5, 1fr)', gap: '4px' }}>
                                    {/* Empty corner */}
                                    <div />
                                    {/* Column headers */}
                                    {([1, 2, 3, 4, 5] as Consequence[]).map(c => (
                                        <div key={`ch-${c}`} style={{
                                            textAlign: 'center', fontSize: '10px', fontWeight: 600,
                                            color: 'var(--text-muted)', padding: '2px 0',
                                        }}>
                                            {c}
                                        </div>
                                    ))}
                                    {/* Rows */}
                                    {([5, 4, 3, 2, 1] as Likelihood[]).map(l => (
                                        <div key={`row-${l}`} style={{ display: 'contents' }}>
                                            {/* Row label */}
                                            <div key={`rl-${l}`} style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                                                fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)',
                                                paddingRight: '8px', whiteSpace: 'nowrap'
                                            }}>
                                                {l} – {LIKELIHOOD_LABELS[lang]?.[l]?.split(' ')[0] || ''}
                                            </div>
                                            {/* Cells */}
                                            {([1, 2, 3, 4, 5] as Consequence[]).map(c => {
                                                const cellRisks = matrixRisks[`${l}-${c}`] || [];
                                                return (
                                                    <div key={`${l}-${c}`} className="risk-matrix-cell" style={{
                                                        background: getCellBgColor(l, c),
                                                        minHeight: '52px',
                                                        borderRadius: '6px',
                                                        padding: '6px',
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: '4px',
                                                        alignContent: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid var(--border)',
                                                        transition: 'all 0.15s ease',
                                                        position: 'relative',
                                                    }}>
                                                        {cellRisks.length > 0 && (
                                                            <div style={{
                                                                position: 'absolute', top: '2px', right: '4px',
                                                                fontSize: '9px', fontWeight: 700,
                                                                color: getRiskColor(l, c), opacity: 0.6,
                                                            }}>
                                                                {l * c}
                                                            </div>
                                                        )}
                                                        {cellRisks.map(r => (
                                                            <div key={r.id} title={r.title} style={{
                                                                width: '10px', height: '10px', borderRadius: '50%',
                                                                background: getRiskColor(l, c),
                                                                border: '1.5px solid var(--bg-secondary)',
                                                                cursor: 'pointer',
                                                                transition: 'transform 0.15s ease',
                                                            }}
                                                                onClick={() => setExpandedRisk(expandedRisk === r.id ? null : r.id)}
                                                                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.3)')}
                                                                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                                                            />
                                                        ))}
                                                        {cellRisks.length === 0 && (
                                                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.25 }}>
                                                                {l * c}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                    {/* Bottom axis labels */}
                                    <div />
                                    {([1, 2, 3, 4, 5] as Consequence[]).map(c => (
                                        <div key={`cl-${c}`} style={{
                                            textAlign: 'center', fontSize: '9px', color: 'var(--text-muted)', padding: '2px 0',
                                        }}>
                                            {CONSEQUENCE_LABELS[lang]?.[c]?.split(' ')[0] || ''}
                                        </div>
                                    ))}
                                </div>
                                {/* X-axis label */}
                                <div style={{
                                    textAlign: 'center', fontSize: '11px', fontWeight: 600,
                                    color: 'var(--text-muted)', marginTop: '12px',
                                    letterSpacing: '0.05em', textTransform: 'uppercase',
                                }}>
                                    {t('risk.consequence')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Table */}
                    <div className="card table-responsive">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '8px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600 }}>
                                {t('risk.risk_list')} ({filteredRisks.length})
                            </h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {enabledCategories.length > 0 && (
                                    <button className="risk-btn risk-btn-primary"
                                        onClick={() => {
                                            const firstCat = enabledCategories[0];
                                            setEditingRisk({ ...emptyRisk, categoryId: firstCat.id });
                                        }}>
                                        <Plus size={14} /> {t('risk.add_risk')}
                                    </button>
                                )}
                                <button className="risk-btn" onClick={() => {
                                    setShowBankModal(true);
                                    setActiveBankId(riskBanks[0]?.id || '');
                                    setSelectedBankEntries(new Set());
                                    // Pre-select the first non-NSM category
                                    const nonNsmCategories = enabledCategories.filter(c =>
                                        !activeProject.categories.find(cat => cat.name.startsWith('NSM') && cat.id === c.id)
                                    );
                                    if (nonNsmCategories.length > 0) {
                                        setBankTargetCategory(nonNsmCategories[0].id);
                                    }
                                }}>
                                    <BookOpen size={14} /> {t('risk.bank')}
                                </button>
                            </div>
                        </div>

                        {filteredRisks.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <AlertTriangle size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
                                <p style={{ fontSize: '13px' }}>{t('risk.no_risks')}</p>
                            </div>
                        ) : (
                            <table className="controls-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '28px' }}></th>
                                        <th>{t('risk.risk_name')}</th>
                                        <th>{t('risk.category')}</th>
                                        <th>{t('risk.likelihood')}</th>
                                        <th>KITA ({t('risk.consequence')})</th>
                                        <th>{t('risk.total_score')}</th>
                                        <th>{t('risk.status_label')}</th>
                                        <th style={{ width: '80px' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRisks.map(risk => {
                                        const isExpanded = expandedRisk === risk.id;
                                        const cat = activeProject.categories.find(c => c.id === risk.categoryId);
                                        const totalScore = risk.likelihood * risk.consequence;
                                        return (
                                            <tr key={risk.id} style={{ display: 'contents' }}>
                                                <tr className={isExpanded ? 'expanded' : ''}
                                                    onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}>
                                                    <td style={{ width: '28px', textAlign: 'center', padding: 0 }}>
                                                        <button 
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedRisk(isExpanded ? null : risk.id);
                                                            }}
                                                            aria-expanded={isExpanded}
                                                            aria-label={isExpanded ? `Skjul detaljer for ${risk.title}` : `Vis detaljer for ${risk.title}`}
                                                            className="risk-btn-icon"
                                                            style={{ border: 'none', background: 'transparent', width: '100%', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                        >
                                                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                        </button>
                                                    </td>
                                                    <td style={{ fontWeight: 500, fontSize: '13px' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                                            {risk.scope === 'inherited_platform' ? (
                                                                <span
                                                                    className="status-badge"
                                                                    style={{
                                                                        fontSize: '9px',
                                                                        padding: '1px 5px',
                                                                        background: 'rgba(99, 102, 241, 0.12)',
                                                                        color: '#6366f1',
                                                                        borderColor: 'rgba(99, 102, 241, 0.25)',
                                                                        fontWeight: 700
                                                                    }}
                                                                    title={`Arvet risiko fra: ${risk.inheritedFrom || 'Plattform'}`}
                                                                >
                                                                    Arvet plattform
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className="status-badge"
                                                                    style={{
                                                                        fontSize: '9px',
                                                                        padding: '1px 5px',
                                                                        background: 'rgba(16, 185, 129, 0.12)',
                                                                        color: 'var(--accent-teal)',
                                                                        borderColor: 'rgba(16, 185, 129, 0.25)',
                                                                        fontWeight: 700
                                                                    }}
                                                                    title="Systemspesifikk risiko for denne applikasjonen"
                                                                >
                                                                    Systemspesifikk
                                                                </span>
                                                            )}
                                                            <span>{risk.title}</span>
                                                            {risk.jiraIssueKey && (
                                                                <span
                                                                    className="status-badge"
                                                                    style={{
                                                                        fontSize: '10px',
                                                                        padding: '1px 5px',
                                                                        background: 'rgba(0, 82, 204, 0.1)',
                                                                        color: '#2684FF',
                                                                        borderColor: 'rgba(0, 82, 204, 0.25)',
                                                                        fontWeight: 600
                                                                    }}
                                                                    title={`Jira Oppgave: ${risk.jiraIssueKey} (${risk.jiraStatus || 'IN PROGRESS'})`}
                                                                >
                                                                    {risk.jiraIssueKey}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="domain-tag domain-technological" style={{ fontSize: '10px' }}>
                                                            {cat ? getCatName(cat) : '—'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
                                                            {risk.likelihood} ({LIKELIHOOD_LABELS[lang]?.[risk.likelihood]})
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '3px', alignItems: 'center', flexWrap: 'wrap' }}
                                                            title={`K:${risk.kScore} I:${risk.iScore} T:${risk.tScore} A:${risk.aScore} -> Max Konsekvens: ${risk.consequence}`}>
                                                            <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>K:{risk.kScore}</span>
                                                            <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>I:{risk.iScore}</span>
                                                            <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>T:{risk.tScore}</span>
                                                            <span style={{ fontSize: '10px', fontWeight: 600, padding: '1px 4px', borderRadius: '3px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>A:{risk.aScore}</span>
                                                            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', marginLeft: '2px' }}>
                                                                = {risk.consequence}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="status-badge" style={{
                                                            background: getRiskBgColor(risk.likelihood, risk.consequence),
                                                            color: getRiskColor(risk.likelihood, risk.consequence),
                                                            borderColor: 'transparent',
                                                            fontWeight: 600,
                                                        }}>
                                                            {risk.likelihood} × {risk.consequence} = {totalScore}
                                                        </span>
                                                    </td>
                                                    <td onClick={e => e.stopPropagation()}>
                                                        <select
                                                            aria-label={`Endre status for ${risk.title}`}
                                                            value={risk.status}
                                                            onChange={(e) => {
                                                                updateRisk(activeProject.id, risk.categoryId, risk.id, {
                                                                    status: e.target.value as RiskStatus
                                                                });
                                                            }}
                                                            style={{
                                                                fontSize: '11px',
                                                                fontWeight: 600,
                                                                padding: '3px 8px',
                                                                borderRadius: '6px',
                                                                border: '1px solid var(--border)',
                                                                cursor: 'pointer',
                                                                background: risk.status === 'open' ? 'rgba(245, 158, 11, 0.12)' :
                                                                    risk.status === 'mitigated' ? 'rgba(21, 128, 61, 0.12)' :
                                                                        risk.status === 'accepted' ? 'rgba(30, 58, 138, 0.12)' : 'var(--bg-tertiary)',
                                                                color: risk.status === 'open' ? 'var(--accent-amber)' :
                                                                    risk.status === 'mitigated' ? 'var(--accent-green)' :
                                                                        risk.status === 'accepted' ? 'var(--accent-primary)' : 'var(--text-muted)',
                                                                fontFamily: 'inherit',
                                                            }}
                                                        >
                                                            <option value="open" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                                                {STATUS_LABELS[lang]?.open || 'Åpen'}
                                                            </option>
                                                            <option value="mitigated" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                                                {STATUS_LABELS[lang]?.mitigated || 'Mitigert'}
                                                            </option>
                                                            <option value="accepted" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                                                {STATUS_LABELS[lang]?.accepted || 'Akseptert'}
                                                            </option>
                                                            <option value="closed" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                                                {STATUS_LABELS[lang]?.closed || 'Lukket'}
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td onClick={e => e.stopPropagation()}>
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            <button className="risk-btn-icon" onClick={(e) => {
                                                                e.stopPropagation();
                                                                setEditingRisk({ ...risk });
                                                            }} title="Rediger full risiko">
                                                                <Edit3 size={13} />
                                                            </button>
                                                            <button className="risk-btn-icon" onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteRisk(activeProject.id, risk.categoryId, risk.id);
                                                            }} title={t('risk.delete')}>
                                                                <Trash2 size={13} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {isExpanded && (
                                                    <tr key={`${risk.id}-detail`}>
                                                        <td colSpan={8} style={{ padding: 0, background: 'var(--bg-expanded)' }}>
                                                            <div className="animate-fade" style={{
                                                                padding: '20px 24px',
                                                                borderBottom: '1px solid var(--border)',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: '16px',
                                                            }}>
                                                                {/* Inherited platform banner if applicable */}
                                                                {risk.scope === 'inherited_platform' && (
                                                                    <div style={{
                                                                        padding: '10px 14px',
                                                                        background: 'rgba(99, 102, 241, 0.08)',
                                                                        border: '1px solid rgba(99, 102, 241, 0.2)',
                                                                        borderRadius: '6px',
                                                                        fontSize: '12px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '10px'
                                                                    }}>
                                                                        <Layers size={16} style={{ color: '#6366f1', flexShrink: 0 }} />
                                                                        <div>
                                                                            <strong style={{ color: '#6366f1' }}>Arvet fra underliggende plattform ({risk.inheritedFrom || 'Plattform'}):</strong>{' '}
                                                                            <span style={{ color: 'var(--text-secondary)' }}>
                                                                                {risk.inheritedMitigationDetails || 'Denne risikoen håndteres og mitigeres av det underliggende plattformteamet / infrastrukturen. Systemeier trenger ikke gjennomføre ytterligere tiltak så lenge plattformens forutsetninger følges.'}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Context information */}
                                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                                                    <div>
                                                                        <label className="risk-label">
                                                                            {t('risk.description_label')}
                                                                        </label>
                                                                        <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-secondary)' }}>{risk.description || '—'}</p>
                                                                    </div>
                                                                    <div>
                                                                        <label className="risk-label">
                                                                            {t('risk.threat_label')}
                                                                        </label>
                                                                        <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-secondary)' }}>{risk.threat || '—'}</p>
                                                                    </div>
                                                                    <div>
                                                                        <label className="risk-label">
                                                                            {t('risk.vulnerability_label')}
                                                                        </label>
                                                                        <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-secondary)' }}>{risk.vulnerability || '—'}</p>
                                                                    </div>
                                                                    <div>
                                                                        <label className="risk-label">
                                                                            {t('risk.owner_label')}
                                                                        </label>
                                                                        <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-secondary)' }}>{risk.owner || '—'}</p>
                                                                    </div>
                                                                </div>

                                                                {/* KITA score bar */}
                                                                <div style={{
                                                                    display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap',
                                                                    padding: '8px 12px', background: 'var(--card-inner-bg)', borderRadius: '6px',
                                                                    border: '1px solid var(--border)', fontSize: '12px'
                                                                }}>
                                                                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>KITA Konsekvensanalyse:</span>
                                                                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                                                                        Konfidensialitet (K): <strong>{risk.kScore}</strong> ({CONSEQUENCE_LABELS[lang]?.[risk.kScore]})
                                                                    </span>
                                                                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                                                                        Integritet (I): <strong>{risk.iScore}</strong> ({CONSEQUENCE_LABELS[lang]?.[risk.iScore]})
                                                                    </span>
                                                                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                                                                        Tilgjengelighet (T): <strong>{risk.tScore}</strong> ({CONSEQUENCE_LABELS[lang]?.[risk.tScore]})
                                                                    </span>
                                                                    <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                                                                        Autentisitet (A): <strong>{risk.aScore}</strong> ({CONSEQUENCE_LABELS[lang]?.[risk.aScore]})
                                                                    </span>
                                                                    <span style={{ marginLeft: 'auto', fontWeight: 600, color: getRiskColor(risk.likelihood, risk.consequence) }}>
                                                                        Totalrisiko: {risk.likelihood} × {risk.consequence} = {totalScore} ({getRiskLevel(risk.likelihood, risk.consequence).toUpperCase()})
                                                                    </span>
                                                                </div>

                                                                {/* Inline Tiltak Editor */}
                                                                <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                                                                    <InlineRiskControlsEditor
                                                                        risk={risk}
                                                                        onSave={(updates) => {
                                                                            updateRisk(activeProject.id, risk.categoryId, risk.id, updates);
                                                                        }}
                                                                        onCreateJiraTask={() => {
                                                                            createJiraTaskForRisk(activeProject.id, risk.categoryId, risk.id);
                                                                        }}
                                                                        t={t}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* ─── Add/Edit Risk Modal ─── */}
            {editingRisk && (
                <div className="risk-modal-overlay" onClick={() => setEditingRisk(null)}>
                    <div className="risk-modal card" onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>
                                {editingRisk.id ? t('risk.edit_risk') : t('risk.add_risk')}
                            </h3>
                            <button className="risk-btn-icon" onClick={() => setEditingRisk(null)}><X size={16} /></button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="edit-risk-name" className="risk-label">{t('risk.risk_name')}</label>
                                <input id="edit-risk-name" className="risk-input" value={editingRisk.title}
                                    onChange={e => setEditingRisk({ ...editingRisk, title: e.target.value })} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="edit-risk-desc" className="risk-label">{t('risk.description_label')}</label>
                                <textarea id="edit-risk-desc" className="risk-input" rows={2} value={editingRisk.description}
                                    onChange={e => setEditingRisk({ ...editingRisk, description: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="edit-risk-cat" className="risk-label">{t('risk.category')}</label>
                                <select id="edit-risk-cat" className="risk-input" value={editingRisk.categoryId || ''}
                                    onChange={e => setEditingRisk({ ...editingRisk, categoryId: e.target.value })}>
                                    {enabledCategories.map(c => (
                                        <option key={c.id} value={c.id}>{getCatName(c)}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="edit-risk-status" className="risk-label">{t('risk.status_label')}</label>
                                <select id="edit-risk-status" className="risk-input" value={editingRisk.status}
                                    onChange={e => setEditingRisk({ ...editingRisk, status: e.target.value as RiskStatus })}>
                                    <option value="open">{STATUS_LABELS[lang]?.open}</option>
                                    <option value="mitigated">{STATUS_LABELS[lang]?.mitigated}</option>
                                    <option value="accepted">{STATUS_LABELS[lang]?.accepted}</option>
                                    <option value="closed">{STATUS_LABELS[lang]?.closed}</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="edit-risk-threat" className="risk-label">{t('risk.threat_label')}</label>
                                <input id="edit-risk-threat" className="risk-input" value={editingRisk.threat}
                                    onChange={e => setEditingRisk({ ...editingRisk, threat: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="edit-risk-vulner" className="risk-label">{t('risk.vulnerability_label')}</label>
                                <input id="edit-risk-vulner" className="risk-input" value={editingRisk.vulnerability}
                                    onChange={e => setEditingRisk({ ...editingRisk, vulnerability: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="edit-risk-owner" className="risk-label">{t('risk.owner_label')}</label>
                                <input id="edit-risk-owner" className="risk-input" value={editingRisk.owner}
                                    onChange={e => setEditingRisk({ ...editingRisk, owner: e.target.value })} />
                            </div>
                            <div />

                            {/* Likelihood & KITA Consequence */}
                            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '4px' }}>
                                <h4 style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {t('risk.likelihood')} & {t('risk.kita_consequence')}
                                </h4>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="edit-risk-l" className="risk-label">
                                    {t('risk.likelihood')}: <strong>{editingRisk.likelihood} – {LIKELIHOOD_LABELS[lang]?.[editingRisk.likelihood]}</strong>
                                </label>
                                <input id="edit-risk-l" type="range" min={1} max={5} step={1} value={editingRisk.likelihood}
                                    onChange={e => setEditingRisk({ ...editingRisk, likelihood: parseInt(e.target.value) as Likelihood })}
                                    style={{ width: '100%', accentColor: 'var(--accent-teal)' }} />
                            </div>

                            {/* KITA Sliders */}
                            <div style={{ gridColumn: '1 / -1', background: 'var(--card-inner-bg)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-primary)' }}>
                                    KITA / CIA Konsekvensanalyse (Konsekvens = høyeste av K, I, T, A)
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div>
                                        <label htmlFor="edit-risk-k" className="risk-label" style={{ fontSize: '11px' }}>
                                            {t('risk.k_score')}: <strong>{(editingRisk.kScore ?? editingRisk.consequence)} – {CONSEQUENCE_LABELS[lang]?.[editingRisk.kScore ?? editingRisk.consequence]}</strong>
                                        </label>
                                        <input id="edit-risk-k" type="range" min={1} max={5} step={1} value={editingRisk.kScore ?? editingRisk.consequence}
                                            onChange={e => {
                                                const val = parseInt(e.target.value) as Consequence;
                                                const i = editingRisk.iScore ?? editingRisk.consequence;
                                                const tr = editingRisk.tScore ?? editingRisk.consequence;
                                                const a = editingRisk.aScore ?? editingRisk.consequence;
                                                const newC = Math.max(val, i, tr, a) as Consequence;
                                                setEditingRisk({ ...editingRisk, kScore: val, consequence: newC });
                                            }}
                                            style={{ width: '100%', accentColor: 'var(--accent-teal)' }} />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-risk-i" className="risk-label" style={{ fontSize: '11px' }}>
                                            {t('risk.i_score')}: <strong>{(editingRisk.iScore ?? editingRisk.consequence)} – {CONSEQUENCE_LABELS[lang]?.[editingRisk.iScore ?? editingRisk.consequence]}</strong>
                                        </label>
                                        <input id="edit-risk-i" type="range" min={1} max={5} step={1} value={editingRisk.iScore ?? editingRisk.consequence}
                                            onChange={e => {
                                                const val = parseInt(e.target.value) as Consequence;
                                                const k = editingRisk.kScore ?? editingRisk.consequence;
                                                const tr = editingRisk.tScore ?? editingRisk.consequence;
                                                const a = editingRisk.aScore ?? editingRisk.consequence;
                                                const newC = Math.max(k, val, tr, a) as Consequence;
                                                setEditingRisk({ ...editingRisk, iScore: val, consequence: newC });
                                            }}
                                            style={{ width: '100%', accentColor: 'var(--accent-teal)' }} />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-risk-t" className="risk-label" style={{ fontSize: '11px' }}>
                                            {t('risk.t_score')}: <strong>{(editingRisk.tScore ?? editingRisk.consequence)} – {CONSEQUENCE_LABELS[lang]?.[editingRisk.tScore ?? editingRisk.consequence]}</strong>
                                        </label>
                                        <input id="edit-risk-t" type="range" min={1} max={5} step={1} value={editingRisk.tScore ?? editingRisk.consequence}
                                            onChange={e => {
                                                const val = parseInt(e.target.value) as Consequence;
                                                const k = editingRisk.kScore ?? editingRisk.consequence;
                                                const i = editingRisk.iScore ?? editingRisk.consequence;
                                                const a = editingRisk.aScore ?? editingRisk.consequence;
                                                const newC = Math.max(k, i, val, a) as Consequence;
                                                setEditingRisk({ ...editingRisk, tScore: val, consequence: newC });
                                            }}
                                            style={{ width: '100%', accentColor: 'var(--accent-teal)' }} />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-risk-a" className="risk-label" style={{ fontSize: '11px' }}>
                                            {t('risk.a_score')}: <strong>{(editingRisk.aScore ?? editingRisk.consequence)} – {CONSEQUENCE_LABELS[lang]?.[editingRisk.aScore ?? editingRisk.consequence]}</strong>
                                        </label>
                                        <input id="edit-risk-a" type="range" min={1} max={5} step={1} value={editingRisk.aScore ?? editingRisk.consequence}
                                            onChange={e => {
                                                const val = parseInt(e.target.value) as Consequence;
                                                const k = editingRisk.kScore ?? editingRisk.consequence;
                                                const i = editingRisk.iScore ?? editingRisk.consequence;
                                                const tr = editingRisk.tScore ?? editingRisk.consequence;
                                                const newC = Math.max(k, i, tr, val) as Consequence;
                                                setEditingRisk({ ...editingRisk, aScore: val, consequence: newC });
                                            }}
                                            style={{ width: '100%', accentColor: 'var(--accent-teal)' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                        Beregnet konsekvens: <strong>{editingRisk.consequence} ({CONSEQUENCE_LABELS[lang]?.[editingRisk.consequence]})</strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{t('risk.total_score')}:</span>
                                        <span className="status-badge" style={{
                                            background: getRiskBgColor(editingRisk.likelihood, editingRisk.consequence),
                                            color: getRiskColor(editingRisk.likelihood, editingRisk.consequence),
                                            borderColor: 'transparent',
                                            fontWeight: 700,
                                        }}>
                                            {editingRisk.likelihood} × {editingRisk.consequence} = {editingRisk.likelihood * editingRisk.consequence} ({getRiskLevel(editingRisk.likelihood, editingRisk.consequence).toUpperCase()})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="edit-risk-exist-ctrls" className="risk-label">{t('risk.existing_controls_label')}</label>
                                <textarea id="edit-risk-exist-ctrls" className="risk-input" rows={2} value={editingRisk.existingControls}
                                    onChange={e => setEditingRisk({ ...editingRisk, existingControls: e.target.value })} />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor="edit-risk-plan-ctrls" className="risk-label">{t('risk.planned_controls_label')}</label>
                                <textarea id="edit-risk-plan-ctrls" className="risk-input" rows={2} value={editingRisk.plannedControls}
                                    onChange={e => setEditingRisk({ ...editingRisk, plannedControls: e.target.value })} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                            <button className="risk-btn" onClick={() => setEditingRisk(null)}>
                                {t('risk.cancel')}
                            </button>
                            <button className="risk-btn risk-btn-primary" onClick={() => {
                                if (!editingRisk.title.trim() || !editingRisk.categoryId) return;
                                if (editingRisk.id) {
                                    // Update
                                    updateRisk(activeProject.id, editingRisk.categoryId, editingRisk.id, editingRisk);
                                } else {
                                    // Create
                                    const { id: _id, categoryId, ...rest } = editingRisk;
                                    addRisk(activeProject.id, categoryId!, rest);
                                }
                                setEditingRisk(null);
                            }}>
                                <Check size={14} /> {editingRisk.id ? t('risk.save') : t('risk.create')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Add/Edit Project Modal ─── */}
            {editingProject && (
                <div className="risk-modal-overlay" onClick={() => setEditingProject(null)}>
                    <div className="risk-modal card" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>
                                Rediger risikoprosjekt
                            </h3>
                            <button className="risk-btn-icon" onClick={() => setEditingProject(null)}><X size={16} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <label htmlFor="edit-proj-name" className="risk-label">Prosjektnavn</label>
                                <input id="edit-proj-name" className="risk-input" value={editingProject.name}
                                    onChange={e => setEditingProject({ ...editingProject, name: e.target.value })}
                                    style={{ width: '100%' }} />
                            </div>
                            <div>
                                <label htmlFor="edit-proj-desc" className="risk-label">Beskrivelse</label>
                                <textarea id="edit-proj-desc" className="risk-input" rows={3} value={editingProject.description}
                                    onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                                    style={{ width: '100%' }} />
                            </div>
                            
                            {state.systems && state.systems.length > 0 && (
                                <div>
                                    <label htmlFor="edit-proj-system" className="risk-label">Tilknyttet IT-system</label>
                                    <select id="edit-proj-system" className="risk-input" value={editingProject.systemId || ''}
                                        onChange={e => setEditingProject({ ...editingProject, systemId: e.target.value || undefined })}
                                        style={{ width: '100%' }}>
                                        <option value="">Ingen (Generelt prosjekt)</option>
                                        {state.systems.map(sys => (
                                            <option key={sys.id} value={sys.id}>{sys.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                            <button className="risk-btn" onClick={() => setEditingProject(null)}>
                                Avbryt
                            </button>
                            <button className="risk-btn risk-btn-primary" onClick={() => {
                                if (editingProject.name.trim()) {
                                    updateProject(editingProject.id, {
                                        name: editingProject.name.trim(),
                                        description: editingProject.description.trim(),
                                        systemId: editingProject.systemId,
                                    });
                                    setEditingProject(null);
                                }
                            }}>
                                <Check size={14} /> Lagre
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Risk Bank Modal ─── */}
            {showBankModal && (() => {
                const activeBank = riskBanks.find(b => b.id === activeBankId);
                const existingTitles = new Set(allRisks.map(r => r.title));
                const availableEntries = activeBank?.entries.filter(e => !existingTitles.has(e.title)) || [];
                const getBankName = (bank: RiskBank) => bank.name;
                const getBankDesc = (bank: RiskBank) => bank.description;

                return (
                    <div className="risk-modal-overlay" onClick={() => setShowBankModal(false)}>
                        <div className="risk-modal card" style={{ width: 'min(800px, 92vw)', maxHeight: '85vh' }} onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{t('risk.bank_browse')}</h3>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{t('risk.bank_subtitle')}</p>
                                </div>
                                <button className="risk-btn-icon" onClick={() => setShowBankModal(false)}><X size={16} /></button>
                            </div>

                            {/* Bank tabs */}
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                {riskBanks.map(bank => (
                                    <button key={bank.id}
                                        className={`risk-btn ${activeBankId === bank.id ? 'risk-btn-active' : ''}`}
                                        onClick={() => { setActiveBankId(bank.id); setSelectedBankEntries(new Set()); }}
                                        style={{ fontSize: '12px' }}>
                                        {getBankName(bank)} ({bank.entries.length})
                                    </button>
                                ))}
                            </div>

                            {activeBank && (
                                <>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                                        {getBankDesc(activeBank)}
                                    </p>

                                    {/* Target category + select all */}
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <label className="risk-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>{t('risk.bank_target_category')}</label>
                                            <select className="risk-input" style={{ width: 'auto', fontSize: '12px', padding: '4px 8px' }}
                                                value={bankTargetCategory}
                                                onChange={e => setBankTargetCategory(e.target.value)}>
                                                {enabledCategories.filter(c => c.id !== activeProject.categories.find(cat => cat.name.startsWith('NSM'))?.id).map(c => (
                                                    <option key={c.id} value={c.id}>{getCatName(c)}</option>
                                                ))}
                                                {enabledCategories.length === 0 && <option value="">(Ingen kategorier)</option>}
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="risk-btn" style={{ fontSize: '11px' }}
                                                onClick={() => setSelectedBankEntries(new Set(availableEntries.map(e => e.id)))}>
                                                {t('risk.bank_select_all')}
                                            </button>
                                            <button className="risk-btn" style={{ fontSize: '11px' }}
                                                onClick={() => setSelectedBankEntries(new Set())}>
                                                {t('risk.bank_deselect_all')}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Entry list */}
                                    <div style={{ maxHeight: '40vh', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                        {availableEntries.length === 0 ? (
                                            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                                                {t('risk.bank_empty')}
                                            </div>
                                        ) : (
                                            availableEntries.map(entry => {
                                                const isSelected = selectedBankEntries.has(entry.id);
                                                return (
                                                    <div key={entry.id}
                                                        style={{
                                                            display: 'flex',
                                                            gap: '12px',
                                                            padding: '12px 14px',
                                                            alignItems: 'flex-start',
                                                            borderBottom: '1px solid var(--border)',
                                                            cursor: 'pointer',
                                                            background: isSelected ? 'var(--hover-overlay)' : 'transparent',
                                                            transition: 'background 0.1s ease',
                                                        }}
                                                        onClick={() => {
                                                            const next = new Set(selectedBankEntries);
                                                            if (isSelected) next.delete(entry.id); else next.add(entry.id);
                                                            setSelectedBankEntries(next);
                                                        }}>
                                                        <div style={{ paddingRight: '4px', marginTop: '2px' }}>
                                                            <div className={`checkbox ${isSelected ? 'checked' : ''}`}
                                                                style={{
                                                                    width: '16px', height: '16px', border: '1.5px solid var(--text-muted)',
                                                                    borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    background: isSelected ? 'var(--accent-teal)' : 'transparent',
                                                                    borderColor: isSelected ? 'var(--accent-teal)' : 'var(--text-muted)'
                                                                }}>
                                                                {isSelected && <Check size={10} color="#fff" strokeWidth={3} />}
                                                            </div>
                                                        </div>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontWeight: 500, fontSize: '13px', marginBottom: '2px', color: 'var(--text-primary)' }}>{entry.title}</div>
                                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{entry.description}</div>
                                                            <div style={{ display: 'flex', gap: '10px', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)', flexWrap: 'wrap', alignItems: 'center' }}>
                                                                <span>
                                                                    Risikoscore: <span className="status-badge" style={{ background: getRiskBgColor(entry.likelihood, entry.consequence), color: getRiskColor(entry.likelihood, entry.consequence), padding: '1px 6px', fontSize: '10px', borderColor: 'transparent', fontWeight: 600 }}>
                                                                        {entry.likelihood} × {entry.consequence} = {entry.likelihood * entry.consequence} ({getRiskLevel(entry.likelihood, entry.consequence).toUpperCase()})
                                                                    </span>
                                                                </span>
                                                                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                                    KITA: K:{entry.kScore ?? entry.consequence} I:{entry.iScore ?? entry.consequence} T:{entry.tScore ?? entry.consequence} A:{entry.aScore ?? entry.consequence}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>

                                    {/* Import button */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                                        <span style={{ flex: 1, fontSize: '12px', color: 'var(--text-muted)', alignSelf: 'center' }}>
                                            {selectedBankEntries.size} {t('risk.bank_selected')}
                                        </span>
                                        <button className="risk-btn" onClick={() => setShowBankModal(false)}>
                                            {t('risk.cancel')}
                                        </button>
                                        <button className="risk-btn risk-btn-primary"
                                            disabled={selectedBankEntries.size === 0 || !bankTargetCategory}
                                            style={{ opacity: selectedBankEntries.size === 0 ? 0.5 : 1 }}
                                            onClick={() => {
                                                if (selectedBankEntries.size === 0 || !bankTargetCategory) return;
                                                const toImport = availableEntries.filter(e => selectedBankEntries.has(e.id));
                                                addRisksFromBank(activeProject.id, bankTargetCategory, toImport);
                                                setShowBankModal(false);
                                                setSelectedBankEntries(new Set());
                                            }}>
                                            <Check size={14} /> {t('risk.bank_import_selected')} ({selectedBankEntries.size})
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
