import { useMemo } from 'react';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { iso27001Controls, isoDomains } from '../data/iso27001';
import { doraControls } from '../data/dora';
import { nis2Controls } from '../data/nis2';
import { nsmControls } from '../data/nsm';
import { ismsDocuments } from '../data/ismsDocuments';
import { useLang } from '../hooks/useLang';
import { domainTranslations, getControlTranslation } from '../data/translations';
import { Download, Upload, RotateCcw, ArrowRight } from 'lucide-react';

const domainColors: Record<string, string> = {
    'Organizational controls': 'var(--domain-org-color)',
    'People controls': 'var(--domain-people-color)',
    'Physical controls': 'var(--accent-gold)',
    'Technological controls': 'var(--domain-tech-color)',
};

function computeRegStats(controls: { id: string; guidance: { id: string }[] }[], assessments: Record<string, any>, guidanceCountFn?: (c: { id: string; guidance: { id: string }[] }) => number) {
    const total = controls.length;
    const implemented = controls.filter(c => assessments[c.id]?.status === 'Implemented').length;
    const notApplicable = controls.filter(c => assessments[c.id]?.status === 'Not Applicable').length;
    const inProgress = controls.filter(c => assessments[c.id]?.status === 'In Progress').length;
    const planning = controls.filter(c => assessments[c.id]?.status === 'Planning').length;
    const notStarted = total - implemented - notApplicable - inProgress - planning;
    const pct = total > 0 ? Math.round(((implemented + notApplicable) / total) * 100) : 0;
    let guideTotal = 0, guideDone = 0;
    controls.forEach(c => {
        const count = guidanceCountFn ? guidanceCountFn(c) : c.guidance.length;
        guideTotal += count;
        // Cap completedSteps to count to prevent exceeding total
        const done = assessments[c.id]?.completedSteps?.length || 0;
        guideDone += Math.min(done, count);
    });
    return { total, implemented, notApplicable, inProgress, planning, notStarted, pct, guideTotal, guideDone };
}

export const Dashboard = ({ onNavigateToControls }: { onNavigateToControls?: () => void }) => {
    const { state, exportData, importData, resetData } = useAssessmentStore();
    const { lang, t } = useLang();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) importData(e.target.files[0]);
    };

    const isoGuidanceCount = (c: { id: string; guidance: { id: string }[] }) => {
        const tr = getControlTranslation(c.id, lang);
        return tr ? tr.guidance.length : c.guidance.length;
    };
    const isoStats = useMemo(() => computeRegStats(iso27001Controls, state.assessments, isoGuidanceCount), [state.assessments, lang]);
    const nsmStats = useMemo(() => computeRegStats(nsmControls, state.assessments), [state.assessments]);
    const doraStats = useMemo(() => computeRegStats(doraControls, state.assessments), [state.assessments]);
    const nis2Stats = useMemo(() => computeRegStats(nis2Controls, state.assessments), [state.assessments]);

    const domainStats = useMemo(() => isoDomains.map(domain => {
        const controls = iso27001Controls.filter(c => c.domain === domain);
        const done = controls.filter(c => { const s = state.assessments[c.id]?.status; return s === 'Implemented' || s === 'Not Applicable'; }).length;
        return { domain, total: controls.length, done };
    }), [state.assessments]);

    const docStats = useMemo(() => {
        let docTotal = 0, docFilled = 0;
        ismsDocuments.forEach(doc => { doc.sections.forEach(s => { s.fields.forEach(f => { docTotal++; if (state.documentAnswers?.[f.id]?.trim()) docFilled++; }); }); });
        return { docTotal, docFilled, pct: docTotal > 0 ? Math.round((docFilled / docTotal) * 100) : 0 };
    }, [state.documentAnswers]);

    const statusPieData = (s: ReturnType<typeof computeRegStats>) => [
        { label: t('status.implemented'), value: s.implemented, color: 'var(--accent-green)' },
        { label: t('status.in_progress'), value: s.inProgress, color: 'var(--accent-gold)' },
        { label: t('status.planning'), value: s.planning, color: 'var(--accent-teal)' },
        { label: t('status.not_applicable'), value: s.notApplicable, color: 'var(--text-muted)' },
        { label: t('status.not_started'), value: s.notStarted, color: 'var(--progress-track)' },
    ];

    return (
        <div className="animate-fade" style={{ width: '100%' }}>
            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <button onClick={exportData} style={actionBtnStyle}><Download size={14} /> {t('dash.export')}</button>
                <label style={{ ...actionBtnStyle, cursor: 'pointer' }}><Upload size={14} /> {t('dash.import')}<input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} /></label>
                <button onClick={resetData} style={{ ...actionBtnStyle, borderColor: 'rgba(239,68,68,0.3)', color: 'var(--accent-red)' }}><RotateCcw size={14} /> {t('dash.reset')}</button>
            </div>

            {/* Regulation overview row */}
            <div className="dashboard-reg-grid">
                <RegCard label="ISO 27001" stats={isoStats} data={statusPieData(isoStats)} color="var(--accent-primary)" />
                <RegCard label="NSM Grunnprinsipper" stats={nsmStats} data={statusPieData(nsmStats)} color="#0d9488" />
                <RegCard label="DORA" stats={doraStats} data={statusPieData(doraStats)} color="var(--accent-teal)" />
                <RegCard label="NIS2" stats={nis2Stats} data={statusPieData(nis2Stats)} color="var(--accent-burgundy)" />
            </div>

            {/* Bottom row: ISMS docs + guidance steps */}
            <div className="dashboard-two-col-grid">
                {/* ISMS Documents summary */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={sectionLabel}>{t('nav.documents')}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                        <PieChart
                            data={[
                                { label: 'Utfylt', value: docStats.docFilled, color: 'var(--accent-teal)' },
                                { label: 'Gjenstår', value: docStats.docTotal - docStats.docFilled, color: 'var(--progress-track)' },
                            ]}
                            size={120}
                            centerLabel={`${docStats.pct}%`}
                        />
                        <div>
                            <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent-teal)' }}>{docStats.docFilled}</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>/ {docStats.docTotal} {t('dash.fields_filled')}</div>
                        </div>
                    </div>
                </div>

                {/* Combined guidance steps */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={sectionLabel}>{t('dash.impl_steps_total')}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <GuidanceBar label="ISO 27001" done={isoStats.guideDone} total={isoStats.guideTotal} color="var(--accent-primary)" />
                        <GuidanceBar label="NSM Grunnprinsipper" done={nsmStats.guideDone} total={nsmStats.guideTotal} color="#0d9488" />
                        <GuidanceBar label="DORA" done={doraStats.guideDone} total={doraStats.guideTotal} color="var(--accent-teal)" />
                        <GuidanceBar label="NIS2" done={nis2Stats.guideDone} total={nis2Stats.guideTotal} color="var(--accent-burgundy)" />
                    </div>
                </div>
            </div>

            {/* Domain breakdown */}
            <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ ...sectionLabel, marginBottom: '20px' }}>{t('dash.domain_breakdown')}</h3>
                <div className="dashboard-two-col-grid" style={{ marginBottom: 0 }}>
                    {domainStats.map(d => {
                        const p = d.total > 0 ? Math.round((d.done / d.total) * 100) : 0;
                        const color = domainColors[d.domain] || 'var(--text-muted)';
                        return (
                            <div key={d.domain} style={{ padding: '16px', background: 'var(--card-inner-bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>{domainTranslations[d.domain]?.[lang] || d.domain}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color }}>{p}%</span>
                                </div>
                                <div className="progress-bar-track" style={{ marginBottom: '6px' }}>
                                    <div className="progress-bar-fill" style={{ width: `${p}%`, background: color }} />
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.done}/{d.total} {t('dash.controls')}</div>
                            </div>
                        );
                    })}
                </div>

                {onNavigateToControls && (
                    <button onClick={onNavigateToControls} style={{
                        marginTop: '20px', width: '100%', padding: '10px', background: 'var(--hover-overlay)',
                        border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)',
                        fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-main)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-muted)';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    }}>
                        {t('dash.go_controls')} <ArrowRight size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

// ─── Regulation Summary Card ───
const RegCard = ({ label, stats, data, color }: {
    label: string; stats: ReturnType<typeof computeRegStats>;
    data: { label: string; value: number; color: string }[];
    color: string;
}) => (
    <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ ...sectionLabel, color }}>{label}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <PieChart data={data} size={120} centerLabel={`${stats.pct}%`} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                {data.filter(d => d.value > 0).map(d => (
                    <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: d.color, flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', flex: 1 }}>{d.label}</span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{d.value}</span>
                    </div>
                ))}
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {stats.implemented + stats.notApplicable}/{stats.total} fullført
                </div>
            </div>
        </div>
    </div>
);

