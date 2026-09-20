import { useState, useMemo } from 'react';
import { useAssessmentStore } from '../hooks/useAssessmentStore';
import { useRiskStore } from '../hooks/useRiskStore';
import { 
    PersonvernVurdering, PersonvernStatus, RettsligGrunnlag, 
    Vendor, DpaStatus, OverforingsGrunnlag, LeverandorRisiko 
} from '../types';
import { 
    Shield, AlertTriangle, ChevronDown, ChevronRight, UserCheck, Clock, 
    Building2, Fingerprint, Plus, Edit3, Trash2, ExternalLink, 
    Search, Check, X, FileCheck, Globe, Database, FileText
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

const DPA_STATUS_COLORS: Record<DpaStatus, { bg: string; text: string }> = {
    'Signert': { bg: 'rgba(21, 128, 61, 0.12)', text: 'var(--accent-green)' },
    'Under forhandling': { bg: 'rgba(217, 119, 6, 0.12)', text: 'var(--accent-amber)' },
    'Mangler': { bg: 'rgba(185, 28, 28, 0.12)', text: 'var(--accent-red)' },
    'Ikke relevant': { bg: 'var(--bg-tertiary)', text: 'var(--text-muted)' }
};

const VENDOR_RISK_COLORS: Record<LeverandorRisiko, { bg: string; text: string }> = {
    'Lav': { bg: 'rgba(21, 128, 61, 0.12)', text: 'var(--accent-green)' },
    'Moderat': { bg: 'rgba(217, 119, 6, 0.12)', text: 'var(--accent-amber)' },
    'Høy': { bg: 'rgba(185, 28, 28, 0.12)', text: 'var(--accent-red)' }
};

const emptyVendor: Omit<Vendor, 'id'> = {
    name: '',
    orgNumber: '',
    contactPerson: '',
    contactEmail: '',
    servicesDelivered: '',
    dpaStatus: 'Signert',
    dpaLink: '',
    dpaSignDate: '',
    dpaReviewDate: '',
    country: 'Norge',
    transferBasis: 'EU_EOS',
    subProcessors: [],
    securityCertifications: ['ISO 27001'],
    riskLevel: 'Lav',
    connectedSystemIds: [],
    notes: '',
};

export const PrivacyPage = () => {
    const { 
        state, updatePrivacyAssessment, 
        addVendor, updateVendor, deleteVendor 
    } = useAssessmentStore();
    const { store: riskStore } = useRiskStore();

    const [activeSubTab, setActiveSubTab] = useState<'behandlinger' | 'leverandorer'>('behandlinger');

    // Behandlinger state
    const [expandedSystemId, setExpandedSystemId] = useState<string | null>(null);
    const [editingAssessments, setEditingAssessments] = useState<Record<string, PersonvernVurdering>>({});

    // Leverandører state
    const [vendorSearch, setVendorSearch] = useState('');
    const [filterDpa, setFilterDpa] = useState<string>('all');
    const [filterRisk, setFilterRisk] = useState<string>('all');
    const [editingVendor, setEditingVendor] = useState<(Omit<Vendor, 'id'> & { id?: string }) | null>(null);
    const [confirmDeleteVendorId, setConfirmDeleteVendorId] = useState<string | null>(null);

    const privacySystems = useMemo(() => {
        const systems = state.systems || [];
        return systems.filter(s => s.behandlerPersonopplysninger);
    }, [state.systems]);

    // Statistics for Behandlingsoversikt
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

    // Statistics for Leverandøroversikt
    const vendorStats = useMemo(() => {
        const vendors = state.vendors || [];
        const total = vendors.length;
        const signed = vendors.filter(v => v.dpaStatus === 'Signert').length;
        const pendingOrMissing = vendors.filter(v => v.dpaStatus === 'Mangler' || v.dpaStatus === 'Under forhandling').length;
        const thirdCountry = vendors.filter(v => v.transferBasis === 'SCC' || v.transferBasis === 'Adequacy_DPF' || v.country.toLowerCase().includes('usa')).length;

        return { total, signed, pendingOrMissing, thirdCountry };
    }, [state.vendors]);

    // Filtered vendors
    const filteredVendors = useMemo(() => {
        const list = state.vendors || [];
        return list.filter(v => {
            const matchesSearch = 
                v.name.toLowerCase().includes(vendorSearch.toLowerCase()) ||
                (v.servicesDelivered && v.servicesDelivered.toLowerCase().includes(vendorSearch.toLowerCase())) ||
                (v.contactPerson && v.contactPerson.toLowerCase().includes(vendorSearch.toLowerCase())) ||
                (v.country && v.country.toLowerCase().includes(vendorSearch.toLowerCase()));
            
            const matchesDpa = filterDpa === 'all' || v.dpaStatus === filterDpa;
            const matchesRisk = filterRisk === 'all' || v.riskLevel === filterRisk;

            return matchesSearch && matchesDpa && matchesRisk;
        });
    }, [state.vendors, vendorSearch, filterDpa, filterRisk]);

    const handleFieldChange = (systemId: string, field: keyof PersonvernVurdering, value: any) => {
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
            const updatedCache = { ...editingAssessments };
            delete updatedCache[systemId];
            setEditingAssessments(updatedCache);
        }
    };

    return (
        <div className="animate-fade" style={{ width: '100%' }}>
            {/* Header with Sub-tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className={`tab-btn ${activeSubTab === 'behandlinger' ? 'active' : ''}`}
                        onClick={() => setActiveSubTab('behandlinger')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600,
                            padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--border)',
                            background: activeSubTab === 'behandlinger' ? 'var(--accent-teal)' : 'var(--bg-secondary)',
                            color: activeSubTab === 'behandlinger' ? '#fff' : 'var(--text-secondary)'
                        }}
                    >
                        <Fingerprint size={16} /> Behandlingsoversikt (GDPR Art. 30)
                    </button>
                    <button
                        className={`tab-btn ${activeSubTab === 'leverandorer' ? 'active' : ''}`}
                        onClick={() => setActiveSubTab('leverandorer')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600,
                            padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--border)',
                            background: activeSubTab === 'leverandorer' ? 'var(--accent-teal)' : 'var(--bg-secondary)',
                            color: activeSubTab === 'leverandorer' ? '#fff' : 'var(--text-secondary)'
                        }}
                    >
                        <Building2 size={16} /> Leverandører & DPA (GDPR Art. 28)
                        <span style={{
                            fontSize: '11px', padding: '1px 6px', borderRadius: '10px',
                            background: activeSubTab === 'leverandorer' ? 'rgba(255,255,255,0.25)' : 'var(--bg-tertiary)',
                            color: activeSubTab === 'leverandorer' ? '#fff' : 'var(--text-muted)'
                        }}>
                            {(state.vendors || []).length}
                        </span>
                    </button>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                SUBTAB 1: BEHANDLINGSOVERSIKT (GDPR Art. 30)
               ═══════════════════════════════════════════════════════════════ */}
            {activeSubTab === 'behandlinger' && (
                <div>
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

                    {/* Privacy Inventory Table */}
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
                                    const assessment = state.personvernVurderinger[system.id] || {
                                        systemId: system.id,
                                        status: 'waiting_on_owner',
                                        databehandlerAvtaleSignert: 'Ikke_relevant',
                                        dpiaPakrevd: false,
                                        dpiaGodkjent: false,
                                        informertRegistrerte: false,
                                        sletterutineEtablert: false,
                                    };
                                    const currentEdit = editingAssessments[system.id] || assessment;
                                    const isExpanded = expandedSystemId === system.id;
                                    const hasUnsavedChanges = !!editingAssessments[system.id];

                                    return (
                                        <tr key={system.id} style={{ display: 'contents' }}>
                                            <tr className={isExpanded ? 'expanded' : ''} onClick={() => setExpandedSystemId(isExpanded ? null : system.id)}>
                                                <td style={{ textAlign: 'center', padding: 0 }}>
                                                    <button 
                                                        type="button"
                                                        aria-label="Utvid detaljer"
                                                        className="risk-btn-icon"
                                                        style={{ border: 'none', background: 'transparent', width: '100%', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                    </button>
                                                </td>
                                                <td>
                                                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{system.name}</div>
                                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{system.leverandor || 'Intern'} · {system.systemOwner}</div>
                                                </td>
                                                <td>
                                                    <div style={{ fontSize: '12px' }}>{system.formalsBeskrivelse || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Mangler formålsbeskrivelse</span>}</div>
                                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                        Registrerte: {system.registrerteKategorier && system.registrerteKategorier.length > 0 ? system.registrerteKategorier.join(', ') : 'Ikke spesifisert'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                        {system.personopplysningerTyper && system.personopplysningerTyper.length > 0 ? (
                                                            system.personopplysningerTyper.map((cat, idx) => (
                                                                <span key={idx} style={{
                                                                    fontSize: '10px', padding: '1px 6px', borderRadius: '4px',
                                                                    background: cat.toLowerCase().includes('helse') || cat.toLowerCase().includes('fødselsnummer') ? 'rgba(185, 28, 28, 0.1)' : 'var(--bg-tertiary)',
                                                                    color: cat.toLowerCase().includes('helse') || cat.toLowerCase().includes('fødselsnummer') ? 'var(--accent-red)' : 'var(--text-secondary)',
                                                                    border: '1px solid var(--border)'
                                                                }}>
                                                                    {cat}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ingen spesifisert</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span style={{ fontSize: '12px', fontWeight: 500 }}>
                                                        {currentEdit.rettsligGrunnlag ? RETTSLIG_GRUNNLAG_OPTIONS.find(o => o.value === currentEdit.rettsligGrunnlag)?.label.split(' - ')[1] : <span style={{ color: 'var(--accent-amber)', fontStyle: 'italic' }}>Uavklart</span>}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${STATUS_CLASSES[currentEdit.status]}`} style={{ fontSize: '11px', fontWeight: 600 }}>
                                                        {STATUS_LABELS[currentEdit.status]}
                                                    </span>
                                                </td>
                                            </tr>

                                            {isExpanded && (
                                                <tr key={`${system.id}-details`}>
                                                    <td colSpan={6} style={{ padding: 0, background: 'var(--bg-expanded)' }}>
                                                        <div className="animate-fade" style={{ padding: '24px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }} onClick={e => e.stopPropagation()}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                                                                <div>
                                                                    <h4 style={{ fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                        <UserCheck size={16} style={{ color: 'var(--accent-teal)' }} />
                                                                        DPO Vurdering & Etterlevelse for {system.name}
                                                                    </h4>
                                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                                        Sist vurdert av personvernombud: {assessment.sistVurdertAvDpo ? new Date(assessment.sistVurdertAvDpo).toLocaleString('nb-NO') : 'Ikke vurdert ennå'}
                                                                    </div>
                                                                </div>
                                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                                    {hasUnsavedChanges && (
                                                                        <button 
                                                                            type="button" 
                                                                            className="risk-btn risk-btn-primary" 
                                                                            style={{ fontSize: '12px' }}
                                                                            onClick={() => handleSaveAssessment(system.id)}
                                                                        >
                                                                            <Check size={14} /> Lagre vurdering
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                                                <div>
                                                                    <label style={labelStyle}>Status for behandlingen</label>
                                                                    <select 
                                                                        className="risk-input" 
                                                                        style={{ width: '100%' }}
                                                                        value={currentEdit.status}
                                                                        onChange={e => handleFieldChange(system.id, 'status', e.target.value)}
                                                                    >
                                                                        <option value="waiting_on_owner">{STATUS_LABELS['waiting_on_owner']}</option>
                                                                        <option value="under_review">{STATUS_LABELS['under_review']}</option>
                                                                        <option value="action_required">{STATUS_LABELS['action_required']}</option>
                                                                        <option value="approved">{STATUS_LABELS['approved']}</option>
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label style={labelStyle}>Rettslig grunnlag (GDPR Art. 6/9)</label>
                                                                    <select 
                                                                        className="risk-input" 
                                                                        style={{ width: '100%' }}
                                                                        value={currentEdit.rettsligGrunnlag || ''}
                                                                        onChange={e => handleFieldChange(system.id, 'rettsligGrunnlag', e.target.value || undefined)}
                                                                    >
                                                                        <option value="">Velg rettslig grunnlag...</option>
                                                                        {RETTSLIG_GRUNNLAG_OPTIONS.map(opt => (
                                                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label style={labelStyle}>Databehandleravtale (DPA)</label>
                                                                    <select 
                                                                        className="risk-input" 
                                                                        style={{ width: '100%' }}
                                                                        value={currentEdit.databehandlerAvtaleSignert}
                                                                        onChange={e => handleFieldChange(system.id, 'databehandlerAvtaleSignert', e.target.value)}
                                                                    >
                                                                        <option value="Ja">Signert og arkivert</option>
                                                                        <option value="Nei">Mangler / Under utarbeidelse</option>
                                                                        <option value="Ikke_relevant">Ikke relevant (Intern behandling)</option>
                                                                    </select>
                                                                </div>

                                                                <div>
                                                                    <label style={labelStyle}>Lenke til Databehandleravtale (DPA)</label>
                                                                    <input 
                                                                        type="text" 
                                                                        placeholder="F.eks. SharePoint / Arkivlenke" 
                                                                        className="risk-input" 
                                                                        style={{ width: '100%' }}
                                                                        value={currentEdit.databehandlerAvtaleLenke || ''}
                                                                        onChange={e => handleFieldChange(system.id, 'databehandlerAvtaleLenke', e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                                                <div className="card" style={{ padding: '14px', background: 'var(--card-inner-bg)' }}>
                                                                    <span style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>DPIA (Vurdering av personvernkonsekvenser)</span>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                                                                            <input 
                                                                                type="checkbox" 
                                                                                checked={currentEdit.dpiaPakrevd}
                                                                                onChange={e => handleFieldChange(system.id, 'dpiaPakrevd', e.target.checked)}
                                                                            />
                                                                            DPIA er påkrevd (høy risiko for registrerte)
                                                                        </label>
                                                                        {currentEdit.dpiaPakrevd && (
                                                                            <>
                                                                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                                                                                    <input 
                                                                                        type="checkbox" 
                                                                                        checked={currentEdit.dpiaGodkjent}
                                                                                        onChange={e => handleFieldChange(system.id, 'dpiaGodkjent', e.target.checked)}
                                                                                    />
                                                                                    DPIA er gjennomført og godkjent av DPO
                                                                                </label>
                                                                                <div>
                                                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tilknyttet risikovurdering for DPIA:</label>
                                                                                    <select 
                                                                                        className="risk-input" 
                                                                                        style={{ width: '100%', fontSize: '12px', marginTop: '4px' }}
                                                                                        value={currentEdit.dpiaRisikoProsjektId || ''}
                                                                                        onChange={e => handleFieldChange(system.id, 'dpiaRisikoProsjektId', e.target.value || undefined)}
                                                                                    >
                                                                                        <option value="">Ingen valgt...</option>
                                                                                        {riskStore.projects.map(p => (
                                                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className="card" style={{ padding: '14px', background: 'var(--card-inner-bg)' }}>
                                                                    <span style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Informasjonsplikt & Sletterutiner</span>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                                                                            <input 
                                                                                type="checkbox" 
                                                                                checked={currentEdit.informertRegistrerte}
                                                                                onChange={e => handleFieldChange(system.id, 'informertRegistrerte', e.target.checked)}
                                                                            />
                                                                            De registrerte er informert (Personvernerklæring)
                                                                        </label>
                                                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                                                                            <input 
                                                                                type="checkbox" 
                                                                                checked={currentEdit.sletterutineEtablert}
                                                                                onChange={e => handleFieldChange(system.id, 'sletterutineEtablert', e.target.checked)}
                                                                            />
                                                                            Automatisert eller manuell sletterutine etablert
                                                                        </label>
                                                                        <div>
                                                                            <input 
                                                                                type="text" 
                                                                                placeholder="Beskriv slettefrist (f.eks. '3 år etter avslutning')" 
                                                                                className="risk-input" 
                                                                                style={{ width: '100%', fontSize: '12px' }}
                                                                                value={currentEdit.slettefristBeskrivelse || ''}
                                                                                onChange={e => handleFieldChange(system.id, 'slettefristBeskrivelse', e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label style={labelStyle}>DPO Kommentarer & Merknader til systemeier</label>
                                                                <textarea 
                                                                    rows={3} 
                                                                    className="risk-input" 
                                                                    style={{ width: '100%', fontSize: '13px' }}
                                                                    placeholder="Skriv instruksjoner, vurderinger eller tiltak som systemeier må følge opp..."
                                                                    value={currentEdit.dpoKommentarer || ''}
                                                                    onChange={e => handleFieldChange(system.id, 'dpoKommentarer', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tr>
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
            )}

            {/* ═══════════════════════════════════════════════════════════════
                SUBTAB 2: LEVERANDØRER & DATABEHANDLERAVTALER (GDPR Art. 28)
               ═══════════════════════════════════════════════════════════════ */}
            {activeSubTab === 'leverandorer' && (
                <div>
                    {/* Vendor KPIs */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Totalt leverandører</span>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{vendorStats.total}</div>
                            </div>
                            <Building2 size={24} style={{ color: 'var(--accent-teal)', opacity: 0.8 }} />
                        </div>
                        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Signerte DPA-er</span>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-green)', marginTop: '4px' }}>{vendorStats.signed}</div>
                            </div>
                            <FileCheck size={24} style={{ color: 'var(--accent-green)', opacity: 0.8 }} />
                        </div>
                        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mangler / Forhandling</span>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-amber)', marginTop: '4px' }}>{vendorStats.pendingOrMissing}</div>
                            </div>
                            <Clock size={24} style={{ color: 'var(--accent-amber)', opacity: 0.8 }} />
                        </div>
                        <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tredjelandsoverføring</span>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>{vendorStats.thirdCountry}</div>
                            </div>
                            <Globe size={24} style={{ color: 'var(--accent-primary)', opacity: 0.8 }} />
                        </div>
                    </div>

                    {/* Filter Bar & Add Button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '300px', flexWrap: 'wrap' }}>
                            <div style={{ position: 'relative', minWidth: '220px', flex: 1 }}>
                                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ paddingLeft: '32px', width: '100%', fontSize: '12px' }}
                                    placeholder="Søk i leverandører, tjenester, land..."
                                    value={vendorSearch}
                                    onChange={e => setVendorSearch(e.target.value)}
                                />
                            </div>

                            <select
                                className="risk-input"
                                style={{ width: 'auto', fontSize: '12px' }}
                                value={filterDpa}
                                onChange={e => setFilterDpa(e.target.value)}
                            >
                                <option value="all">Alle DPA-statuser</option>
                                <option value="Signert">Signert</option>
                                <option value="Under forhandling">Under forhandling</option>
                                <option value="Mangler">Mangler</option>
                                <option value="Ikke relevant">Ikke relevant</option>
                            </select>

                            <select
                                className="risk-input"
                                style={{ width: 'auto', fontSize: '12px' }}
                                value={filterRisk}
                                onChange={e => setFilterRisk(e.target.value)}
                            >
                                <option value="all">Alle risikonivåer</option>
                                <option value="Lav">Lav risiko</option>
                                <option value="Moderat">Moderat risiko</option>
                                <option value="Høy">Høy risiko</option>
                            </select>
                        </div>

                        <button
                            className="risk-btn risk-btn-primary"
                            onClick={() => setEditingVendor({ ...emptyVendor })}
                        >
                            <Plus size={14} /> Registrer ny leverandør
                        </button>
                    </div>

                    {/* Vendor Table */}
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <table className="controls-table">
                            <thead>
                                <tr>
                                    <th>Leverandør</th>
                                    <th>Tjenester</th>
                                    <th style={{ width: '130px' }}>DPA Status</th>
                                    <th style={{ width: '160px' }}>DPA Avtale</th>
                                    <th style={{ width: '150px' }}>Land / Grunnlag</th>
                                    <th>Sikkerhet / Sertifisering</th>
                                    <th>IT-systemer</th>
                                    <th style={{ width: '90px' }}>Risiko</th>
                                    <th style={{ width: '80px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVendors.map(vendor => {
                                    const dpaStyle = DPA_STATUS_COLORS[vendor.dpaStatus] || DPA_STATUS_COLORS['Signert'];
                                    const riskStyle = VENDOR_RISK_COLORS[vendor.riskLevel] || VENDOR_RISK_COLORS['Lav'];
                                    
                                    // Find connected systems
                                    const connectedSystems = (state.systems || []).filter(
                                        s => (vendor.connectedSystemIds && vendor.connectedSystemIds.includes(s.id)) ||
                                             (s.leverandor && s.leverandor.toLowerCase() === vendor.name.toLowerCase())
                                    );

                                    return (
                                        <tr key={vendor.id}>
                                            <td>
                                                <div style={{ fontWeight: 600, fontSize: '13px' }}>{vendor.name}</div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                    {vendor.orgNumber ? `Org.nr: ${vendor.orgNumber}` : '—'}
                                                    {vendor.contactPerson ? ` · ${vendor.contactPerson}` : ''}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '12px', maxWidth: '240px', lineHeight: 1.4 }}>
                                                    {vendor.servicesDelivered || '—'}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="status-badge" style={{
                                                    background: dpaStyle.bg,
                                                    color: dpaStyle.text,
                                                    borderColor: 'transparent',
                                                    fontSize: '11px',
                                                    fontWeight: 600
                                                }}>
                                                    {vendor.dpaStatus}
                                                </span>
                                            </td>
                                            <td>
                                                {vendor.dpaLink ? (
                                                    <a
                                                        href={vendor.dpaLink.startsWith('http') ? vendor.dpaLink : `https://${vendor.dpaLink}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                            fontSize: '12px', color: 'var(--accent-teal)', textDecoration: 'none', fontWeight: 500
                                                        }}
                                                    >
                                                        <FileText size={13} /> Åpne DPA <ExternalLink size={11} />
                                                    </a>
                                                ) : (
                                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ingen lenke</span>
                                                )}
                                                {vendor.dpaReviewDate && (
                                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                        Neste rev: {vendor.dpaReviewDate}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div style={{ fontSize: '12px', fontWeight: 500 }}>{vendor.country || 'Norge'}</div>
                                                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                                                    {vendor.transferBasis === 'EU_EOS' && 'EU/EØS'}
                                                    {vendor.transferBasis === 'Adequacy_DPF' && 'USA (DPF)'}
                                                    {vendor.transferBasis === 'SCC' && 'Standardavtaler (SCC)'}
                                                    {vendor.transferBasis === 'Unntak' && 'Spesialunntak'}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                    {vendor.securityCertifications && vendor.securityCertifications.length > 0 ? (
                                                        vendor.securityCertifications.map((cert, idx) => (
                                                            <span key={idx} style={{
                                                                fontSize: '10px', fontWeight: 600, padding: '1px 5px', borderRadius: '3px',
                                                                background: 'var(--bg-tertiary)', border: '1px solid var(--border)'
                                                            }}>
                                                                {cert}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>—</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                    {connectedSystems.length > 0 ? (
                                                        connectedSystems.map(sys => (
                                                            <span key={sys.id} className="domain-tag domain-technological" style={{ fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                                                <Database size={9} /> {sys.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ingen systemer</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="status-badge" style={{
                                                    background: riskStyle.bg,
                                                    color: riskStyle.text,
                                                    borderColor: 'transparent',
                                                    fontSize: '10px',
                                                    fontWeight: 600
                                                }}>
                                                    {vendor.riskLevel}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                                                    <button
                                                        className="risk-btn-icon"
                                                        title="Rediger leverandør"
                                                        onClick={() => setEditingVendor({ ...vendor })}
                                                    >
                                                        <Edit3 size={13} />
                                                    </button>
                                                    <button
                                                        className="risk-btn-icon"
                                                        title="Slett leverandør"
                                                        onClick={() => setConfirmDeleteVendorId(vendor.id)}
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {filteredVendors.length === 0 && (
                                    <tr>
                                        <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            <Building2 size={28} style={{ opacity: 0.3, margin: '0 auto 8px' }} />
                                            <p style={{ fontSize: '13px' }}>Ingen leverandører funnet med valgte filtre.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                ADD / EDIT VENDOR MODAL
               ═══════════════════════════════════════════════════════════════ */}
            {editingVendor && (
                <div className="risk-modal-overlay" onClick={() => setEditingVendor(null)}>
                    <div className="risk-modal card" style={{ maxWidth: '680px', width: '92vw', maxHeight: '88vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '8px',
                                    background: 'rgba(13, 148, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--accent-teal)'
                                }}>
                                    <Building2 size={18} />
                                </div>
                                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
                                    {editingVendor.id ? 'Rediger leverandør & DPA' : 'Registrer ny leverandør'}
                                </h3>
                            </div>
                            <button className="risk-btn-icon" onClick={() => setEditingVendor(null)}>
                                <X size={16} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="risk-label">Leverandørnavn *</label>
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="F.eks. Microsoft Ireland Operations, AWS, Sopra Steria"
                                    value={editingVendor.name}
                                    onChange={e => setEditingVendor({ ...editingVendor, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="risk-label">Organisasjonsnummer</label>
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="F.eks. 980 500 585"
                                    value={editingVendor.orgNumber || ''}
                                    onChange={e => setEditingVendor({ ...editingVendor, orgNumber: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="risk-label">Land / Jurisdiksjon</label>
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="F.eks. Norge, Irland (EU), USA"
                                    value={editingVendor.country}
                                    onChange={e => setEditingVendor({ ...editingVendor, country: e.target.value })}
                                />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="risk-label">Tjenester levert / Formål</label>
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="F.eks. Skytjenester, lønnssystem, kundesenter, konsulenttjenester"
                                    value={editingVendor.servicesDelivered}
                                    onChange={e => setEditingVendor({ ...editingVendor, servicesDelivered: e.target.value })}
                                />
                            </div>

                            {/* DPA Section */}
                            <div style={{ gridColumn: '1 / -1', background: 'var(--card-inner-bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                <h4 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <FileCheck size={14} style={{ color: 'var(--accent-teal)' }} />
                                    Databehandleravtale (DPA) & Overføringsgrunnlag
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <div>
                                        <label className="risk-label">DPA Status</label>
                                        <select
                                            className="risk-input"
                                            style={{ width: '100%' }}
                                            value={editingVendor.dpaStatus}
                                            onChange={e => setEditingVendor({ ...editingVendor, dpaStatus: e.target.value as DpaStatus })}
                                        >
                                            <option value="Signert">Signert og gyldig</option>
                                            <option value="Under forhandling">Under forhandling</option>
                                            <option value="Mangler">Mangler (Krever tiltak)</option>
                                            <option value="Ikke relevant">Ikke relevant</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="risk-label">Overføringsgrunnlag (GDPR kap. V)</label>
                                        <select
                                            className="risk-input"
                                            style={{ width: '100%' }}
                                            value={editingVendor.transferBasis || 'EU_EOS'}
                                            onChange={e => setEditingVendor({ ...editingVendor, transferBasis: e.target.value as OverforingsGrunnlag })}
                                        >
                                            <option value="EU_EOS">EU/EØS (Ingen tredjelands-overføring)</option>
                                            <option value="Adequacy_DPF">USA (EU-U.S. Data Privacy Framework)</option>
                                            <option value="SCC">Standard Contractual Clauses (SCC / Standardklausuler)</option>
                                            <option value="Unntak">Spesialunntak (Art. 49)</option>
                                        </select>
                                    </div>

                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label className="risk-label">Lenke til Databehandleravtale</label>
                                        <input
                                            type="text"
                                            className="risk-input"
                                            style={{ width: '100%' }}
                                            placeholder="URL til signert DPA i SharePoint, Public Trust Center eller arkiv"
                                            value={editingVendor.dpaLink || ''}
                                            onChange={e => setEditingVendor({ ...editingVendor, dpaLink: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="risk-label">DPA Signeringsdato</label>
                                        <input
                                            type="date"
                                            className="risk-input"
                                            style={{ width: '100%' }}
                                            value={editingVendor.dpaSignDate || ''}
                                            onChange={e => setEditingVendor({ ...editingVendor, dpaSignDate: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="risk-label">Neste avtalegjennomgang</label>
                                        <input
                                            type="date"
                                            className="risk-input"
                                            style={{ width: '100%' }}
                                            value={editingVendor.dpaReviewDate || ''}
                                            onChange={e => setEditingVendor({ ...editingVendor, dpaReviewDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info & Risk */}
                            <div>
                                <label className="risk-label">Kontaktperson</label>
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="Navn på kontaktperson"
                                    value={editingVendor.contactPerson || ''}
                                    onChange={e => setEditingVendor({ ...editingVendor, contactPerson: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="risk-label">Kontakt e-post / DPO</label>
                                <input
                                    type="email"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="privacy@leverandor.no"
                                    value={editingVendor.contactEmail || ''}
                                    onChange={e => setEditingVendor({ ...editingVendor, contactEmail: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="risk-label">Leverandørrisiko</label>
                                <select
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    value={editingVendor.riskLevel}
                                    onChange={e => setEditingVendor({ ...editingVendor, riskLevel: e.target.value as LeverandorRisiko })}
                                >
                                    <option value="Lav">Lav risiko (Godkjent standardleverandør)</option>
                                    <option value="Moderat">Moderat risiko (Følges opp årlig)</option>
                                    <option value="Høy">Høy risiko (Krever skjerpede sikkerhetstiltak)</option>
                                </select>
                            </div>

                            <div>
                                <label className="risk-label">Sikkerhetssertifiseringer (komma-separert)</label>
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="ISO 27001, SOC 2 Type II, ISAE 3402"
                                    value={(editingVendor.securityCertifications || []).join(', ')}
                                    onChange={e => setEditingVendor({
                                        ...editingVendor,
                                        securityCertifications: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                    })}
                                />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="risk-label">Underdatabehandlere (komma-separert)</label>
                                <input
                                    type="text"
                                    className="risk-input"
                                    style={{ width: '100%' }}
                                    placeholder="F.eks. Amazon Web Services, Cloudflare Inc, Twilio"
                                    value={(editingVendor.subProcessors || []).join(', ')}
                                    onChange={e => setEditingVendor({
                                        ...editingVendor,
                                        subProcessors: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                    })}
                                />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="risk-label">Tilknyttede IT-systemer i virksomheten</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '100px', overflowY: 'auto', padding: '6px', border: '1px solid var(--border)', borderRadius: '6px' }}>
                                    {(state.systems || []).map(sys => {
                                        const isConnected = (editingVendor.connectedSystemIds || []).includes(sys.id);
                                        return (
                                            <label
                                                key={sys.id}
                                                style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                    padding: '3px 8px', borderRadius: '4px', fontSize: '11px',
                                                    background: isConnected ? 'rgba(13, 148, 136, 0.15)' : 'var(--bg-tertiary)',
                                                    border: `1px solid ${isConnected ? 'var(--accent-teal)' : 'var(--border)'}`,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isConnected}
                                                    onChange={e => {
                                                        const cur = new Set(editingVendor.connectedSystemIds || []);
                                                        if (e.target.checked) cur.add(sys.id);
                                                        else cur.delete(sys.id);
                                                        setEditingVendor({ ...editingVendor, connectedSystemIds: Array.from(cur) });
                                                    }}
                                                />
                                                {sys.name}
                                            </label>
                                        );
                                    })}
                                    {(state.systems || []).length === 0 && (
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ingen IT-systemer registrert ennå.</span>
                                    )}
                                </div>
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="risk-label">Notater & Revisjonsmerknader</label>
                                <textarea
                                    className="risk-input"
                                    rows={2}
                                    style={{ width: '100%' }}
                                    placeholder="Revisjonsmerknader, særskilte sikkerhetskrav eller vilkår..."
                                    value={editingVendor.notes || ''}
                                    onChange={e => setEditingVendor({ ...editingVendor, notes: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                            <button className="risk-btn" onClick={() => setEditingVendor(null)}>
                                Avbryt
                            </button>
                            <button
                                className="risk-btn risk-btn-primary"
                                disabled={!editingVendor.name.trim()}
                                onClick={() => {
                                    if (!editingVendor.name.trim()) return;
                                    if (editingVendor.id) {
                                        updateVendor(editingVendor as Vendor);
                                    } else {
                                        addVendor(editingVendor);
                                    }
                                    setEditingVendor(null);
                                }}
                            >
                                <Check size={14} /> {editingVendor.id ? 'Lagre endringer' : 'Opprett leverandør'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDeleteVendorId && (
                <div className="risk-modal-overlay" onClick={() => setConfirmDeleteVendorId(null)}>
                    <div className="risk-modal card" style={{ maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>Slett leverandør?</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                            Er du sikker på at du vil fjerne denne leverandøren og tilhørende DPA-oppfølging fra registeret?
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button className="risk-btn" onClick={() => setConfirmDeleteVendorId(null)}>Avbryt</button>
                            <button
                                className="risk-btn"
                                style={{ background: 'var(--accent-red)', color: '#fff', border: 'none' }}
                                onClick={() => {
                                    deleteVendor(confirmDeleteVendorId);
                                    setConfirmDeleteVendorId(null);
                                }}
                            >
                                Slett
                            </button>
                        </div>
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
