import { RiskCategory } from '../types';

// ═══════════════════════════════════════════════════════════════════
//  RISK BANK — individual risks users can pick from when adding
// ═══════════════════════════════════════════════════════════════════

export interface RiskBankEntry {
    id: string;
    bankId: string;       // which bank this belongs to
    title: string;
    description: string;
    threat: string;
    vulnerability: string;
    likelihood: 1 | 2 | 3 | 4 | 5;
    consequence: 1 | 2 | 3 | 4 | 5;
    kScore: 1 | 2 | 3 | 4 | 5;
    iScore: 1 | 2 | 3 | 4 | 5;
    tScore: 1 | 2 | 3 | 4 | 5;
    aScore: 1 | 2 | 3 | 4 | 5;
    existingControls: string;
    plannedControls: string;
}

export interface RiskBank {
    id: string;
    name: string;
    description: string;
    entries: RiskBankEntry[];
}

// ─── Risk Bank 1: OpenShift / Container-plattform ───
const bankOpenShift: RiskBank = {
    id: 'bank-openshift',
    name: 'OpenShift / Container-plattform',
    description: 'Typiske risikoer for applikasjoner som kjører på OpenShift/Kubernetes.',
    entries: [
        {
            id: 'rb-os-1', bankId: 'bank-openshift',
            title: 'Sårbarheter i container-images',
            description: 'Container-images med kjente CVE-er kan gi angripere fotfeste i klyngen og tilgang til sensitive data.',
            threat: 'Ekstern angriper via supply chain',
            vulnerability: 'Manglende sårbarhetsskanning, bruk av utdaterte base-images',
            likelihood: 4, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-os-2', bankId: 'bank-openshift',
            title: 'Privilegieeskalering i pods',
            description: 'En kompromittert container kan eskalere privilegier og få tilgang til vertsnoden eller andre workloads.',
            threat: 'Kompromittert applikasjon / insider',
            vulnerability: 'Kjøring som root, manglende SecurityContext, svake PodSecurity-policyer',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-os-3', bankId: 'bank-openshift',
            title: 'Hemmelighetslekkasje fra Secrets/ConfigMaps',
            description: 'Kubernetes Secrets eksponert via env-variabler, logging eller utilstrekkelig RBAC kan lede til kompromittering.',
            threat: 'Intern/ekstern angriper',
            vulnerability: 'Secrets i klartekst, manglende kryptering at rest, for vide RBAC-roller',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-os-4', bankId: 'bank-openshift',
            title: 'RBAC-feilkonfigurasjon',
            description: 'For vide ClusterRole/RoleBindings kan gi brukere eller service accounts uønsket tilgang.',
            threat: 'Innsidetrussel / kompromittert tjenestekonto',
            vulnerability: 'Manglende least-privilege, ingen periodisk gjennomgang av RBAC',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-os-5', bankId: 'bank-openshift',
            title: 'Supply chain-angrep via CI/CD-pipeline',
            description: 'Kompromittert byggemiljø eller avhengigheter kan injisere ondsinnet kode i deployment-artefakter.',
            threat: 'Avansert vedvarende trussel (APT)',
            vulnerability: 'Manglende signering av images, utilsikret CI/CD',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-os-6', bankId: 'bank-openshift',
            title: 'Nettverkspolicy-feil i klyngen',
            description: 'Manglende eller feilkonfigurerte NetworkPolicies kan tillate lateral bevegelse mellom namespaces.',
            threat: 'Ekstern angriper etter initial kompromittering',
            vulnerability: 'Flat nettverksstruktur i klyngen, ingen mikrosegmentering',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-os-7', bankId: 'bank-openshift',
            title: 'Personvernrisiko – logging av personopplysninger',
            description: 'Applikasjonslogger kan inneholde personopplysninger som lagres uten tilstrekkelig beskyttelse eller slettingsrutiner.',
            threat: 'Brudd på GDPR/personvernlovgivning',
            vulnerability: 'Manglende dataminimering i logging, lang oppbevaringstid',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-os-8', bankId: 'bank-openshift',
            title: 'Ressursuttømming (DDoS/noisy neighbor)',
            description: 'Manglende resource limits kan gjøre at én pod tar alle ressurser og påvirker andre tjenester.',
            threat: 'Feilkonfigurasjon / ekstern DDoS',
            vulnerability: 'Manglende ResourceQuotas og LimitRanges',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3,
            existingControls: '',  plannedControls: '',
        },
    ],
};

