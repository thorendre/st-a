import { useState, useMemo } from 'react';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { RegulationControl, ImplementationStatus } from '../types';
import { useLang, Lang } from '../hooks/useLang';
import { statusTranslations } from '../data/translations';
import { ChevronDown, ChevronRight, Check, Search, Filter, ShieldCheck } from 'lucide-react';

const statusClass: Record<ImplementationStatus, string> = {
    'Not Started': 'status-not-started',
    'Planning': 'status-planning',
    'In Progress': 'status-in-progress',
    'Implemented': 'status-implemented',
    'Not Applicable': 'status-not-applicable',
};

const allStatuses: ImplementationStatus[] = ['Not Started', 'Planning', 'In Progress', 'Implemented', 'Not Applicable'];

// Consistent domain color palette for any regulation
const domainColors = [
    'var(--accent-primary)', 'var(--accent-teal)', 'var(--accent-burgundy)', 'var(--accent-gold)',
    '#4f46e5', '#8b5cf6', '#0d9488', '#ea580c', '#16a34a', '#dc2626'
];

interface RegulationPageProps {
    controls: RegulationControl[];
    domains: readonly string[];
    domainTranslations: Record<string, Record<Lang, string>>;
    regulationLabel: string; // e.g. "DORA", "NIS2"
}

