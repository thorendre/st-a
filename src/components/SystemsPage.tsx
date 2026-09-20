import { useState, useMemo } from 'react';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { useRiskStore } from '../hooks/useRiskStore';
import { Driftsmodell, KonfidensialitetsKlasse, ITSystem } from '../types';
import { 
    Plus, Search, Edit3, Trash2, Shield, AlertTriangle, 
    X, Laptop, ShieldCheck
} from 'lucide-react';

const DRIFTSMODELL_OPTIONS: Driftsmodell[] = ['SaaS', 'PaaS', 'IaaS', 'On-Premise', 'Ekstern leverandør'];
const SENSITIVITY_OPTIONS: KonfidensialitetsKlasse[] = ['Offentlig', 'Intern', 'Konfidensiell', 'Strengt konfidensiell'];

const PERSONAL_DATA_CATEGORIES = [
    { id: 'navn', label: 'Navn / Kontaktinformasjon' },
    { id: 'epost', label: 'E-postadresse' },
    { id: 'telefon', label: 'Telefonnummer' },
    { id: 'fodselsnummer', label: 'Fødselsnummer (11 siffer)' },
    { id: 'helsedata', label: 'Særlige kategorier (Helseopplysninger)' },
    { id: 'fagforening', label: 'Særlige kategorier (Fagforeningsmedlemskap)' },
    { id: 'finansielt', label: 'Finansielle opplysninger (Lønn, Kredittkort)' },
    { id: 'ip_lokasjon', label: 'IP-adresser / Lokasjonsdata' },
    { id: 'annet', label: 'Andre personopplysninger' }
];

const DATA_SUBJECTS_CATEGORIES = [
    { id: 'ansatte', label: 'Ansatte / Medarbeidere' },
    { id: 'kunder', label: 'Kunder / Klienter' },
    { id: 'pasienter', label: 'Pasienter / Brukere' },
    { id: 'leverandorer', label: 'Leverandører / Partnere' },
    { id: 'studenter', label: 'Studenter / Elever' },
    { id: 'andre', label: 'Andre registrerte' }
];

const emptySystem: Omit<ITSystem, 'id'> = {
    name: '',
    description: '',
    systemOwner: '',
    driftsmodell: 'SaaS',
    leverandor: '',
    konfidensialitet: 'Intern',
    behandlerPersonopplysninger: false,
    personopplysningerTyper: [],
    registrerteKategorier: [],
    formalsBeskrivelse: ''
};