// ─── Risk Bank 2: SaaS-tjenester ───
const bankSaaS: RiskBank = {
    id: 'bank-saas',
    name: 'SaaS-tjenester',
    description: 'Typiske risikoer for programvare som leveres som SaaS (Software as a Service).',
    entries: [
        {
            id: 'rb-saas-1', bankId: 'bank-saas',
            title: 'Leverandørlåsing og avhengighet',
            description: 'Sterk avhengighet av en SaaS-leverandør gjør det vanskelig å bytte og skaper kontinuitetsrisiko.',
            threat: 'Leverandørkonkurs / prisøkning / tjenesteendring',
            vulnerability: 'Manglende exit-strategi, proprietære dataformater',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-saas-2', bankId: 'bank-saas',
            title: 'Datasuverenitet og jurisdiksjon',
            description: 'Data lagret hos SaaS-leverandør kan være underlagt utenlandsk lovgivning (f.eks. US CLOUD Act).',
            threat: 'Juridisk/regulatorisk risiko',
            vulnerability: 'Manglende kontroll over datalokasjoner, uklare databehandleravtaler',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-saas-3', bankId: 'bank-saas',
            title: 'Utilstrekkelig tilgangsstyring (IAM)',
            description: 'Svakheter i SaaS-leverandørens IAM eller manglende SSO/SCIM-integrasjon kan gi uautorisert tilgang.',
            threat: 'Ekstern angriper / tidligere ansatte',
            vulnerability: 'Manglende SSO-integrasjon, svake passordkrav, ingen MFA',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-saas-4', bankId: 'bank-saas',
            title: 'API-integrasjonssårbarheter',
            description: 'SaaS-tjenester eksponerer ofte API-er som kan misbrukes ved svak autentisering eller autorisering.',
            threat: 'Ekstern angriper',
            vulnerability: 'Svake API-nøkler, manglende token-rotasjon, utilstrekkelig rate limiting',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-saas-5', bankId: 'bank-saas',
            title: 'Personvern – databehandleravtale og DPIA',
            description: 'Manglende eller utilstrekkelig databehandleravtale kan føre til brudd på GDPR ved behandling av personopplysninger.',
            threat: 'Regulatorisk sanksjon / datatilsynet',
            vulnerability: 'Manglende DPA, ikke gjennomført DPIA for SaaS-tjenesten',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-saas-6', bankId: 'bank-saas',
            title: 'Manglende logging og innsyn',
            description: 'SaaS-leverandør gir ikke tilstrekkelig audit-logging, noe som vanskeliggjør hendelsesdeteksjon og forensics.',
            threat: 'Uoppdaget kompromittering',
            vulnerability: 'Begrenset logging-API, manglende integrasjon med virksomhetens SIEM',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-saas-7', bankId: 'bank-saas',
            title: 'Datatap ved tjenesteavbrudd',
            description: 'SaaS-nedetid uten tilstrekkelig backup kan føre til tap av virksomhetskritiske data.',
            threat: 'Leverandørfeil / teknisk svikt',
            vulnerability: 'Manglende lokal backup av SaaS-data, ingen BCP for SaaS-avhengigheter',
            likelihood: 2, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-saas-8', bankId: 'bank-saas',
            title: 'Shadow IT – uautorisert SaaS-bruk',
            description: 'Ansatte tar i bruk SaaS-tjenester uten IT-godkjenning, noe som kan eksponere virksomhetsdata.',
            threat: 'Intern bruker / menneskelig feil',
            vulnerability: 'Manglende SaaS-governance, ingen CASB',
            likelihood: 4, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3,
            existingControls: '',  plannedControls: '',
        },
    ],
};