// ─── Guidance Progress Bar ───
const GuidanceBar = ({ label, done, total, color }: { label: string; done: number; total: number; color: string }) => {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color }}>{done}/{total} ({pct}%)</span>
            </div>
            <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
        </div>
    );
};

// ─── Pie Chart Component ───
const PieChart = ({ data, size, centerLabel }: { data: { label: string; value: number; color: string }[]; size: number; centerLabel: string }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    if (total === 0) {
        return (
            <div className="pie-chart-container">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <circle cx={size / 2} cy={size / 2} r={size / 2 - 12} fill="none" stroke="var(--border)" strokeWidth="20" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="700">0%</text>
                </svg>
            </div>
        );
    }

    const radius = size / 2 - 12;
    const cx = size / 2, cy = size / 2;
    let cumulativeAngle = -90;

    const arcs = data.filter(d => d.value > 0).map(d => {
        const angle = (d.value / total) * 360;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + angle;
        cumulativeAngle = endAngle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const x1 = cx + radius * Math.cos(startRad);
        const y1 = cy + radius * Math.sin(startRad);
        const x2 = cx + radius * Math.cos(endRad);
        const y2 = cy + radius * Math.sin(endRad);
        const largeArc = angle > 180 ? 1 : 0;

        if (angle >= 359.99) {
            return `M ${cx + radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy}`;
        }
        return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    });

    return (
        <div className="pie-chart-container">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={cx} cy={cy} r={radius} fill="var(--bg-tertiary)" />
                {arcs.map((path, i) => (
                    <path key={i} d={path} fill={data.filter(d => d.value > 0)[i].color} opacity="0.95" />
                ))}
                <circle cx={cx} cy={cy} r={radius * 0.65} fill="var(--bg-secondary)" />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="700">{centerLabel}</text>
            </svg>
        </div>
    );
};

const sectionLabel: React.CSSProperties = {
    fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
    color: 'var(--text-muted)', marginBottom: '16px'
};

const actionBtnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--bg-secondary)',
    border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-secondary)',
    fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-main)',
    transition: 'all 0.15s ease',
};
