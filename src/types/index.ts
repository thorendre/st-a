export type ImplementationStatus = 'Not Started' | 'Planning' | 'In Progress' | 'Implemented' | 'Not Applicable';

export interface GuidanceStep {
    id: string;
    title: string;
    description: string;
    auditEvidence?: string;
}

export interface RegulationControl {
    id: string;
    domain: string;
    title: string;
    titleNo?: string;
    description: string;
    descriptionNo?: string;
    guidance: GuidanceStep[];
}

// Legacy alias
export type ISOControl = RegulationControl & {
    mappedNistIds: string[];
    mappedNsmIds: string[];
};

export interface ControlAssessment {
    controlId: string;
    status: ImplementationStatus;
    notes: string;
    completedSteps: string[];
    lastUpdated: string;
}

export type ModuleId = 'overview' | 'controls' | 'nsm' | 'nist' | 'soc2' | 'dora' | 'nis2' | 'risk' | 'systems' | 'privacy' | 'documents' | 'about';
export type ModuleConfig = Record<ModuleId, boolean>;

export interface ProjectState {
    companyName: string;
    assessments: Record<string, ControlAssessment>;
    documentAnswers: Record<string, string>;
    systems: ITSystem[];
    personvernVurderinger: Record<string, PersonvernVurdering>;
    vendors: Vendor[];
}

// ─── Vendor / Supplier Inventory Types ───
export type DpaStatus = 'Signert' | 'Under forhandling' | 'Mangler' | 'Ikke relevant';
export type OverforingsGrunnlag = 'EU_EOS' | 'SCC' | 'Adequacy_DPF' | 'Unntak';
export type LeverandorRisiko = 'Lav' | 'Moderat' | 'Høy';

export interface Vendor {
    id: string;
    name: string;
    orgNumber?: string;
    contactPerson?: string;
    contactEmail?: string;
    servicesDelivered: string;
    dpaStatus: DpaStatus;
    dpaLink?: string;
    dpaSignDate?: string;
    dpaReviewDate?: string;
    country: string;
    transferBasis?: OverforingsGrunnlag;
    subProcessors?: string[];
    securityCertifications?: string[];
    riskLevel: LeverandorRisiko;
    connectedSystemIds: string[];
    notes?: string;
}

// ─── System Inventory Types ───
export type Driftsmodell = 'SaaS' | 'PaaS' | 'IaaS' | 'On-Premise' | 'Ekstern leverandør';
export type KonfidensialitetsKlasse = 'Offentlig' | 'Intern' | 'Konfidensiell' | 'Strengt konfidensiell';

export interface ITSystem {
    id: string;
    name: string;
    description: string;
    systemOwner: string;
    driftsmodell: Driftsmodell;
    leverandor: string;
    konfidensialitet: KonfidensialitetsKlasse;
    tilknyttetRisikoProsjektId?: string;
    
    // Privacy fields (filled in by system owner)
    behandlerPersonopplysninger: boolean;
    personopplysningerTyper?: string[]; // e.g. ['Navn', 'E-post', 'Fødselsnummer', 'Helsedata']
    registrerteKategorier?: string[]; // e.g. ['Ansatte', 'Kunder']
    formalsBeskrivelse?: string;
}

// ─── Privacy Module Types ───
export type PersonvernStatus = 'waiting_on_owner' | 'under_review' | 'action_required' | 'approved';
export type RettsligGrunnlag = 'Samtykke' | 'Avtale' | 'Rettslig_forpliktelse' | 'Berettiget_interesse' | 'Vitale_interesser' | 'Allmenn_interesse';

export interface PersonvernVurdering {
    systemId: string;
    status: PersonvernStatus;
    rettsligGrunnlag?: RettsligGrunnlag;
    databehandlerAvtaleSignert: 'Ja' | 'Nei' | 'Ikke_relevant';
    databehandlerAvtaleLenke?: string;
    dpiaPakrevd: boolean;
    dpiaGodkjent: boolean;
    dpiaRisikoProsjektId?: string;
    informertRegistrerte: boolean;
    sletterutineEtablert: boolean;
    slettefristBeskrivelse?: string;
    dpoKommentarer?: string;
    sistVurdertAvDpo?: string;
}

// ─── Risk Assessment Types ───

export type Likelihood = 1 | 2 | 3 | 4 | 5;
export type Consequence = 1 | 2 | 3 | 4 | 5;
export type RiskStatus = 'open' | 'mitigated' | 'accepted' | 'closed';
export type RiskScope = 'system_specific' | 'inherited_platform' | 'inherited_baseline';

export interface Risk {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    threat: string;
    vulnerability: string;
    likelihood: Likelihood;
    consequence: Consequence;
    kScore: Consequence;
    iScore: Consequence;
    tScore: Consequence;
    aScore: Consequence;
    existingControls: string;
    plannedControls: string;
    owner: string;
    status: RiskStatus;
    residualLikelihood?: Likelihood;
    residualConsequence?: Consequence;
    jiraIssueKey?: string;
    jiraStatus?: string;
    scope?: RiskScope;
    inheritedFrom?: string;
    inheritedMitigationDetails?: string;
}

export interface RiskCategory {
    id: string;
    name: string;
    nameNn?: string;
    description: string;
    descriptionNn?: string;
    isDefault: boolean;
    enabled: boolean;
    risks: Risk[];
}

export interface RiskProject {
    id: string;
    name: string;
    description: string;
    systemId?: string; // Linked system ID
    jiraEpicKey?: string;
    jiraEpicUrl?: string;
    baselinePlatformId?: string;
    baselinePlatformName?: string;
    baselineFrameworksLinked?: boolean;
    createdAt: string;
    updatedAt: string;
    categories: RiskCategory[];
}

export interface JiraConfig {
    enabled: boolean;
    baseUrl: string;
    projectKey: string;
    autoCreateTasks: boolean;
}

export interface RiskStore {
    projects: RiskProject[];
    activeProjectId: string | null;
}