// ─── Risk Bank 3: VM / Deployed tjenester (utenom OpenShift) ───
const bankVM: RiskBank = {
    id: 'bank-vm',
    name: 'VM / Virtuelle maskiner og servere',
    description: 'Typiske risikoer for programvare og tjenester som kjører på virtuelle maskiner (VM) utenom container-plattformen.',
    entries: [
        {
            id: 'rb-vm-1', bankId: 'bank-vm',
            title: 'Uoppdatert operativsystem',
            description: 'VM-er med utdatert OS mangler sikkerhetsoppdateringer og er sårbare for kjente exploits.',
            threat: 'Ekstern angriper',
            vulnerability: 'Manglende patching-rutiner, ingen automatisert oppdatering',
            likelihood: 4, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-vm-2', bankId: 'bank-vm',
            title: 'Svak nettverkssegmentering',
            description: 'VM-er i flat nettverksstruktur kan tillate lateral bevegelse etter initial kompromittering.',
            threat: 'Ekstern/intern angriper',
            vulnerability: 'Manglende VLAN-segmentering, for vide brannmurregler',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-vm-3', bankId: 'bank-vm',
            title: 'Feilkonfigurasjon av tjenester',
            description: 'Standard-konfigurasjoner på VM-baserte tjenester kan eksponere porter, API-er eller admin-grensesnitt.',
            threat: 'Menneskelig feil / ekstern skanning',
            vulnerability: 'Ingen hardening-sjekkliste, manglende CIS-benchmarking',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-vm-4', bankId: 'bank-vm',
            title: 'Kompromittert remote-tilgang (SSH/RDP)',
            description: 'Direkte SSH- eller RDP-tilgang fra internett uten tilstrekkelig sikring kan utnyttes av angripere.',
            threat: 'Brute-force / credential stuffing',
            vulnerability: 'Passordbasert SSH, manglende VPN/bastion, ingen fail2ban',
            likelihood: 4, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-vm-5', bankId: 'bank-vm',
            title: 'Manglende backup og gjenoppretting',
            description: 'VM-er uten regelmessig backup og testet restore-prosedyre risikerer permanent datatap.',
            threat: 'Ransomware / hardware-feil',
            vulnerability: 'Ingen automatisert backup, restore aldri testet',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-vm-6', bankId: 'bank-vm',
            title: 'Personvernrisiko – datalekkasje fra VM',
            description: 'Personopplysninger lagret på VM uten tilstrekkelig tilgangskontroll og kryptering kan bli eksponert.',
            threat: 'Datainnbrudd / intern lekkasje',
            vulnerability: 'Ukrypterte disker, for vid tilgang, manglende DLP',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-vm-7', bankId: 'bank-vm',
            title: 'Utilstrekkelig logging og overvåking',
            description: 'Manglende sentralisert logging fra VM-er gjør det vanskelig å oppdage sikkerhetshendelser.',
            threat: 'Uoppdaget angrep',
            vulnerability: 'Ingen log-forwarding, manglende SIEM-integrasjon',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3,
            existingControls: '',  plannedControls: '',
        },
        {
            id: 'rb-vm-8', bankId: 'bank-vm',
            title: 'Skadevare og endepunktbeskyttelse',
            description: 'VM-er uten endepunktbeskyttelse (EDR/antivirus) er sårbare for malware-infeksjon.',
            threat: 'Ekstern angriper / phishing',
            vulnerability: 'Manglende EDR, utdaterte signaturer',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
            existingControls: '',  plannedControls: '',
        },
    ],
};

export const riskBanks: RiskBank[] = [bankOpenShift, bankSaaS, bankVM];

// ═══════════════════════════════════════════════════════════════════
//  NSM GRUNNPRINSIPPER – de 15 viktigste (Prioritetsgruppe 1)
//  Disse legges inn som standard-kategori i alle nye prosjekter.
//  Status: «mitigated» (grunnlaget er oppfylt for virksomheten).
// ═══════════════════════════════════════════════════════════════════

