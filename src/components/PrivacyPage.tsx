import { useState, useMemo } from 'react';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { useRiskStore } from '../hooks/useRiskStore';
import { PersonvernVurdering, PersonvernStatus, RettsligGrunnlag } from '../types';
import { 
    Shield, AlertTriangle, 
    ChevronDown, ChevronRight, UserCheck, Clock 
} from 'lucide-react';

const STATUS_LABELS: Record<PersonvernStatus, string> = {
    approved: 'Godkjent',
    action_required: 'Krever tiltak',
    under_review: 'Til vurdering',
    waiting_on_owner: 'Venter på eier'
};

const STATUS_CLASSES: Record<PersonvernStatus, string> = {
    approved: 'status-implemented',
    action_required: 'status-not-started',
    under_review: 'status-planning',
    waiting_on_owner: 'status-in-progress'
};

const RETTSLIG_GRUNNLAG_OPTIONS: { value: RettsligGrunnlag; label: string }[] = [
    { value: 'Samtykke', label: 'GDPR Art. 6(1)(a) - Samtykke' },
    { value: 'Avtale', label: 'GDPR Art. 6(1)(b) - Oppfyllelse av avtale' },
    { value: 'Rettslig_forpliktelse', label: 'GDPR Art. 6(1)(c) - Rettslig forpliktelse' },
    { value: 'Vitale_interesser', label: 'GDPR Art. 6(1)(d) - Vitale interesser' },
    { value: 'Allmenn_interesse', label: 'GDPR Art. 6(1)(e) - Allmenn interesse / Offentlig myndighet' },
    { value: 'Berettiget_interesse', label: 'GDPR Art. 6(1)(f) - Berettiget interesse' }
];

