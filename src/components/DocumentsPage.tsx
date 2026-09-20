import { useState, useMemo } from 'react';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { ismsDocuments } from '../data/ismsDocuments';
import { getTranslatedDoc } from '../data/ismsTranslations';
import { useLang } from '../hooks/useLang';
import { ChevronRight, FileText, CheckCircle, Circle, Download } from 'lucide-react';

export const DocumentsPage = () => {
    const { state, updateDocField } = useAssessmentStore();
    const { lang, t } = useLang();
    const [selectedDocId, setSelectedDocId] = useState<string>(ismsDocuments[0]?.id || '');

    // Get translated documents
    const translatedDocs = useMemo(() => {
        return ismsDocuments.map(doc => getTranslatedDoc(doc, lang));
    }, [lang]);

    const selectedDoc = translatedDocs.find(d => d.id === selectedDocId);

    // Calculate completion per document
    const docCompletion = useMemo(() => {
        const map: Record<string, { filled: number; total: number }> = {};
        ismsDocuments.forEach(doc => {
            let total = 0;
            let filled = 0;
            doc.sections.forEach(s => {
                s.fields.forEach(f => {
                    total++;
                    if (state.documentAnswers?.[f.id]?.trim()) filled++;
                });
            });
            map[doc.id] = { filled, total };
        });
        return map;
    }, [state.documentAnswers]);

    const overallFilled = Object.values(docCompletion).reduce((a, b) => a + b.filled, 0);
    const overallTotal = Object.values(docCompletion).reduce((a, b) => a + b.total, 0);
    const overallPct = overallTotal > 0 ? Math.round((overallFilled / overallTotal) * 100) : 0;

    const exportDocument = (doc: typeof translatedDocs[0]) => {
        let text = `# ${doc.title}\n`;
        text += `ISO 27001 ${t('docs.clause')}: ${doc.clause}\n`;
        text += `${state.companyName}\n`;
        text += `${new Date().toLocaleDateString('nb-NO')}\n\n`;
        text += `${doc.description}\n\n`;

        doc.sections.forEach(section => {
            text += `## ${section.title}\n\n`;
            if (section.standardText) text += `${section.standardText}\n\n`;
            section.fields.forEach(field => {
                const val = state.documentAnswers?.[field.id] || '';
                text += `### ${field.label}\n`;
                text += val ? `${val}\n\n` : `_Ikke utfylt ennå_\n\n`;
            });
        });

        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${doc.id}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportAllDocuments = () => {
        let text = `# ${state.companyName} – ISMS\n`;
        text += `${new Date().toLocaleDateString('nb-NO')}\n`;
        text += `${overallFilled}/${overallTotal} (${overallPct}%)\n\n---\n\n`;

        translatedDocs.forEach(doc => {
            text += `# ${doc.clause} – ${doc.title}\n\n`;
            text += `${doc.description}\n\n`;
            doc.sections.forEach(section => {
                text += `## ${section.title}\n\n`;
                if (section.standardText) text += `${section.standardText}\n\n`;
                section.fields.forEach(field => {
                    const val = state.documentAnswers?.[field.id] || '';
                    text += `### ${field.label}\n`;
                    text += val ? `${val}\n\n` : `_Ikke utfylt ennå_\n\n`;
                });
            });
            text += `---\n\n`;
        });

        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `isms-${state.companyName.replace(/\s+/g, '-').toLowerCase()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="animate-fade docs-container" style={{ width: '100%', display: 'flex', gap: '0', height: 'calc(100vh - 180px)', minHeight: '520px' }}>
            {/* Sidebar */}
            <aside className="card docs-sidebar" style={{
                width: '280px', minWidth: '280px', display: 'flex', flexDirection: 'column',
                borderRadius: '8px 0 0 8px', overflow: 'hidden'
            }}>
                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{t('docs.title')}</h2>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: overallPct === 100 ? 'var(--accent-green)' : 'var(--accent-teal)' }}>
                            {overallPct}%
                        </span>
                    </div>
                    <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{
                            width: `${overallPct}%`,
                            background: overallPct === 100 ? 'var(--accent-green)' : 'var(--accent-teal)'
                        }} />
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                        {overallFilled}/{overallTotal} {t('docs.fields_completed')}
                    </p>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                    {translatedDocs.map(doc => {
                        const comp = docCompletion[doc.id];
                        const isSelected = doc.id === selectedDocId;
                        const isComplete = comp && comp.filled === comp.total && comp.total > 0;

                        return (
                            <button
                                key={doc.id}
                                onClick={() => setSelectedDocId(doc.id)}
                                style={{
                                    width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', border: 'none',
                                    background: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                                    transition: 'background 0.15s',
                                    fontFamily: 'var(--font-main)',
                                    marginBottom: '2px',
                                    color: 'inherit',
                                }}
                                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--hover-overlay)'; }}
                                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                            >
                                {isComplete
                                    ? <CheckCircle size={15} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                                    : <Circle size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                }
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                                        {t('docs.clause')} {doc.clause}
                                    </div>
                                    <div style={{
                                        fontSize: '13px', fontWeight: isSelected ? 600 : 400,
                                        color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                    }}>
                                        {doc.title}
                                    </div>
                                </div>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
                                    {comp ? `${comp.filled}/${comp.total}` : ''}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
                    <button
                        onClick={exportAllDocuments}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            padding: '8px', borderRadius: '6px', border: '1px solid var(--border)',
                            background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: '12px',
                            fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-main)'
                        }}
                    >
                        <Download size={14} /> {t('docs.export_all')}
                    </button>
                </div>
            </aside>

            {/* Main editor */}
            <main className="card docs-content" style={{
                flex: 1, borderRadius: '0 8px 8px 0', borderLeft: 'none',
                overflowY: 'auto', padding: '0'
            }}>
                {selectedDoc ? (
                    <div style={{ padding: 'min(32px, 5vw)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{
                                        fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                                        background: 'rgba(15, 118, 110, 0.08)', border: '1px solid rgba(15, 118, 110, 0.15)',
                                        color: 'var(--accent-teal)', fontFamily: 'monospace'
                                    }}>
                                        {t('docs.clause')} {selectedDoc.clause}
                                    </span>
                                    <CompletionBadge comp={docCompletion[selectedDoc.id]} t={t} />
                                </div>
                                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>{selectedDoc.title}</h2>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px' }}>
                                    {selectedDoc.description}
                                </p>
                            </div>
                            <button
                                onClick={() => exportDocument(selectedDoc)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
                                    borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-main)',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <Download size={13} /> {t('docs.export')}
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {selectedDoc.sections.map(section => (
                                <div key={section.id}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                                        <ChevronRight size={16} style={{ color: 'var(--accent-teal)' }} />
                                        {section.title}
                                    </h3>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', marginLeft: '22px' }}>
                                        {section.description}
                                    </p>

                                    {section.standardText && (
                                        <div style={{
                                            marginLeft: '22px', marginBottom: '16px', padding: '14px 16px',
                                            background: 'var(--bg-tertiary)', borderLeft: '3px solid var(--accent-teal)',
                                            borderRadius: '0 6px 6px 0', fontSize: '13px', color: 'var(--text-secondary)',
                                            lineHeight: 1.7, whiteSpace: 'pre-line'
                                        }}>
                                            <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '6px' }}>
                                                {t('docs.standard_text')}
                                            </div>
                                            {section.standardText}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginLeft: '22px' }}>
                                        {section.fields.map(field => {
                                            const value = state.documentAnswers?.[field.id] || '';
                                            return (
                                                <div key={field.id}>
                                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                                        {field.label}
                                                        {value.trim() && <CheckCircle size={12} style={{ color: 'var(--accent-green)', marginLeft: '6px', verticalAlign: 'middle' }} />}
                                                    </label>
                                                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                                                        {field.helpText}
                                                    </p>
                                                    {field.type === 'textarea' ? (
                                                        <textarea
                                                            value={value}
                                                            onChange={e => updateDocField(field.id, e.target.value)}
                                                            placeholder={field.placeholder}
                                                            className="risk-input"
                                                            style={{
                                                                width: '100%', minHeight: '100px', resize: 'vertical', lineHeight: 1.6,
                                                                border: `1px solid ${value.trim() ? 'rgba(21, 128, 61, 0.3)' : 'var(--border)'}`
                                                            }}
                                                        />
                                                    ) : field.type === 'date' ? (
                                                        <input
                                                            type="date"
                                                            value={value}
                                                            onChange={e => updateDocField(field.id, e.target.value)}
                                                            className="risk-input"
                                                            style={{
                                                                width: 'auto',
                                                                border: `1px solid ${value.trim() ? 'rgba(21, 128, 61, 0.3)' : 'var(--border)'}`,
                                                                colorScheme: 'dark'
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={value}
                                                            onChange={e => updateDocField(field.id, e.target.value)}
                                                            placeholder={field.placeholder}
                                                            className="risk-input"
                                                            style={{
                                                                width: '100%',
                                                                border: `1px solid ${value.trim() ? 'rgba(21, 128, 61, 0.3)' : 'var(--border)'}`
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                        <FileText size={20} style={{ marginRight: '8px' }} /> {t('docs.select')}
                    </div>
                )}
            </main>
        </div>
    );
};

const CompletionBadge = ({ comp, t }: { comp: { filled: number; total: number } | undefined; t: (key: string) => string }) => {
    if (!comp) return null;
    const pct = comp.total > 0 ? Math.round((comp.filled / comp.total) * 100) : 0;
    const isComplete = comp.filled === comp.total && comp.total > 0;
    return (
        <span style={{
            fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px',
            background: isComplete ? 'rgba(21, 128, 61, 0.08)' : 'var(--bg-tertiary)',
            color: isComplete ? 'var(--accent-green)' : 'var(--text-muted)',
            border: isComplete ? '1px solid rgba(21, 128, 61, 0.15)' : '1px solid var(--border)'
        }}>
            {pct}% {t('docs.complete')}
        </span>
    );
};