export const nsmCategory: RiskCategory = {
    id: 'cat-nsm-15',
    name: 'NSM Grunnprinsipper – 15 prioriterte tiltak',
    description: 'NSMs 15 prioriterte sikkerhetstiltak (Prioritetsgruppe 1). Disse representerer et solid nasjonalt cybersikkerhetsfundament virksomheten har på plass som baseline.',
    isDefault: true,
    enabled: true,
    risks: [
        {
            id: 'nsm-1', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '1. Kartlegg enheter i bruk (Tiltak 1.2.3)',
            description: 'Ha fullstendig og automatisert oversikt over alle enheter (servere, klienter, nettverksutstyr, IoT) i virksomheten.',
            threat: 'Ukjente og usikrede enheter på nettverket',
            vulnerability: 'Manglende enhetsregister, ingen automatisert oppdagelse eller CMDB',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: 'CMDB / automatisert enhetsoppdagelse', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-2', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '2. Kartlegg programvare i bruk (Tiltak 1.2.4)',
            description: 'Ha fullstendig oversikt over all installert programvare, versjoner, skytjenester og containere i produksjon.',
            threat: 'Uautorisert eller sårbar programvare med kjente sårbarheter',
            vulnerability: 'Manglende programvareregister, ingen applikasjonskontroll',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: 'Software inventory / SBOM / applikasjonsstyring', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-3', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '3. Kartlegg brukerkontoer og tilganger (Tiltak 1.3.1)',
            description: 'Ha kontroll over alle brukerkontoer, tjenestekontoer og tilgangsrettigheter basert på tjenstlig behov.',
            threat: 'Uautorisert tilgang, passive kontoer eller rettigheter fra fratrådte ansatte',
            vulnerability: 'Utdaterte tilgangsmatriser, manglende periodisk tilgangsrevisjon',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'Sentral identitetsstyring (IAM) / tilgangsgjennomganger', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-4', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '4. Sikkerhetskrav ved anskaffelse (Tiltak 2.1.2)',
            description: 'Stille eksplisitte og verifiserbare sikkerhetskrav ved kjøp av IKT-tjenester, programvare og skytjenester.',
            threat: 'Sårbarheter og svikt i eksterne leveranser eller skytjenester',
            vulnerability: 'Mangler sikkerhetsklausuler, DPA eller revisjonskrav i innkjøpsavtaler',
            likelihood: 2, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'Standard sikkerhetsbilag i kontrakter og DPA-prosess', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-5', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '5. Sikre utviklings- og byggemiljøer (Tiltak 2.1.9)',
            description: 'Beskytte kildekode, utviklingsmiljø og CI/CD-pipelines mot uautorisert endring og supply chain-angrep.',
            threat: 'Injeksjon av ondsinnet kode i software supply chain',
            vulnerability: 'Utilsikrede byggeroboter, manglende signering av kode og containere',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'Beskyttede branches, MFA i CI/CD, hemmelighetsskanning', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-6', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '6. Nettverkssegmentering og soneskille (Tiltak 2.2.3)',
            description: 'Dele nettverk og IT-miljø inn i adskilte sikkerhetssoner med standard blokkering (default deny) mellom sonene.',
            threat: 'Lateral bevegelse fra kompromittert enhet til kritiske fagsystemer',
            vulnerability: 'Flat nettverksstruktur, åpne brannmurer uten soneskille',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'VLAN, sonemodell, brannmurpolicy med default-deny', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-7', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '7. Sentralstyrt sikkerhetsoppdatering (Tiltak 2.3.1)',
            description: 'Etablere rask, automatisert og sentralstyrt installasjon av sikkerhetsoppdateringer (patch management).',
            threat: 'Utnyttelse av kjente publiserte sårbarheter (CVE-er)',
            vulnerability: 'Utdaterte operativsystemer eller applikasjoner som ikke patches jevnlig',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'Automatisert patch-styring med fast SLA for kritiske oppdateringer', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-8', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '8. Sikker grunnkonfigurasjon og herding (Tiltak 2.3.2)',
            description: 'Konfigurere servere, containere, skytjenester og klienter etter anerkjente herdestandarder (CIS Benchmarks).',
            threat: 'Angripere utnytter usikre standardinnstillinger',
            vulnerability: 'Bruk av standardkonfigurasjoner fra produsent',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'Herdede baselines via GPO/Intune/IaC og periodisk kontroll', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-9', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '9. Deaktiver unødvendige tjenester og porter (Tiltak 2.3.3)',
            description: 'Fjerne unødvendig programvare, åpne porter, utdaterte protokoller og standardkontoer for å minimere angrepsflaten.',
            threat: 'Eksponerte sårbare tjenester som angripere kan nå utenfra',
            vulnerability: 'Unødvendige åpne lytteporter eller aktiverte eldre protokoller',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'Portskanning, minimalt OS-avtrykk, stenging av ubrukte porter', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-10', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '10. Flerfaktorautentisering (MFA) (Tiltak 2.3.7)',
            description: 'Håndheve sterk flerfaktorautentisering (MFA) for alle brukere på all ekstern pålogging og tilgang til skytjenester.',
            threat: 'Passordtyveri, phishing og credential stuffing',
            vulnerability: 'Bruk av enkle passord uten ekstra sikkerhetsfaktor',
            likelihood: 2, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: 'Conditional Access med 100% MFA-påkrav og FIDO2/app-støtte', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-11', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '11. Begrens administrative privilegier (Tiltak 2.6.1)',
            description: 'Minimere tildeling av administratorrettigheter basert på minste privilegiums prinsipp; fjern lokaladmin på klienter.',
            threat: 'Privilegieeskalering og full kontroll ved infeksjon på klient-PC',
            vulnerability: 'For mange ordinære brukere har faste administratorrettigheter',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: 'Fjerning av lokaladmin, minste privilegium håndhevet i IAM', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-12', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '12. Separate administratorkontoer (Tiltak 2.6.4)',
            description: 'Kreve egne, dedikerte driftskontoer for all administrasjon, helt adskilt fra e-post og generell internettbruk.',
            threat: 'Kompromittering av administrative legitimasjoner via phishing eller surfing',
            vulnerability: 'Samme brukerkonto benyttes til daglig arbeid og systemadministrasjon',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: 'Separate admin-kontoer, Privileged Identity Management (PIM)', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-13', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '13. Beskytt data i ro og transitt (Tiltak 2.8.1)',
            description: 'Kryptere data under overføring med TLS 1.2+ og ved lagring med robust industristandard kryptering (AES-256).',
            threat: 'Nettverksavlytting, tap av lagringsmedier eller uautorisert datainnsyn',
            vulnerability: 'Ukryptert trafikk i nettverket eller manglende diskkryptering',
            likelihood: 2, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: 'BitLocker/FileVault på alle klienter, TLS 1.3 tvunget på alle API-er', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-14', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '14. Beskytte e-post og nettleser (Tiltak 2.9.1)',
            description: 'Etablere strenge beskyttelsesmekanismer mot skadelig kode, phishing og spoofing via e-post og web.',
            threat: 'Phishing-angrep, skadelige vedlegg, ondsinnet kode via kompromitterte nettsider',
            vulnerability: 'Manglende SPF/DKIM/DMARC, intet innholdsfilter for e-post eller nettleser',
            likelihood: 4, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'DMARC med p=reject, skybasert e-postfiltrering, webbeskyttelse', plannedControls: '', owner: '',
        },
        {
            id: 'nsm-15', categoryId: 'cat-nsm-15', status: 'mitigated',
            title: '15. Sentralisert logg og overvåking (Tiltak 3.1.1)',
            description: 'Samle inn sikkerhetslogger fra alle kritiske komponenter til et sentralt og uforanderlig SIEM med kontinuerlig analyse.',
            threat: 'Uoppdagede cyberangrep, manglende evne til digital etterforskning',
            vulnerability: 'Ingen sentral logginnsamling, manglende alarmregler ved avvik',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'Sentralt SIEM / logghvelv med WORM-lagring og 24/7 SOC-overvåking', plannedControls: '', owner: '',
        },
    ],
};

