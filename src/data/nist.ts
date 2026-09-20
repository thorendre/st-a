import { RegulationControl } from '../types';
import { Lang } from '../hooks/useLang';

export const nistDomains = [
    '1. GV: Styre (Govern)',
    '2. ID: Identifisere (Identify)',
    '3. PR: Beskytte (Protect)',
    '4. DE: Oppdage (Detect)',
    '5. RS: Respondere (Respond)',
    '6. RC: Gjenopprette (Recover)',
] as const;

export const nistControls: RegulationControl[] = [
    // ═══════════════════════════════════════════════════════════════════
    //  1. GOVERN (GV) – Styre, organisatorisk kontekst og risikostrategi
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NIST-GV.OC',
        domain: '1. GV: Styre (Govern)',
        title: 'Organisasjonskontekst og sikkerhetsmål (GV.OC)',
        titleNo: 'Organisasjonskontekst og tryggleiksmål (GV.OC)',
        description: 'Virksomhetens oppdrag, regulatoriske forpliktelser, interessenter og sikkerhetsmål er forstått, dokumentert og lagt til grunn for cybersikkerhetsarbeidet.',
        descriptionNo: 'Verksemdas oppdrag, regulatoriske plikter og tryggleiksmål er dokumenterte og lagde til grunn.',
        guidance: [
            {
                id: 'NIST-GV.OC-1',
                title: 'Kartlegge regulatoriske og kontraktsmessige krav',
                description: 'Dokumenter alle relevante lover, bransjekrav og avtaler som gjelder for organisasjonens IT-drift.',
                auditEvidence: 'Samsvarsmatrise med juridiske og kontraktsmessige krav oppdatert innen siste 12 mnd.'
            },
            {
                id: 'NIST-GV.OC-2',
                title: 'Fastsette cybersikkerhetsmål for ledelsen',
                description: 'Definer målbare KPI-er for sikkerhet forankret i organisasjonens overordnede strategi.',
                auditEvidence: 'Styredokument eller strategidokument som definerer årlige cybersikkerhetsmål.'
            }
        ]
    },
    {
        id: 'NIST-GV.RM',
        domain: '1. GV: Styre (Govern)',
        title: 'Risikostyringsstrategi og risikovilje (GV.RM)',
        titleNo: 'Risikostyringsstrategi og risikovilje (GV.RM)',
        description: 'Virksomhetens risikotoleranse og rammeverk for risikostyring er formelt etablert og godkjent av toppledelsen.',
        descriptionNo: 'Verksemdas risikotoleranse og rammeverk for risikostyring er formelt etablert og godkjent.',
        guidance: [
            {
                id: 'NIST-GV.RM-1',
                title: 'Definere risikovilje (Risk Appetite)',
                description: 'Fastsett eksplisitte kriterier for hva som er akseptabel restrisiko innen konfidensialitet, integritet og tilgjengelighet.',
                auditEvidence: 'Godkjent risikotoleranseerklæring (Risk Appetite Statement) signert av daglig leder/styret.'
            },
            {
                id: 'NIST-GV.RM-2',
                title: 'Metodikk for cybersikkerhetsrisiko',
                description: 'Bruk en standardisert metodikk (f.eks. ISO 27005 eller NSM) for å vurdere sannsynlighet og konsekvens.',
                auditEvidence: 'Dokumentert risikovurderingsprosedyre og integrasjon mot virksomhetens risikoregister.'
            }
        ]
    },
    {
        id: 'NIST-GV.RR',
        domain: '1. GV: Styre (Govern)',
        title: 'Roller, ansvar og lederforankring (GV.RR)',
        titleNo: 'Roller, ansvar og leiarforankring (GV.RR)',
        description: 'Roller og myndighet for cybersikkerhet er definert, tildelt og kommunisert på tvers av hele organisasjonen.',
        descriptionNo: 'Roller og mynde for cybersikkerheit er definerte, tildelte og kommuniserte i organisasjonen.',
        guidance: [
            {
                id: 'NIST-GV.RR-1',
                title: 'Formell oppnevning av sikkerhetsleder (CISO)',
                description: 'Utpek en dedikert person eller funksjon med formelt ansvar for informasjonssikkerhetsarbeidet.',
                auditEvidence: 'Stillingsinstruks for CISO og formelt mandat fra styre eller toppledelse.'
            },
            {
                id: 'NIST-GV.RR-2',
                title: 'Sikkerhetsansvar for systemeiere og ansatte',
                description: 'Inkluder sikkerhetsansvar i stillingsbeskrivelser og oppdragsavtaler.',
                auditEvidence: 'Signerte ansettelsesavtaler med aksept av sikkerhetsinstruks og roller i CMDB.'
            }
        ]
    },
    {
        id: 'NIST-GV.SC',
        domain: '1. GV: Styre (Govern)',
        title: 'Leverandørsikkerhet og Supply Chain (GV.SC)',
        titleNo: 'Leverandørtryggleik og Supply Chain (GV.SC)',
        description: 'Cybersikkerhetsrisiko i forsyningskjeden (C-SCRM) identifiseres, overvåkes og håndteres gjennom hele leverandørens livssyklus.',
        descriptionNo: 'Cybersikkerheitsrisiko i forsyningskjeda vert identifisert, overvaka og handtert.',
        guidance: [
            {
                id: 'NIST-GV.SC-1',
                title: 'Kravspesifikasjon for tredjeparter og skyleverandører',
                description: 'Still eksplisitte krav om ISO 27001, SOC 2 eller NSM-etterlevelse ved innkjøp av IT-tjenester.',
                auditEvidence: 'Sikkerhetsklausuler i leverandørkontrakter og vurdering av tredjepartsrevisjoner.'
            },
            {
                id: 'NIST-GV.SC-2',
                title: 'Periodisk leverandørevaluering',
                description: 'Gjennomfør årlig risikovurdering av kritiske IT-leverandører og skytjenester.',
                auditEvidence: 'Leverandørregister med dokumenterte risikovurderinger og gyldige DPA/revisjonsrapporter.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  2. IDENTIFY (ID) – Kartlegging av verdier, sårbarheter og risiko
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NIST-ID.AM',
        domain: '2. ID: Identifisere (Identify)',
        title: 'Kartlegging av fysiske og logiske verdier (ID.AM)',
        titleNo: 'Kartlegging av fysiske og logiske verdiar (ID.AM)',
        description: 'Maskinvare, programvare, nettverkskomponenter, skytjenester og sensitive datamengder er fullstendig kartlagt i et oppdatert inventar.',
        descriptionNo: 'Maskinvare, programvare, skytjenester og sensitive datamengder er kartlagde.',
        guidance: [
            {
                id: 'NIST-ID.AM-1',
                title: 'Automatisert inventar av maskinvare og skynoder',
                description: 'Bruk verktøy for kontinuerlig oppdagelse av tilkoblede enheter, skymiljøer og containere.',
                auditEvidence: 'Oppdatert CMDB / Asset Management database med siste skannedato.'
            },
            {
                id: 'NIST-ID.AM-2',
                title: 'Klassifisering av informasjonsverdier',
                description: 'Klassifiser forretningskritiske data og personopplysninger etter konfidensialitetskrav.',
                auditEvidence: 'Informasjonsregister med konfidensialitetsnivå og tildelte systemeiere.'
            }
        ]
    },
    {
        id: 'NIST-ID.RA',
        domain: '2. ID: Identifisere (Identify)',
        title: 'Sårbarhets- og trusselvurdering (ID.RA)',
        titleNo: 'Sårbarheits- og trusselvurdering (ID.RA)',
        description: 'Trusler og sårbarheter i systemer og infrastruktur identifiseres systematisk for å avdekke cybersikkerhetsrisiko.',
        descriptionNo: 'Truslar og sårbarheiter i system og infrastruktur vert identifiserte systematisk.',
        guidance: [
            {
                id: 'NIST-ID.RA-1',
                title: 'Periodisk automatisert sårbarhetsskanning',
                description: 'Kjør ukentlige eller månedlige sårbarhetsskanninger på interne og eksterne angrepsflater.',
                auditEvidence: 'Siste sårbarhetsrapporter fra skanneverktøy (f.eks. Nessus, Qualys, Defender Vulnerability).'
            },
            {
                id: 'NIST-ID.RA-2',
                title: 'Penetrasjonstesting av kritiske systemer',
                description: 'Gjennomfør tredjeparts sikkerhetstesting minst årlig for eksponerte webapplikasjoner og API-er.',
                auditEvidence: 'Rapport fra siste eksterne penetrasjonstest og liste over utbedrede funn.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  3. PROTECT (PR) – Beskyttelse, identitet, tilgang og datasikring
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NIST-PR.AA',
        domain: '3. PR: Beskytte (Protect)',
        title: 'Identitetsstyring og tilgangskontroll (PR.AA)',
        titleNo: 'Identitetsstyring og tilgangskontroll (PR.AA)',
        description: 'Brukere, enheter og prosesser autentiseres sikkert med minste privilegiums prinsipp og obligatorisk MFA.',
        descriptionNo: 'Brukarar, einingar og prosessar vert autentiserte trygt med minste privilegium og MFA.',
        guidance: [
            {
                id: 'NIST-PR.AA-1',
                title: 'Flerfaktorautentisering (MFA) for alle brukere',
                description: 'Håndhev phishing-resistent eller app-basert MFA på all ekstern pålogging og tilgang til skytjenester.',
                auditEvidence: 'Eksportert rapport fra Identitetsleverandør (f.eks. Entra ID / Okta) med 100% MFA-dekning.'
            },
            {
                id: 'NIST-PR.AA-2',
                title: 'Tidsbegrenset og just-in-time administratortilgang (PIM/PAM)',
                description: 'Fjern permanente administratorrettigheter; krev tidsbegrenset godkjenning ved behov.',
                auditEvidence: 'PIM-revisjonslogger og liste over aktive administratorroller.'
            }
        ]
    },
    {
        id: 'NIST-PR.AT',
        domain: '3. PR: Beskytte (Protect)',
        title: 'Sikkerhetsbevissthet og opplæring (PR.AT)',
        titleNo: 'Sikkerheitsmedvit og opplæring (PR.AT)',
        description: 'Alle ansatte og oppdragstakere mottar jevnlig opplæring i cybersikkerhet, inkludert gjenkjenning av sosial manipulering.',
        descriptionNo: 'Alle tilsette får regelmessig opplæring i cybersikkerheit og sosial manipulering.',
        guidance: [
            {
                id: 'NIST-PR.AT-1',
                title: 'Obligatorisk sikkerhetskurs ved tiltredelse og årlig repetisjon',
                description: 'Sikre at alle ansatte gjennomfører e-læringskurs om passordsikkerhet, phishing og varsling.',
                auditEvidence: 'Fullføringsstatistikk fra LMS-system eller kursoversikt (>95% gjennomføringsgrad).'
            },
            {
                id: 'NIST-PR.AT-2',
                title: 'Simulerte phishing-øvelser',
                description: 'Utfør kontrollerte phishing-tester for å måle organisasjonens motstandsdyktighet.',
                auditEvidence: 'Rapporter fra simuleringskampanjer med klikkfrekvens og rapporteringsrate.'
            }
        ]
    },
    {
        id: 'NIST-PR.DS',
        domain: '3. PR: Beskytte (Protect)',
        title: 'Datasikkerhet og kryptering (PR.DS)',
        titleNo: 'Datasikkerheit og kryptering (PR.DS)',
        description: 'Data i ro og under overføring er beskyttet med industristandard kryptering (f.eks. AES-256 og TLS 1.3).',
        descriptionNo: 'Data i ro og under overføring er verna med sterk kryptering.',
        guidance: [
            {
                id: 'NIST-PR.DS-1',
                title: 'Kryptering i hvile (Data at Rest)',
                description: 'Aktiver BitLocker/FileVault på alle bærbare enheter og transparent kryptering i databaser/skylager.',
                auditEvidence: 'MDM-etterlevelsesrapport (f.eks. Intune) som viser krypterte disker.'
            },
            {
                id: 'NIST-PR.DS-2',
                title: 'Kryptering i transitt (Data in Transit)',
                description: 'Krev TLS 1.2+ med sterke cipher suites for alle eksterne grensesnitt og API-er; deaktiver utdaterte protokoller.',
                auditEvidence: 'SSL/TLS-skanninger (f.eks. SSL Labs Grade A) for alle offentlige nettsteder.'
            }
        ]
    },
    {
        id: 'NIST-PR.PS',
        domain: '3. PR: Beskytte (Protect)',
        title: 'Plattformsikkerhet og herding (PR.PS)',
        titleNo: 'Plattformsikkerheit og herding (PR.PS)',
        description: 'Konfigurasjon av maskinvare, operativsystemer og programvare herdes etter anerkjente sikkerhetsstandarder (f.eks. CIS Benchmarks).',
        descriptionNo: 'Konfigurasjon av maskinvare og programvare vert herda etter anerkjende standardar.',
        guidance: [
            {
                id: 'NIST-PR.PS-1',
                title: 'Bruk av CIS Benchmarks / baselines',
                description: 'Rull ut standardiserte, herdede konfigurasjoner via Group Policy eller Infrastructure-as-Code.',
                auditEvidence: 'Konfigurasjonsfiler og samsvarsrapporter mot CIS baselines.'
            },
            {
                id: 'NIST-PR.PS-2',
                title: 'Patch management og oppdateringsrutiner',
                description: 'Sørg for at kritiske sikkerhetsoppdateringer installeres innen fastsatte tidsfrister (f.eks. 14 dager).',
                auditEvidence: 'Månedlige patch-rapporter som viser dekningsgrad på servere og klienter.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  4. DETECT (DE) – Kontinuerlig overvåking og avviksdeteksjon
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NIST-DE.CM',
        domain: '4. DE: Oppdage (Detect)',
        title: 'Kontinuerlig sikkerhetsovervåking (DE.CM)',
        titleNo: 'Kontinuerleg tryggleiksovervaking (DE.CM)',
        description: 'Nettverk, enheter, identiteter og applikasjoner overvåkes kontinuerlig for å identifisere potensielle sikkerhetshendelser.',
        descriptionNo: 'Nettverk, einingar og applikasjonar vert overvaka kontinuerleg.',
        guidance: [
            {
                id: 'NIST-DE.CM-1',
                title: 'Sentralisert logginnsamling (SIEM)',
                description: 'Samle sikkerhetslogger fra servere, brannmurer og identitetstjenester i en sentralisert loggløsning med uforanderlig lagring.',
                auditEvidence: 'Dokumentert loggarkitektur og liste over aktive datakilder i SIEM.'
            },
            {
                id: 'NIST-DE.CM-2',
                title: 'Endpoint Detection and Response (EDR)',
                description: 'Installer EDR-agent på alle servere og arbeidsstasjoner for atferdsbasert trusseldeteksjon.',
                auditEvidence: 'EDR-konsollrapport som bekrefter 100% agentdekning på aktive enheter.'
            }
        ]
    },
    {
        id: 'NIST-DE.AE',
        domain: '4. DE: Oppdage (Detect)',
        title: 'Avviks- og trusseldeteksjon (DE.AE)',
        titleNo: 'Avviks- og trusseldeteksjon (DE.AE)',
        description: 'Uvanlig eller mistenkelig aktivitet analyseres og aggregeres raskt for å avdekke pågående angrep.',
        descriptionNo: 'Uvanleg aktivitet vert analysert for å avdekkje pågåande angrep.',
        guidance: [
            {
                id: 'NIST-DE.AE-1',
                title: 'Automatiserte varslingsregler (Alerts)',
                description: 'Konfigurer varsler for kjente angrepsmønstre som brute-force, umulig reise og ukjente PowerShell-kjøringer.',
                auditEvidence: 'Regelverk for sikkerhetsvarsler med definerte alvorlighetsgrader og responstider.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  5. RESPOND (RS) – Hendelseshåndtering og avbøtende tiltak
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NIST-RS.MA',
        domain: '5. RS: Respondere (Respond)',
        title: 'Hendelseshåndteringsplan og styring (RS.MA)',
        titleNo: 'Hendingshandteringsplan og styring (RS.MA)',
        description: 'En formell beredskapsplan for cybersikkerhetshendelser (Incident Response Plan) er etablert, godkjent og vedlikeholdt.',
        descriptionNo: 'Ein formell beredskapsplan for hendingar er etablert og godkjent.',
        guidance: [
            {
                id: 'NIST-RS.MA-1',
                title: 'Dokumentert Incident Response Plan (IRP)',
                description: 'Beskriv fasene for deteksjon, isolering, utrydding og gjenoppretting, med definert kriseteam.',
                auditEvidence: 'Godkjent IRP-dokument med oppdaterte kontaktlister og roller.'
            },
            {
                id: 'NIST-RS.MA-2',
                title: 'Årlig beredskapsøvelse (Tabletop)',
                description: 'Gjennomfør simulert krisescenario med teknisk team og ledelse minst årlig.',
                auditEvidence: 'Evalueringsrapport fra siste gjennomførte beredskapsøvelse.'
            }
        ]
    },
    {
        id: 'NIST-RS.MI',
        domain: '5. RS: Respondere (Respond)',
        title: 'Inndemming og avbøtende tiltak (RS.MI)',
        titleNo: 'Inndemming og avbøtande tiltak (RS.MI)',
        description: 'Aktiviteter utføres umiddelbart for å forhindre spredning av et angrep og redusere skadeomfanget.',
        descriptionNo: 'Tiltak vert sette i verk for å hindre spreiing av eit angrep.',
        guidance: [
            {
                id: 'NIST-RS.MI-1',
                title: 'Mulighet for isolering av kompromitterte noder',
                description: 'Ha tekniske prosedyrer for umiddelbar nettverksisolering av infiserte enheter uten å slå dem av.',
                auditEvidence: 'Driftsinstruks for nettverkskarantene og EDR-isolasjon.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  6. RECOVER (RC) – Gjenoppretting og forretningskontinuitet
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NIST-RC.RP',
        domain: '6. RC: Gjenopprette (Recover)',
        title: 'Gjenoppretting og kontinuitetsplaner (RC.RP)',
        titleNo: 'Attreising og kontinuitetsplanar (RC.RP)',
        description: 'Gjenopprettingsprosesser og -systemer vedlikeholdes for å sikre rettidig tilbakeføring til normal drift etter en hendelse.',
        descriptionNo: 'Attreisingsprosessar vert vedlikehaldne for å sikre rask retur til normal drift.',
        guidance: [
            {
                id: 'NIST-RC.RP-1',
                title: 'Disaster Recovery Plan (DRP) med testet RTO/RPO',
                description: 'Dokumenter og test gjenoppretting av kritiske databaser og servere fra uforanderlige sikkerhetskopier.',
                auditEvidence: 'Logg fra siste vellykkede gjenopprettingstest av backupsystemet.'
            },
            {
                id: 'NIST-RC.RP-2',
                title: 'Post-incident evaluering og forbedring',
                description: 'Gjennomfør formell evaluering (Lessons Learned) etter sikkerhetshendelser for å tette hull.',
                auditEvidence: 'Post-mortem rapporter med tiltaksoppfølging i oppgavehåndteringssystem.'
            }
        ]
    }
];

export const nistDomainTranslations: Record<string, Record<Lang, string>> = {
    '1. GV: Styre (Govern)': { nb: '1. GV: Styre (Govern)', nn: '1. GV: Styre (Govern)' },
    '2. ID: Identifisere (Identify)': { nb: '2. ID: Identifisere (Identify)', nn: '2. ID: Identifisere (Identify)' },
    '3. PR: Beskytte (Protect)': { nb: '3. PR: Beskytte (Protect)', nn: '3. PR: Beskytte (Protect)' },
    '4. DE: Oppdage (Detect)': { nb: '4. DE: Oppdage (Detect)', nn: '4. DE: Oppdage (Detect)' },
    '5. RS: Respondere (Respond)': { nb: '5. RS: Respondere (Respond)', nn: '5. RS: Respondere (Respond)' },
    '6. RC: Gjenopprette (Recover)': { nb: '6. RC: Gjenopprette (Recover)', nn: '6. RC: Attreise (Recover)' },
};