export const SystemsPage = () => {
    const { state, addSystem, updateSystem, deleteSystem } = useAssessmentStore();
    const { store: riskStore } = useRiskStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [filterDrift, setFilterDrift] = useState<string>('all');
    const [filterSensitivity, setFilterSensitivity] = useState<string>('all');
    const [filterPrivacy, setFilterPrivacy] = useState<string>('all');

    const [editingSystem, setEditingSystem] = useState<(Omit<ITSystem, 'id'> & { id?: string }) | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const systemsList = useMemo(() => state.systems || [], [state.systems]);

    // Retrieve risk projects linked to systems
    const systemRiskMap = useMemo(() => {
        const map: Record<string, string[]> = {};
        riskStore.projects.forEach(p => {
            if (p.systemId) {
                if (!map[p.systemId]) map[p.systemId] = [];
                map[p.systemId].push(p.name);
            }
        });
        return map;
    }, [riskStore.projects]);

    const filteredSystems = useMemo(() => {
        return systemsList.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.leverandor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.systemOwner.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesDrift = filterDrift === 'all' || s.driftsmodell === filterDrift;
            const matchesSens = filterSensitivity === 'all' || s.konfidensialitet === filterSensitivity;
            
            let matchesPriv = true;
            if (filterPrivacy === 'yes') matchesPriv = s.behandlerPersonopplysninger;
            if (filterPrivacy === 'no') matchesPriv = !s.behandlerPersonopplysninger;

            return matchesSearch && matchesDrift && matchesSens && matchesPriv;
        });
    }, [systemsList, searchQuery, filterDrift, filterSensitivity, filterPrivacy]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSystem || !editingSystem.name.trim()) return;

        const systemData: Omit<ITSystem, 'id'> = {
            name: editingSystem.name,
            description: editingSystem.description || '',
            systemOwner: editingSystem.systemOwner || '',
            driftsmodell: editingSystem.driftsmodell || 'SaaS',
            leverandor: editingSystem.leverandor || '',
            konfidensialitet: editingSystem.konfidensialitet || 'Intern',
            behandlerPersonopplysninger: editingSystem.behandlerPersonopplysninger || false,
            personopplysningerTyper: editingSystem.behandlerPersonopplysninger ? (editingSystem.personopplysningerTyper || []) : [],
            registrerteKategorier: editingSystem.behandlerPersonopplysninger ? (editingSystem.registrerteKategorier || []) : [],
            formalsBeskrivelse: editingSystem.behandlerPersonopplysninger ? (editingSystem.formalsBeskrivelse || '') : ''
        };

        if (editingSystem.id) {
            updateSystem({ ...systemData, id: editingSystem.id });
        } else {
            addSystem(systemData);
        }
        setEditingSystem(null);
    };

    const toggleArrayItem = (field: 'personopplysningerTyper' | 'registrerteKategorier', val: string) => {
        if (!editingSystem) return;
        const current = editingSystem[field] || [];
        const updated = current.includes(val)
            ? current.filter(x => x !== val)
            : [...current, val];
        
        setEditingSystem({
            ...editingSystem,
            [field]: updated
        });
    };

    const getPrivacyStatusLabel = (sysId: string) => {
        const assessment = state.personvernVurderinger[sysId];
        if (!assessment) return { text: 'Uvurdert', class: 'status-not-applicable' };
        
        switch (assessment.status) {
            case 'approved':
                return { text: 'Godkjent av DPO', class: 'status-implemented' };
            case 'action_required':
                return { text: 'Krever tiltak', class: 'status-not-started' };
            case 'under_review':
                return { text: 'Til vurdering', class: 'status-planning' };
            case 'waiting_on_owner':
                return { text: 'Venter på eier', class: 'status-in-progress' };
            default:
                return { text: 'Uvurdert', class: 'status-not-applicable' };
        }
    };

    return (
        <div className="animate-fade" style={{ width: '100%' }}>
            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1, maxWidth: '800px' }}>
                    <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: '300px' }}>
                        <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            placeholder="Søk i systemnavn, eier, leverandør..." 
                            value={searchQuery} 
                            onChange={e => setSearchQuery(e.target.value)}
                            className="risk-input"
                            style={{ paddingLeft: '36px', width: '100%', fontSize: '13px' }}
                        />
                    </div>
                    <select className="status-select" value={filterDrift} onChange={e => setFilterDrift(e.target.value)}>
                        <option value="all">Alle driftsmodeller</option>
                        {DRIFTSMODELL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <select className="status-select" value={filterSensitivity} onChange={e => setFilterSensitivity(e.target.value)}>
                        <option value="all">Alle konfidensialiteter</option>
                        {SENSITIVITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <select className="status-select" value={filterPrivacy} onChange={e => setFilterPrivacy(e.target.value)}>
                        <option value="all">Personopplysninger (Alle)</option>
                        <option value="yes">Behandler personopplysninger</option>
                        <option value="no">Behandler ikke</option>
                    </select>
                </div>

                <button 
                    onClick={() => setEditingSystem(emptySystem)}
                    className="risk-btn primary" 
                    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    <Plus size={16} />
                    Registrer system
                </button>
            </div>

            {/* Inventory Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <table className="controls-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40px', textAlign: 'center' }}><Laptop size={14} style={{ opacity: 0.5 }} /></th>
                            <th>Systemnavn</th>
                            <th style={{ width: '150px' }}>Leverandør</th>
                            <th style={{ width: '130px' }}>Driftsmodell</th>
                            <th style={{ width: '140px' }}>Ansvarlig</th>
                            <th style={{ width: '130px' }}>Konfidensialitet</th>
                            <th style={{ width: '160px' }}>Personvern / DPO</th>
                            <th style={{ width: '100px', textAlign: 'right' }}>Handlinger</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSystems.map(system => {
                            const dpoStatus = getPrivacyStatusLabel(system.id);
                            const risksLinked = systemRiskMap[system.id] || [];

                            return (
                                <tr key={system.id} style={{ cursor: 'default' }}>
                                    <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                        {system.behandlerPersonopplysninger ? 
                                            <span title="Behandler personopplysninger"><Shield size={16} style={{ color: 'var(--accent-teal)' }} /></span> : 
                                            <Laptop size={16} style={{ opacity: 0.4 }} />
                                        }
                                    </td>
                                    <td>
                                        <div>
                                            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13.5px' }}>{system.name}</span>
                                            {system.description && (
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '300px' }}>
                                                    {system.description}
                                                </div>
                                            )}
                                            {risksLinked.length > 0 && (
                                                <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                                                    {risksLinked.map((p, idx) => (
                                                        <span key={idx} className="domain-tag domain-organizational" style={{ fontSize: '9px', padding: '1px 5px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                                            <AlertTriangle size={8} /> Risiko: {p}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{system.leverandor || '—'}</span></td>
                                    <td><span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>{system.driftsmodell}</span></td>
                                    <td><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{system.systemOwner || '—'}</span></td>
                                    <td>
                                        <span style={{ 
                                            fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px',
                                            background: system.konfidensialitet === 'Offentlig' ? 'rgba(21, 128, 61, 0.08)' :
                                                        system.konfidensialitet === 'Intern' ? 'rgba(15, 118, 110, 0.08)' :
                                                        system.konfidensialitet === 'Konfidensiell' ? 'rgba(217, 119, 6, 0.08)' : 'rgba(185, 28, 28, 0.08)',
                                            color: system.konfidensialitet === 'Offentlig' ? 'var(--accent-green)' :
                                                   system.konfidensialitet === 'Intern' ? 'var(--accent-teal)' :
                                                   system.konfidensialitet === 'Konfidensiell' ? 'var(--accent-amber)' : 'var(--accent-red)'
                                        }}>
                                            {system.konfidensialitet}
                                        </span>
                                    </td>
                                    <td>
                                        {system.behandlerPersonopplysninger ? (
                                            <span className={`status-badge ${dpoStatus.class}`} style={{ fontSize: '11px' }}>
                                                {dpoStatus.text}
                                            </span>
                                        ) : (
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>Behandler ikke GDPA</span>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                            <button 
                                                onClick={() => setEditingSystem(system)}
                                                className="theme-toggle" 
                                                title="Rediger"
                                                style={{ border: '1px solid var(--border)', borderRadius: '4px', padding: '5px' }}
                                            >
                                                <Edit3 size={13} style={{ color: 'var(--text-secondary)' }} />
                                            </button>
                                            {confirmDeleteId === system.id ? (
                                                <div style={{ display: 'flex', gap: '3px' }}>
                                                    <button 
                                                        onClick={() => { deleteSystem(system.id); setConfirmDeleteId(null); }}
                                                        className="risk-btn danger" 
                                                        style={{ padding: '3px 8px', fontSize: '11px' }}
                                                    >
                                                        Ja
                                                    </button>
                                                    <button 
                                                        onClick={() => setConfirmDeleteId(null)}
                                                        className="risk-btn secondary" 
                                                        style={{ padding: '3px 8px', fontSize: '11px' }}
                                                    >
                                                        Nei
                                                    </button>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => setConfirmDeleteId(system.id)}
                                                    className="theme-toggle" 
                                                    title="Slett"
                                                    style={{ border: '1px solid var(--border)', borderRadius: '4px', padding: '5px' }}
                                                >
                                                    <Trash2 size={13} style={{ color: 'var(--accent-red)' }} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {filteredSystems.length === 0 && (
                            <tr>
                                <td colSpan={8} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    <Laptop size={24} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                                    <p>Ingen systemer samsvarer med søket eller filtrene.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {editingSystem !== null && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '24px' }}>
                    <div className="card animate-fade" style={{ width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Laptop size={18} style={{ color: 'var(--accent-teal)' }} />
                                {editingSystem.id ? 'Rediger IT-system' : 'Registrer nytt IT-system'}
                            </h3>
                            <button onClick={() => setEditingSystem(null)} className="theme-toggle" style={{ padding: '4px' }}><X size={16} /></button>
                        </div>

                        <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label htmlFor="sys-name" style={labelStyle}>Systemnavn *</label>
                                    <input 
                                        id="sys-name"
                                        type="text" 
                                        required 
                                        value={editingSystem.name} 
                                        onChange={e => setEditingSystem({ ...editingSystem, name: e.target.value })}
                                        className="risk-input"
                                        style={{ width: '100%', fontSize: '13px' }}
                                        placeholder="F.eks. SuperHR, e-post, skyløsning..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sys-leverandor" style={labelStyle}>Leverandør</label>
                                    <input 
                                        id="sys-leverandor"
                                        type="text" 
                                        list="vendor-suggestions"
                                        value={editingSystem.leverandor} 
                                        onChange={e => setEditingSystem({ ...editingSystem, leverandor: e.target.value })}
                                        className="risk-input"
                                        style={{ width: '100%', fontSize: '13px' }}
                                        placeholder="F.eks. Microsoft, Visma, AWS..."
                                    />
                                    <datalist id="vendor-suggestions">
                                        {(state.vendors || []).map(v => (
                                            <option key={v.id} value={v.name}>{v.country ? `(${v.country})` : ''}</option>
                                        ))}
                                    </datalist>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="sys-desc" style={labelStyle}>Beskrivelse og bruksområde</label>
                                <textarea 
                                    id="sys-desc"
                                    value={editingSystem.description} 
                                    onChange={e => setEditingSystem({ ...editingSystem, description: e.target.value })}
                                    className="risk-input"
                                    style={{ width: '100%', minHeight: '60px', fontSize: '13px', lineHeight: 1.4 }}
                                    placeholder="Skriv en kort oppsummering av hva systemet brukes til og hvilke funksjoner det støtter..."
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label htmlFor="sys-owner" style={labelStyle}>Systemeier (Internt ansvarlig)</label>
                                    <input 
                                        id="sys-owner"
                                        type="text" 
                                        value={editingSystem.systemOwner} 
                                        onChange={e => setEditingSystem({ ...editingSystem, systemOwner: e.target.value })}
                                        className="risk-input"
                                        style={{ width: '100%', fontSize: '13px' }}
                                        placeholder="Navn eller e-postadresse"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sys-driftsmodell" style={labelStyle}>Driftsmodell</label>
                                    <select 
                                        id="sys-driftsmodell"
                                        className="status-select" 
                                        style={{ width: '100%', fontSize: '13px' }}
                                        value={editingSystem.driftsmodell} 
                                        onChange={e => setEditingSystem({ ...editingSystem, driftsmodell: e.target.value as Driftsmodell })}
                                    >
                                        {DRIFTSMODELL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="sys-konfidensialitet" style={labelStyle}>Konfidensialitetsklasse</label>
                                <select 
                                    id="sys-konfidensialitet"
                                    className="status-select" 
                                    style={{ width: '100%', fontSize: '13px' }}
                                    value={editingSystem.konfidensialitet} 
                                    onChange={e => setEditingSystem({ ...editingSystem, konfidensialitet: e.target.value as KonfidensialitetsKlasse })}
                                >
                                    {SENSITIVITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                                    Intern / konfidensiell gjelder for allmenn data. Strengt konfidensiell bør velges ved særlige kategorier (helse, straff, osv.)
                                </span>
                            </div>

                            {/* Privacy trigger section */}
                            <div style={{ marginTop: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={editingSystem.behandlerPersonopplysninger}
                                        onChange={e => setEditingSystem({ ...editingSystem, behandlerPersonopplysninger: e.target.checked })}
                                        style={{ accentColor: 'var(--accent-teal)' }}
                                    />
                                    Behandler dette systemet personopplysninger? (GDPR-pliktig)
                                </label>

                                {editingSystem.behandlerPersonopplysninger && (
                                    <div className="animate-fade" style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-expanded)', borderRadius: '6px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div>
                                            <label style={labelStyle}>Hvilke personopplysninger behandles? (Kryss av)</label>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginTop: '6px' }}>
                                                {PERSONAL_DATA_CATEGORIES.map(c => {
                                                    const checked = (editingSystem.personopplysningerTyper || []).includes(c.id);
                                                    return (
                                                        <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                            <input 
                                                                type="checkbox" 
                                                                checked={checked}
                                                                onChange={() => toggleArrayItem('personopplysningerTyper', c.id)}
                                                                style={{ accentColor: 'var(--accent-teal)' }}
                                                            />
                                                            {c.label}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <label style={labelStyle}>Hvem behandles opplysningene om? (Kryss av)</label>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginTop: '6px' }}>
                                                {DATA_SUBJECTS_CATEGORIES.map(c => {
                                                    const checked = (editingSystem.registrerteKategorier || []).includes(c.id);
                                                    return (
                                                        <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                            <input 
                                                                type="checkbox" 
                                                                checked={checked}
                                                                onChange={() => toggleArrayItem('registrerteKategorier', c.id)}
                                                                style={{ accentColor: 'var(--accent-teal)' }}
                                                            />
                                                            {c.label}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="sys-gdpr-formal" style={labelStyle}>Formål med behandlingen</label>
                                            <textarea 
                                                id="sys-gdpr-formal"
                                                value={editingSystem.formalsBeskrivelse} 
                                                onChange={e => setEditingSystem({ ...editingSystem, formalsBeskrivelse: e.target.value })}
                                                className="risk-input"
                                                style={{ width: '100%', minHeight: '60px', fontSize: '12px', lineHeight: 1.4 }}
                                                placeholder="F.eks. Lønnskjøring, kundehåndtering, markedsføring..."
                                            />
                                        </div>
                                        
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--accent-teal)', fontWeight: 500 }}>
                                            <ShieldCheck size={14} style={{ flexShrink: 0 }} />
                                            <span>Når du lagrer, vil dette systemet bli sendt til Personvernmodulen for oppfølging av DPO.</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                                <button type="button" onClick={() => setEditingSystem(null)} className="risk-btn secondary">Avbryt</button>
                                <button type="submit" className="risk-btn primary">Lagre system</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '6px'
};