// ═══════════════════════════════════════════════════════════════════
//  DIGDIR RISK CATEGORIES — 4 threat dimensions
// ═══════════════════════════════════════════════════════════════════

export const digdirBrukerfeilCategory: RiskCategory = {
    id: 'cat-digdir-brukerfeil',
    name: 'Digdir: Brukerfeil & Utilsiktede hendelser',
    description: 'Utilsiktede hendelser som skyldes menneskelig svikt, feilkonfigurasjon, feilaktig bruk, sletting, tap av utstyr eller manglende opplæring.',
    isDefault: true,
    enabled: true,
    risks: [
        {
            id: 'dd-bf-1', categoryId: 'cat-digdir-brukerfeil', status: 'open',
            title: 'Feilsending av sensitiv informasjon',
            description: 'Ansatte sender ved et uhell e-post med sensitive personopplysninger eller forretningsdata til feil mottaker.',
            threat: 'Menneskelig feil / utilsiktet hendelse',
            vulnerability: 'Manglende merking av e-post, ingen utsatt sending, utdatert kontaktliste',
            likelihood: 4, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: '',  plannedControls: 'Automatisk forsinkelse på e-post, opplæring, DLP-regler.', owner: ''
        },
        {
            id: 'dd-bf-2', categoryId: 'cat-digdir-brukerfeil', status: 'open',
            title: 'Feilkonfigurasjon av delingstilganger',
            description: 'Brukere oppretter delte områder (SharePoint/Teams) med for brede tilganger, slik at uvedkommende får innsyn.',
            threat: 'Menneskelig svikt / brukerfeil',
            vulnerability: 'Kompliserte tilgangsmodeller, manglende opplæring i fildeling',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: '',  plannedControls: 'Standardisere delingsinnstillinger, automatisk revisjon av eksterne tilganger.', owner: ''
        },
        {
            id: 'dd-bf-3', categoryId: 'cat-digdir-brukerfeil', status: 'open',
            title: 'Tap eller tyveri av fysiske enheter',
            description: 'Bærbare datamaskiner, mobiltelefoner eller nettbrett mistes eller stjeles, og uautoriserte får tilgang til data eller aktive sesjoner.',
            threat: 'Menneskelig feil / uaktsomhet / ekstern tyv',
            vulnerability: 'Manglende kryptering av disk, svake PIN-koder, manglende MDM-løsning',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Full diskkryptering (BitLocker/FileVault), påkrevd MFA for pålogging, MDM-løsning med mulighet for øyeblikkelig fjernsletting.', owner: ''
        },
        {
            id: 'dd-bf-4', categoryId: 'cat-digdir-brukerfeil', status: 'open',
            title: 'Utilsiktet sletting eller overskriving av data',
            description: 'Ansatte sletter kritiske data, filer eller databaser ved et uhell, noe som fører til tap av informasjon og tidsavbrudd.',
            threat: 'Menneskelig feil / feil bruk av administrasjonsverktøy',
            vulnerability: 'Manglende skrivebeskyttelse på kritiske ressurser, ingen slettebekreftelse, utilstrekkelig sikkerhetskopi',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: '',  plannedControls: 'Innføring av papirkurv/soft delete, revisjonslogger, lese-tilganger som standard, hyppig sikkerhetskopiering.', owner: ''
        },
        {
            id: 'dd-bf-5', categoryId: 'cat-digdir-brukerfeil', status: 'open',
            title: 'Mangelfull opplæring i bruk av systemer',
            description: 'Brukere mangler opplæring i nye systemer og utfører prosesser feilaktig, noe som skader dataintegriteten eller bryter sikkerhetsregler.',
            threat: 'Menneskelig feil / manglende kompetanse',
            vulnerability: 'Manglende opplæringsplaner, komplekse brukergrensesnitt, ingen brukerveiledninger',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: '',  plannedControls: 'Obligatorisk opplæring ved onboarding, lett tilgjengelig dokumentasjon, jevnlige oppfriskningskurs.', owner: ''
        }
    ]
};