export const RegulationPage = ({ controls, domains, domainTranslations: domTrans, regulationLabel: _label }: RegulationPageProps) => {
    const { state, updateAssessment, toggleStep } = useAssessmentStore();
    const { lang, t } = useLang();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDomain, setFilterDomain] = useState<string>('All');
    const [filterStatus, setFilterStatus] = useState<string>('All');

    // Build domain color map
    const domainColorMap = useMemo(() => {
        const map: Record<string, string> = {};
        domains.forEach((d, i) => { map[d] = domainColors[i % domainColors.length]; });
        return map;
    }, [domains]);

    const filteredControls = useMemo(() => {
        return controls.filter(c => {
            const displayTitle = c.titleNo || c.title;
            const matchSearch = searchQuery === '' ||
                displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchDomain = filterDomain === 'All' || c.domain === filterDomain;
            const s = state.assessments[c.id]?.status || 'Not Started';
            const matchStatus = filterStatus === 'All' || s === filterStatus;
            return matchSearch && matchDomain && matchStatus;
        });
    }, [searchQuery, filterDomain, filterStatus, state.assessments, controls, lang]);

    const totalControls = controls.length;
    const implementedCount = controls.filter(c => {
        const s = state.assessments[c.id]?.status;
        return s === 'Implemented' || s === 'Not Applicable';
    }).length;
    const inProgressCount = controls.filter(c => {
        const s = state.assessments[c.id]?.status;
        return s === 'In Progress' || s === 'Planning';
    }).length;

    return (
        <div className="animate-fade" style={{ width: '100%' }}>
            {/* Stats bar */}
            <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>{implementedCount}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>/ {totalControls} {t('ctrl.implemented')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent-teal)' }}>{inProgressCount}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t('ctrl.in_progress')}</span>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <div className="progress-bar-track" style={{ maxWidth: '300px' }}>
                        <div className="progress-bar-fill" style={{
                            width: `${totalControls > 0 ? Math.round((implementedCount / totalControls) * 100) : 0}%`,
                            background: 'var(--accent-teal)'
                        }} />
                    </div>
                    <span style={{ marginLeft: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-teal)' }}>
                        {totalControls > 0 ? Math.round((implementedCount / totalControls) * 100) : 0}%
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '320px' }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="text" placeholder={t('ctrl.search')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px 12px 8px 36px', fontSize: '13px', color: 'var(--text-primary)', outline: 'none', fontFamily: 'var(--font-main)' }}
                    />
                </div>
                <select className="status-select" value={filterDomain} onChange={e => setFilterDomain(e.target.value)}>
                    <option value="All">{t('ctrl.all_domains')}</option>
                    {domains.map(d => <option key={d} value={d}>{domTrans[d]?.[lang] || d}</option>)}
                </select>
                <select className="status-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="All">{t('ctrl.all_statuses')}</option>
                    {allStatuses.map(s => <option key={s} value={s}>{statusTranslations[s]?.[lang] || s}</option>)}
                </select>
            </div>

            {/* Table */}
            <div className="card table-responsive">
                <table className="controls-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40px' }}></th>
                            <th style={{ width: '100px' }}>ID</th>
                            <th>{t('ctrl.requirement')}</th>
                            <th style={{ width: '180px' }}>{t('ctrl.domain')}</th>
                            <th style={{ width: '140px' }}>{t('ctrl.status')}</th>
                            <th style={{ width: '100px', textAlign: 'center' }}>{t('ctrl.guide')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredControls.map(control => {
                            const isExpanded = expandedId === control.id;
                            const assessment = state.assessments[control.id];
                            const status: ImplementationStatus = assessment?.status || 'Not Started';
                            const rawSteps = assessment?.completedSteps || [];
                            // Guard against stale steps: only count IDs that still exist in guidance
                            const validStepIds = new Set(control.guidance.map(g => g.id));
                            const completedSteps = rawSteps.filter(s => validStepIds.has(s));
                            const guideDone = completedSteps.length;
                            const guideTotal = control.guidance.length;
                            const domainLabel = domTrans[control.domain]?.[lang] || control.domain;
                            const domColor = domainColorMap[control.domain] || 'var(--text-muted)';

                            return (
                                <RegRow key={control.id}
                                    control={control} status={status} isExpanded={isExpanded}
                                    domainLabel={domainLabel} domColor={domColor}
                                    guideDone={guideDone} guideTotal={guideTotal} completedSteps={completedSteps}
                                    notes={assessment?.notes || ''}
                                    onToggle={() => setExpandedId(prev => prev === control.id ? null : control.id)}
                                    onStatusChange={(s) => updateAssessment(control.id, s, assessment?.notes || '')}
                                    onNotesChange={(n) => updateAssessment(control.id, status, n)}
                                    onToggleStep={(stepId) => toggleStep(control.id, stepId, control.guidance.length)}
                                    lang={lang} t={t}
                                />
                            );
                        })}
                    </tbody>
                </table>

                {filteredControls.length === 0 && (
                    <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Filter size={24} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                        <p>{t('ctrl.no_match')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

interface RowProps {
    control: RegulationControl;
    status: ImplementationStatus; isExpanded: boolean;
    domainLabel: string; domColor: string;
    guideDone: number; guideTotal: number;
    completedSteps: string[]; notes: string;
    onToggle: () => void; onStatusChange: (s: ImplementationStatus) => void;
    onNotesChange: (n: string) => void; onToggleStep: (stepId: string) => void;
    lang: Lang; t: (key: string) => string;
}

const RegRow = ({ control, status, isExpanded, domainLabel, domColor, guideDone, guideTotal, completedSteps, notes, onToggle, onStatusChange, onNotesChange, onToggleStep, lang, t }: RowProps) => (
    <>
        <tr onClick={onToggle} className={isExpanded ? 'expanded' : ''}>
            <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </td>
            <td><span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)' }}>{control.id}</span></td>
            <td><span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{control.titleNo || control.title}</span></td>
            <td><span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', border: `1px solid ${domColor}33`, background: `${domColor}11`, color: domColor }}>{domainLabel}</span></td>
            <td><span className={`status-badge ${statusClass[status]}`}>{statusTranslations[status]?.[lang] || status}</span></td>
            <td style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: guideDone === guideTotal && guideTotal > 0 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                    {guideDone}/{guideTotal}
                </span>
            </td>
        </tr>
        {isExpanded && (
            <tr>
                <td colSpan={6} style={{ padding: 0, background: 'var(--bg-expanded)' }}>
                    <div className="animate-fade" style={{ padding: '24px 32px' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.7, maxWidth: '800px' }}>{control.descriptionNo || control.description}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            {/* Left: Status */}
                            <div>
                                <label style={labelStyle}>{t('ctrl.impl_status')}</label>
                                <select className="status-select" value={status} onClick={e => e.stopPropagation()}
                                    onChange={e => { e.stopPropagation(); onStatusChange(e.target.value as ImplementationStatus); }}
                                    style={{ width: '100%', marginBottom: '20px' }}>
                                    {allStatuses.map(s => <option key={s} value={s}>{statusTranslations[s]?.[lang] || s}</option>)}
                                </select>
                                <label style={labelStyle}>{t('ctrl.notes')}</label>
                                <textarea value={notes} onClick={e => e.stopPropagation()}
                                    onChange={e => { e.stopPropagation(); onNotesChange(e.target.value); }}
                                    placeholder={t('ctrl.notes_placeholder')}
                                    className="risk-input"
                                    style={{ width: '100%', minHeight: '120px', resize: 'vertical', lineHeight: 1.5 }}
                                />
                            </div>
                            {/* Right: Guidance */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <label style={labelStyle}>{t('ctrl.impl_steps')}</label>
                                    <span style={{ fontSize: '12px', fontWeight: 600, color: guideDone === guideTotal ? 'var(--accent-green)' : 'var(--accent-teal)' }}>
                                        {guideDone}/{guideTotal} {t('ctrl.done')}
                                    </span>
                                </div>
                                <div className="progress-bar-track" style={{ marginBottom: '12px' }}>
                                    <div className="progress-bar-fill" style={{
                                        width: guideTotal > 0 ? `${Math.round((guideDone / guideTotal) * 100)}%` : '0%',
                                        background: guideDone === guideTotal && guideTotal > 0 ? 'var(--accent-green)' : 'var(--accent-teal)'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    {control.guidance.map(step => {
                                        const done = completedSteps.includes(step.id);
                                        return (
                                            <div key={step.id} className={`guidance-step ${done ? 'completed' : ''}`} onClick={e => { e.stopPropagation(); onToggleStep(step.id); }}>
                                                <div className={`checkbox ${done ? 'checked' : ''}`}>{done && <Check size={11} strokeWidth={3} color="white" />}</div>
                                                <div>
                                                    <div style={{ fontSize: '13px', fontWeight: 500, color: done ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: done ? 'line-through' : 'none' }}>{step.title}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{step.description}</div>
                                                    {step.auditEvidence && (
                                                        <div style={{ fontSize: '11px', color: 'var(--accent-teal)', marginTop: '4px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <ShieldCheck size={12} style={{ flexShrink: 0 }} />
                                                            <span><span style={{ fontWeight: 600 }}>Revisjonsbevis:</span> {step.auditEvidence}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )}
    </>
);

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px'
};
