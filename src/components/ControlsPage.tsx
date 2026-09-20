import { useState, useMemo } from 'react';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { iso27001Controls, isoDomains } from '../data/iso27001';
import { ImplementationStatus, GuidanceStep } from '../types';
import { useLang } from '../hooks/useLang';
import { getControlTranslation, domainShortTranslations, statusTranslations, domainTranslations } from '../data/translations';
import { ChevronDown, ChevronRight, Check, Search, Filter, ShieldCheck } from 'lucide-react';

const domainClass: Record<string, string> = {
    'Organizational controls': 'domain-organizational',
    'People controls': 'domain-people',
    'Physical controls': 'domain-physical',
    'Technological controls': 'domain-technological',
};

const statusClass: Record<ImplementationStatus, string> = {
    'Not Started': 'status-not-started',
    'Planning': 'status-planning',
    'In Progress': 'status-in-progress',
    'Implemented': 'status-implemented',
    'Not Applicable': 'status-not-applicable',
};

const allStatuses: ImplementationStatus[] = ['Not Started', 'Planning', 'In Progress', 'Implemented', 'Not Applicable'];

export const ControlsPage = () => {
    const { state, updateAssessment, toggleStep } = useAssessmentStore();
    const { lang, t } = useLang();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDomain, setFilterDomain] = useState<string>('All');
    const [filterStatus, setFilterStatus] = useState<string>('All');

    const filteredControls = useMemo(() => {
        return iso27001Controls.filter(c => {
            const tr = getControlTranslation(c.id, lang);
            const title = tr?.title || c.title;
            const matchSearch = searchQuery === '' ||
                title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchDomain = filterDomain === 'All' || c.domain === filterDomain;
            const s = state.assessments[c.id]?.status || 'Not Started';
            const matchStatus = filterStatus === 'All' || s === filterStatus;
            return matchSearch && matchDomain && matchStatus;
        });
    }, [searchQuery, filterDomain, filterStatus, state.assessments, lang]);

    const totalControls = iso27001Controls.length;
    const implementedCount = iso27001Controls.filter(c => {
        const s = state.assessments[c.id]?.status;
        return s === 'Implemented' || s === 'Not Applicable';
    }).length;
    const inProgressCount = iso27001Controls.filter(c => {
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
                            width: `${Math.round((implementedCount / totalControls) * 100)}%`,
                            background: 'var(--accent-teal)'
                        }} />
                    </div>
                    <span style={{ marginLeft: '12px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-teal)' }}>
                        {Math.round((implementedCount / totalControls) * 100)}%
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
                    {isoDomains.map(d => <option key={d} value={d}>{domainTranslations[d]?.[lang] || d}</option>)}
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
                            <th style={{ width: '80px' }}>ID</th>
                            <th>{t('ctrl.control')}</th>
                            <th style={{ width: '160px' }}>{t('ctrl.domain')}</th>
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
                            const tr = getControlTranslation(control.id, lang);
                            const title = tr?.title || control.title;
                            const description = tr?.description || control.description;
                            const guidance = tr?.guidance || control.guidance;
                            // Use the guidance that will be displayed (translated) for all counts
                            const validStepIds = new Set(guidance.map(g => g.id));
                            const completedSteps = rawSteps.filter(s => validStepIds.has(s));
                            const guideDone = completedSteps.length;
                            const guideTotal = guidance.length;
                            const domainShort = domainShortTranslations[control.domain]?.[lang] || control.domain.replace(' controls', '');

                            return (
                                <ControlRowExpanded
                                    key={control.id}
                                    controlId={control.id} title={title} description={description} domain={control.domain}
                                    domainShort={domainShort} guidance={guidance} status={status} isExpanded={isExpanded}
                                    guideDone={guideDone} guideTotal={guideTotal} completedSteps={completedSteps}
                                    notes={assessment?.notes || ''}
                                    onToggle={() => setExpandedId(prev => prev === control.id ? null : control.id)}
                                    onStatusChange={(s) => updateAssessment(control.id, s, assessment?.notes || '')}
                                    onNotesChange={(n) => updateAssessment(control.id, status, n)}
                                    onToggleStep={(stepId) => toggleStep(control.id, stepId, guidance.length)}
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
    controlId: string; title: string; description: string; domain: string; domainShort: string;
    guidance: GuidanceStep[];
    status: ImplementationStatus; isExpanded: boolean; guideDone: number; guideTotal: number;
    completedSteps: string[]; notes: string;
    onToggle: () => void; onStatusChange: (s: ImplementationStatus) => void;
    onNotesChange: (n: string) => void; onToggleStep: (stepId: string) => void;
    lang: import('../hooks/useLang').Lang; t: (key: string) => string;
}

const ControlRowExpanded = ({ controlId, title, description, domain, domainShort, guidance, status, isExpanded, guideDone, guideTotal, completedSteps, notes, onToggle, onStatusChange, onNotesChange, onToggleStep, lang, t }: RowProps) => (
    <>
        <tr onClick={onToggle} className={isExpanded ? 'expanded' : ''}>
            <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </td>
            <td><span style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)' }}>{controlId}</span></td>
            <td><span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{title}</span></td>
            <td><span className={`domain-tag ${domainClass[domain] || ''}`}>{domainShort}</span></td>
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
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.7, maxWidth: '800px' }}>{description}</p>
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
                                    {guidance.map(step => {
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