export const digdirDriftCategory: RiskCategory = {
    id: 'cat-digdir-drift',
    name: 'Digdir: Driftsavbrudd & Teknisk svikt',
    description: 'Teknisk svikt i infrastruktur, maskinvare, programvare, linjebrudd, kapasitetsproblemer eller feilslåtte oppdateringer under normal drift.',
    isDefault: true,
    enabled: true,
    risks: [
        {
            id: 'dd-dr-1', categoryId: 'cat-digdir-drift', status: 'open',
            title: 'Nedetid på kritiske tjenester og infrastruktur',
            description: 'Driftsavbrudd hos skyleverandør, nettleverandør eller internt datasenter gjør at ansatte ikke får utført kritiske oppgaver.',
            threat: 'Leverandørfeil / teknisk svikt hos tredjepart',
            vulnerability: 'Manglende redundans, mangel på offline- eller reserveløsninger',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: 'SLA-avtaler med leverandører',  plannedControls: 'Redundante linjer, etablere alternative kommunikasjonskanaler og reserveprosedyrer under nedetid.', owner: ''
        },
        {
            id: 'dd-dr-2', categoryId: 'cat-digdir-drift', status: 'open',
            title: 'Tap av data ved feilende sikkerhetskopi',
            description: 'Ved systemkrasj feiler gjenopprettingen fordi sikkerhetskopieringen ikke har fungert som forutsatt.',
            threat: 'Teknisk feil under backup-prosess',
            vulnerability: 'Manglende verifisering og testing av gjenoppretting',
            likelihood: 2, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: 'Automatisert daglig backup',  plannedControls: 'Kvartalsvise gjenopprettingstester (restore-test).', owner: ''
        },
        {
            id: 'dd-dr-3', categoryId: 'cat-digdir-drift', status: 'open',
            title: 'Maskinvarefeil (Hardware-havari)',
            description: 'Fysiske servere, disker, rutere eller annet nettverksutstyr feiler og stopper driften av kritiske systemer.',
            threat: 'Teknisk slitasje / maskinvarefeil',
            vulnerability: 'Gammelt utstyr, manglende redundans (SPOF - Single Point of Failure)',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Redundante maskinvarekomponenter (RAID, doble strømforsyninger), serviceavtaler med rask responstid, livssyklushåndtering av utstyr.', owner: ''
        },
        {
            id: 'dd-dr-4', categoryId: 'cat-digdir-drift', status: 'open',
            title: 'Feilslått oppdatering eller systemendring',
            description: 'En ny programvareoppdatering eller systemkonfigurasjon rulles ut og forårsaker uforutsett nedetid eller datakorrupsjon i produksjon.',
            threat: 'Teknisk feilkonfigurasjon / mangelfull testing',
            vulnerability: 'Manglende testmiljø, ingen formell endringsstyring, manglende rollback-plan',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Formell endringsstyring (Change Management), obligatorisk testing i testmiljø før produksjon, utarbeidelse av rollback-plan.', owner: ''
        },
        {
            id: 'dd-dr-5', categoryId: 'cat-digdir-drift', status: 'open',
            title: 'Kapasitetsproblemer og ressursuttømming',
            description: 'Systemet blir utilgjengelig eller ekstremt tregt på grunn av uventet høy trafikk eller ressurslekkasjer (minne/CPU).',
            threat: 'Teknisk svikt / uforutsett belastning',
            vulnerability: 'Manglende ressursbegrensninger, utilstrekkelig overvåking og auto-skalering',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: '',  plannedControls: 'Kontinuerlig ytelsesovervåking (APM), ressurskvoter i skyen, auto-skalering, stresstesting av applikasjonen.', owner: ''
        }
    ]
};

