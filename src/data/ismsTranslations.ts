/**
 * Norwegian translations for ISMS document templates.
 * Each document mirrors the structure in ismsDocuments.ts.
 */
import { Lang } from '../hooks/useLang';
import { ISMSDocument } from './ismsDocuments';

interface DocTranslation {
    title: string;
    description: string;
    sections: {
        id: string;
        title: string;
        description: string;
        standardText?: string;
        fields: { id: string; label: string; helpText: string; placeholder: string }[];
    }[];
}

const noDocTranslations: Record<string, DocTranslation> = {
    'isms-scope': {
        title: 'ISMS-omfang',
        description: 'Definerer grensene og anvendeligheten til styringssystemet for informasjonssikkerhet.',
        sections: [
            {
                id: 'scope-org', title: 'Organisasjonsoversikt', description: 'Beskriv organisasjonen og dens kontekst relevant for informasjonssikkerhet.',
                fields: [
                    { id: 'scope-org-name', label: 'Organisasjonsnavn', helpText: 'Fullt juridisk navn på organisasjonen.', placeholder: 'f.eks. Acme AS' },
                    { id: 'scope-org-desc', label: 'Organisasjonsbeskrivelse', helpText: 'Kort beskrivelse av organisasjonen, dens bransje og kjerneaktiviteter.', placeholder: 'f.eks. Acme AS er et programvareutviklingsselskap som spesialiserer seg på skybaserte løsninger for helsesektoren...' },
                    { id: 'scope-org-locations', label: 'Lokasjoner', helpText: 'Fysiske lokasjoner dekket av ISMS.', placeholder: 'f.eks. Hovedkontor: Oslo, Norge\nUtviklingskontor: Bergen, Norge\nSkyinfrastruktur: Azure West Europe' },
                ]
            },
            {
                id: 'scope-boundary', title: 'Omfangsavgrensning', description: 'Definer hva som er inkludert i og ekskludert fra ISMS.',
                fields: [
                    { id: 'scope-included', label: 'Inkludert i omfanget', helpText: 'Forretningsprosesser, avdelinger, systemer og lokasjoner som dekkes.', placeholder: 'f.eks. All IT-drift, programvareutvikling, behandling av kundedata, interne administrasjonssystemer og støttende infrastruktur.' },
                    { id: 'scope-excluded', label: 'Ekskludert fra omfanget (med begrunnelse)', helpText: 'Områder som er eksplisitt ekskludert og hvorfor.', placeholder: 'f.eks. Fysisk bygningsforvaltning er outsourcet til Eiendomsforvaltning AS og regulert av egen SLA.' },
                ]
            },
            {
                id: 'scope-stakeholders', title: 'Interesseparter', description: 'Identifiser interesseparter og deres krav relevant for ISMS.',
                fields: [
                    { id: 'scope-stakeholders-list', label: 'Interesseparter og deres krav', helpText: 'List opp interessenter (kunder, tilsynsmyndigheter, ansatte, partnere) og hva de forventer av informasjonssikkerhet.', placeholder: 'f.eks.\n- Kunder: Forventer datakonfidensialitet, GDPR-etterlevelse\n- Datatilsynet: Etterlevelse av personopplysningsloven\n- Ansatte: Beskyttelse av personopplysninger\n- NSM: Etterlevelse av grunnprinsipper for IKT-sikkerhet' },
                ]
            },
        ]
    },
    'isms-policy': {
        title: 'Informasjonssikkerhetspolicy',
        description: 'Overordnet policy som etablerer organisasjonens forpliktelse til informasjonssikkerhet.',
        sections: [
            {
                id: 'policy-purpose', title: 'Formål og forpliktelse', description: 'Angi formålet med policyen og ledelsens forpliktelse.',
                standardText: 'Denne policyen etablerer rammeverket for styring av informasjonssikkerhet i organisasjonen. Toppledelsen er forpliktet til å sikre konfidensialitet, integritet og tilgjengelighet for alle informasjonsverdier.',
                fields: [
                    { id: 'policy-objectives', label: 'Sikkerhetsmål', helpText: 'Overordnede mål for informasjonssikkerhet i tråd med virksomhetsstrategien.', placeholder: 'f.eks.\n- Beskytte kundedata og opprettholde tillit\n- Sikre regulatorisk etterlevelse (GDPR, sektorkrav)\n- Minimere risiko for sikkerhetshendelser\n- Fremme en sikkerhetsbevisst kultur' },
                ]
            },
            {
                id: 'policy-principles', title: 'Hovedprinsipper', description: 'Grunnleggende prinsipper som styrer beslutninger om informasjonssikkerhet.',
                standardText: 'Organisasjonen forplikter seg til:\n• Kontinuerlig forbedring av ISMS og dets effektivitet\n• Oppfyllelse av gjeldende juridiske, regulatoriske og kontraktsmessige krav\n• Tildeling av tilstrekkelige ressurser til informasjonssikkerhet\n• Sikre at alle ansatte forstår sitt ansvar\n• Gjennomføre regelmessige risikovurderinger og anvende passende kontroller',
                fields: [
                    { id: 'policy-additional', label: 'Organisasjonsspesifikke tilleggsprinsipper', helpText: 'Eventuelle tilleggsprinsipper spesifikke for din organisasjon eller bransje.', placeholder: 'f.eks. Alle skytjenester må godkjennes før bruk. Utvikling følger sikker SDLC-praksis.' },
                ]
            },
            {
                id: 'policy-approval', title: 'Godkjenning og gjennomgang', description: 'Dokumenter godkjenning og gjennomgangssyklus.',
                fields: [
                    { id: 'policy-approved-by', label: 'Godkjent av', helpText: 'Navn og rolle til person som godkjenner policyen.', placeholder: 'f.eks. Ola Nordmann, daglig leder' },
                    { id: 'policy-date', label: 'Godkjenningsdato', helpText: 'Dato for godkjenning.', placeholder: '' },
                    { id: 'policy-review', label: 'Gjennomgangsfrekvens', helpText: 'Hvor ofte denne policyen gjennomgås.', placeholder: 'f.eks. Årlig, eller ved vesentlige endringer' },
                ]
            },
        ]
    },
    'isms-roles': {
        title: 'Roller, ansvar og myndighet',
        description: 'Definerer roller og ansvar for informasjonssikkerhet i organisasjonen.',
        sections: [
            {
                id: 'roles-structure', title: 'Sikkerhetsorganisasjon', description: 'Beskriv organisasjonsstrukturen for informasjonssikkerhet.',
                standardText: 'Toppledelsen beholder det overordnede ansvaret for ISMS. Spesifikke roller tildeles for å sikre effektiv implementering, overvåking og forbedring av informasjonssikkerheten.',
                fields: [
                    { id: 'roles-ciso', label: 'CISO / Sikkerhetsansvarlig', helpText: 'Hvem er ansvarlig for ISMS og hva er deres nøkkelansvar?', placeholder: 'f.eks. Kari Nordmann, IT-sjef\n- Overordnet ansvar for ISMS\n- Rapporterer til daglig leder om ISMS-ytelse\n- Koordinerer risikovurderinger\n- Leder hendelsesrespons' },
                    { id: 'roles-dpo', label: 'Personvernombud (DPO)', helpText: 'Hvem er eventuelt personvernombud?', placeholder: 'f.eks. Per Hansen, Juridisk\n- Overvåker GDPR-etterlevelse\n- Rådgir om personvernkonsekvensvurderinger\n- Kontaktpunkt for Datatilsynet' },
                    { id: 'roles-it', label: 'IT-drift / Systemadministrasjon', helpText: 'Hvem er ansvarlig for daglig IT-sikkerhetsdrift?', placeholder: 'f.eks. IT-teamet (3 personer)\n- Patchhåndtering\n- Tilgangskontrolladministrasjon\n- Sikkerhetskopiering og gjenoppretting\n- Overvåking og logging' },
                    { id: 'roles-other', label: 'Andre roller', helpText: 'Andre nøkkelroller (sikkerhetskontakter, hendelsesansvarlige, verdieiere osv.).', placeholder: 'f.eks.\n- Avdelingsledere: Verdieiere for sitt område\n- Alle ansatte: Rapportere sikkerhetshendelser, følge retningslinjer' },
                ]
            },
        ]
    },
    'isms-risk-process': {
        title: 'Risikovurderingsprosess',
        description: 'Definerer hvordan organisasjonen identifiserer, analyserer og evaluerer informasjonssikkerhetsrisikoer.',
        sections: [
            {
                id: 'risk-methodology', title: 'Risikovurderingsmetodikk', description: 'Beskriv tilnærmingen og kriteriene for risikovurdering.',
                standardText: 'Organisasjonen bruker en strukturert risikovurderingsmetodikk som vurderer sannsynligheten og konsekvensen av at trusler utnytter sårbarheter i informasjonsverdier.',
                fields: [
                    { id: 'risk-approach', label: 'Tilnærming til risikovurdering', helpText: 'Beskriv din metode: kvalitativ, kvantitativ eller hybrid. Hvilken matrise/skala bruker dere?', placeholder: 'f.eks. Vi bruker en kvalitativ 5x5 risikomatrise.\nSannsynlighet: 1 (Sjelden) til 5 (Nesten sikker)\nKonsekvens: 1 (Ubetydelig) til 5 (Kritisk)\nRisiko = Sannsynlighet × Konsekvens\nRisikoer ≥ 12 krever behandling.' },
                    { id: 'risk-frequency', label: 'Vurderingsfrekvens', helpText: 'Hvor ofte gjennomføres risikovurderinger?', placeholder: 'f.eks. Årlig, og ved vesentlige endringer i omfang, systemer eller trusselbildet' },
                    { id: 'risk-owner', label: 'Ansvarlig for risikovurdering', helpText: 'Hvem er ansvarlig for å gjennomføre risikovurderinger?', placeholder: 'f.eks. CISO, med støtte fra avdelingsledere' },
                ]
            },
            {
                id: 'risk-criteria', title: 'Risikoakseptkriterier', description: 'Definer når en risiko er akseptabel og når den må behandles.',
                fields: [
                    { id: 'risk-accept', label: 'Risikoakseptkriterier', helpText: 'Definer terskelen for risikoaksept. Risikoer over denne terskelen må behandles.', placeholder: 'f.eks.\n- Lav risiko (1-5): Aksepter – overvåk ved regelmessige gjennomganger\n- Middels risiko (6-11): Aksepter med dokumentert begrunnelse fra verdieier\n- Høy risiko (12-19): Behandle – krever risikobehandlingsplan\n- Kritisk risiko (20-25): Behandle umiddelbart – eskaler til ledelsen' },
                ]
            },
        ]
    },
    'isms-risk-treatment': {
        title: 'Risikobehandlingsplan',
        description: 'Dokumenterer hvordan identifiserte risikoer behandles og hvilke kontroller som velges.',
        sections: [
            {
                id: 'treatment-options', title: 'Behandlingsalternativer', description: 'Hvordan organisasjonen velger behandlingsalternativer for risikoer.',
                standardText: 'For hver risiko som krever behandling velger organisasjonen ett eller flere alternativer:\n• Modifisere risikoen ved å anvende kontroller (fra ISO 27001 Annex A eller andre kilder)\n• Unngå risikoen ved å eliminere aktiviteten eller tilstanden\n• Dele risikoen gjennom forsikring eller outsourcing\n• Beholde risikoen med dokumentert aksept fra risikoeier',
                fields: [
                    { id: 'treatment-process', label: 'Behandlingsbeslutningsprosess', helpText: 'Hvem godkjenner risikobehandlingsbeslutninger? Hvilken dokumentasjon kreves?', placeholder: 'f.eks. Risikobehandlingsplaner foreslås av CISO og godkjennes av ledergruppen. Hver plan dokumenterer: risikoen, valgt behandlingsalternativ, kontroller som skal implementeres, ansvarlig person, tidslinje og forventet restrisiko.' },
                ]
            },
            {
                id: 'treatment-register', title: 'Risikoregister', description: 'Hvor risikoer og behandlingsplaner spores.',
                fields: [
                    { id: 'treatment-tool', label: 'Risikoregisterets plassering/verktøy', helpText: 'Hvor vedlikeholdes risikoregisteret?', placeholder: 'f.eks. SharePoint-dokumentbibliotek / Dedikert GRC-verktøy / Dette dashboardet' },
                    { id: 'treatment-review', label: 'Gjennomgangsfrekvens for risikoregister', helpText: 'Hvor ofte gjennomgås og oppdateres risikoregisteret?', placeholder: 'f.eks. Kvartalsvis av CISO, årlig under ledelsens gjennomgang' },
                ]
            },
        ]
    },
    'isms-soa': {
        title: 'Erklæring om anvendelighet (SoA)',
        description: 'Lister alle ISO 27001 Annex A-kontroller og dokumenterer om hver er anvendelig, med begrunnelse.',
        sections: [
            {
                id: 'soa-approach', title: 'Tilnærming', description: 'Hvordan erklæringen om anvendelighet forvaltes.',
                standardText: 'Erklæringen om anvendelighet (SoA) lister alle 93 kontroller fra ISO 27001:2022 Annex A. For hver kontroll dokumenteres det om kontrollen er anvendelig, begrunnelsen for inkludering eller ekskludering, og implementeringsstatus. SoA vedlikeholdes i Kontroller-fanen i dette verktøyet.',
                fields: [
                    { id: 'soa-note', label: 'Tilleggsmerknader til SoA', helpText: 'Eventuelle tilleggsmerknader om hvordan SoA forvaltes. Merk: Kontroller-fanen fungerer som din levende SoA.', placeholder: 'f.eks. SoA gjennomgås årlig som del av ledelsens gjennomgang. Kontroller merket "Ikke aktuelt" krever dokumentert begrunnelse.' },
                ]
            },
        ]
    },
    'isms-objectives': {
        title: 'Informasjonssikkerhetsmål',
        description: 'Målbare informasjonssikkerhetsmål i tråd med sikkerhetspolicyen.',
        sections: [
            {
                id: 'obj-list', title: 'Sikkerhetsmål', description: 'Definer målbare mål for ISMS.',
                fields: [
                    { id: 'obj-1', label: 'Mål 1', helpText: 'Definer et spesifikt, målbart sikkerhetsmål.', placeholder: 'f.eks. Oppnå 100% av kritiske patcher installert innen 7 dager etter utgivelse.\nMåles av: Månedlig patchrapport\nAnsvarlig: IT-drift\nMåldato: Løpende' },
                    { id: 'obj-2', label: 'Mål 2', helpText: 'Definer et annet mål.', placeholder: 'f.eks. Fullføre sikkerhetsopplæring for 100% av ansatte årlig.\nMåles av: Gjennomføringsregistre i HR-system\nAnsvarlig: CISO\nMåldato: Q4 hvert år' },
                    { id: 'obj-3', label: 'Mål 3', helpText: 'Definer et annet mål.', placeholder: 'f.eks. Redusere gjennomsnittlig deteksjonstid (MTTD) for sikkerhetshendelser til under 24 timer.\nMåles av: Hendelsesresponsmetrikker\nAnsvarlig: IT-drift\nMåldato: Innen 12 måneder' },
                    { id: 'obj-4', label: 'Mål 4 (valgfritt)', helpText: 'Ytterligere mål om nødvendig.', placeholder: '' },
                ]
            },
        ]
    },
    'isms-competence': {
        title: 'Kompetanse og opplæring',
        description: 'Hvordan organisasjonen sikrer at personell har nødvendig kompetanse for informasjonssikkerhet.',
        sections: [
            {
                id: 'comp-requirements', title: 'Kompetansekrav', description: 'Definer kompetansekrav for nøkkelroller.',
                fields: [
                    { id: 'comp-general', label: 'Generell sikkerhetskompetanse', helpText: 'Hvilket nivå av sikkerhetsbevissthet kreves av alle ansatte?', placeholder: 'f.eks. Alle ansatte må fullføre årlig sikkerhetsopplæring som dekker:\n- Gjenkjenning av phishing\n- Passordhygiene\n- Dataklassifisering og -håndtering\n- Prosedyrer for hendelsesrapportering' },
                    { id: 'comp-specialized', label: 'Spesialisert kompetanse', helpText: 'Hvilken spesialisert opplæring kreves for IT, sikkerhet og ledelse?', placeholder: 'f.eks.\n- IT-ansatte: Sikker konfigurasjon, sårbarhetshåndtering\n- Utviklere: Sikker koding (OWASP Top 10)\n- CISO: ISO 27001 Lead Implementer-sertifisering\n- Ledelse: Sikkerhetsstyring og risikohåndtering' },
                ]
            },
            {
                id: 'comp-program', title: 'Opplæringsprogram', description: 'Hvordan opplæring leveres og spores.',
                fields: [
                    { id: 'comp-delivery', label: 'Leveringsmetode for opplæring', helpText: 'Hvordan leveres opplæringen?', placeholder: 'f.eks. Nettbasert e-læringsplattform (KnowBe4), supplert med kvartalsvise workshops og phishing-simuleringer.' },
                    { id: 'comp-tracking', label: 'Opplæringsregistre', helpText: 'Hvordan vedlikeholdes opplæringsregistrene?', placeholder: 'f.eks. HR-systemet sporer gjennomføring. Rapporter gjennomgås kvartalsvis av CISO.' },
                ]
            },
        ]
    },
    'isms-communication': {
        title: 'Kommunikasjonsplan',
        description: 'Definerer hva, når og hvordan informasjonssikkerhet kommuniseres internt og eksternt.',
        sections: [
            {
                id: 'comm-plan', title: 'Kommunikasjonsplan', description: 'Definer kommunikasjonsmetoder for informasjonssikkerhet.',
                fields: [
                    { id: 'comm-internal', label: 'Intern kommunikasjon', helpText: 'Hvordan kommuniseres sikkerhetsinformasjon internt? (policyer, hendelser, endringer)', placeholder: 'f.eks.\n- Sikkerhetspolicyer: Publisert på intranett, kommunisert under onboarding\n- Sikkerhetshendelser: E-postvarsel til berørte, status i Slack-kanal\n- ISMS-oppdateringer: Kvartalsvis nyhetsbrev fra CISO\n- Risikovurderingsresultater: Presentert på ledermøter' },
                    { id: 'comm-external', label: 'Ekstern kommunikasjon', helpText: 'Hvordan kommuniseres sikkerhetsinformasjon eksternt? (kunder, myndigheter, partnere)', placeholder: 'f.eks.\n- Databrudd: Varsling til Datatilsynet innen 72 timer iht. GDPR art. 33\n- Kundehenvendelser: Håndteres av sikkerhetsteamet med standardsvar\n- Sertifiseringer: Publisert på nettstedet\n- Leverandørsikkerhet: Kommunisert gjennom anskaffelsesprosessen' },
                ]
            },
        ]
    },
    'isms-doc-control': {
        title: 'Dokumentstyring',
        description: 'Hvordan dokumentert informasjon i ISMS forvaltes, lagres og kontrolleres.',
        sections: [
            {
                id: 'docctrl-process', title: 'Dokumentforvaltning', description: 'Definer hvordan ISMS-dokumenter kontrolleres.',
                standardText: 'All dokumentert informasjon som kreves av ISMS skal identifiseres, lagres, beskyttes og underlegges versjonskontroll. Dokumenter må gjennomgås og godkjennes før distribusjon.',
                fields: [
                    { id: 'docctrl-storage', label: 'Dokumentlagring', helpText: 'Hvor lagres ISMS-dokumenter?', placeholder: 'f.eks. Alle ISMS-dokumenter lagres i SharePoint under /ISMS/. Tilgang er begrenset til autorisert personell. Dette verktøyet fungerer som operativt dashboard.' },
                    { id: 'docctrl-versioning', label: 'Versjonskontroll', helpText: 'Hvordan håndteres dokumentversjoner?', placeholder: 'f.eks. SharePoint-versjonering med hovednummerering. Endringslogg vedlikeholdes i hvert dokument.' },
                    { id: 'docctrl-retention', label: 'Oppbevaringstid', helpText: 'Hvor lenge oppbevares ISMS-registre?', placeholder: 'f.eks. Minimum 3 år, eller som krevet av regulatoriske forpliktelser' },
                ]
            },
        ]
    },
    'isms-monitoring': {
        title: 'Overvåking, måling og evaluering',
        description: 'Definerer hva organisasjonen overvåker og måler for å evaluere ISMS-effektivitet.',
        sections: [
            {
                id: 'mon-metrics', title: 'Sikkerhetsmetrikker', description: 'Definer hva som måles og hvordan.',
                fields: [
                    { id: 'mon-kpis', label: 'Nøkkelresultatindikatorer (KPI-er)', helpText: 'List opp sikkerhetsmålingene du sporer og hvordan de måles.', placeholder: 'f.eks.\n- Patchetterlevelsesrate (% systemer patchet innen SLA)\n- Gjennomføringsrate for sikkerhetsopplæring\n- Antall sikkerhetshendelser per kvartal\n- Gjennomsnittlig deteksjonstid/responstid\n- Prosentandel kontroller implementert (fra SoA)\n- Antall åpne høy/kritiske risikoer' },
                    { id: 'mon-reporting', label: 'Rapporteringsfrekvens og publikum', helpText: 'Hvor ofte rapporteres metrikker og til hvem?', placeholder: 'f.eks. Månedlig: CISO-dashboard gjennomgått av IT-ledelse\nKvartalsvis: Sikkerhetsrapport til toppledelsen\nÅrlig: Omfattende ISMS-ytelsesrapport for ledelsens gjennomgang' },
                ]
            },
        ]
    },
    'isms-internal-audit': {
        title: 'Internrevisjonsprogram',
        description: 'Plan og prosess for gjennomføring av internrevisjoner av ISMS.',
        sections: [
            {
                id: 'audit-program', title: 'Revisjonsprogram', description: 'Definer tilnærmingen til internrevisjon.',
                fields: [
                    { id: 'audit-frequency', label: 'Revisjonsfrekvens', helpText: 'Hvor ofte gjennomføres interne ISMS-revisjoner?', placeholder: 'f.eks. Full ISMS-revisjon årlig, med målrettede revisjoner av høyrisikoområder halvårlig' },
                    { id: 'audit-scope', label: 'Revisjonsomfang og -plan', helpText: 'Hvordan bestemmes revisjonsomfanget? Hvem gjennomfører revisjonene?', placeholder: 'f.eks. Revisjonsomfanget dekker alle ISMS-klausuler og gjeldende Annex A-kontroller over en 12-måneders syklus. Revisjoner gjennomføres av kvalifiserte internrevisorer som er uavhengige av området som revideres.' },
                    { id: 'audit-findings', label: 'Funn-håndtering', helpText: 'Hvordan spores og løses revisjonsfunn?', placeholder: 'f.eks. Funn klassifiseres som alvorlig avvik, mindre avvik eller observasjon. Alle avvik krever en tiltaksplan med ansvarlig og frist. Status spores i dette verktøyet og gjennomgås på ledermøter.' },
                ]
            },
        ]
    },
    'isms-mgmt-review': {
        title: 'Ledelsens gjennomgang',
        description: 'Prosess for toppledelsens gjennomgang av ISMS med planlagte intervaller.',
        sections: [
            {
                id: 'mgmtrev-process', title: 'Prosess for ledelsens gjennomgang', description: 'Definer hvordan ledelsens gjennomganger gjennomføres.',
                standardText: 'Toppledelsen gjennomgår ISMS med planlagte intervaller for å sikre dets fortsatte egnethet, tilstrekkelighet og effektivitet.',
                fields: [
                    { id: 'mgmtrev-frequency', label: 'Gjennomgangsfrekvens', helpText: 'Hvor ofte gjennomføres ledelsens gjennomganger?', placeholder: 'f.eks. Årlig i Q1, med ad hoc-gjennomganger ved vesentlige endringer' },
                    { id: 'mgmtrev-inputs', label: 'Gjennomgangsinput', helpText: 'Hvilken informasjon gjennomgås?', placeholder: 'f.eks.\n- Status på tiltak fra forrige gjennomgang\n- Endringer i interne/eksterne forhold\n- ISMS-ytelsesmetrikker og trender\n- Revisjonsresultater og avvik\n- Status for risikovurdering og -behandling\n- Forbedringsmuligheter\n- Tilbakemeldinger fra interesseparter' },
                    { id: 'mgmtrev-participants', label: 'Deltakere', helpText: 'Hvem deltar i ledelsens gjennomgang?', placeholder: 'f.eks. Daglig leder, CTO, CISO, avdelingsledere, personvernombud' },
                ]
            },
        ]
    },
    'isms-incident-nc': {
        title: 'Hendelseshåndtering og korrigerende tiltak',
        description: 'Prosess for håndtering av sikkerhetshendelser og avvik, inkludert korrigerende tiltak.',
        sections: [
            {
                id: 'incident-process', title: 'Hendelseshåndteringsprosess', description: 'Definer hvordan sikkerhetshendelser håndteres.',
                fields: [
                    { id: 'incident-reporting', label: 'Hendelsesrapportering', helpText: 'Hvordan rapporterer ansatte sikkerhetshendelser? Hvilke kanaler er tilgjengelige?', placeholder: 'f.eks. Ansatte rapporterer hendelser via:\n- E-post til security@company.com\n- Slack-kanal #sikkerhetshendelser\n- Telefon til CISO for akutte saker\n- Anonym tipskanal på intranett' },
                    { id: 'incident-classification', label: 'Hendelsesklassifisering', helpText: 'Hvordan klassifiseres hendelser etter alvorlighetsgrad?', placeholder: 'f.eks.\n- Kritisk: Databrudd, løsepengevirus, systemkompromittering\n- Høy: Vellykket phishing, uautorisert tilgangsforsøk\n- Middels: Policybrudd, mistenkelig aktivitet\n- Lav: Mislykkede innloggingsforsøk, spam' },
                    { id: 'incident-response', label: 'Responsprosess', helpText: 'Steg som tas når en hendelse rapporteres.', placeholder: 'f.eks.\n1. Triage og klassifiser alvorlighetsgrad\n2. Begrens hendelsen\n3. Undersøk rotårsak\n4. Fjern og gjenopprett\n5. Dokumenter erfaringer\n6. Rapporter til myndigheter om nødvendig (Datatilsynet innen 72t for personopplysningsbrudd)' },
                ]
            },
            {
                id: 'nc-corrective', title: 'Korrigerende tiltaksprosess', description: 'Hvordan avvik håndteres.',
                standardText: 'Når et avvik identifiseres (gjennom hendelser, revisjoner eller overvåking) iverksetter organisasjonen korrigerende tiltak for å eliminere årsaken og hindre gjentakelse.',
                fields: [
                    { id: 'nc-process', label: 'Prosess for korrigerende tiltak', helpText: 'Hvordan identifiseres rotårsaker og spores korrigerende tiltak?', placeholder: 'f.eks. Rotårsaksanalyse med 5-Hvorfor-metoden. Korrigerende tiltak dokumenteres med ansvarlig, frist og verifiseringskriterier. Spores i tiltakslogg og gjennomgås månedlig av CISO.' },
                ]
            },
        ]
    },
    'isms-continual-improvement': {
        title: 'Kontinuerlig forbedring',
        description: 'Hvordan organisasjonen kontinuerlig forbedrer ISMS sin egnethet, tilstrekkelighet og effektivitet.',
        sections: [
            {
                id: 'improvement-approach', title: 'Forbedringsprosess', description: 'Definer hvordan ISMS kontinuerlig forbedres.',
                standardText: 'Organisasjonen er forpliktet til kontinuerlig forbedring av ISMS gjennom bruk av korrigerende tiltak, ledelsens gjennomganger, revisjoner, risikovurderinger og overvåking av sikkerhetsmål.',
                fields: [
                    { id: 'improvement-sources', label: 'Forbedringskilder', helpText: 'Hva driver forbedring? Hvordan fanges forbedringsmuligheter opp?', placeholder: 'f.eks.\n- Beslutninger fra ledelsens gjennomgang\n- Funn fra interne og eksterne revisjoner\n- Erfaringer fra hendelser\n- Oppdaterte risikovurderinger\n- Benchmarking mot bransjestandard\n- Tilbakemeldinger fra ansatte\n- Endringer i trusselbildet' },
                    { id: 'improvement-tracking', label: 'Hvordan forbedringer spores', helpText: 'Hvordan sporer og verifiserer dere forbedringer?', placeholder: 'f.eks. Forbedringstiltak logges i ISMS-tiltaksregisteret med ansvarlig, måldato og ferdigstillelsesstatus. Effektivitet verifiseres ved neste ledelsens gjennomgang.' },
                ]
            },
        ]
    },
};

export function getDocTranslation(docId: string, _lang: Lang): DocTranslation | null {
    // Both nb and nn use Norwegian translations
    return noDocTranslations[docId] || null;
}

/**
 * Get a translated document - merges base doc with translation overlay.
 */
export function getTranslatedDoc(doc: ISMSDocument, _lang: Lang): ISMSDocument {
    // Both nb and nn use Norwegian translations
    const translation = noDocTranslations[doc.id];
    if (!translation) return doc;

    return {
        ...doc,
        title: translation.title,
        description: translation.description,
        sections: doc.sections.map((section, i) => {
            const tSection = translation.sections[i];
            if (!tSection) return section;
            return {
                ...section,
                title: tSection.title,
                description: tSection.description,
                standardText: tSection.standardText ?? section.standardText,
                fields: section.fields.map((field, j) => {
                    const tField = tSection.fields[j];
                    if (!tField) return field;
                    return { ...field, label: tField.label, helpText: tField.helpText, placeholder: tField.placeholder };
                }),
            };
        }),
    };
}
