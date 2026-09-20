import { RegulationControl } from '../types';
import { Lang } from '../hooks/useLang';

export const nsmDomains = [
    '1. Identifisere og styre',
    '2. Beskytte og opprettholde',
    '3. Oppdage',
    '4. Håndtere og gjenopprette',
] as const;

export const nsmControls: RegulationControl[] = [
    // ═══════════════════════════════════════════════════════════════════
    //  1. IDENTIFISERE OG STYRE (Styring, oversikt og risikovurdering)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-1.1', domain: '1. Identifisere og styre',
        title: 'Kartlegging av enheter og maskinvare (NSM 1)', titleNo: 'Kartlegging av enheter og maskinvare (NSM 1)',
        description: 'Etablere og vedlikeholde en oppdatert oversikt over alle fysiske og virtuelle enheter tilkoblet virksomhetens nettverk (servere, klienter, nettverksutstyr, IoT).',
        descriptionNo: 'Etablere og vedlikehalde ei oppdatert oversikt over alle fysiske og virtuelle einingar kopla til verksemdas nettverk.',
        guidance: [
            { id: 'NSM-1.1-1', title: 'Automatisert nettverksskanning', description: 'Implementer verktøy for kontinuerlig oppdagelse av nye enheter på kablet og trådløst nettverk.', auditEvidence: 'Rapporter fra automatisk oppdagelsesverktøy eller IPAM/CMDB-system.' },
            { id: 'NSM-1.1-2', title: 'Vedlikehold av enhetsregister (CMDB)', description: 'Registrer enhetstype, MAC-adresse, IP, operativsystem, eier og fysisk/logisk plassering.', auditEvidence: 'Oppdatert CMDB/utstyrsregister med tildelte eiere.' },
            { id: 'NSM-1.1-3', title: 'Håndtering av uautoriserte enheter', description: 'Blokker eller sett ukjente enheter automatisk i isolert karantenesone via 802.1X / NAC.', auditEvidence: 'Konfigurasjon av Network Access Control (NAC) og karantenepolicy.' },
        ]
    },
    {
        id: 'NSM-1.2', domain: '1. Identifisere og styre',
        title: 'Kartlegging av programvare og skykomponenter (NSM 2)', titleNo: 'Kartlegging av programvare og skykomponenter (NSM 2)',
        description: 'Ha fullstendig oversikt over all installert programvare, biblioteker, skytjenester og containere i produksjon, inkludert versjoner og lisenser.',
        descriptionNo: 'Ha fullstendig oversikt over all installert programvare, bibliotek, skytenester og konteinarar i produksjon.',
        guidance: [
            { id: 'NSM-1.2-1', title: 'Programvareinventar og SBOM', description: 'Bruk programvareinventarverktøy og etabler Software Bill of Materials (SBOM) for egenutviklet kode.', auditEvidence: 'Programvareregister og SBOM-filer i CI/CD-systemet.' },
            { id: 'NSM-1.2-2', title: 'Applikasjonskontroll (Allowlisting)', description: 'Konfigurer retningslinjer for applikasjonskontroll som hindrer kjøring av uautorisert programvare.', auditEvidence: 'AppLocker / Windows Defender Application Control (WDAC) poliser.' },
            { id: 'NSM-1.2-3', title: 'Fase ut utdatert programvare (End-of-Life)', description: 'Identifiser og avvikle systemer og biblioteker som ikke lenger mottar sikkerhetsoppdateringer fra produsent.', auditEvidence: 'Livssyklusrapport og avviksliste for utdaterte komponenter.' },
        ]
    },
    {
        id: 'NSM-1.3', domain: '1. Identifisere og styre',
        title: 'Kartlegging av dataflyt og informasjonsverdier', titleNo: 'Kartlegging av dataflyt og informasjonsverdier',
        description: 'Identifisere og klassifisere virksomhetens informasjonsverdier samt kartlegge dataflyten internt, mot eksterne leverandører og til skytjenester.',
        descriptionNo: 'Identifisere og klassifisere verksemdas informasjonsverdiar og kartleggje dataflyten internt og eksternt.',
        guidance: [
            { id: 'NSM-1.3-1', title: 'Verdivurdering og dataklassifisering', description: 'Klassifiser data etter konfidensialitet (Offentlig, Intern, Fortrolig, Strengt fortrolig).', auditEvidence: 'Dataklassifiseringspolicy og merking av datalagre.' },
            { id: 'NSM-1.3-2', title: 'Dokumentasjon av dataflyt', description: 'Tegn opp nettverks- og dataflytdiagrammer som viser sensitive data i transitt og hvile.', auditEvidence: 'Arkitektur- og dataflytdiagrammer godkjent av sikkerhetsleder.' },
        ]
    },
    {
        id: 'NSM-1.4', domain: '1. Identifisere og styre',
        title: 'Sikkerhetsstyring, roller og ansvar (NSM 3)', titleNo: 'Sikkerhetsstyring, roller og ansvar (NSM 3)',
        description: 'Definere roller, ansvar og myndighet for IKT-sikkerhet i organisasjonen, og forankre sikkerhetsarbeidet hos toppledelsen.',
        descriptionNo: 'Definere roller, ansvar og mynde for IKT-tryggleik i organisasjonen, og forankre arbeidet hos leiinga.',
        guidance: [
            { id: 'NSM-1.4-1', title: 'Utpeke CISO og sikkerhetsansvarlige', description: 'Formelt utpeke og dokumentere roller for informasjonssikkerhet, personvern og beredskap.', auditEvidence: 'Stillingsinstrukser, organisasjonskart og formelle oppnevningsbrev.' },
            { id: 'NSM-1.4-2', title: 'Sikkerhetsrapportering til ledelsen', description: 'Etabler faste kvartalsvise rapporteringsrutiner til toppledelse og styre om risikobilde og tiltaksstatus.', auditEvidence: 'Protokoller fra styremøter eller ledermøter med sikkerhetsrapportering.' },
        ]
    },
    {
        id: 'NSM-1.5', domain: '1. Identifisere og styre',
        title: 'Risikovurdering av IKT-systemer', titleNo: 'Risikovurdering av IKT-systemer',
        description: 'Gjennomføre systematiske risikovurderinger basert på trusselvurderinger og sårbarheter for alle kritiske systemer og endringer.',
        descriptionNo: 'Gjennomføre systematiske risikovurderingar basert på trusselvurderingar for alle kritiske system.',
        guidance: [
            { id: 'NSM-1.5-1', title: 'Etablere risikovurderingsmetodikk', description: 'Bruk standardisert metodikk (f.eks. ISO 27005, NS 5832 eller Digdir) for konsekvens og sannsynlighet.', auditEvidence: 'Metodebeskrivelse og retningslinje for risikovurderinger.' },
            { id: 'NSM-1.5-2', title: 'Plattformarv og systemspesifikk risiko', description: 'Gjenbruk felles infrastrukturrisiko og fokuser på systemspesifikk restrisiko i fagsystemer.', auditEvidence: 'Gjennomførte risikovurderinger med dokumentert tiltaksplan og aksept.' },
        ]
    },
    {
        id: 'NSM-1.6', domain: '1. Identifisere og styre',
        title: 'Leverandørsikkerhet og verdikjede', titleNo: 'Leverandørtryggleik og verdikjede',
        description: 'Stille eksplisitte sikkerhetskrav til leverandører, tjenesteutsettere og skyleverandører, og følge opp etterlevelse jevnlig.',
        descriptionNo: 'Stille tryggleikskrav til leverandørar og skytenester, og følgje opp etterleving jamleg.',
        guidance: [
            { id: 'NSM-1.6-1', title: 'Sikkerhetskrav i kontrakter og DPA', description: 'Inkluder krav om revisjonsrett, hendelsesvarsling, datalagringslokasjon og sikkerhetsnivå.', auditEvidence: 'Signerte databehandleravtaler (DPA) og kontraktsvedlegg for sikkerhet.' },
            { id: 'NSM-1.6-2', title: 'Leverandørevaluering og tredjepartsrevisjon', description: 'Innhent og vurder uavhengige revisjonsrapporter (SOC 2, ISO 27001) for alle vesentlige leverandører.', auditEvidence: 'Årlige leverandørevalueringer og arkiverte SOC 2 / ISO-sertifikater.' },
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  2. BESKYTTE OG OPPRETTHOLDE (Tekniske og operasjonelle tiltak)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-2.1', domain: '2. Beskytte og opprettholde',
        title: 'Sikker arkitektur og nettverkssegmentering (NSM 4 & 9)', titleNo: 'Sikker arkitektur og nettverkssegmentering (NSM 4 & 9)',
        description: 'Dele IKT-miljøet inn i adskilte sikkerhetssoner basert på risikovurdering og tillitsnivå, og kontrollere all trafikk mellom sonene.',
        descriptionNo: 'Dele IKT-miljøet inn i åtskilde tryggleikssoner og kontrollere all trafikk mellom sonene.',
        guidance: [
            { id: 'NSM-2.1-1', title: 'Mikrosegmentering og sonemodell', description: 'Skill produksjon, test, administrasjon, kontornettverk og gjestenett med brannmurer eller SDN/NetworkPolicies.', auditEvidence: 'Brannmurregler, VLAN-konfigurasjon eller Kubernetes NetworkPolicies.' },
            { id: 'NSM-2.1-2', title: 'Prinsipp om standard nekt (Default Deny)', description: 'Konfigurer alle brannmurer og ingress/egress-regler til standard blokkering med eksplisitte åpninger.', auditEvidence: 'Eksport av brannmuroppsett som beviser default-deny.' },
        ]
    },
    {
        id: 'NSM-2.2', domain: '2. Beskytte og opprettholde',
        title: 'Sikker konfigurasjon og herding (NSM 5)', titleNo: 'Sikker konfigurasjon og herding (NSM 5)',
        description: 'Herde operativsystemer, databaser, containere, nettverksutstyr og applikasjoner etter anerkjente sikkerhetsstandarder (CIS Benchmarks).',
        descriptionNo: 'Herde operativsystem, databasar og konteinarar etter anerkjende standardar (CIS Benchmarks).',
        guidance: [
            { id: 'NSM-2.2-1', title: 'Fjerne standardpassord og unødvendige tjenester', description: 'Deaktiver ubrukte porter, protokoller, standardkontoer og tjenester på alle servere og enheter.', auditEvidence: 'Herdede base-images (Gold Images) eller Ansible/Terraform baseline-scripts.' },
            { id: 'NSM-2.2-2', title: 'Automatisk konfigurasjonshåndtering (IaC)', description: 'Bruk infrastruktur som kode og verifiser mot konfigurasjonsdrift kontinuerlig.', auditEvidence: 'IaC-kodebase med automatiserte policy-sjekker.' },
        ]
    },
    {
        id: 'NSM-2.3', domain: '2. Beskytte og opprettholde',
        title: 'Tofaktorautentisering og identitetsstyring (NSM 7 & 8)', titleNo: 'Tofaktorautentisering og identitetsstyring (NSM 7 & 8)',
        description: 'Håndheve sterk flerfaktorautentisering (MFA) for alle brukere og eksterne tilganger, og praktisere strengeste minste privilegium.',
        descriptionNo: 'Krevje sterk fleirfaktorautentisering (MFA) for alle brukarar og praktisere minste privilegium.',
        guidance: [
            { id: 'NSM-2.3-1', title: 'Obligatorisk MFA på alle tjenester', description: 'Aktiver FIDO2, app-basert MFA eller Conditional Access for e-post, skyressurser og VPN.', auditEvidence: 'Entra ID / Okta Conditional Access policy som krever MFA for 100% av brukerne.' },
            { id: 'NSM-2.3-2', title: 'Separate administrative kontoer (PAM)', description: 'Krev egne dedikerte admin-kontoer uten e-post/internettilgang, og benytt Just-In-Time (JIT) tilgang.', auditEvidence: 'PAM-oppsett, PIM-aktiveringslogger og liste over administrative kontoer.' },
            { id: 'NSM-2.3-3', title: 'Regelmessig tilgangsrevisjon (JML)', description: 'Gjennomfør kvartalsvis revisjon av tilganger og umiddelbar sperring ved fratredelse.', auditEvidence: 'Signerte rapporter fra periodisk tilgangsgjennomgang.' },
        ]
    },
    {
        id: 'NSM-2.4', domain: '2. Beskytte og opprettholde',
        title: 'Beskyttelse av data i ro og i transitt (NSM 10)', titleNo: 'Beskyttelse av data i ro og i transitt (NSM 10)',
        description: 'Kryptere sensitive data under lagring og ved overføring over åpne eller delte nettverk med anerkjente kryptografiske algoritmer.',
        descriptionNo: 'Kryptere sensitive data under lagring og ved overføring over nettverk med moderne algoritmar.',
        guidance: [
            { id: 'NSM-2.4-1', title: 'Kryptering i transitt (TLS 1.3)', description: 'Tving bruk av TLS 1.2/1.3 med sterke chiffer og deaktiver eldre protokoller (SSLv3, TLS 1.0/1.1).', auditEvidence: 'SSL Labs-rapport (A+) eller konfigurasjonsfiler for web-/API-servere.' },
            { id: 'NSM-2.4-2', title: 'Kryptering i hvile (At Rest)', description: 'Bruk full diskkryptering (BitLocker/FileVault) på alle klienter og AES-256 kryptering på databaser/skylagring.', auditEvidence: 'MDM-overvåking av diskkryptering og skylagringspolicy.' },
        ]
    },
    {
        id: 'NSM-2.5', domain: '2. Beskytte og opprettholde',
        title: 'Beskyttelse av e-post, nettleser og DNS (NSM 11)', titleNo: 'Beskyttelse av e-post, nettlesar og DNS (NSM 11)',
        description: 'Etablere beskyttelse mot de vanligste angrepsvektorene (phishing, spoofing, ondsinnede lenker og skadelig kode).',
        descriptionNo: 'Etablere vern mot phishing, spoofing, skadelege lenkjer og skadevare via e-post og web.',
        guidance: [
            { id: 'NSM-2.5-1', title: 'E-postsikring (SPF, DKIM, DMARC)', description: 'Konfigurer SPF, DKIM og en streng DMARC-policy (p=reject eller quarantine) for alle organisasjonens domener.', auditEvidence: 'Offentlige DNS-oppslag for SPF, DKIM og DMARC records.' },
            { id: 'NSM-2.5-2', title: 'DNSSEC og filtrering av skadelige domener', description: 'Aktiver DNSSEC og benytt beskyttet DNS-oppslag (f.eks. Quad9 eller Cisco Umbrella) som blokkerer kjente skadelige domener.', auditEvidence: 'DNSSEC-verifisering og DNS-sikkerhetskonfigurasjon.' },
        ]
    },
    {
        id: 'NSM-2.6', domain: '2. Beskytte og opprettholde',
        title: 'Sårbarhetshåndtering og patching (NSM 14)', titleNo: 'Sårbarheitshandtering og patching (NSM 14)',
        description: 'Oppdage kjente sårbarheter gjennom automatiserte skanninger og installere sikkerhetsoppdateringer innen definerte tidsfrister.',
        descriptionNo: 'Oppdage sårbarheiter via automatisert skanning og installere oppdateringar raskt.',
        guidance: [
            { id: 'NSM-2.6-1', title: 'Regelmessig sårbarhetsskanning', description: 'Gjennomfør ukentlig automatisk skanning av eksternt og internt angrepsflate for kjente CVE-er.', auditEvidence: 'Sårbarhetsrapporter fra skanneverktøy (Tenable, Qualys, Defender).' },
            { id: 'NSM-2.6-2', title: 'Tidsfrister for sikkerhetsoppdateringer (SLA)', description: 'Patch kritiske sårbarheter (CVSS >= 9) innen 7 dager, og høye sårbarheter innen 14 dager.', auditEvidence: 'Patch-management dashboard og tidslinje for nylige utrullinger.' },
        ]
    },
    {
        id: 'NSM-2.7', domain: '2. Beskytte og opprettholde',
        title: 'Endepunktbeskyttelse og skadevarevern (NSM 13)', titleNo: 'Endepunktvern og skadevarevern (NSM 13)',
        description: 'Installere og vedlikeholde moderne endepunktdeteksjon og -respons (EDR/XDR) på alle servere og arbeidsstasjoner.',
        descriptionNo: 'Installere og vedlikehalde moderne endepunktvern (EDR/XDR) på alle serverar og klientar.',
        guidance: [
            { id: 'NSM-2.7-1', title: 'Sentralstyrt EDR/XDR-agent', description: 'Sørg for 100% dekningsgrad av EDR-agent på alle operative servere, sky-VM-er og bærbare PC-er.', auditEvidence: 'Dekningsrapport fra EDR-administrasjonskonsoll (Defender for Endpoint, CrowdStrike).' },
            { id: 'NSM-2.7-2', title: 'Automatisk isolering ved kompromittering', description: 'Konfigurer verktøyet til automatisk å isolere en infisert maskin fra nettverket ved alvorlige hendelser.', auditEvidence: 'Automated Investigation and Remediation (AIR) innstillinger i EDR.' },
        ]
    },
    {
        id: 'NSM-2.8', domain: '2. Beskytte og opprettholde',
        title: 'Sikkerhetskopiering og gjenoppretting (NSM 15)', titleNo: 'Tryggleikskopiering og attreising (NSM 15)',
        description: 'Sikre regelmessig sikkerhetskopiering etter 3-2-1-prinsippet med uforanderlige (immutable) eller offline kopier, og teste gjenoppretting regelmessig.',
        descriptionNo: 'Sikre regelmessig sikkerheitskopiering etter 3-2-1-prinsippet med uforanderlege kopiar.',
        guidance: [
            { id: 'NSM-2.8-1', title: '3-2-1 Sikkerhetskopiering med uforanderlighet', description: 'Ha minst 3 kopier på 2 ulike medier, hvorav minst 1 er offline eller immutable (WORM/Object Lock).', auditEvidence: 'Backup-konfigurasjon som beviser aktivert immutable lagring og adskilt tilgang.' },
            { id: 'NSM-2.8-2', title: 'Regelmessig test av tilbakekopiering (Restore-test)', description: 'Gjennomfør og loggfør praktisk gjenoppretting av kritiske systemer minst halvårlig.', auditEvidence: 'Signerte protokoller fra gjennomførte gjenopprettingstester med tidsmåling (RTO/RPO).' },
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  3. OPPDAGE (Deteksjon og overvåking)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-3.1', domain: '3. Oppdage',
        title: 'Etablere sentralisert logging og revisjonsspor (NSM 12)', titleNo: 'Etablere sentralisert logging og revisjonsspor (NSM 12)',
        description: 'Etablere hensiktsmessig innsamling og beskyttelse av sikkerhetsrelevante logger fra systemer, nettverk, brannmurer og brukerautentisering.',
        descriptionNo: 'Etablere innsamling og vern av tryggleiksrelevante loggar frå system, nettverk og autentisering.',
        guidance: [
            { id: 'NSM-3.1-1', title: 'Sentral logginnsamling til SIEM', description: 'Videresend logger fra servere, K8s, skytjenester og brannmurer til sentralt SIEM / logghvelv.', auditEvidence: 'Logg-forwarding konfigurasjon og ingest-oversikt i SIEM (Sentinel, Splunk, Elastic).' },
            { id: 'NSM-3.1-2', title: 'Beskyttelse av loggintegritet og oppbevaring', description: 'Skrivebeskytt logger slik at administratorer ikke kan manipulere eller slette revisjonsspor. Oppbevar i minst 12 mnd.', auditEvidence: 'Tilgangskontroll på logglager og dokumentert oppbevaringstid (retention).' },
            { id: 'NSM-3.1-3', title: 'Tidssynkronisering (NTP)', description: 'Synkroniser klokkene på alle systemer mot pålitelige, godkjente tidskilder (NTP).', auditEvidence: 'NTP-konfigurasjon på tvers av nettverkssoner.' },
        ]
    },
    {
        id: 'NSM-3.2', domain: '3. Oppdage',
        title: 'Kontinuerlig sikkerhetsovervåking og deteksjon', titleNo: 'Kontinuerleg tryggleiksovervaking og deteksjon',
        description: 'Etablere kontinuerlig analyse av logger og nettverkstrafikk for å avdekke uautorisert aktivitet og unormale hendelser døgnet rundt.',
        descriptionNo: 'Etablere kontinuerleg analyse av loggar og trafikk for å avdekkje uautorisert aktivitet.',
        guidance: [
            { id: 'NSM-3.2-1', title: 'Sikkerhetsovervåking (SOC / MDR)', description: 'Tilknytt virksomheten en intern eller ekstern døgnkontinuerlig overvåkingstjeneste (SOC / 24/7 MDR).', auditEvidence: 'Tjenesteavtale (SLA) med SOC/MDR-leverandør eller intern vaktinstruks.' },
            { id: 'NSM-3.2-2', title: 'Automatiserte deteksjonsregler', description: 'Aktiver regler for deteksjon av brute-force, uvanlige pålogginger, credential dumping og datauthenting.', auditEvidence: 'Liste over aktive deteksjonsregler og korreleringsregler i SIEM.' },
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  4. HÅNDTERE OG GJENOPPRETTE (Beredskap, respons og læring)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-4.1', domain: '4. Håndtere og gjenopprette',
        title: 'Beredskapsplan og hendelseshåndtering (IRP)', titleNo: 'Beredskapsplan og hendingshandtering (IRP)',
        description: 'Ha en etablert, dokumentert og øvd plan for håndtering av IKT-sikkerhetshendelser, med definerte roller og eskaleringsveier.',
        descriptionNo: 'Ha ein etablert, dokumentert og øvd plan for handtering av IKT-tryggleikshendingar.',
        guidance: [
            { id: 'NSM-4.1-1', title: 'Incident Response Plan (IRP)', description: 'Dokumenter plan med tydelige roller (sikkerhetsleder, teknisk leder, kommunikasjon, juridisk) og kontaktlister.', auditEvidence: 'Godkjent IRP-dokument med oppdaterte kontaktpunkter og eskaleringsmatrise.' },
            { id: 'NSM-4.1-2', title: 'Varslingsrutiner til myndigheter', description: 'Etabler prosedyrer for varsling til Datatilsynet (innen 72t), NSM NorCERT, politi og sektor-CERT.', auditEvidence: 'Prosedyrer og maler for regulatorisk hendelsesrapportering.' },
        ]
    },
    {
        id: 'NSM-4.2', domain: '4. Håndtere og gjenopprette',
        title: 'Regelmessige beredskapsøvelser', titleNo: 'Regelmessige beredskapsøvingar',
        description: 'Gjennomføre realistiske beredskaps- og kriseøvelser for teknisk personell og toppledelse minst én gang i året.',
        descriptionNo: 'Gjennomføre realistiske beredskaps- og kriseøvingar minst ein gong i året.',
        guidance: [
            { id: 'NSM-4.2-1', title: 'Tabletop- og kriseøvelser', description: 'Gjennomfør simulerte hendelsesøvelser (f.eks. ransomware-scenario eller leverandørbrudd) med ledelsen.', auditEvidence: 'Evalueringsrapport fra siste gjennomførte sikkerhetsøvelse med tiltaksliste.' },
            { id: 'NSM-4.2-2', title: 'Teknisk hendelseshåndteringstest', description: 'Test teknisk isolering, minnedumping og forensics i samarbeid med driftsteamet.', auditEvidence: 'Teknisk øvingslogg og oppdaterte driftsinstrukser.' },
        ]
    },
    {
        id: 'NSM-4.3', domain: '4. Håndtere og gjenopprette',
        title: 'Gjenoppretting og virksomhetskontinuitet (BCP/DRP)', titleNo: 'Attreising og verksemdskontinuitet (BCP/DRP)',
        description: 'Sikre at kritiske funksjoner kan gjenopprettes innen akseptable tidsfrister etter et alvorlig sikkerhetsbrudd eller systemhavari.',
        descriptionNo: 'Sikre at kritiske funksjonar kan attreisast innan akseptable tidsfristar etter eit brot.',
        guidance: [
            { id: 'NSM-4.3-1', title: 'Disaster Recovery Plan (DRP)', description: 'Dokumenter rekkefølge for gjenoppretting av kjernesystemer, identitetsplattform og databaser.', auditEvidence: 'Godkjent DRP med definerte RTO (Recovery Time Objective) og RPO (Recovery Point Objective).' },
            { id: 'NSM-4.3-2', title: 'Evaluering og læring etter hendelser', description: 'Gjennomfør formell post-mortem etter alle alvorlige hendelser for å identifisere forbedringstiltak.', auditEvidence: 'Post-mortem rapporter med tildelte forbedringstiltak og frister.' },
        ]
    },
];

export const nsmDomainTranslations: Record<string, Record<Lang, string>> = {
    '1. Identifisere og styre': { nb: '1. Identifisere og styre', nn: '1. Identifisere og styre' },
    '2. Beskytte og opprettholde': { nb: '2. Beskytte og opprettholde', nn: '2. Beskytte og opprettholde' },
    '3. Oppdage': { nb: '3. Oppdage', nn: '3. Oppdage' },
    '4. Håndtere og gjenopprette': { nb: '4. Håndtere og gjenopprette', nn: '4. Handtere og attreise' },
};