export const digdirEksternCategory: RiskCategory = {
    id: 'cat-digdir-ekstern',
    name: 'Digdir: Eksterne trusler & Angrep',
    description: 'Målrettede eller tilfeldige angrep fra eksterne aktører (phishing, skadevare, hacking, DDoS-angrep, løsepengevirus eller supply-chain angrep).',
    isDefault: true,
    enabled: true,
    risks: [
        {
            id: 'dd-ek-1', categoryId: 'cat-digdir-ekstern', status: 'open',
            title: 'Phishing og identitetstyveri',
            description: 'Ansatte lures via e-post til å oppgi legitimasjon på falske innloggingssider, som leder til kontokompromittering.',
            threat: 'Ekstern trusselaktør / cyberkriminelle',
            vulnerability: 'Manglende tofaktorautentisering (MFA), lav bevissthet hos ansatte',
            likelihood: 4, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Tvinge MFA på alle tjenester, phishing-simuleringer og bevissthetstrening for ansatte.', owner: ''
        },
        {
            id: 'dd-ek-2', categoryId: 'cat-digdir-ekstern', status: 'open',
            title: 'Løsepengevirus (Ransomware-angrep)',
            description: 'Angripere utnytter upatchede sårbarheter og krypterer virksomhetens servere for å kreve løsepenger.',
            threat: 'Cyberkriminelle grupper',
            vulnerability: 'Langsom patching av sårbarheter, manglende EDR (Endepunktdeteksjon)',
            likelihood: 3, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: '',  plannedControls: 'Sårbarhetsskanning, EDR på alle enheter, immutable (uforanderlig) backup utenfor nettverket.', owner: ''
        },
        {
            id: 'dd-ek-3', categoryId: 'cat-digdir-ekstern', status: 'open',
            title: 'Tjenestenektangrep (DDoS)',
            description: 'Eksterne aktører oversvømmer virksomhetens webtjenester med trafikk, slik at de blir utilgjengelige for brukere.',
            threat: 'Hackere / aktivister / kriminelle',
            vulnerability: 'Manglende DDoS-beskyttelse, utilstrekkelig båndbredde',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: '',  plannedControls: 'Cloud-basert DDoS-beskyttelse, rate-limiting på API-er, redundant nettverkskapasitet.', owner: ''
        },
        {
            id: 'dd-ek-4', categoryId: 'cat-digdir-ekstern', status: 'open',
            title: 'Utnyttelse av sårbarheter i offentlige tjenester',
            description: 'Angripere skanner virksomhetens IP-adresser og utnytter sjekkpunkter/sårbarheter i publiserte tjenester for å trenge inn i nettverket.',
            threat: 'Automatiserte skannere / cyberkriminelle',
            vulnerability: 'Utdatert programvare, manglende sårbarhetskartlegging, trege patch-rutiner',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Jevnlig ekstern sårbarhetsskanning, automatisk patching av kritiske sårbarheter, herding av brannmurer.', owner: ''
        },
        {
            id: 'dd-ek-5', categoryId: 'cat-digdir-ekstern', status: 'open',
            title: 'Supply-chain angrep via underleverandører',
            description: 'Ondsinnet kode injiseres i et bibliotek, API eller programvare fra en underleverandør som virksomheten benytter, og gir angripere tilgang til data.',
            threat: 'Avanserte trusselaktører (APT) / supply-chain angripere',
            vulnerability: 'Manglende kontroll på avhengigheter (dependencies), manglende sårbarhetsskanning av kodebase',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Bruk av SBOM (Software Bill of Materials), automatisert skanning av avhengigheter (Dependabot/Snyk), leverandørevalueringer.', owner: ''
        }
    ]
};

