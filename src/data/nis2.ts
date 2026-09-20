import { RegulationControl } from '../types';

export const nis2Domains = [
    'Governance & Accountability',
    'Risk Management Measures',
    'Incident Reporting',
    'Supply Chain Security',
    'Business Continuity',
    'Vulnerability Management',
    'Cybersecurity Training',
    'Cryptography & Encryption',
    'Access Control & Authentication',
    'Asset Management',
] as const;

export const nis2Controls: RegulationControl[] = [
    // ═══ GOVERNANCE & ACCOUNTABILITY (Article 20) ═══
    {
        id: 'NIS2-1', domain: 'Governance & Accountability',
        title: 'Management body approval and oversight', titleNo: 'Ledelsens godkjenning og tilsyn',
        description: 'Management bodies of essential and important entities shall approve the cybersecurity risk-management measures taken and oversee their implementation.',
        descriptionNo: 'Ledelsen i vesentlige og viktige virksomheter skal godkjenne cybersikkerhetsrisikoforvaltningstiltakene og føre tilsyn med implementeringen.',
        guidance: [
            { id: 'NIS2-1-1', title: 'Ledelsens godkjenning', description: 'Sørg for at styret/toppledelsen formelt godkjenner cybersikkerhetstiltak.', auditEvidence: 'Signerte styrevedtak eller formell godkjenningsprotokoll for virksomhetens overordnede cybersikkerhetstiltak og -policyer.' },
            { id: 'NIS2-1-2', title: 'Overvåk implementering', description: 'Etabler prosesser for ledelsens løpende tilsyn med sikkerhetstiltak.', auditEvidence: 'Møtereferater fra styre-/ledelsesmøter som bekrefter regelmessig rapportering og tilsyn med status for sikkerhetsarbeidet.' },
        ]
    },
    {
        id: 'NIS2-2', domain: 'Governance & Accountability',
        title: 'Management body cybersecurity training', titleNo: 'Ledelsens cybersikkerhetsopplæring',
        description: 'Members of management bodies shall follow training and encourage regular training for their employees.',
        descriptionNo: 'Ledelsen skal gjennomføre opplæring og oppmuntre til regelmessig opplæring for sine ansatte.',
        guidance: [
            { id: 'NIS2-2-1', title: 'Lederopplæring', description: 'Gjennomfør obligatorisk cybersikkerhetsopplæring for alle ledere.' },
            { id: 'NIS2-2-2', title: 'Ansatteopplæring', description: 'Etabler regelmessig cybersikkerhetsbevissthetsprogram for alle ansatte.' },
        ]
    },
    {
        id: 'NIS2-3', domain: 'Governance & Accountability',
        title: 'Personal liability of management', titleNo: 'Personlig ansvar for ledelsen',
        description: 'Management bodies can be held personally liable for infringements of cybersecurity risk-management measures.',
        descriptionNo: 'Ledelsen kan holdes personlig ansvarlig for brudd på cybersikkerhetsrisikoforvaltningstiltak.',
        guidance: [
            { id: 'NIS2-3-1', title: 'Dokumenter ledelsesansvar', description: 'Informer ledelsen om personlig ansvar og dokumenter at plikter oppfylles.' },
        ]
    },
 
    // ═══ RISK MANAGEMENT MEASURES (Article 21) ═══
    {
        id: 'NIS2-4', domain: 'Risk Management Measures',
        title: 'Cybersecurity risk management policies', titleNo: 'Retningslinjer for cybersikkerhetsrisikostyring',
        description: 'Entities shall take appropriate measures to manage risks posed to the security of network and information systems.',
        descriptionNo: 'Virksomheter skal treffe passende tiltak for å håndtere risikoer mot sikkerheten til nettverks- og informasjonssystemer.',
        guidance: [
            { id: 'NIS2-4-1', title: 'Utvikle risikoanalysepolicy', description: 'Etabler policy og prosedyrer for systematisk risikoanalyse av IKT-systemer.' },
            { id: 'NIS2-4-2', title: 'Implementer all-hazards approach', description: 'Dekk alle relevante trusler inkl. cybertrusler, fysiske trusler og naturhendelser.' },
        ]
    },
    {
        id: 'NIS2-5', domain: 'Risk Management Measures',
        title: 'Incident handling procedures', titleNo: 'Prosedyrer for hendelseshåndtering',
        description: 'Entities shall implement incident handling procedures for prevention, detection, response and recovery.',
        descriptionNo: 'Virksomheter skal implementere prosedyrer for hendelseshåndtering for forebygging, deteksjon, respons og gjenoppretting.',
        guidance: [
            { id: 'NIS2-5-1', title: 'Etabler hendelsesprosedyrer', description: 'Definer prosedyrer for forebygging, deteksjon, respons og gjenoppretting av hendelser.', auditEvidence: 'Godkjent prosedyre for hendelseshåndtering (Incident Response Procedure) som dekker hele hendelsens livssyklus.' },
            { id: 'NIS2-5-2', title: 'Opprett hendelsesresponsplan', description: 'Lag detaljert plan med eskaleringsveier, roller og kommunikasjonsprosedyrer.', auditEvidence: 'Hendelsesresponsplan (Incident Response Plan) med oppdaterte kontaktlister, eskaleringsmatriser og kommunikasjonsprosedyrer.' },
        ]
    },
    {
        id: 'NIS2-6', domain: 'Risk Management Measures',
        title: 'Multi-factor authentication and secure communication', titleNo: 'Flerfaktorautentisering og sikker kommunikasjon',
        description: 'Entities shall implement multi-factor authentication, secured communication channels, and secured emergency communication systems.',
        descriptionNo: 'Virksomheter skal implementere flerfaktorautentisering, sikrede kommunikasjonskanaler og sikre nødkommunikasjonssystemer.',
        guidance: [
            { id: 'NIS2-6-1', title: 'Implementer MFA', description: 'Rull ut flerfaktorautentisering for alle brukerkontoer, med prioritet på admin og fjerntilgang.' },
            { id: 'NIS2-6-2', title: 'Sikre kommunikasjonskanaler', description: 'Implementer krypterte kommunikasjonsløsninger inkludert nødkommunikasjon.' },
        ]
    },

    // ═══ INCIDENT REPORTING (Article 23) ═══
    {
        id: 'NIS2-7', domain: 'Incident Reporting',
        title: 'Significant incident notification (early warning)', titleNo: 'Varsling av vesentlig hendelse (tidlig varsling)',
        description: 'Entities shall submit an early warning within 24 hours of becoming aware of a significant incident.',
        descriptionNo: 'Virksomheter skal sende et tidlig varsel innen 24 timer etter å ha blitt kjent med en vesentlig hendelse.',
        guidance: [
            { id: 'NIS2-7-1', title: 'Etabler 24-timers førstevarsling', description: 'Definer prosess for tidlig varsling av tilsynsmyndighet innen 24 timer.', auditEvidence: 'Dokumentert varslingsrutine som bekrefter 24-timersfrist til NSM/tilsynsmyndighet, og kontaktinformasjon til relevante meldekanaler.' },
            { id: 'NIS2-7-2', title: 'Definer «vesentlig hendelse»', description: 'Etabler kriterier for hva som utgjør en vesentlig hendelse som utløser varslingsplikt.', auditEvidence: 'Klassifiseringsmatrise med terskelverdier (antall brukere, varighet, samfunnskritikalitet) som utløser rapportering.' },
        ]
    },
    {
        id: 'NIS2-8', domain: 'Incident Reporting',
        title: 'Incident notification (72h)', titleNo: 'Hendelsesvarsel (72 timer)',
        description: 'Entities shall submit an incident notification within 72 hours including an initial assessment.',
        descriptionNo: 'Virksomheter skal sende hendelsesvarsel innen 72 timer inkludert en innledende vurdering.',
        guidance: [
            { id: 'NIS2-8-1', title: 'Utarbeid hendelsesrapporten', description: 'Følg opp med full hendelsesvarsel innen 72 timer med analyse av omfang og alvorlighetsgrad.' },
        ]
    },
    {
        id: 'NIS2-9', domain: 'Incident Reporting',
        title: 'Final report', titleNo: 'Sluttrapport',
        description: 'A final report shall be submitted not later than one month after the incident notification, including root cause analysis.',
        descriptionNo: 'En sluttrapport skal leveres senest én måned etter hendelsesrapporteringen, inkludert rotårsaksanalyse.',
        guidance: [
            { id: 'NIS2-9-1', title: 'Lever sluttrapport', description: 'Utarbeid detaljert sluttrapport med rotårsaksanalyse innen én måned.' },
            { id: 'NIS2-9-2', title: 'Dokumenter forbedringstiltak', description: 'Inkluder korrigerende tiltak og plan for implementering.' },
        ]
    },
    {
        id: 'NIS2-10', domain: 'Incident Reporting',
        title: 'Inform affected service recipients', titleNo: 'Informer berørte tjenestemottakere',
        description: 'Where necessary, entities shall communicate the nature of the significant incident to the recipients of their services.',
        descriptionNo: 'Ved behov skal virksomheter kommunisere arten av den vesentlige hendelsen til mottakere av deres tjenester.',
        guidance: [
            { id: 'NIS2-10-1', title: 'Varsle berørte brukere', description: 'Definer prosedyrer for varsling av kunder/brukere ved vesentlige hendelser.' },
        ]
    },

    // ═══ SUPPLY CHAIN SECURITY (Article 21(2)(d)) ═══
    {
        id: 'NIS2-11', domain: 'Supply Chain Security',
        title: 'Supply chain security measures', titleNo: 'Sikkerhetstiltak for leverandørkjeden',
        description: 'Entities shall address security-related aspects concerning relationships with direct suppliers and service providers.',
        descriptionNo: 'Virksomheter skal adressere sikkerhetsrelaterte aspekter knyttet til relasjoner med direkte leverandører og tjenesteleverandører.',
        guidance: [
            { id: 'NIS2-11-1', title: 'Vurder leverandørrisiko', description: 'Gjennomfør sikkerhetsvurdering av alle direkte leverandører og tjenesteleverandører.', auditEvidence: 'Leverandørrisikoanalyse eller utfylte sikkerhetsspørreskjemaer fra eksterne tjenesteleverandører.' },
            { id: 'NIS2-11-2', title: 'Inkluder sikkerhet i kontrakter', description: 'Krev sikkerhetsstandarder og revisjonsrettigheter i leverandøravtaler.', auditEvidence: 'Leverandørkontrakter med definerte sikkerhetsvedlegg, datahåndteringskrav og klausuler om revisjonsrett.' },
        ]
    },
    {
        id: 'NIS2-12', domain: 'Supply Chain Security',
        title: 'ICT product and service security', titleNo: 'Sikkerhet for IKT-produkter og tjenester',
        description: 'Entities shall consider vulnerabilities specific to each direct supplier and overall quality of products.',
        descriptionNo: 'Virksomheter skal vurdere sårbarheter spesifikke for hver direkte leverandør og den samlede kvaliteten på produkter.',
        guidance: [
            { id: 'NIS2-12-1', title: 'Evaluer leverandørsikkerhet', description: 'Vurder leverandørers sikkerhetsmodenhet, sertifiseringer og sårbarhetshåndtering.' },
        ]
    },
    {
        id: 'NIS2-13', domain: 'Supply Chain Security',
        title: 'Supply chain monitoring', titleNo: 'Overvåking av leverandørkjeden',
        description: 'Entities shall continuously monitor and review the security of the supply chain.',
        descriptionNo: 'Virksomheter skal kontinuerlig overvåke og vurdere sikkerheten i leverandørkjeden.',
        guidance: [
            { id: 'NIS2-13-1', title: 'Overvåk leverandørkjeden', description: 'Etabler løpende overvåking og periodiske revisjoner av leverandørenes sikkerhet.' },
        ]
    },

    // ═══ BUSINESS CONTINUITY (Article 21(2)(c)) ═══
    {
        id: 'NIS2-14', domain: 'Business Continuity',
        title: 'Business continuity management', titleNo: 'Styring av forretningskontinuitet',
        description: 'Entities shall implement business continuity management including backup management and disaster recovery.',
        descriptionNo: 'Virksomheter skal implementere forretningskontinuitetsstyring inkludert backuphåndtering og katastrofegjenoppretting.',
        guidance: [
            { id: 'NIS2-14-1', title: 'Lag forretningskontinuitetsplan', description: 'Utvikle BCP som dekker IKT-systemer, prosesser og personell.' },
            { id: 'NIS2-14-2', title: 'Implementer backup og disaster recovery', description: 'Etabler backupprosedyrer og katastrofegjenopprettingsplaner (DRP).' },
        ]
    },
    {
        id: 'NIS2-15', domain: 'Business Continuity',
        title: 'Crisis management', titleNo: 'Krisehåndtering',
        description: 'Entities shall implement crisis management procedures to ensure effective response to major incidents.',
        descriptionNo: 'Virksomheter skal implementere krisehåndteringsprosedyrer for å sikre effektiv respons på alvorlige hendelser.',
        guidance: [
            { id: 'NIS2-15-1', title: 'Etabler krisehåndteringsprosedyrer', description: 'Definer prosedyrer for håndtering av alvorlige hendelser med tydelige roller og kommunikasjonsplaner.' },
            { id: 'NIS2-15-2', title: 'Test kriseplaner regelmessig', description: 'Gjennomfør skrivebordsøvelser og fullskala beredskapsøvelser.' },
        ]
    },

    // ═══ VULNERABILITY MANAGEMENT (Article 21(2)(e)) ═══
    {
        id: 'NIS2-16', domain: 'Vulnerability Management',
        title: 'Vulnerability handling and disclosure', titleNo: 'Sårbarhetshåndtering og offentliggjøring',
        description: 'Entities shall implement policies and procedures for vulnerability handling including coordinated vulnerability disclosure.',
        descriptionNo: 'Virksomheter skal implementere retningslinjer og prosedyrer for sårbarhetshåndtering inkludert koordinert offentliggjøring.',
        guidance: [
            { id: 'NIS2-16-1', title: 'Etabler sårbarhetshåndtering', description: 'Definer prosesser for identifisering, vurdering og utbedring av sårbarheter.' },
            { id: 'NIS2-16-2', title: 'Koordinert sårbarhetsoffentliggjøring', description: 'Implementer prosess for ansvarlig offentliggjøring av sårbarheter.' },
        ]
    },
    {
        id: 'NIS2-17', domain: 'Vulnerability Management',
        title: 'Patch management', titleNo: 'Oppdateringshåndtering',
        description: 'Entities shall ensure timely identification and remediation of vulnerabilities through regular updates and patches.',
        descriptionNo: 'Virksomheter skal sikre rettidig identifisering og utbedring av sårbarheter gjennom regelmessige oppdateringer.',
        guidance: [
            { id: 'NIS2-17-1', title: 'Implementer patchhåndtering', description: 'Etabler prosess for systematisk og tidsriktig patching av alle systemer.' },
        ]
    },
    {
        id: 'NIS2-18', domain: 'Vulnerability Management',
        title: 'Security testing and auditing', titleNo: 'Sikkerhetstesting og revisjon',
        description: 'Entities shall implement policies and procedures to assess the effectiveness of cybersecurity risk-management measures.',
        descriptionNo: 'Virksomheter skal implementere retningslinjer for å evaluere effektiviteten av cybersikkerhetsrisikoforvaltningstiltak.',
        guidance: [
            { id: 'NIS2-18-1', title: 'Gjennomfør sikkerhetstesting', description: 'Utfør regelmessig sikkerhetstesting inkludert penetrasjonstesting og revisjoner.' },
        ]
    },

    // ═══ CYBERSECURITY TRAINING (Article 21(2)(g)) ═══
    {
        id: 'NIS2-19', domain: 'Cybersecurity Training',
        title: 'Basic cyber hygiene practices', titleNo: 'Grunnleggende cyberhygiene',
        description: 'Entities shall ensure basic cyber hygiene practices including zero trust principles and awareness raising.',
        descriptionNo: 'Virksomheter skal sikre grunnleggende cyberhygiene inkludert zero trust-prinsipper og bevisstgjøring.',
        guidance: [
            { id: 'NIS2-19-1', title: 'Implementer grunnleggende cyberhygiene', description: 'Etabler retningslinjer for oppdateringer, passordhåndtering, enhets- og nettverkssikkerhet.' },
            { id: 'NIS2-19-2', title: 'Vurder zero trust-prinsipper', description: 'Evaluer og implementer zero trust-arkitektur der det er hensiktsmessig.' },
        ]
    },
    {
        id: 'NIS2-20', domain: 'Cybersecurity Training',
        title: 'Cybersecurity awareness training', titleNo: 'Opplæring i cybersikkerhetsbevissthet',
        description: 'Entities shall provide regular cybersecurity training for all staff, tailored to their roles.',
        descriptionNo: 'Virksomheter skal gi regelmessig cybersikkerhetsopplæring til alle ansatte, tilpasset deres roller.',
        guidance: [
            { id: 'NIS2-20-1', title: 'Gjennomfør sikkerhetsopplæring', description: 'Lever rollespesifikk opplæring med fokus på phishing, sosial manipulering og hendelsesrapportering.' },
            { id: 'NIS2-20-2', title: 'Mål opplæringseffekt', description: 'Test bevissthet gjennom simuleringer og evaluer opplæringsprogrammets effektivitet.' },
        ]
    },

    // ═══ CRYPTOGRAPHY & ENCRYPTION (Article 21(2)(h)) ═══
    {
        id: 'NIS2-21', domain: 'Cryptography & Encryption',
        title: 'Policies on use of cryptography and encryption', titleNo: 'Retningslinjer for kryptografi og kryptering',
        description: 'Entities shall implement policies regarding the use of cryptography and, where appropriate, encryption.',
        descriptionNo: 'Virksomheter skal implementere retningslinjer for bruk av kryptografi og, der det er hensiktsmessig, kryptering.',
        guidance: [
            { id: 'NIS2-21-1', title: 'Definer kryptografipolicy', description: 'Etabler policy for bruk av kryptering, godkjente algoritmer og nøkkellengder.', auditEvidence: 'Godkjent kryptografipolicy som spesifiserer tillatte krypteringsalgoritmer og krav til nøkkellengde.' },
            { id: 'NIS2-21-2', title: 'Implementer kryptering av data', description: 'Krypter data i hvile og under overføring med godkjente algoritmer.', auditEvidence: 'Systeminnstillinger, databasedefinisjoner eller skytjenestekonfigurasjoner som bekrefter kryptering av data i hvile og i overføring.' },
            { id: 'NIS2-21-3', title: 'Nøkkelhåndtering', description: 'Etabler prosedyrer for generering, distribusjon, rotasjon og destruksjon av krypteringsnøkler.', auditEvidence: 'Rutinedokument for nøkkelhåndtering eller tilgangsrapporter fra Key Vault / HSM.' },
        ]
    },

    // ═══ ACCESS CONTROL & AUTHENTICATION (Article 21(2)(i)(j)) ═══
    {
        id: 'NIS2-22', domain: 'Access Control & Authentication',
        title: 'Human resources security', titleNo: 'HR-sikkerhet',
        description: 'Entities shall implement human resources security policies with access control.',
        descriptionNo: 'Virksomheter skal implementere sikkerhetspolicyer for personalforvaltning med tilgangskontroll.',
        guidance: [
            { id: 'NIS2-22-1', title: 'HR-sikkerhetspolicy', description: 'Integrer sikkerhetskrav i rekruttering, onboarding, jobbendringer og offboarding.' },
        ]
    },
    {
        id: 'NIS2-23', domain: 'Access Control & Authentication',
        title: 'Access control policies', titleNo: 'Retningslinjer for tilgangskontroll',
        description: 'Entities shall implement access control policies ensuring access is limited to what is necessary.',
        descriptionNo: 'Virksomheter skal implementere tilgangskontrollretningslinjer som sikrer at tilgang begrenses til det nødvendige.',
        guidance: [
            { id: 'NIS2-23-1', title: 'Implementer rollebasert tilgang', description: 'Definer og håndhev tilgangskontroll basert på roller og minste privilegium.' },
            { id: 'NIS2-23-2', title: 'Gjennomgå tilganger regelmessig', description: 'Utfør periodiske tilgangsgjennomganger for å fjerne unødvendige rettigheter.' },
        ]
    },
    {
        id: 'NIS2-24', domain: 'Access Control & Authentication',
        title: 'Multi-factor authentication implementation', titleNo: 'Implementering av flerfaktorautentisering',
        description: 'Entities shall implement multi-factor authentication or continuous authentication solutions.',
        descriptionNo: 'Virksomheter skal implementere flerfaktorautentisering eller løsninger for kontinuerlig autentisering.',
        guidance: [
            { id: 'NIS2-24-1', title: 'Deploy MFA', description: 'Implementer MFA for alle brukere med prioritet på privilegerte kontoer og fjerntilgang.', auditEvidence: 'Samsvarsrapport fra identitetsleverandør (f.eks. Microsoft Entra ID) som beviser at MFA er tvunget for samtlige aktive brukerkontoer.' },
        ]
    },

    // ═══ ASSET MANAGEMENT (Article 21(2)(i)) ═══
    {
        id: 'NIS2-25', domain: 'Asset Management',
        title: 'Asset identification and management', titleNo: 'Identifisering og håndtering av verdier',
        description: 'Entities shall maintain an up-to-date inventory of all network and information system assets.',
        descriptionNo: 'Virksomheter skal vedlikeholde en oppdatert oversikt over alle nettverks- og informasjonssystemverdier.',
        guidance: [
            { id: 'NIS2-25-1', title: 'Opprett og vedlikehold verdiregister', description: 'Vedlikehold et oppdatert register over alle IKT-eiendeler inkludert eierskap og klassifisering.' },
        ]
    },
    {
        id: 'NIS2-26', domain: 'Asset Management',
        title: 'Network and information systems security', titleNo: 'Nettverks- og informasjonssystemsikkerhet',
        description: 'Entities shall ensure the security of network and information systems, including appropriate network segmentation.',
        descriptionNo: 'Virksomheter skal sikre sikkerheten til nettverks- og informasjonssystemer, inkludert passende nettverkssegmentering.',
        guidance: [
            { id: 'NIS2-26-1', title: 'Sikre nettverksinfrastruktur', description: 'Implementer segmentering, brannmurer og overvåking av nettverksinfrastrukturen.' },
            { id: 'NIS2-26-2', title: 'Herding av systemer', description: 'Herd OS-er, applikasjoner og nettverksenheter basert på sikkerhetsstandarder.' },
        ]
    },
];

export const nis2DomainTranslations: Record<string, Record<import('../hooks/useLang').Lang, string>> = {
    'Governance & Accountability': { nb: 'Styring og ansvar' },
    'Risk Management Measures': { nb: 'Risikostyringstiltak' },
    'Incident Reporting': { nb: 'Hendelsesrapportering' },
    'Supply Chain Security': { nb: 'Leverandørkjedesikkerhet' },
    'Business Continuity': { nb: 'Forretningskontinuitet' },
    'Vulnerability Management': { nb: 'Sårbarhetshåndtering' },
    'Cybersecurity Training': { nb: 'Cybersikkerhetsopplæring' },
    'Cryptography & Encryption': { nb: 'Kryptografi og kryptering' },
    'Access Control & Authentication': { nb: 'Tilgangskontroll og autentisering' },
    'Asset Management': { nb: 'Verdihåndtering' },
};
