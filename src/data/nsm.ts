import { RegulationControl } from '../types';
import { Lang } from '../hooks/useLang';

export const nsmDomains = [
    '1. Identifisere og kartlegge',
    '2. Beskytte og opprettholde',
    '3. Oppdage',
    '4. Håndtere og gjenopprette',
] as const;

export const nsmControls: RegulationControl[] = [
    // ═══════════════════════════════════════════════════════════════════
    //  1. IDENTIFISERE OG KARTLEGGE (Oversikt, verdier, styring)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-1.1',
        domain: '1. Identifisere og kartlegge',
        title: 'Kartlegge styringsstrukturer, leveranser og systemer (NSM 1.1)',
        titleNo: 'Kartlegge styringsstrukturer, leveranser og systemer (NSM 1.1)',
        description: 'Etablere og vedlikeholde en oppdatert oversikt over virksomhetens styringsstrukturer, tjenesteleveranser, informasjonsverdier, avhengigheter og understøttende IKT-systemer.',
        descriptionNo: 'Etablere og vedlikeholde en oppdatert oversikt over virksomhetens styringsstrukturer, tjenesteleveranser, informasjonsverdier, avhengigheter og understøttende IKT-systemer.',
        guidance: [
            {
                id: 'NSM-1.1-1',
                title: 'Verdivurdering og tjenestekartlegging',
                description: 'Identifiser samfunnskritiske og virksomhetskritiske tjenester, samt informasjonsverdiene som understøtter disse.',
                auditEvidence: 'Dokumentert verdivurdering og liste over kritiske tjenester godkjent av toppledelsen.'
            },
            {
                id: 'NSM-1.1-2',
                title: 'Styringsstruktur og sikkerhetsorganisering',
                description: 'Definer roller, ansvar og myndighet for informasjonssikkerhet, og forankre arbeidet i ledelsen.',
                auditEvidence: 'Styrende sikkerhetspolicy, stillingsinstruks for sikkerhetsleder (CISO) og organisasjonskart.'
            },
            {
                id: 'NSM-1.1-3',
                title: 'Avhengighetskartlegging mot leverandører',
                description: 'Kartlegg alle eksterne leverandører, skytjenester og tredjeparter som inngår i leveransekjeden for kritiske systemer.',
                auditEvidence: 'Oppdatert leverandøroversikt med angivelse av kritikalitet og avtalestatus.'
            }
        ]
    },
    {
        id: 'NSM-1.2',
        domain: '1. Identifisere og kartlegge',
        title: 'Kartlegge enheter og programvare (NSM 1.2)',
        titleNo: 'Kartlegge enheter og programvare (NSM 1.2)',
        description: 'Ha fullstendig og automatisert oversikt over alle fysiske og virtuelle enheter samt all installert programvare, containere og skytjenester i virksomheten (Tiltak 1.2.3 og 1.2.4).',
        descriptionNo: 'Ha fullstendig og automatisert oversikt over alle fysiske og virtuelle enheter samt all installert programvare, containere og skytjenester i virksomheten (Tiltak 1.2.3 og 1.2.4).',
        guidance: [
            {
                id: 'NSM-1.2-1',
                title: 'Kartlegg enheter i bruk (Tiltak 1.2.3)',
                description: 'Etabler kontinuerlig oppdagelse og registrering av servere, klienter, nettverkskomponenter, skynoder og IoT-utstyr i en sentral CMDB.',
                auditEvidence: 'Oppdatert enhetsregister/CMDB med MAC-adresse, IP, eier og operativsystem.'
            },
            {
                id: 'NSM-1.2-2',
                title: 'Kartlegg programvare i bruk (Tiltak 1.2.4)',
                description: 'Oppretthold et oppdatert inventar over all godkjent programvare, biblioteker (SBOM), skytjenester og containere.',
                auditEvidence: 'Programvareinventar fra verktøy for endepunktsstyring eller Software Bill of Materials (SBOM).'
            },
            {
                id: 'NSM-1.2-3',
                title: 'Fase ut utgått maskinvare og programvare (End-of-Life)',
                description: 'Identifiser og fjern komponenter som ikke lenger mottar produsentsikkerhetsoppdateringer.',
                auditEvidence: 'Livssyklusplan og utfasingsoversikt for foreldet IT-utstyr og applikasjoner.'
            }
        ]
    },
    {
        id: 'NSM-1.3',
        domain: '1. Identifisere og kartlegge',
        title: 'Kartlegge brukere og tilgangsbehov (NSM 1.3)',
        titleNo: 'Kartlegge brukere og tilgangsbehov (NSM 1.3)',
        description: 'Kartlegge alle brukerkontoer, tjenestekontoer og tilgangsrettigheter, og sikre at tilganger er strengt basert på tjenstlig behov (Tiltak 1.3.1).',
        descriptionNo: 'Kartlegge alle brukerkontoer, tjenestekontoer og tilgangsrettigheter, og sikre at tilganger er strengt basert på tjenstlig behov (Tiltak 1.3.1).',
        guidance: [
            {
                id: 'NSM-1.3-1',
                title: 'Kartlegg brukerkontoer og rettigheter (Tiltak 1.3.1)',
                description: 'Ha fullstendig oversikt over aktive brukere, eksterne konsulenter, API-nøkler og automatiserte tjenestekontoer.',
                auditEvidence: 'Brukeroversikt fra identitetsleverandør (Entra ID, Okta, Active Directory) med rolletilordning.'
            },
            {
                id: 'NSM-1.3-2',
                title: 'Dokumentere tjenstlig behov for tilganger',
                description: 'Fastsett prinsipper om minste privilegium og dokumenter begrunnelsen for utvidede eller sensitive tilganger.',
                auditEvidence: 'Rolle- og tilgangsmatrise (RBAC) godkjent av systemeiere.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  2. BESKYTTE OG OPPRETTHOLDE (Tekniske og operasjonelle tiltak)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-2.1',
        domain: '2. Beskytte og opprettholde',
        title: 'Sikkerhet i anskaffelser og utvikling (NSM 2.1)',
        titleNo: 'Sikkerhet i anskaffelser og utvikling (NSM 2.1)',
        description: 'Inkludere eksplisitte sikkerhetskrav ved anskaffelser og etablere sikker programvareutvikling med sikre byggemiljøer (Tiltak 2.1.2 og 2.1.9).',
        descriptionNo: 'Inkludere eksplisitte sikkerhetskrav ved anskaffelser og etablere sikker programvareutvikling med sikre byggemiljøer (Tiltak 2.1.2 og 2.1.9).',
        guidance: [
            {
                id: 'NSM-2.1-1',
                title: 'Sikkerhetskrav ved anskaffelse (Tiltak 2.1.2)',
                description: 'Krev at leverandører oppfyller anerkjente standarder (f.eks. ISO 27001, SOC 2) og har rutiner for sårbarhetshåndtering og hendelsesvarsling.',
                auditEvidence: 'Standard sikkerhetsbilag i kontrakter og vurdering av leverandørdokumentasjon.'
            },
            {
                id: 'NSM-2.1-2',
                title: 'Sikre utviklings- og byggemiljøer (Tiltak 2.1.9)',
                description: 'Beskytt CI/CD-pipelines, kildekodearkiver og byggenoder mot uautorisert manipulering og injeksjon av ondsinnet kode.',
                auditEvidence: 'Sikkerhetskonfigurasjon for CI/CD, krav om '
            },
            {
                id: 'NSM-2.1-3',
                title: 'Sikker kodepraksis og sårbarhetsskanning av kode (SAST/DAST)',
                description: 'Gjennomfør automatiserte sikkerhetssjekker i utviklingsløpet (f.eks. SAST, hemmelighetsskanning og container-skanning).',
                auditEvidence: 'Pipeline-logger fra GitHub Actions, GitLab CI eller tilsvarende med automatisk skanning.'
            }
        ]
    },
    {
        id: 'NSM-2.2',
        domain: '2. Beskytte og opprettholde',
        title: 'Sikker design og nettverkssegmentering (NSM 2.2)',
        titleNo: 'Sikker design og nettverkssegmentering (NSM 2.2)',
        description: 'Dele IKT-miljøet inn i adskilte sikkerhetssoner og mikrosegmenter basert på verdi og risiko, med streng trafikkontroll (Tiltak 2.2.3).',
        descriptionNo: 'Dele IKT-miljøet inn i adskilte sikkerhetssoner og mikrosegmenter basert på verdi og risiko, med streng trafikkontroll (Tiltak 2.2.3).',
        guidance: [
            {
                id: 'NSM-2.2-1',
                title: 'Etabler nettverkssegmentering (Tiltak 2.2.3)',
                description: 'Adskill produksjon, test, administrasjon og kontornettverk med brannmurer, VLAN eller software-definerte nettverk.',
                auditEvidence: 'Nettverksarkitekturdiagram og brannmurregler som dokumenterer soneskille.'
            },
            {
                id: 'NSM-2.2-2',
                title: 'Standard nekt på alle sonegrenser (Default Deny)',
                description: 'Blokker all nettverkstrafikk som standard, og tillat kun eksplisitt nødvendig trafikk mellom sonene.',
                auditEvidence: 'Eksport av brannmuroppsett eller Kubernetes NetworkPolicies med default deny-regler.'
            }
        ]
    },
    {
        id: 'NSM-2.3',
        domain: '2. Beskytte og opprettholde',
        title: 'Sikker konfigurasjon og herding (NSM 2.3)',
        titleNo: 'Sikker konfigurasjon og herding (NSM 2.3)',
        description: 'Etablere sentralisert patching, sikker grunnkonfigurasjon (CIS benchmarks), fjerning av unødvendige tjenester og obligatorisk MFA (Tiltak 2.3.1, 2.3.2, 2.3.3 og 2.3.7).',
        descriptionNo: 'Etablere sentralisert patching, sikker grunnkonfigurasjon, fjerning av unødvendige tjenester og obligatorisk MFA (Tiltak 2.3.1, 2.3.2, 2.3.3 og 2.3.7).',
        guidance: [
            {
                id: 'NSM-2.3-1',
                title: 'Sentralisert sikkerhetsoppdatering (Tiltak 2.3.1)',
                description: 'Sørg for rask og sentralstyrt installasjon av oppdateringer på operativsystemer, fastvare og applikasjoner.',
                auditEvidence: 'Patch management dashboard med dokumentert oppdateringsfrekvens og SLA.'
            },
            {
                id: 'NSM-2.3-2',
                title: 'Herdet grunnkonfigurasjon (Tiltak 2.3.2 & 2.3.3)',
                description: 'Bruk herdede oppsett basert på CIS Benchmarks; deaktiver unødvendige tjenester, porter og standardbrukere.',
                auditEvidence: 'Herdede baselines via Intune/GPO/IaC og samsvarsrapporter.'
            },
            {
                id: 'NSM-2.3-3',
                title: 'Obligatorisk flerfaktorautentisering (Tiltak 2.3.7)',
                description: 'Håndhev phishing-resistent eller app-basert MFA på all pålogging til sky, VPN, e-post og interne systemer.',
                auditEvidence: 'Conditional Access policy som beviser 100% MFA-påkrav for alle aktive kontoer.'
            }
        ]
    },
    {
        id: 'NSM-2.4',
        domain: '2. Beskytte og opprettholde',
        title: 'Kontroll over IKT-infrastruktur (NSM 2.4)',
        titleNo: 'Kontroll over IKT-infrastruktur (NSM 2.4)',
        description: 'Sikre full kontroll over driftsmiljøer, virtualisering, containere, skylagring og nettverksenheter, og hindre uautoriserte endringer.',
        descriptionNo: 'Sikre full kontroll over driftsmiljøer, virtualisering, containere, skylagring og nettverksenheter, og hindre uautoriserte endringer.',
        guidance: [
            {
                id: 'NSM-2.4-1',
                title: 'Konfigurasjonsstyring og endringskontroll',
                description: 'Bruk infrastruktur som kode (IaC) og formaliserte endringsprosedyrer for all produksjonsinfrastruktur.',
                auditEvidence: 'Git-historikk med pull request reviews og godkjenninger for infrastruktur.'
            },
            {
                id: 'NSM-2.4-2',
                title: 'Fysisk sikring av serverrom og driftsutstyr',
                description: 'Sikre lokaler, serverrack og nettverksskap med adgangskontroll og logging.',
                auditEvidence: 'Adgangslogger til datasenter/serverrom og fysisk sikringsinstruks.'
            }
        ]
    },
    {
        id: 'NSM-2.5',
        domain: '2. Beskytte og opprettholde',
        title: 'Kontroll over brukerkontoer og identiteter (NSM 2.5)',
        titleNo: 'Kontroll over brukerkontoer og identiteter (NSM 2.5)',
        description: 'Sikre trygg håndtering av identiteter og passord, automatisk livssyklus (Joiner-Mover-Leaver) og regelmessig tilgangsrevisjon.',
        descriptionNo: 'Sikre trygg håndtering av identiteter og passord, automatisk livssyklus og regelmessig tilgangsrevisjon.',
        guidance: [
            {
                id: 'NSM-2.5-1',
                title: 'Automatisert livssyklus for kontoer (JML)',
                description: 'Opprett, endre og sperr brukerkontoer automatisk basert på endringer i HR-systemet.',
                auditEvidence: 'Integrasjon mellom HR og identitetstjeneste (SCIM/IDM) og logger for deaktivering ved oppsigelse.'
            },
            {
                id: 'NSM-2.5-2',
                title: 'Periodisk tilgangsrevisjon',
                description: 'Gjennomfør kvartalsvise revisjoner av tilganger og fjern inaktive kontoer og overflødige rettigheter.',
                auditEvidence: 'Signerte attesteringslogger fra tilgangsrevisjon (Access Review).'
            }
        ]
    },
    {
        id: 'NSM-2.6',
        domain: '2. Beskytte og opprettholde',
        title: 'Kontroll på administrative privilegier (NSM 2.6)',
        titleNo: 'Kontroll på administrative privilegier (NSM 2.6)',
        description: 'Begrense tildeling av administratorrettigheter til et minimum, kreve separate admin-kontoer og bruke tidsbegrenset tilgang (Tiltak 2.6.1 og 2.6.4).',
        descriptionNo: 'Begrense tildeling av administratorrettigheter til et minimum, kreve separate admin-kontoer og bruke tidsbegrenset tilgang (Tiltak 2.6.1 og 2.6.4).',
        guidance: [
            {
                id: 'NSM-2.6-1',
                title: 'Begrens tildeling av administrative rettigheter (Tiltak 2.6.1)',
                description: 'Gi administratorrettigheter kun til navngitte personer med reelt behov; fjern faste lokale admin-rettigheter på klienter.',
                auditEvidence: 'Oversikt over godkjente administratorer og fjerning av lokaladmin på klient-PC-er.'
            },
            {
                id: 'NSM-2.6-2',
                title: 'Krev separate administratorkontoer (Tiltak 2.6.4)',
                description: 'Driftsansatte må benytte egne, dedikerte admin-kontoer uten tilgang til e-post eller generell nettsurfing.',
                auditEvidence: 'Regler i identitetssystemet som skiller ordinære brukerkontoer fra driftskontoer.'
            },
            {
                id: 'NSM-2.6-3',
                title: 'Bruk Privileged Access Management (PAM/PIM)',
                description: 'Krev tidsbegrenset aktivering (Just-in-Time) og godkjenningsflyt for forhøyede roller.',
                auditEvidence: 'PIM-aktiveringslogger og godkjenningshistorikk i identitetssystemet.'
            }
        ]
    },
    {
        id: 'NSM-2.7',
        domain: '2. Beskytte og opprettholde',
        title: 'Kontrollere dataflyt og soneoverganger (NSM 2.7)',
        titleNo: 'Kontrollere dataflyt og soneoverganger (NSM 2.7)',
        description: 'Overvåke, filtrere og kontrollere all dataflyt mellom interne soner, eksterne nettverk, partnere og skymiljøer.',
        descriptionNo: 'Overvåke, filtrere og kontrollere all dataflyt mellom interne soner, eksterne nettverk, partnere og skymiljøer.',
        guidance: [
            {
                id: 'NSM-2.7-1',
                title: 'Inspeksjon av inn- og utgående trafikk',
                description: 'Bruk moderne brannmurer (NGFW) med dyp pakkeinspeksjon og innholdsanalyse for å avdekke uønsket trafikk.',
                auditEvidence: 'Brannmurpolicyer og logger som viser blokkering av ondsinnet trafikk.'
            },
            {
                id: 'NSM-2.7-2',
                title: 'Beskyttelse mot uautorisert datautflyt (DLP)',
                description: 'Implementer kontroller som hindrer uautorisert opplasting eller deling av sensitive data til eksterne skylagre.',
                auditEvidence: 'Data Loss Prevention (DLP) regler og varslingslogger.'
            }
        ]
    },
    {
        id: 'NSM-2.8',
        domain: '2. Beskytte og opprettholde',
        title: 'Beskytte data i ro og i transitt (NSM 2.8)',
        titleNo: 'Beskytte data i ro og i transitt (NSM 2.8)',
        description: 'Beskytte konfidensialitet og integritet for sensitive data ved bruk av robust kryptering under overføring og lagring (Tiltak 2.8.1).',
        descriptionNo: 'Beskytte konfidensialitet og integritet for sensitive data ved bruk av robust kryptering under overføring og lagring (Tiltak 2.8.1).',
        guidance: [
            {
                id: 'NSM-2.8-1',
                title: 'Kryptering av data under overføring (Tiltak 2.8.1)',
                description: 'Påkrev TLS 1.2+ (helst TLS 1.3) med sterke chiffer for all kommunikasjon over eksterne nettverk; deaktiver usikre protokoller.',
                auditEvidence: 'Sikkerhetsrapporter (f.eks. SSL Labs Grade A) for alle eksterne web- og API-tjenester.'
            },
            {
                id: 'NSM-2.8-2',
                title: 'Kryptering av data ved lagring',
                description: 'Aktiver transparent datakryptering (AES-256) i databaser, skylagre og full diskkryptering (BitLocker/FileVault) på alle enheter.',
                auditEvidence: 'MDM-etterlevelsesrapport som beviser at 100% av bærbare enheter og disker er kryptert.'
            }
        ]
    },
    {
        id: 'NSM-2.9',
        domain: '2. Beskytte og opprettholde',
        title: 'Beskytte e-post, web og nettleser (NSM 2.9)',
        titleNo: 'Beskytte e-post, web og nettleser (NSM 2.9)',
        description: 'Etablere sterke beskyttelsesmekanismer mot phishing, ondsinnet kode og svindel via e-post, nettlesere og web (Tiltak 2.9.1).',
        descriptionNo: 'Etablere sterke beskyttelsesmekanismer mot phishing, ondsinnet kode og svindel via e-post, nettlesere og web (Tiltak 2.9.1).',
        guidance: [
            {
                id: 'NSM-2.9-1',
                title: 'E-postautentisering og beskyttelse (Tiltak 2.9.1)',
                description: 'Konfigurer SPF, DKIM og en streng DMARC-policy (p=reject eller quarantine) for alle virksomhetens domener.',
                auditEvidence: 'Offentlige DNS-oppslag som bekrefter gyldig SPF, DKIM og DMARC-policy.'
            },
            {
                id: 'NSM-2.9-2',
                title: 'Web- og innholdsfiltrering i nettleser',
                description: 'Blokker kjente skadelige nettsteder, nylig registrerte domener og uautoriserte filnedlastinger.',
                auditEvidence: 'DNS-sikkerhetsoppsett (f.eks. DNSSEC, beskyttet DNS) og webfiltreringspolicy i endepunktsverktøy.'
            },
            {
                id: 'NSM-2.9-3',
                title: 'Sikkerhetsbevissthet og phishing-trening for ansatte',
                description: 'Gjennomfør jevnlig opplæring og simulerte øvelser for å trene ansatte i å gjenkjenne sosial manipulering.',
                auditEvidence: 'Fullføringsgrad for årlige sikkerhetskurs og evalueringsrapporter fra phishing-simuleringer.'
            }
        ]
    },
    {
        id: 'NSM-2.10',
        domain: '2. Beskytte og opprettholde',
        title: 'Etablere hensiktsmessig logging (NSM 2.10)',
        titleNo: 'Etablere hensiktsmessig logging (NSM 2.10)',
        description: 'Etablere systematisk innsamling og uforanderlig oppbevaring av sikkerhetsrelevante logger fra nettverk, servere, applikasjoner og identiteter.',
        descriptionNo: 'Etablere systematisk innsamling og uforanderlig oppbevaring av sikkerhetsrelevante logger fra nettverk, servere, applikasjoner og identiteter.',
        guidance: [
            {
                id: 'NSM-2.10-1',
                title: 'Sentral logginnsamling og oppbevaring',
                description: 'Videresend logger fra alle kritiske systemer til et sentralt og sikkert loggsystem (SIEM) med minimum 12 måneders oppbevaring.',
                auditEvidence: 'Arkitekturtegning for logginnsamling og dokumentert retensjonstid i SIEM.'
            },
            {
                id: 'NSM-2.10-2',
                title: 'Beskytte loggenes integritet',
                description: 'Sikre at logger er uforanderlige og utilgjengelige for manipulering eller sletting av uautoriserte, inkludert systemadministratorer.',
                auditEvidence: 'Tilgangskontroller og WORM/append-only-konfigurasjon for logglagring.'
            },
            {
                id: 'NSM-2.10-3',
                title: 'Synkronisering av tid (NTP)',
                description: 'Synkroniser klokkene på samtlige enheter og servere mot autoritative og pålitelige tidskilder.',
                auditEvidence: 'NTP-konfigurasjon i nettverks- og driftspolicyer.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  3. OPPDAGE (Deteksjon, overvåking og sårbarhetskartlegging)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-3.1',
        domain: '3. Oppdage',
        title: 'Oppdage og fjerne sårbarheter (NSM 3.1)',
        titleNo: 'Oppdage og fjerne sårbarheter (NSM 3.1)',
        description: 'Kontinuerlig identifisere, prioritere og utbedre kjente sårbarheter og trusler på systemer, endepunkter og applikasjoner (Tiltak 3.1.1).',
        descriptionNo: 'Kontinuerlig identifisere, prioritere og utbedre kjente sårbarheter og trusler på systemer, endepunkter og applikasjoner (Tiltak 3.1.1).',
        guidance: [
            {
                id: 'NSM-3.1-1',
                title: 'Regelmessig sårbarhetsskanning (Tiltak 3.1.1)',
                description: 'Gjennomfør ukentlige automatiserte skanninger av interne og eksterne angrepsflater for kjente CVE-er.',
                auditEvidence: 'Siste sårbarhetsrapporter fra skanneverktøy (Tenable, Qualys, Defender Vulnerability).'
            },
            {
                id: 'NSM-3.1-2',
                title: 'Risikobasert patching og sårbarhetsstyring',
                description: 'Etabler definerte frister for utbedring basert på kritikalitet (f.eks. CVSS 9+ utbedres innen 7 dager).',
                auditEvidence: 'Prosedyrer for sårbarhetshåndtering og oversikt over utbedrede funn innen fastsatt SLA.'
            }
        ]
    },
    {
        id: 'NSM-3.2',
        domain: '3. Oppdage',
        title: 'Etablere sikkerhetsovervåking (NSM 3.2)',
        titleNo: 'Etablere sikkerhetsovervåking (NSM 3.2)',
        description: 'Etablere kontinuerlig analyse av logger og hendelsesdata med automatiserte varslingsregler og kapasitet for hendelsesdeteksjon (SOC).',
        descriptionNo: 'Etablere kontinuerlig analyse av logger og hendelsesdata med automatiserte varslingsregler og kapasitet for hendelsesdeteksjon (SOC).',
        guidance: [
            {
                id: 'NSM-3.2-1',
                title: 'Endepunktsdeteksjon og respons (EDR/XDR)',
                description: 'Rull ut EDR-agenter på alle servere og arbeidsstasjoner for kontinuerlig atferdsanalyse og sanntidsdeteksjon.',
                auditEvidence: 'EDR-administrasjonsrapport som beviser full agentdekning.'
            },
            {
                id: 'NSM-3.2-2',
                title: 'Automatiserte deteksjonsregler og SOC-varsling',
                description: 'Overvåk mistenkelig adferd, brute-force-forsøk, uautorisert privilegieøkning og lateral bevegelse døgnet rundt (24/7).',
                auditEvidence: 'Regelverk for sikkerhetsvarsler og driftsavtale med intern eller ekstern SOC-tjeneste.'
            }
        ]
    },
    {
        id: 'NSM-3.3',
        domain: '3. Oppdage',
        title: 'Sårbarhetsvurderinger og konfigurasjonskontroll (NSM 3.3)',
        titleNo: 'Sårbarhetsvurderinger og konfigurasjonskontroll (NSM 3.3)',
        description: 'Regelmessig verifisere at systemer, skymiljøer og nettverk overholder etablerte sikkerhetsstandarder og ikke har konfigurasjonsavvik.',
        descriptionNo: 'Regelmessig verifisere at systemer, skymiljøer og nettverk overholder etablerte sikkerhetsstandarder og ikke har konfigurasjonsavvik.',
        guidance: [
            {
                id: 'NSM-3.3-1',
                title: 'Automatisk samsvarskontroll mot baselines',
                description: 'Bruk verktøy for kontinuerlig etterlevelsesskanning mot CIS Benchmarks og sikkerhetsstandarder.',
                auditEvidence: 'Månedlige samsvarsrapporter fra Cloud Security Posture Management (CSPM) eller tilsvarende.'
            },
            {
                id: 'NSM-3.3-2',
                title: 'Revisjon av brannmur- og tilgangsregler',
                description: 'Gjennomgå og rydd opp i åpne porter, utdaterte brannmurregler og inaktive tilganger minst halvårlig.',
                auditEvidence: 'Dokumentert protokoll fra halvårlig revisjon av brannmuroppsett.'
            }
        ]
    },
    {
        id: 'NSM-3.4',
        domain: '3. Oppdage',
        title: 'Inntrengingstester og sikkerhetstesting (NSM 3.4)',
        titleNo: 'Inntrengingstester og sikkerhetstesting (NSM 3.4)',
        description: 'Gjennomføre realistiske penetrasjonstester, red team-øvelser og tekniske sikkerhetstester for å avdekke skjulte svakheter.',
        descriptionNo: 'Gjennomføre realistiske penetrasjonstester, red team-øvelser og tekniske sikkerhetstester for å avdekke skjulte svakheter.',
        guidance: [
            {
                id: 'NSM-3.4-1',
                title: 'Årlig penetrasjonstest av kritiske systemer',
                description: 'Engasjer uavhengige sikkerhetstestere for å simulere angrep mot eksterne og interne systemer.',
                auditEvidence: 'Rapport fra siste gjennomførte penetrasjonstest samt tiltaksplan for funn.'
            },
            {
                id: 'NSM-3.4-2',
                title: 'Beredskapsøvelser og sikkerhetstesting i dybden',
                description: 'Test virksomhetens deteksjonsevne ved kontrollerte angrepsscenarier.',
                auditEvidence: 'Evalueringsrapport fra gjennomført sikkerhetsøvelse med læringspunkter.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  4. HÅNDTERE OG GJENOPPRETTE (Beredskap, respons, kontinuitet)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'NSM-4.1',
        domain: '4. Håndtere og gjenopprette',
        title: 'Forberede virksomheten på hendelseshåndtering (NSM 4.1)',
        titleNo: 'Forberede virksomheten på hendelseshåndtering (NSM 4.1)',
        description: 'Etablere, dokumentere og vedlikeholde en operativ hendelseshåndteringsplan (Incident Response Plan) med klart definerte roller og kriseteam.',
        descriptionNo: 'Etablere, dokumentere og vedlikeholde en operativ hendelseshåndteringsplan med klart definerte roller og kriseteam.',
        guidance: [
            {
                id: 'NSM-4.1-1',
                title: 'Etabler hendelseshåndteringsplan (IRP)',
                description: 'Dokumenter rutiner for mottak, eskalering, isolering, etterforskning og gjenoppretting ved cyberhendelser.',
                auditEvidence: 'Godkjent og oppdatert hendelseshåndteringsplan (IRP) med kontaktlister og ansvarsmatrise.'
            },
            {
                id: 'NSM-4.1-2',
                title: 'Oppnevne og trene respons- og kriseteam (CSIRT)',
                description: 'Sørg for at roller innen teknisk respons, ledelse, juridisk og kommunikasjon er besatt og har nødvendig opplæring.',
                auditEvidence: 'Mandoversikt for hendelseshåndteringsteamet og plan for avløsning ved langvarige hendelser.'
            }
        ]
    },
    {
        id: 'NSM-4.2',
        domain: '4. Håndtere og gjenopprette',
        title: 'Vurdere, klassifisere og varsle hendelser (NSM 4.2)',
        titleNo: 'Vurdere, klassifisere og varsle hendelser (NSM 4.2)',
        description: 'Raskt vurdere alvorlighetsgraden av sikkerhetshendelser og varsle relevante interne interessenter, tilsynsmyndigheter (f.eks. Datatilsynet, NSM NorCERT) og berørte parter.',
        descriptionNo: 'Raskt vurdere alvorlighetsgraden av sikkerhetshendelser og varsle relevante interne interessenter, tilsynsmyndigheter og berørte parter.',
        guidance: [
            {
                id: 'NSM-4.2-1',
                title: 'Klassifisering av hendelser etter alvorlighet',
                description: 'Definer klare kriterier for eskalering basert på påvirkning av tjenester, konfidensialitetsbrudd og datatap.',
                auditEvidence: 'Klassifiseringsmatrise for hendelser med tidsfrister for eskalering.'
            },
            {
                id: 'NSM-4.2-2',
                title: 'Varslingsrutiner til myndigheter og samarbeidspartnere',
                description: 'Ha maler og prosedyrer klare for varsling til NSM/NorCERT, Datatilsynet (innen 72 timer ved personopplysningsbrudd) og sektormiljøer.',
                auditEvidence: 'Dokumentert varslingsprosedyre med kontaktinformasjon og standardiserte varslingsskjemaer.'
            }
        ]
    },
    {
        id: 'NSM-4.3',
        domain: '4. Håndtere og gjenopprette',
        title: 'Kontrollere og håndtere hendelser (NSM 4.3)',
        titleNo: 'Kontrollere og håndtere hendelser (NSM 4.3)',
        description: 'Gjennomføre umiddelbare tiltak for å inndemme, isolere og stanse pågående angrep, samt sikre digitale spor for videre analyse.',
        descriptionNo: 'Gjennomføre umiddelbare tiltak for å inndemme, isolere og stanse pågående angrep, samt sikre digitale spor for videre analyse.',
        guidance: [
            {
                id: 'NSM-4.3-1',
                title: 'Tekniske inndemmingstiltak (Isolasjon)',
                description: 'Ha forhåndsdefinerte mekanismer for rask nettverksisolering av infiserte systemer, tilbakekalling av sesjoner og sperring av kompromitterte kontoer.',
                auditEvidence: 'Instruks for nettverkskarantene og EDR-isolasjonstest.'
            },
            {
                id: 'NSM-4.3-2',
                title: 'Sikring av digitale spor (Forensics)',
                description: 'Sikre minnedumper, logger og diskkopier på en etterrettelig måte som bevarer bevisenes integritet.',
                auditEvidence: 'Prosedyre for digital bevissikring og verktøykasse for teknisk etterforskning.'
            },
            {
                id: 'NSM-4.3-3',
                title: 'Sikkerhetskopiering og testet gjenoppretting',
                description: 'Gjenopprett kritiske systemer fra uforanderlige (immutable) sikkerhetskopier etter 3-2-1-prinsippet.',
                auditEvidence: 'Logg fra siste vellykkede gjenopprettingstest av backupsystemet.'
            }
        ]
    },
    {
        id: 'NSM-4.4',
        domain: '4. Håndtere og gjenopprette',
        title: 'Evaluere og lære av hendelser (NSM 4.4)',
        titleNo: 'Evaluere og lære av hendelser (NSM 4.4)',
        description: 'Gjennomføre systematisk evaluering (Lessons Learned) etter sikkerhetshendelser for å tette sikkerhetshull og forbedre sikkerhetsarkitekturen.',
        descriptionNo: 'Gjennomføre systematisk evaluering etter sikkerhetshendelser for å tette sikkerhetshull og forbedre sikkerhetsarkitekturen.',
        guidance: [
            {
                id: 'NSM-4.4-1',
                title: 'Formell evaluering og etterarbeid (Post-Mortem)',
                description: 'Gjennomgå tidslinjen, rotårsaken og håndteringen i etterkant av hendelser for å avdekke forbedringspunkter.',
                auditEvidence: 'Evalueringsrapporter (Post-Incident Reviews) med dokumentert årsaksanalyse.'
            },
            {
                id: 'NSM-4.4-2',
                title: 'Oppdatering av sikkerhetstiltak og beredskapsplaner',
                description: 'Implementer forebyggende tiltak for å hindre gjentakelse og oppdater beredskapsplanene basert på erfaringene.',
                auditEvidence: 'Oppgave- og handlingsplan i sakshåndteringssystem for oppfølging av læringspunkter.'
            }
        ]
    }
];

export const nsmDomainTranslations: Record<string, Record<Lang, string>> = {
    '1. Identifisere og kartlegge': { nb: '1. Identifisere og kartlegge' },
    '2. Beskytte og opprettholde': { nb: '2. Beskytte og opprettholde' },
    '3. Oppdage': { nb: '3. Oppdage' },
    '4. Håndtere og gjenopprette': { nb: '4. Håndtere og gjenopprette' },
};