export const digdirInnsideCategory: RiskCategory = {
    id: 'cat-digdir-innside',
    name: 'Digdir: Innsidetrusler & Uautoriserte handlinger',
    description: 'Handlinger utført av interne personer med tilgang (ansatte, konsulenter), enten med overlegg (datatyveri, sabotasje) eller misbruk av tilganger og administrative rettigheter.',
    isDefault: true,
    enabled: true,
    risks: [
        {
            id: 'dd-in-1', categoryId: 'cat-digdir-innside', status: 'open',
            title: 'Uautorisert snoking i sensitive data',
            description: 'Ansatte med vide rettigheter slår opp i sensitive personopplysninger av nysgjerrighet uten tjenstlig behov.',
            threat: 'Innsidetrussel / nysgjerrig ansatt',
            vulnerability: 'Utilstrekkelig logging av oppslag, manglende tilgangsstyring (least privilege)',
            likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 3, aScore: 3, existingControls: '',  plannedControls: 'Stramme inn tilganger, innføre tilgangslogging og stikkprøvebasert etterkontroll av søkelogger.', owner: ''
        },
        {
            id: 'dd-in-2', categoryId: 'cat-digdir-innside', status: 'open',
            title: 'Datatyveri ved fratredelse',
            description: 'En ansatt som har sagt opp sin stilling kopierer med seg kundelister eller kildekode til ny arbeidsgiver.',
            threat: 'Ondsinnet innsideaktør',
            vulnerability: 'Manglende DLP (data loss prevention), forsinket stenging av kontoer',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Exit-samtale, DLP for USB/skydeling, umiddelbar sperring av brukerkontoer ved siste arbeidsdag.', owner: ''
        },
        {
            id: 'dd-in-3', categoryId: 'cat-digdir-innside', status: 'open',
            title: 'Misbruk av administrative rettigheter',
            description: 'En administrator misbruker sine utvidede rettigheter til å omgå sikkerhetsmekanismer, slette logger eller tildele uautoriserte tilganger.',
            threat: 'Betrodd administrator med uærlige hensikter',
            vulnerability: 'Manglende adskillelse av oppgaver (SoD), manglende overvåking av admin-kontoer',
            likelihood: 2, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: '',  plannedControls: 'PAM-løsning (Privileged Access Management), fire-øyne-prinsipp for kritiske endringer, uavhengig revisjonslogg.', owner: ''
        },
        {
            id: 'dd-in-4', categoryId: 'cat-digdir-innside', status: 'open',
            title: 'Sabotasje av infrastruktur eller kildekode',
            description: 'En misfornøyd ansatt eller konsulent sletter viktige data, ødelegger konfigurasjoner eller planter bakdører i kildekoden.',
            threat: 'Sabotasje fra intern aktør',
            vulnerability: 'Direkte tilgang til produksjonsmiljøer uten godkjenning, manglende beskyttelse av kildekode-repository',
            likelihood: 2, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5, existingControls: '',  plannedControls: 'Branch protection og påkrevd godkjenning av endringer (Pull Requests), isolering av produksjonsmiljøer, restriktiv tilgangskontroll.', owner: ''
        },
        {
            id: 'dd-in-5', categoryId: 'cat-digdir-innside', status: 'open',
            title: 'Sosial manipulering av nøkkelpersonell (Spear Phishing)',
            description: 'En ansatt med utvidede fullmakter blir manipulert via falske e-poster ("CEO fraud") til å utføre uautoriserte utbetalinger eller dataoverføringer.',
            threat: 'Ekstern angriper som utnytter en intern bruker',
            vulnerability: 'Manglende kontrollrutiner for uvanlige transaksjoner, svak verifisering av avsenderidentitet',
            likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4, existingControls: '',  plannedControls: 'Tofaktor-verifisering (f.eks. telefon) ved store utbetalinger eller endring av kontonummer, opplæring i sosial manipulering.', owner: ''
        }
    ]
};

// ═══════════════════════════════════════════════════════════════════
//  DEFAULT CATEGORIES — included in every new risk project
// ═══════════════════════════════════════════════════════════════════

export const defaultRiskCategories: RiskCategory[] = [
    nsmCategory,
    digdirBrukerfeilCategory,
    digdirDriftCategory,
    digdirEksternCategory,
    digdirInnsideCategory,
];