export const PrivacyPage = () => {
    const { state, updatePrivacyAssessment } = useAssessmentStore();
    const { store: riskStore } = useRiskStore();

    const [expandedSystemId, setExpandedSystemId] = useState<string | null>(null);
    const [editingAssessments, setEditingAssessments] = useState<Record<string, PersonvernVurdering>>({});

    const privacySystems = useMemo(() => {
        const systems = state.systems || [];
        return systems.filter(s => s.behandlerPersonopplysninger);
    }, [state.systems]);

    // Statistics
    const stats = useMemo(() => {
        const total = privacySystems.length;
        let approved = 0;
        let review = 0;
        let action = 0;
        let waiting = 0;

        privacySystems.forEach(s => {
            const v = state.personvernVurderinger[s.id];
            const status = v?.status || 'waiting_on_owner';
            if (status === 'approved') approved++;
            if (status === 'under_review') review++;
            if (status === 'action_required') action++;
            if (status === 'waiting_on_owner') waiting++;
        });

        return { total, approved, review, action, waiting };
    }, [privacySystems, state.personvernVurderinger]);

    const handleFieldChange = (systemId: string, field: keyof PersonvernVurdering, value: any) => {
        // If not already in editing state, initialize it from saved assessment or defaults
        const current = editingAssessments[systemId] || state.personvernVurderinger[systemId] || {
            systemId,
            status: 'waiting_on_owner',
            databehandlerAvtaleSignert: 'Ikke_relevant',
            dpiaPakrevd: false,
            dpiaGodkjent: false,
            informertRegistrerte: false,
            sletterutineEtablert: false,
        };

        setEditingAssessments({
            ...editingAssessments,
            [systemId]: {
                ...current,
                [field]: value
            }
        });
    };

    const handleSaveAssessment = (systemId: string) => {
        const toSave = editingAssessments[systemId];
        if (toSave) {
            updatePrivacyAssessment(toSave);
            // Remove from local editing cache
            const updatedCache = { ...editingAssessments };
            delete updatedCache[systemId];
            setEditingAssessments(updatedCache);
            alert('Vurdering lagret!');
        }
    };

    return (
        <div className="animate-fade" style={{ width: '100%' }}>
            {/* Stats Dashboard */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Registrerte systemer</span>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{stats.total}</div>
                    </div>
                    <Shield size={24} style={{ color: 'var(--accent-teal)', opacity: 0.8 }} />
                </div>
                <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Godkjente behandlinger</span>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-green)', marginTop: '4px' }}>{stats.approved}</div>
                    </div>
                    <UserCheck size={24} style={{ color: 'var(--accent-green)', opacity: 0.8 }} />
                </div>
                <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Til vurdering hos DPO</span>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>{stats.review}</div>
                    </div>
                    <Clock size={24} style={{ color: 'var(--accent-primary)', opacity: 0.8 }} />
                </div>
                <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Krever tiltak</span>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-red)', marginTop: '4px' }}>{stats.action}</div>
                    </div>
                    <AlertTriangle size={24} style={{ color: 'var(--accent-red)', opacity: 0.8 }} />
                </div>
            </div>

            {/* Privacy Inventory */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <table className="controls-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40px' }}></th>
                            <th style={{ width: '180px' }}>System</th>
                            <th>Formål & Registrerte</th>
                            <th style={{ width: '220px' }}>Datakategorier</th>
                            <th style={{ width: '180px' }}>Rettslig grunnlag</th>
                            <th style={{ width: '140px' }}>Behandlingsstatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {privacySystems.map(system => {
                            const isExpanded = expandedSystemId === system.id;
                            
                            // Get active values (either unsaved changes or stored state or defaults)
                            const savedAssessment = state.personvernVurderinger[system.id];
                            const currentAssessment = editingAssessments[system.id] || savedAssessment || {
                                systemId: system.id,
                                status: 'waiting_on_owner',
                                databehandlerAvtaleSignert: 'Ikke_relevant',
                                dpiaPakrevd: false,
                                dpiaGodkjent: false,
                                informertRegistrerte: false,
                                sletterutineEtablert: false,
                            };

                            const isDirty = !!editingAssessments[system.id];
                            
                            const legalBasisLabel = RETTSLIG_GRUNNLAG_OPTIONS.find(o => o.value === currentAssessment.rettsligGrunnlag)?.label.split(' - ')[1] || 'Ikke vurdert';

                            return (
                                <>
                                    <tr 
                                        key={system.id} 
                                        onClick={() => setExpandedSystemId(prev => prev === system.id ? null : system.id)}
                                        className={isExpanded ? 'expanded' : ''}
                                    >
                                        <td style={{ textAlign: 'center', padding: 0 }}>
                                            <button 
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setExpandedSystemId(prev => prev === system.id ? null : system.id);
                                                }}
                                                aria-expanded={isExpanded}
                                                aria-label={isExpanded ? `Skjul vurdering for ${system.name}` : `Vis vurdering for ${system.name}`}
                                                className="risk-btn-icon"
                                                style={{ border: 'none', background: 'transparent', width: '100%', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            >
                                                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </button>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{system.name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Eier: {system.systemOwner || 'Uoppgitt'}</div>
                                        </td>
                                        <td>
                                            <div>
                                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                    <span style={{ fontWeight: 600 }}>Formål:</span> {system.formalsBeskrivelse || <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Mangler beskrivelse</span>}
                                                </div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>
                                                    <span style={{ fontWeight: 600 }}>Registrerte:</span> {(system.registrerteKategorier || []).map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ') || 'Ingen valgt'}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                                                {(system.personopplysningerTyper || []).map(t => (
                                                    <span key={t} className="domain-tag domain-physical" style={{ fontSize: '10px', padding: '1px 6px' }}>
                                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                                    </span>
                                                ))}
                                                {(system.personopplysningerTyper || []).length === 0 && (
                                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Ingen kategorier</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{legalBasisLabel}</span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${STATUS_CLASSES[currentAssessment.status]}`}>
                                                {STATUS_LABELS[currentAssessment.status]}
                                            </span>
                                            {isDirty && (
                                                <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--accent-amber)', marginLeft: '6px', textTransform: 'uppercase' }}>Endret</span>
                                            )}
                                        </td>
                                    </tr>

                                    {/* Expanded Detail Assessment Panel */}
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan={6} style={{ padding: 0, background: 'var(--bg-expanded)' }}>
                                                <div className="animate-fade" style={{ padding: '24px 32px' }}>
                                                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Shield size={16} style={{ color: 'var(--accent-teal)' }} />
                                                        DPO Personvernvurdering & GDPR Protokoll
                                                    </h4>

                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                                        {/* Left Column: Legal and DPA */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                            <div>
                                                                <label htmlFor={`dpo-rettslig-${system.id}`} style={labelStyle}>Rettslig grunnlag for behandlingen (GDPR Art. 6)</label>
                                                                <select 
                                                                    id={`dpo-rettslig-${system.id}`}
                                                                    className="status-select" 
                                                                    style={{ width: '100%', fontSize: '13px' }}
                                                                    value={currentAssessment.rettsligGrunnlag || ''}
                                                                    onClick={e => e.stopPropagation()}
                                                                    onChange={e => handleFieldChange(system.id, 'rettsligGrunnlag', e.target.value as RettsligGrunnlag)}
                                                                >
                                                                    <option value="">Velg rettslig grunnlag...</option>
                                                                    {RETTSLIG_GRUNNLAG_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                                                </select>
                                                            </div>

                                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                                <div>
                                                                    <label htmlFor={`dpo-dpa-status-${system.id}`} style={labelStyle}>Databehandleravtale (DPA)</label>
                                                                    <select 
                                                                        id={`dpo-dpa-status-${system.id}`}
                                                                        className="status-select" 
                                                                        style={{ width: '100%', fontSize: '13px' }}
                                                                        value={currentAssessment.databehandlerAvtaleSignert}
                                                                        onClick={e => e.stopPropagation()}
                                                                        onChange={e => handleFieldChange(system.id, 'databehandlerAvtaleSignert', e.target.value)}
                                                                    >
                                                                        <option value="Ja">Ja, signert</option>
                                                                        <option value="Nei">Nei, mangler</option>
                                                                        <option value="Ikke_relevant">Ikke relevant</option>
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor={`dpo-dpa-link-${system.id}`} style={labelStyle}>Lenke til lagret avtale</label>
                                                                    <input 
                                                                        id={`dpo-dpa-link-${system.id}`}
                                                                        type="text" 
                                                                        value={currentAssessment.databehandlerAvtaleLenke || ''}
                                                                        onClick={e => e.stopPropagation()}
                                                                        onChange={e => handleFieldChange(system.id, 'databehandlerAvtaleLenke', e.target.value)}
                                                                        className="risk-input"
                                                                        style={{ width: '100%', fontSize: '13px' }}
                                                                        placeholder="Dokumentreferanse/Lenke"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label style={labelStyle}>Slettefrist og rutine for sletting</label>
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            checked={currentAssessment.sletterutineEtablert}
                                                                            onClick={e => e.stopPropagation()}
                                                                            onChange={e => handleFieldChange(system.id, 'sletterutineEtablert', e.target.checked)}
                                                                            style={{ accentColor: 'var(--accent-teal)' }}
                                                                        />
                                                                        Etablert skriftlig rutine for sletting i systemet
                                                                    </label>
                                                                    <input 
                                                                        type="text"
                                                                        value={currentAssessment.slettefristBeskrivelse || ''}
                                                                        onClick={e => e.stopPropagation()}
                                                                        onChange={e => handleFieldChange(system.id, 'slettefristBeskrivelse', e.target.value)}
                                                                        className="risk-input"
                                                                        style={{ width: '100%', fontSize: '12px' }}
                                                                        placeholder="F.eks. Slettes 12 måneder etter avsluttet arbeidsforhold"
                                                                        aria-label="Beskrivelse av slettefrist"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right Column: DPIA and Status */}
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                                            <div>
                                                                <label style={labelStyle}>Konsekvensvurdering for personvern (DPIA)</label>
                                                                <div style={{ padding: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            checked={currentAssessment.dpiaPakrevd}
                                                                            onClick={e => e.stopPropagation()}
                                                                            onChange={e => handleFieldChange(system.id, 'dpiaPakrevd', e.target.checked)}
                                                                            style={{ accentColor: 'var(--accent-teal)' }}
                                                                        />
                                                                        DPIA er påkrevd for denne behandlingen (GDPR Art. 35)
                                                                    </label>
                                                                    
                                                                    {currentAssessment.dpiaPakrevd && (
                                                                        <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                                                                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={currentAssessment.dpiaGodkjent}
                                                                                    onClick={e => e.stopPropagation()}
                                                                                    onChange={e => handleFieldChange(system.id, 'dpiaGodkjent', e.target.checked)}
                                                                                    style={{ accentColor: 'var(--accent-teal)' }}
                                                                                />
                                                                                DPIA er ferdigstilt og godkjent av DPO
                                                                            </label>
                                                                            
                                                                            <div>
                                                                                <label htmlFor={`dpo-dpia-risk-${system.id}`} style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>KNYTT TIL RISIKOVURDERING</label>
                                                                                <select 
                                                                                    id={`dpo-dpia-risk-${system.id}`}
                                                                                    className="status-select" 
                                                                                    style={{ width: '100%', fontSize: '12px', padding: '6px 10px' }}
                                                                                    value={currentAssessment.dpiaRisikoProsjektId || ''}
                                                                                    onClick={e => e.stopPropagation()}
                                                                                    onChange={e => handleFieldChange(system.id, 'dpiaRisikoProsjektId', e.target.value)}
                                                                                >
                                                                                    <option value="">Velg risikoprosjekt...</option>
                                                                                    {riskStore.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                                                <div>
                                                                    <label style={labelStyle}>Informasjonsplikt oppfylt</label>
                                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '8px' }}>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            checked={currentAssessment.informertRegistrerte}
                                                                            onClick={e => e.stopPropagation()}
                                                                            onChange={e => handleFieldChange(system.id, 'informertRegistrerte', e.target.checked)}
                                                                            style={{ accentColor: 'var(--accent-teal)' }}
                                                                        />
                                                                        Personvernerklæring på plass
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <label htmlFor={`dpo-status-${system.id}`} style={labelStyle}>Overordnet behandlingsstatus</label>
                                                                    <select 
                                                                        id={`dpo-status-${system.id}`}
                                                                        className="status-select" 
                                                                        style={{ width: '100%', fontSize: '13px' }}
                                                                        value={currentAssessment.status}
                                                                        onClick={e => e.stopPropagation()}
                                                                        onChange={e => handleFieldChange(system.id, 'status', e.target.value as PersonvernStatus)}
                                                                    >
                                                                        <option value="waiting_on_owner">Venter på eier</option>
                                                                        <option value="under_review">Til vurdering</option>
                                                                        <option value="action_required">Krever tiltak</option>
                                                                        <option value="approved">Godkjent behandlingsaktivitet</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ marginTop: '20px' }}>
                                                        <label htmlFor={`dpo-comments-${system.id}`} style={labelStyle}>Kommentarer / Avvik fra personvernombudet</label>
                                                        <textarea 
                                                            id={`dpo-comments-${system.id}`}
                                                            value={currentAssessment.dpoKommentarer || ''}
                                                            onClick={e => e.stopPropagation()}
                                                            onChange={e => handleFieldChange(system.id, 'dpoKommentarer', e.target.value)}
                                                            className="risk-input"
                                                            style={{ width: '100%', minHeight: '80px', fontSize: '13px', lineHeight: 1.4 }}
                                                            placeholder="Skriv inn notater, eventuelle mangler eller råd fra DPO her..."
                                                        />
                                                    </div>

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                            {currentAssessment.sistVurdertAvDpo && (
                                                                <>Sist vurdert av DPO: {new Date(currentAssessment.sistVurdertAvDpo).toLocaleString()}</>
                                                            )}
                                                        </span>
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            <button 
                                                                type="button" 
                                                                onClick={e => { e.stopPropagation(); setExpandedSystemId(null); }}
                                                                className="risk-btn secondary"
                                                            >
                                                                Lukk
                                                            </button>
                                                            <button 
                                                                type="button" 
                                                                disabled={!isDirty}
                                                                onClick={e => { e.stopPropagation(); handleSaveAssessment(system.id); }}
                                                                className={`risk-btn ${isDirty ? 'primary' : 'secondary'}`}
                                                            >
                                                                Lagre vurdering
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            );
                        })}

                        {privacySystems.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <Shield size={24} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                                    <p>Ingen systemer i Systemoversikten er merket som GDPR-pliktige (Behandler personopplysninger).</p>
                                    <p style={{ fontSize: '11px', marginTop: '4px' }}>Marker systemer i Systemoversikten for å begynne sporing av behandlingsprotokollen.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '6px'
};
