/**
 * Norwegian translations for ISO27001 control data.
 * Maps control ID -> translated fields.
 */
import { Lang } from '../hooks/useLang';

interface ControlTranslation {
    title: string;
    description: string;
    guidance: { id: string; title: string; description: string; auditEvidence?: string }[];
}

const noTranslations: Record<string, ControlTranslation> = {
    'A.5.1': {
        title: 'Retningslinjer for informasjonssikkerhet',
        description: 'Retningslinjer for informasjonssikkerhet og temaspesifikke retningslinjer skal defineres, godkjennes av ledelsen, publiseres, kommuniseres til og bekreftes av relevant personell og interesserte parter, og gjennomgås ved planlagte intervaller og ved vesentlige endringer.',
        guidance: [
            { id: 'A.5.1-1', title: 'Utarbeid en overordnet informasjonssikkerhetspolicy', description: 'Lag hoveddokumentet som definerer mål, omfang og forpliktelse.', auditEvidence: 'Signert og godkjent informasjonssikkerhetspolicy (hoveddokument) med revisjonshistorikk.' },
            { id: 'A.5.1-2', title: 'Definer temaspesifikke retningslinjer', description: 'Lag støttende retningslinjer for tilgangskontroll, dataklassifisering, akseptabel bruk osv.', auditEvidence: 'Dokumenterte retningslinjer for f.eks. tilgangskontroll, klassifisering, passordhåndtering og akseptabel bruk.' },
            { id: 'A.5.1-3', title: 'Få ledelsens godkjenning', description: 'Presenter for toppledelsen for formell gjennomgang og signatur.', auditEvidence: 'Møtereferat fra styre/ledelse eller formell signatur som bekrefter ledelsens godkjenning av retningslinjene.' },
            { id: 'A.5.1-4', title: 'Publiser og kommuniser', description: 'Distribuer via intranett, e-post eller opplæring og samle inn bekreftelser.', auditEvidence: 'Skjermbilde av publisering på intranett, e-postutsendelse eller signert kvittering fra de ansatte på lest og forstått policy.' },
            { id: 'A.5.1-5', title: 'Planlegg periodiske gjennomganger', description: 'Sett gjennomgangsfrekvens (f.eks. årlig) og utpek ansvarlig.', auditEvidence: 'Årlig revisjonsplan for styrende dokumenter eller referat fra årlig policy-evaluering.' },
        ]
    },
    'A.5.2': {
        title: 'Roller og ansvar for informasjonssikkerhet',
        description: 'Roller og ansvar for informasjonssikkerhet skal defineres og tildeles i henhold to organisasjonens behov.',
        guidance: [
            { id: 'A.5.2-1', title: 'Identifiser nøkkelroller for sikkerhet', description: 'Definer roller som CISO, personvernombud, sikkerhetskontakter og hendelsesansvarlige.', auditEvidence: 'Stillingsbeskrivelse for CISO/sikkerhetsansvarlig og organisasjonskart som viser sikkerhetsfunksjonens uavhengighet.' },
            { id: 'A.5.2-2', title: 'Dokumenter ansvar per rolle', description: 'Lag en RACI-matrise eller rollebeskrivelser som beskriver ansvar og myndighet.', auditEvidence: 'RACI-matrise for sikkerhetsprosesser eller dedikert kapittel i sikkerhetshåndboken.' },
            { id: 'A.5.2-3', title: 'Tildel roller til personell', description: 'Formelt utnevn personer til hver rolle og kommuniser deres ansvar.', auditEvidence: 'Signerte utnevnelsesbrev eller ansettelsesavtaler som bekrefter tildeling av sikkerhetsroller.' },
            { id: 'A.5.2-4', title: 'Gjennomgå og oppdater tildelinger', description: 'Revider rolletildelinger ved organisasjonsendringer.', auditEvidence: 'Årlig gjennomgangslogg for tildelte roller og ansvar.' },
        ]
    },
    'A.5.3': {
        title: 'Oppgavedeling',
        description: 'Motstridende oppgaver og ansvarsområder skal adskilles.',
        guidance: [
            { id: 'A.5.3-1', title: 'Identifiser motstridende oppgaver', description: 'Kartlegg kritiske prosesser og identifiser hvor én person som utfører flere funksjoner skaper risiko.', auditEvidence: 'Matrise over oppgavedeling (SoD-matrise) som viser motstridende roller.' },
            { id: 'A.5.3-2', title: 'Implementer separasjon', description: 'Sørg for at ingen kan kontrollere alle aspekter av en kritisk transaksjon uten uavhengig tilsyn.', auditEvidence: 'Skjermbilder fra systemer (f.eks. AD, ERP, eller Github branch protections) som beviser at utvikler og godkjenner er adskilt.' },
            { id: 'A.5.3-3', title: 'Dokumenter kompenserende kontroller', description: 'Der oppgavedeling ikke er mulig, implementer overvåking, logging og periodiske gjennomganger.', auditEvidence: 'Logg over uavhengig etterkontroll og ledelsens godkjenning der SoD ikke er praktisk mulig.' },
        ]
    },
    'A.5.4': {
        title: 'Ledelsens ansvar',
        description: 'Ledelsen skal kreve at alt personell følger informasjonssikkerheten i samsvar med etablerte retningslinjer og prosedyrer.',
        guidance: [
            { id: 'A.5.4-1', title: 'Ledelsens forpliktelse', description: 'Sørg for at ledelsen synlig støtter og kommuniserer viktigheten av informasjonssikkerhet.' },
            { id: 'A.5.4-2', title: 'Integrer i ansettelsesavtaler', description: 'Inkluder sikkerhetsansvar i arbeidskontrakter, stillingsbeskrivelser og onboarding.' },
            { id: 'A.5.4-3', title: 'Håndhev etterlevelse', description: 'Implementer en disiplinærprosess for brudd og sørg for konsekvent håndheving.' },
        ]
    },
    'A.5.5': {
        title: 'Kontakt med myndigheter',
        description: 'Organisasjonen skal etablere og vedlikeholde kontakt med relevante myndigheter.',
        guidance: [
            { id: 'A.5.5-1', title: 'Identifiser relevante myndigheter', description: 'List opp tilsynsmyndigheter, politi, CERT/CSIRT og sektorspesifikke organer.' },
            { id: 'A.5.5-2', title: 'Etabler kontaktprosedyrer', description: 'Definer når og hvordan man kontakter hver myndighet (f.eks. varsling av databrudd til Datatilsynet innen 72 timer).' },
            { id: 'A.5.5-3', title: 'Vedlikehold kontaktregister', description: 'Hold et oppdatert register med kontaktinformasjon og rapporteringsterskler.' },
        ]
    },
    'A.5.6': {
        title: 'Kontakt med interessegrupper', description: 'Organisasjonen skal etablere og vedlikeholde kontakt med relevante interessegrupper eller spesialistfora.', guidance: [
            { id: 'A.5.6-1', title: 'Identifiser relevante grupper', description: 'Bli med i bransjefora, ISAC-er og profesjonelle organisasjoner.' },
            { id: 'A.5.6-2', title: 'Delta aktivt', description: 'Delta på møter, abonner på informasjonskilder og del etterretning.' },
        ]
    },
    'A.5.7': {
        title: 'Trusseletterretning',
        description: 'Informasjon om trusler mot informasjonssikkerheten skal samles inn og analyseres for å produsere trusseletterretning.',
        guidance: [
            { id: 'A.5.7-1', title: 'Abonner på trusselkilder', description: 'Etabler abonnementer på relevante trusseletterretningskilder (CERT, leverandørvarsler, bransjefora).' },
            { id: 'A.5.7-2', title: 'Analyser og kontekstualiser trusler', description: 'Vurder trusselinformasjon opp mot organisasjonens verdier, eksponering og risikoappetitt.' },
            { id: 'A.5.7-3', title: 'Integrer i risikostyring', description: 'Bruk trusseletterretning i risikovurderinger og beredskapsplanlegging.' },
        ]
    },
    'A.5.8': {
        title: 'Informasjonssikkerhet i prosjektledelse',
        description: 'Informasjonssikkerhet skal integreres i prosjektledelse.',
        guidance: [
            { id: 'A.5.8-1', title: 'Legg til sikkerhet i prosjektmetodikken', description: 'Inkluder sikkerhetssjekkpunkter i prosjektrammeverket.' },
            { id: 'A.5.8-2', title: 'Gjennomfør sikkerhetsrisikovurderinger', description: 'Krev risikovurdering ved prosjektstart og ved viktige milepæler.' },
            { id: 'A.5.8-3', title: 'Definer akseptansekriterier for sikkerhet', description: 'Sett sikkerhetskrav som må oppfylles før leveranser godkjennes.' },
        ]
    },
    'A.5.9': {
        title: 'Oversikt over informasjon og tilknyttede verdier', description: 'En oversikt over informasjon og tilknyttede verdier, inkludert eiere, skal utvikles og vedlikeholdes.', guidance: [
            { id: 'A.5.9-1', title: 'Opprett verdioversikt', description: 'List alle informasjonsverdier, maskinvare, programvare og tjenester.' },
            { id: 'A.5.9-2', title: 'Tildel eiere', description: 'Utpek en eier for hver verdi med ansvar for beskyttelse.' },
        ]
    },
    'A.5.10': {
        title: 'Akseptabel bruk av informasjon og verdier', description: 'Regler for akseptabel bruk av informasjon og verdier skal identifiseres, dokumenteres og implementeres.', guidance: [
            { id: 'A.5.10-1', title: 'Definer akseptabel brukspolicy', description: 'Dokumenter regler for bruk av utstyr, internett, e-post og private enheter.' },
            { id: 'A.5.10-2', title: 'Kommuniser til alle brukere', description: 'Distribuer policy og få bekreftelse fra alle ansatte og leverandører.' },
        ]
    },
    'A.5.11': {
        title: 'Tilbakelevering av verdier', description: 'Personell skal returnere alle organisasjonens verdier ved endring eller avslutning av ansettelse.', guidance: [
            { id: 'A.5.11-1', title: 'Definer returprosedyrer', description: 'Lag en sjekkliste for tilbakelevering av utstyr ved offboarding.' },
            { id: 'A.5.11-2', title: 'Spor og verifiser returer', description: 'Sørg for at alt utstyr, nøkler og adgangskort returneres og logges.' },
        ]
    },
    'A.5.12': {
        title: 'Klassifisering av informasjon', description: 'Informasjon skal klassifiseres basert på konfidensialitet, integritet, tilgjengelighet og relevante interessentkrav.', guidance: [
            { id: 'A.5.12-1', title: 'Definer klassifiseringsordning', description: 'Etabler nivåer som offentlig, intern, konfidensiell, strengt konfidensiell.' },
            { id: 'A.5.12-2', title: 'Lag klassifiseringsretningslinjer', description: 'Dokumenter hvordan ulike typer informasjon skal klassifiseres.' },
        ]
    },
    'A.5.13': {
        title: 'Merking av informasjon', description: 'Prosedyrer for informasjonsmerking skal utvikles og implementeres.', guidance: [
            { id: 'A.5.13-1', title: 'Definer merkeprosedyrer', description: 'Spesifiser hvordan dokumenter, e-poster og medier skal merkes med klassifiseringsnivå.' },
        ]
    },
    'A.5.14': {
        title: 'Informasjonsoverføring', description: 'Regler og prosedyrer for informasjonsoverføring skal være på plass.', guidance: [
            { id: 'A.5.14-1', title: 'Definer overføringsregler', description: 'Etabler prosedyrer for sikker filoverføring, e-post og fysisk mediehåndtering.' },
            { id: 'A.5.14-2', title: 'Sett opp sikre kanaler', description: 'Implementer kryptering for data under overføring (TLS, SFTP, VPN).' },
        ]
    },
    'A.5.15': {
        title: 'Tilgangskontroll', description: 'Regler for kontroll av fysisk og logisk tilgang skal etableres og implementeres.', guidance: [
            { id: 'A.5.15-1', title: 'Definer tilgangskontrollpolicy', description: 'Etabler regler for tildeling, endring og tilbaketrekking av tilgang.', auditEvidence: 'Godkjent tilgangskontrollpolicy som definerer kriterier for tildeling av tilganger.' },
            { id: 'A.5.15-2', title: 'Implementer minste privilegium', description: 'Sørg for at brukere kun har tilgang som er nødvendig for deres rolle.', auditEvidence: 'Rolle- og tilgangsdefinisjoner i f.eks. Active Directory eller HR-system som beviser etterlevelse av minste privilegiums prinsipp.' },
        ]
    },
    'A.5.16': {
        title: 'Identitetshåndtering', description: 'Hele livssyklusen for identiteter skal håndteres.', guidance: [
            { id: 'A.5.16-1', title: 'Håndter identitetslivssyklus', description: 'Definer prosesser for opprettelse, endring, deaktivering og sletting av brukerkontoer.' },
        ]
    },
    'A.5.17': {
        title: 'Autentiseringsinformasjon', description: 'Tildeling og håndtering av autentiseringsinformasjon skal kontrolleres.', guidance: [
            { id: 'A.5.17-1', title: 'Definer passord-/legitimasjonspolicy', description: 'Etabler regler for passordkompleksitet, MFA og legitimasjonslagring.' },
        ]
    },
    'A.5.18': {
        title: 'Tilgangsrettigheter', description: 'Tilgangsrettigheter skal tildeles, gjennomgås, endres og fjernes.', guidance: [
            { id: 'A.5.18-1', title: 'Implementer tildelingsprosess', description: 'Lag formelle forespørsels-/godkjenningsarbeidsflyter for tilgangsrettigheter.' },
            { id: 'A.5.18-2', title: 'Gjennomfør periodiske tilgangsgjennomganger', description: 'Gjennomgå tilgangsrettigheter minst årlig og ved rolleendringer.' },
        ]
    },
    'A.5.19': {
        title: 'Informasjonssikkerhet i leverandørforhold', description: 'Prosesser skal defineres for å håndtere sikkerhetsrisiko knyttet til leverandørers produkter eller tjenester.', guidance: [
            { id: 'A.5.19-1', title: 'Definer sikkerhetskrav for leverandører', description: 'Etabler minimumskrav til sikkerhet for leverandører og inkluder i kontrakter.' },
        ]
    },
    'A.5.20': {
        title: 'Sikkerhet i leverandøravtaler', description: 'Relevante sikkerhetskrav skal etableres og avtales med hver leverandør.', guidance: [
            { id: 'A.5.20-1', title: 'Inkluder sikkerhetsklausuler i kontrakter', description: 'Legg til NDA, datahåndtering, hendelsesvarsling og revisjonsrett i leverandøravtaler.' },
        ]
    },
    'A.5.21': {
        title: 'Sikkerhet i IKT-leverandørkjeden', description: 'Prosesser skal defineres for å håndtere sikkerhetsrisiko i IKT-leverandørkjeden.', guidance: [
            { id: 'A.5.21-1', title: 'Vurder leverandørkjederisiko', description: 'Evaluer risiko i IKT-leverandørkjeden inkludert programvarekomponenter og tjenester.' },
        ]
    },
    'A.5.22': {
        title: 'Overvåking og endringshåndtering av leverandørtjenester', description: 'Organisasjonen skal regelmessig overvåke, gjennomgå og håndtere endringer i leverandørers sikkerhetspraksis.', guidance: [
            { id: 'A.5.22-1', title: 'Overvåk leverandørytelse', description: 'Gjennomgå leverandørers sikkerhetsstatus og samsvar med avtaler regelmessig.' },
        ]
    },
    'A.5.23': {
        title: 'Informasjonssikkerhet ved bruk av skytjenester',
        description: 'Prosesser for anskaffelse, bruk, forvaltning og avvikling av skytjenester skal etableres i samsvar med organisasjonens krav til informasjonssikkerhet.',
        guidance: [
            { id: 'A.5.23-1', title: 'Definer retningslinjer for skysikkerhet', description: 'Etabler policy for akseptabel bruk av sky, inkludert godkjente leverandører og dataklassifiseringsbegrensninger.' },
            { id: 'A.5.23-2', title: 'Gjennomfør leverandørvurdering', description: 'Evaluer skyleverandørers sertifiseringer, dataplassering og kontraktsforpliktelser.' },
            { id: 'A.5.23-3', title: 'Planlegg for avvikling', description: 'Sørg for dataportabilitet, definer avviklingsprosedyrer og verifiser sletting.' },
        ]
    },
    'A.5.24': {
        title: 'Planlegging og forberedelse av hendelseshåndtering', description: 'Organisasjonen skal planlegge og forberede seg for hendelseshåndtering.', guidance: [
            { id: 'A.5.24-1', title: 'Utvikle hendelsesresponsplan', description: 'Lag en plan med roller, prosedyrer og eskaleringsveier.' },
            { id: 'A.5.24-2', title: 'Test planen regelmessig', description: 'Gjennomfør skrivebordsøvelser og simuleringer minst årlig.' },
        ]
    },
    'A.5.25': {
        title: 'Vurdering av sikkerhetshendelser', description: 'Organisasjonen skal vurdere sikkerhetshendelser og beslutte om de skal kategoriseres som hendelser.', guidance: [
            { id: 'A.5.25-1', title: 'Definer klassifiseringskriterier', description: 'Lag kriterier for kategorisering av sikkerhetshendelser.' },
        ]
    },
    'A.5.26': {
        title: 'Respons på sikkerhetshendelser', description: 'Sikkerhetshendelser skal håndteres i henhold til dokumenterte prosedyrer.', guidance: [
            { id: 'A.5.26-1', title: 'Utfør responsprosedyrer', description: 'Følg dokumenterte trinn for inneslutning, utrydning og gjenoppretting.' },
        ]
    },
    'A.5.27': {
        title: 'Læring av sikkerhetshendelser', description: 'Kunnskap fra sikkerhetshendelser skal brukes til å styrke kontrollene.', guidance: [
            { id: 'A.5.27-1', title: 'Gjennomfør etterevaluering', description: 'Utfør læringsanalyse etter hver vesentlig hendelse.' },
        ]
    },
    'A.5.28': {
        title: 'Innsamling av bevis', description: 'Prosedyrer for identifisering, innsamling og bevaring av bevis skal etableres.', guidance: [
            { id: 'A.5.28-1', title: 'Definer bevisinnsamlingsprosedyrer', description: 'Etabler kjede-av-varetekt og prosesser for forensisk bevishåndtering.' },
        ]
    },
    'A.5.29': {
        title: 'Informasjonssikkerhet under forstyrrelser', description: 'Organisasjonen skal planlegge hvordan informasjonssikkerheten opprettholdes under forstyrrelser.', guidance: [
            { id: 'A.5.29-1', title: 'Inkluder sikkerhet i BCP', description: 'Sørg for at beredskapsplaner adresserer informasjonssikkerhetskrav.' },
        ]
    },
    'A.5.30': {
        title: 'IKT-beredskap for forretningskontinuitet', description: 'IKT-beredskap skal planlegges, implementeres, vedlikeholdes og testes.', guidance: [
            { id: 'A.5.30-1', title: 'Utvikle IKT-kontinuitetsplaner', description: 'Definer gjenopprettingsmål (RPO/RTO) og test backup-/gjenopprettingsprosedyrer.' },
        ]
    },
    'A.5.31': {
        title: 'Juridiske, lovpålagte og kontraktsmessige krav', description: 'Relevante juridiske og regulatoriske krav skal identifiseres, dokumenteres og holdes oppdatert.', guidance: [
            { id: 'A.5.31-1', title: 'Vedlikehold samsvarsregister', description: 'Identifiser og spor alle gjeldende juridiske og regulatoriske krav.' },
        ]
    },
    'A.5.32': {
        title: 'Immaterielle rettigheter', description: 'Organisasjonen skal implementere tiltak for å beskytte immaterielle rettigheter.', guidance: [
            { id: 'A.5.32-1', title: 'Kartlegg immaterielle verdier', description: 'Katalogiser immaterielle rettigheter og sørg for lisensoverholdelse.' },
        ]
    },
    'A.5.33': {
        title: 'Beskyttelse av arkiver', description: 'Arkiver skal beskyttes mot tap, ødeleggelse, forfalskning og uautorisert tilgang.', guidance: [
            { id: 'A.5.33-1', title: 'Definer arkivhåndtering', description: 'Etabler oppbevaringsperioder, lagring og beskyttelseskrav for arkiver.' },
        ]
    },
    'A.5.34': {
        title: 'Personvern og beskyttelse av personopplysninger', description: 'Organisasjonen skal identifisere og oppfylle krav til personvern og beskyttelse av personopplysninger.', guidance: [
            { id: 'A.5.34-1', title: 'Implementer personverntiltak', description: 'Etabler GDPR-tiltak inkludert DPIA-er og prosesser for registrertes rettigheter.' },
        ]
    },
    'A.5.35': {
        title: 'Uavhengig gjennomgang av informasjonssikkerhet', description: 'Organisasjonens tilnærming til informasjonssikkerhet skal gjennomgås uavhengig.', guidance: [
            { id: 'A.5.35-1', title: 'Planlegg uavhengige gjennomganger', description: 'Planlegg periodiske uavhengige gjennomganger eller revisjoner av ISMS.' },
        ]
    },
    'A.5.36': {
        title: 'Samsvar med retningslinjer og standarder', description: 'Samsvar med etablerte retningslinjer og standarder skal gjennomgås regelmessig.', guidance: [
            { id: 'A.5.36-1', title: 'Gjennomfør samsvarskontroller', description: 'Verifiser regelmessig at driften er i samsvar med sikkerhetspolicyer.' },
        ]
    },
    'A.5.37': {
        title: 'Dokumenterte driftsprosedyrer', description: 'Driftsprosedyrer for informasjonsbehandlingsfasiliteter skal dokumenteres.', guidance: [
            { id: 'A.5.37-1', title: 'Dokumenter driftsprosedyrer', description: 'Lag og vedlikehold standardprosedyrer for IT-systemer og prosesser.' },
        ]
    },
    'A.6.1': {
        title: 'Bakgrunnssjekk',
        description: 'Bakgrunnsvurderinger av alle kandidater skal gjennomføres før ansettelse og løpende.',
        guidance: [
            { id: 'A.6.1-1', title: 'Definer krav til bakgrunnssjekk', description: 'Spesifiser bakgrunnssjekker tilpasset rollens tilgang til sensitiv informasjon.', auditEvidence: 'Dokumentert prosedyre for bakgrunnssjekk som definerer omfang (politiattest, kredittsjekk, referanser) basert på risikonivå.' },
            { id: 'A.6.1-2', title: 'Integrer i HR-onboarding', description: 'Gjør bakgrunnssjekk til et obligatorisk steg i rekrutteringsprosessen.', auditEvidence: 'Signerte samtykkeskjemaer og fullførte bakgrunnssjekk-rapporter (kan vises anonymisert under revisjon).' },
            { id: 'A.6.1-3', title: 'Planlegg periodisk re-sjekk', description: 'For høyrisikoroller, planlegg periodisk re-verifisering.', auditEvidence: 'Logg over periodiske re-sjekker eller oppdaterte vandelsattester for ansatte i nøkkelroller.' },
        ]
    },
    'A.6.2': {
        title: 'Ansettelsesvilkår',
        description: 'Arbeidsavtaler skal angi personellets og organisasjonens ansvar for informasjonssikkerhet.',
        guidance: [
            { id: 'A.6.2-1', title: 'Inkluder sikkerhetsklausuler i kontrakter', description: 'Legg til konfidensialitetsavtaler, retningslinjer for bruk og sikkerhetsansvar.' },
            { id: 'A.6.2-2', title: 'Dekk forpliktelser etter ansettelse', description: 'Definer forpliktelser som gjelder etter at arbeidsforholdet opphører.' },
        ]
    },
    'A.6.3': {
        title: 'Sikkerhetsbevissthet, opplæring og trening',
        description: 'Personell skal motta passende opplæring og trening innen informasjonssikkerhet.',
        guidance: [
            { id: 'A.6.3-1', title: 'Utvikle bevissthetsprogram', description: 'Lag et strukturert program som dekker phishing, sosial manipulering, passordhåndtering og hendelsesrapportering.', auditEvidence: 'Opplæringsplan eller dokumentasjon av pensum for årlig sikkerhetsopplæring.' },
            { id: 'A.6.3-2', title: 'Lever rollespesifikk opplæring', description: 'Gi målrettet opplæring for IT-ansatte, utviklere og ledelse.', auditEvidence: 'Kursmateriell for utviklere (sikker koding) eller administratorer (systemherding).' },
            { id: 'A.6.3-3', title: 'Spor gjennomføring', description: 'Vedlikehold oversikt over hvem som har fullført opplæring.', auditEvidence: 'Fullføringsrapporter fra opplæringsplattform (LMS) eller signerte deltakerlister.' },
            { id: 'A.6.3-4', title: 'Test effektivitet', description: 'Kjør phishing-simuleringer og sikkerhetsquizer for å måle bevissthet.', auditEvidence: 'Statistikk og rapporter fra gjennomførte phishing-simuleringer og opplæringsresultater.' },
        ]
    },
    'A.6.4': {
        title: 'Disiplinærprosess',
        description: 'En disiplinærprosess skal formaliseres og kommuniseres for å håndtere brudd på sikkerhetspolicyen.',
        guidance: [
            { id: 'A.6.4-1', title: 'Definer disiplinærprosedyrer', description: 'Etabler en gradert prosess for sikkerhetsbrudd.' },
            { id: 'A.6.4-2', title: 'Kommuniser til alle ansatte', description: 'Sørg for at alle er klar over konsekvensene av sikkerhetsbrudd.' },
        ]
    },
    'A.6.5': {
        title: 'Ansvar etter opphør eller endring av ansettelse', description: 'Informasjonssikkerhetsansvar som er gyldig etter opphør skal defineres og kommuniseres.', guidance: [
            { id: 'A.6.5-1', title: 'Definer forpliktelser etter ansettelse', description: 'Spesifiser løpende konfidensialitet og taushetsplikterklæringer.' },
        ]
    },
    'A.6.6': {
        title: 'Konfidensialitets- eller taushetserklæringer', description: 'Konfidensialitetserklæringer som reflekterer organisasjonens behov skal identifiseres og signeres.', guidance: [
            { id: 'A.6.6-1', title: 'Implementer NDA-prosess', description: 'Lag standard NDA-er og sørg for at alt relevant personell signerer.' },
        ]
    },
    'A.6.7': {
        title: 'Fjernarbeid', description: 'Sikkerhetstiltak skal implementeres når personell arbeider eksternt.', guidance: [
            { id: 'A.6.7-1', title: 'Definer fjernarbeidspolicy', description: 'Etabler sikkerhetskrav for fjernarbeid inkludert VPN, kryptering og fysisk sikkerhet.' },
        ]
    },
    'A.6.8': {
        title: 'Rapportering av sikkerhetshendelser', description: 'Organisasjonen skal tilby en mekanisme for rapportering av observerte eller mistenkte sikkerhetshendelser.', guidance: [
            { id: 'A.6.8-1', title: 'Etabler rapporteringskanaler', description: 'Sett opp e-post, telefon og nettbaserte rapporteringsmekanismer.' },
        ]
    },
    'A.7.1': {
        title: 'Fysiske sikkerhetssoner',
        description: 'Sikkerhetssoner skal defineres og brukes for å beskytte områder med informasjon og tilknyttede verdier.',
        guidance: [
            { id: 'A.7.1-1', title: 'Definer sikkerhetssoner', description: 'Kartlegg fysiske soner (offentlig, kontor, begrenset/serverrom) med påkrevde tilgangsnivåer.' },
            { id: 'A.7.1-2', title: 'Implementer adgangskontroll', description: 'Installer kortlesere, biometri eller nøkkellåser ved sonegrenser.' },
            { id: 'A.7.1-3', title: 'Overvåk soner', description: 'Installer kameraovervåking, alarmsystemer og besøkslogging ved innganger.' },
        ]
    },
    'A.7.2': {
        title: 'Fysisk adgang',
        description: 'Sikre områder skal beskyttes med passende adgangskontroller.',
        guidance: [
            { id: 'A.7.2-1', title: 'Implementer besøkshåndtering', description: 'Krev besøksregistrering, følgepolicy og synlig identifikasjon.' },
            { id: 'A.7.2-2', title: 'Konfigurer elektronisk adgangslogg', description: 'Sørg for at alle adgangshendelser logges og gjennomgås.' },
        ]
    },
    'A.7.3': {
        title: 'Sikring av kontorer, rom og fasiliteter', description: 'Fysisk sikkerhet for kontorer, rom og fasiliteter skal utformes og implementeres.', guidance: [
            { id: 'A.7.3-1', title: 'Sikre sensitive områder', description: 'Sørg for at serverrom, arkiver og ledelseskontorer har tilpasset fysisk sikkerhet.' },
        ]
    },
    'A.7.4': {
        title: 'Fysisk sikkerhetsovervåking',
        description: 'Lokaler skal overvåkes kontinuerlig for uautorisert fysisk tilgang.',
        guidance: [
            { id: 'A.7.4-1', title: 'Installer overvåkingsutstyr', description: 'Sett opp kameraer, bevegelsessensorer og innbruddssystemer.' },
            { id: 'A.7.4-2', title: 'Definer overvåkingsprosedyrer', description: 'Tildel ansvar for overvåking og definer eskaleringsregler.' },
        ]
    },
    'A.7.5': {
        title: 'Beskyttelse mot fysiske og miljømessige trusler', description: 'Beskyttelse mot fysiske og miljømessige trusler skal utformes og implementeres.', guidance: [
            { id: 'A.7.5-1', title: 'Vurder miljørisiko', description: 'Identifiser risiko fra brann, flom, strømbrudd og implementer beskyttelse.' },
        ]
    },
    'A.7.6': {
        title: 'Arbeid i sikre områder', description: 'Sikkerhetstiltak for arbeid i sikre områder skal utformes og implementeres.', guidance: [
            { id: 'A.7.6-1', title: 'Definer prosedyrer for sikre områder', description: 'Etabler regler for arbeid i begrensede soner (mobilforbud, ledsagerpolicy).' },
        ]
    },
    'A.7.7': {
        title: 'Ryddig skrivebord og skjerm', description: 'Regler for ryddig skrivebord og skjerm skal defineres og håndheves.', guidance: [
            { id: 'A.7.7-1', title: 'Implementer ryddig skrivebord-policy', description: 'Definer og håndhev regler for sikring av dokumenter og låsing av skjermer.' },
        ]
    },
    'A.7.8': {
        title: 'Plassering og beskyttelse av utstyr', description: 'Utstyr skal plasseres sikkert og beskyttes.', guidance: [
            { id: 'A.7.8-1', title: 'Plasser utstyr sikkert', description: 'Sørg for at servere og nettverksutstyr er i beskyttede, klimakontrollerte rom.' },
        ]
    },
    'A.7.9': {
        title: 'Sikkerhet for verdier utenfor lokaler', description: 'Verdier utenfor organisasjonens lokaler skal beskyttes.', guidance: [
            { id: 'A.7.9-1', title: 'Beskytt verdier utenfor lokaler', description: 'Definer sikkerhetstiltak for utstyr og medier tatt utenfor kontoret.' },
        ]
    },
    'A.7.10': {
        title: 'Lagringsmedier', description: 'Lagringsmedier skal håndteres gjennom hele sin livssyklus.', guidance: [
            { id: 'A.7.10-1', title: 'Håndter lagringsmediers livssyklus', description: 'Definer håndtering, transport og destruksjonsprosedyrer for lagringsmedier.' },
        ]
    },
    'A.7.11': {
        title: 'Støttende infrastruktur', description: 'Informasjonsbehandlingsfasiliteter skal beskyttes mot strømbrudd og andre forstyrrelser.', guidance: [
            { id: 'A.7.11-1', title: 'Sørg for infrastrukturrobusthet', description: 'Implementer UPS, redundant strøm og miljøkontroller.' },
        ]
    },
    'A.7.12': {
        title: 'Kabelsikkerhet', description: 'Kabler for strøm, data eller informasjonstjenester skal beskyttes.', guidance: [
            { id: 'A.7.12-1', title: 'Beskytt kabling', description: 'Sikre kabelføringer, merk kabler og beskytt mot uautorisert tilgang eller skade.' },
        ]
    },
    'A.7.13': {
        title: 'Vedlikehold av utstyr', description: 'Utstyr skal vedlikeholdes korrekt.', guidance: [
            { id: 'A.7.13-1', title: 'Planlegg regelmessig vedlikehold', description: 'Vedlikehold utstyr iht. produsentens anbefalinger og spor servicehistorikk.' },
        ]
    },
    'A.7.14': {
        title: 'Sikker avhending eller gjenbruk av utstyr', description: 'Utstyr med lagringsmedier skal verifiseres for sikker sletting før avhending.', guidance: [
            { id: 'A.7.14-1', title: 'Implementer sikker avhending', description: 'Verifiser dataødeleggelse før avhending eller omtildeling av utstyr.' },
        ]
    },
    'A.8.1': {
        title: 'Brukerendepunkter',
        description: 'Informasjon lagret på, behandlet av eller rutet via brukerendepunkter skal beskyttes.',
        guidance: [
            { id: 'A.8.1-1', title: 'Distribuer endepunktbeskyttelse', description: 'Installer antimalware, EDR og vertsbasert brannmur på alle enheter.', auditEvidence: 'Rapport eller dashbordskjermbilde fra EDR/antivirus-konsoll som viser aktive agenter på alle registrerte enheter.' },
            { id: 'A.8.1-2', title: 'Krev enhetskryptering', description: 'Aktiver full diskkryptering (BitLocker, FileVault) på alle bærbare og arbeidsstasjoner.', auditEvidence: 'Samsvarsrapport fra Intune, Jamf eller Active Directory som bekrefter 100% kryptering av harddisker.' },
            { id: 'A.8.1-3', title: 'Implementer MDM for mobile enheter', description: 'Bruk Mobile Device Management for å håndheve sikkerhetspolicyer på telefoner og nettbrett.', auditEvidence: 'MDM-policykonfigurasjoner (krav om PIN-kode, sletting ved tap) og enhetsliste.' },
            { id: 'A.8.1-4', title: 'Konfigurer automatiske oppdateringer', description: 'Sørg for at OS- og applikasjonsoppdateringer installeres innen definerte tidsfrister.', auditEvidence: 'Oppdateringsrapporter og konfigurasjonslogg fra WSUS, Windows Update for Business eller lignende.' },
        ]
    },
    'A.8.2': {
        title: 'Privilegerte tilgangsrettigheter',
        description: 'Tildeling og bruk av privilegerte tilgangsrettigheter skal begrenses og styres.',
        guidance: [
            { id: 'A.8.2-1', title: 'Kartlegg privilegerte kontoer', description: 'Lag og vedlikehold et register over alle admin-/root-/tjenestekontoer.', auditEvidence: 'Oppdatert liste/register over brukere med administrative eller privilegerte rettigheter i AD, sky og databaser.' },
            { id: 'A.8.2-2', title: 'Implementer prinsippet om minste privilegium', description: 'Gi kun nødvendige rettigheter og bruk separate adminkontoer.', auditEvidence: 'Godkjenningslogger for tildeling av administratorrettigheter, og bevis på at administratorer bruker separate kontoer for daglig drift.' },
            { id: 'A.8.2-3', title: 'Vurder PAM-løsning', description: 'Vurder Privileged Access Management for sesjonsopptak og just-in-time-tilgang.', auditEvidence: 'Systemrapporter fra PAM-løsning (Privileged Access Management) eller dokumentert risikovurdering av admin-tilgang.' },
            { id: 'A.8.2-4', title: 'Gjennomgå tilganger regelmessig', description: 'Gjennomfør kvartalsvise gjennomganger av privilegert tilgang.', auditEvidence: 'Signert referat eller logg fra forrige kvartalsvise tilgangsrevisjon for administratorer.' },
        ]
    },
    'A.8.3': {
        title: 'Tilgangsbegrensning til informasjon',
        description: 'Tilgang til informasjon skal begrenses i henhold til retningslinjer for tilgangskontroll.',
        guidance: [
            { id: 'A.8.3-1', title: 'Definer tilgangspolicy', description: 'Etabler regler for tildeling, endring og tilbaketrekking av tilgang.' },
            { id: 'A.8.3-2', title: 'Implementer rollebasert tilgang (RBAC)', description: 'Konfigurer systemer til å bruke roller/grupper i stedet for individuelle rettigheter.' },
            { id: 'A.8.3-3', title: 'Krev MFA for sensitive systemer', description: 'Krev flerfaktorautentisering for tilgang to kritiske applikasjoner.' },
        ]
    },
    'A.8.4': {
        title: 'Tilgang til kildekode', description: 'Lese- og skrivetilgang til kildekode, utviklingsverktøy og programvarebiblioteker skal håndteres.', guidance: [
            { id: 'A.8.4-1', title: 'Begrens tilgang til kildekode', description: 'Begrens repositorietilgang til autoriserte utviklere med rollebaserte tillatelser.' },
        ]
    },
    'A.8.5': {
        title: 'Sikker autentisering',
        description: 'Sikre autentiseringsteknologier og -prosedyrer skal etableres og implementeres.',
        guidance: [
            { id: 'A.8.5-1', title: 'Krev sterk passordpolicy', description: 'Krev minimum 12 tegn, kompleksitet og forbud mot vanlige/lekkede passord.', auditEvidence: 'Skjermbilde av Active Directory Group Policy eller Entra ID-passordinnstillinger.' },
            { id: 'A.8.5-2', title: 'Implementer flerfaktorautentisering', description: 'Implementer MFA for alle brukerkontoer, med prioritet på admin og fjerntilgang.', auditEvidence: 'Samsvarsrapport eller Conditional Access-regler fra Azure/Entra ID som viser at MFA er påkrevet for ekstern pålogging og adminkontoer.' },
            { id: 'A.8.5-3', title: 'Implementer SSO der mulig', description: 'Reduser passordtretthet med Single Sign-On og sentralisert identitetshåndtering.', auditEvidence: 'Arkitekturtegning eller liste over applikasjoner integrert med Single Sign-On (SSO).' },
        ]
    },
    'A.8.6': {
        title: 'Kapasitetsstyring', description: 'Ressursbruk skal overvåkes og justeres i tråd med kapasitetsbehov.', guidance: [
            { id: 'A.8.6-1', title: 'Overvåk ressursbruk', description: 'Implementer overvåking for CPU, minne, lagring og nettverksbruk.' },
        ]
    },
    'A.8.7': {
        title: 'Beskyttelse mot skadevare', description: 'Beskyttelse mot skadevare skal implementeres og støttes av brukerbevissthet.', guidance: [
            { id: 'A.8.7-1', title: 'Distribuer anti-skadevare', description: 'Installer og vedlikehold anti-skadevare med automatiske oppdateringer.' },
            { id: 'A.8.7-2', title: 'Gjennomfør bevissthetsopplæring', description: 'Tren brukere i å gjenkjenne og unngå skadevare.' },
        ]
    },
    'A.8.8': {
        title: 'Håndtering av tekniske sårbarheter',
        description: 'Informasjon om tekniske sårbarheter skal innhentes, eksponering skal evalueres og passende tiltak iverksettes.',
        guidance: [
            { id: 'A.8.8-1', title: 'Implementer sårbarhetsskanning', description: 'Bruk automatiserte verktøy som kjøres minimum månedlig.', auditEvidence: 'Siste fullstendige skannerapport fra sårbarhetsskanner (f.eks. Nessus, Qualys eller Microsoft Defender).' },
            { id: 'A.8.8-2', title: 'Definer tidsfrister for patching', description: 'Sett tidsrammer basert på alvorlighetsgrad (kritisk: 48 timer, høy: 7 dager).', auditEvidence: 'Godkjent sårbarhets- og patchpolicy med definerte tidsfrister (SLA).' },
            { id: 'A.8.8-3', title: 'Spor utbedringsstatus', description: 'Vedlikehold et sårbarhetsregister og spor patching til lukking.', auditEvidence: 'Utskrift/logg av sårbarhetsregisteret som viser sporbarhet fra funn til verifisert lukking/patching.' },
        ]
    },
    'A.8.9': {
        title: 'Konfigurasjonsstyring',
        description: 'Konfigurasjoner av maskinvare, programvare, tjenester og nettverk skal etableres, dokumenteres, implementeres, overvåkes og gjennomgås.',
        guidance: [
            { id: 'A.8.9-1', title: 'Definer sikre grunnlinjer', description: 'Lag herdede konfigurasjonsgrunnlinjer for OS, applikasjoner og nettverksenheter (CIS Benchmarks).' },
            { id: 'A.8.9-2', title: 'Implementer konfigurasjonsverktøy', description: 'Bruk verktøy som Ansible, Puppet eller Group Policy for å håndheve konfigurasjoner.' },
            { id: 'A.8.9-3', title: 'Overvåk konfigurasjonsavvik', description: 'Sett opp varsler når konfigurasjoner avviker fra godkjente grunnlinjer.' },
        ]
    },
    'A.8.10': {
        title: 'Sletting av informasjon', description: 'Informasjon som ikke lenger er nødvendig skal slettes.', guidance: [
            { id: 'A.8.10-1', title: 'Definer oppbevaring og sletting', description: 'Etabler oppbevaringsperioder og implementer automatisk eller planlagt sletting.' },
        ]
    },
    'A.8.11': {
        title: 'Datamaskering', description: 'Datamaskering skal brukes i samsvar med retningslinjer for tilgangskontroll.', guidance: [
            { id: 'A.8.11-1', title: 'Implementer datamaskering', description: 'Masker sensitive data i ikke-produksjonsmiljøer og rapporter.' },
        ]
    },
    'A.8.12': {
        title: 'Forebygging av datalekkasje',
        description: 'Tiltak for å forebygge datalekkasje skal benyttes på systemer, nettverk og enheter som behandler sensitiv informasjon.',
        guidance: [
            { id: 'A.8.12-1', title: 'Klassifiser sensitiv data', description: 'Identifiser og merk alle datatyper som krever beskyttelse.' },
            { id: 'A.8.12-2', title: 'Implementer DLP-verktøy', description: 'Installer Data Loss Prevention-løsninger for å overvåke og blokkere datalekkasje.' },
            { id: 'A.8.12-3', title: 'Konfigurer endepunktkontroller', description: 'Begrens USB-lagring, skjermopptak og uautorisert skylagring.' },
        ]
    },
    'A.8.13': {
        title: 'Sikkerhetskopiering', description: 'Sikkerhetskopier av informasjon, programvare og systemer skal vedlikeholdes og testes regelmessig.', guidance: [
            { id: 'A.8.13-1', title: 'Definer backuppolicy', description: 'Etabler backupfrekvens, oppbevaring og krav til lagring utenfor lokalet.', auditEvidence: 'Godkjent backup- og gjenopprettingspolicy (med krav til frekvens, lagringssted, oppbevaringstid og geografisk separasjon).' },
            { id: 'A.8.13-2', title: 'Test gjenopprettingsprosedyrer', description: 'Test gjenoppretting fra backup regelmessig for å verifisere at det fungerer.', auditEvidence: 'Årlig testprotokoll for gjenoppretting av kritiske systemer med dokumentert tid brukt og verifisering av dataintegritet.' },
        ]
    },
    'A.8.14': {
        title: 'Redundans i informasjonsbehandling', description: 'Informasjonsbehandlingsfasiliteter skal implementeres med tilstrekkelig redundans.', guidance: [
            { id: 'A.8.14-1', title: 'Implementer redundans', description: 'Deploy redundante systemer, klynger eller failover-mekanismer for kritiske tjenester.' },
        ]
    },
    'A.8.15': {
        title: 'Logging',
        description: 'Logger som registrerer aktiviteter, unntak, feil og andre relevante hendelser skal produseres, lagres, beskyttes og analyseres.',
        guidance: [
            { id: 'A.8.15-1', title: 'Definer loggkrav', description: 'Spesifiser hvilke hendelser som skal logges på tvers av alle kritiske systemer.', auditEvidence: 'Dokumentert loggspesifikasjon eller retningslinje som definerer påkrevde logghendelser (pålogginger, feil, systemendringer).' },
            { id: 'A.8.15-2', title: 'Sentraliser logginnsamling', description: 'Implementer en SIEM eller loggaggregering for å konsolidere logger.', auditEvidence: 'Arkitekturtegning av SIEM/loggaggregator, samt liste over integrerte systemer og aktive loggkilder.' },
            { id: 'A.8.15-3', title: 'Beskytt og behold logger', description: 'Sørg for at logger er manipuleringssikre og beholdes iht. krav.', auditEvidence: 'Konfigurasjonsbevis på skrivesperre (f.eks. WORM eller restriktive IAM-roller på logglager) og oppbevaringspolicy.' },
            { id: 'A.8.15-4', title: 'Implementer logganalyse og varsling', description: 'Konfigurer automatiske varsler for mistenkelig aktivitet.', auditEvidence: 'Regler/use cases i SIEM-løsningen, samt eksempler på genererte sikkerhetsvarsler og responslogger.' },
        ]
    },
    'A.8.16': {
        title: 'Overvåkingsaktiviteter',
        description: 'Nettverk, systemer og applikasjoner skal overvåkes for avvikende atferd.',
        guidance: [
            { id: 'A.8.16-1', title: 'Distribuer overvåkingsløsninger', description: 'Implementer nettverksovervåking (IDS/IPS), endepunktdeteksjon (EDR) og applikasjonsovervåking.' },
            { id: 'A.8.16-2', title: 'Definer regler for anomalideteksjon', description: 'Konfigurer varsler for uvanlige mønstre som tilgang utenom arbeidstid eller store dataoverføringer.' },
            { id: 'A.8.16-3', title: 'Etabler responsprosedyrer', description: 'Definer eskaleringsveier når overvåking avdekker mistenkelig aktivitet.' },
        ]
    },
    'A.8.17': {
        title: 'Klokkesynkronisering', description: 'Klokkene på informasjonsbehandlingssystemer skal synkroniseres til godkjente tidskilder.', guidance: [
            { id: 'A.8.17-1', title: 'Konfigurer NTP', description: 'Synkroniser alle systemer to godkjente NTP-tidskilder.' },
        ]
    },
    'A.8.18': {
        title: 'Bruk av privilegerte hjelpeprogrammer', description: 'Bruk av hjelpeprogrammer som kan overstyre system- og applikasjonskontroller skal begrenses.', guidance: [
            { id: 'A.8.18-1', title: 'Begrens hjelpeprogrammer', description: 'Begrens tilgang til systemverktøy og vedlikehold en godkjent programvareliste.' },
        ]
    },
    'A.8.19': {
        title: 'Installasjon av programvare på driftssystemer', description: 'Prosedyrer for sikker programvareinstallasjon på driftssystemer skal implementeres.', guidance: [
            { id: 'A.8.19-1', title: 'Kontroller programvareinstallasjon', description: 'Implementer hvitelisting eller godkjenningsprosesser for programvareinstallasjon.' },
        ]
    },
    'A.8.20': {
        title: 'Nettverkssikkerhet', description: 'Nettverk og nettverksenheter skal sikres, administreres og kontrolleres.', guidance: [
            { id: 'A.8.20-1', title: 'Implementer nettverkssikkerhet', description: 'Deploy brannmurer, nettverkssegmentering og sikre konfigurasjoner.', auditEvidence: 'Oppdaterte brannmurkonfigurasjoner, nettverksdiagrammer og herdingslogger for nettverksenheter.' },
        ]
    },
    'A.8.21': {
        title: 'Sikkerhet i nettverkstjenester', description: 'Sikkerhetsmekanismer og tjenestenivåer for nettverkstjenester skal identifiseres og overvåkes.', guidance: [
            { id: 'A.8.21-1', title: 'Sikre nettverkstjenester', description: 'Definer og håndhev sikkerhetskrav for alle nettverkstjenester.' },
        ]
    },
    'A.8.22': {
        title: 'Nettverkssegmentering', description: 'Grupper av tjenester, brukere og systemer skal segregeres i nettverket.', guidance: [
            { id: 'A.8.22-1', title: 'Segmenter nettverk', description: 'Implementer VLAN-er, soner og mikrosegmentering for å separere miljøer.' },
        ]
    },
    'A.8.23': {
        title: 'Nettfiltrering', description: 'Tilgang til eksterne nettsteder skal administreres for å redusere eksponering for skadelig innhold.', guidance: [
            { id: 'A.8.23-1', title: 'Implementer nettfiltrering', description: 'Deploy webproxy eller DNS-filtrering for å blokkere skadelig og upassende innhold.' },
        ]
    },
    'A.8.24': {
        title: 'Bruk av kryptografi',
        description: 'Regler for effektiv bruk av kryptografi, inkludert nøkkelhåndtering, skal defineres og implementeres.',
        guidance: [
            { id: 'A.8.24-1', title: 'Definer kryptografipolicy', description: 'Spesifiser godkjente algoritmer, nøkkellengder og bruksområder.', auditEvidence: 'Godkjent kryptografipolicy som spesifiserer godkjente krypteringsstandarder (f.eks. AES-256) og godkjente TLS-versjoner.' },
            { id: 'A.8.24-2', title: 'Implementer nøkkelhåndtering', description: 'Etabler prosedyrer for nøkkelgenerering, distribusjon, lagring, rotasjon og destruksjon.', auditEvidence: 'Prosedyrebeskrivelse for livssyklus til krypteringsnøkler (generering, rotasjon, sletting), eller bruk av Key Vault (f.eks. Azure Key Vault) med tilhørende tilgangskonfigurasjoner.' },
            { id: 'A.8.24-3', title: 'Krev TLS/HTTPS overalt', description: 'Sørg for at alle webtjenester og API-er bruker gjeldende TLS-versjoner.', auditEvidence: 'Skannerapport fra eksternt verktøy (f.eks. SSL Labs) eller webserverkonfigurasjon som tvinger bruk av TLS 1.2/1.3.' },
        ]
    },
    'A.8.25': {
        title: 'Sikker utviklingslivssyklus', description: 'Regler for sikker utvikling av programvare og systemer skal etableres.', guidance: [
            { id: 'A.8.25-1', title: 'Implementer sikker SDLC', description: 'Integrer sikkerhetsaktiviteter i hver fase av utviklingslivssyklusen.' },
        ]
    },
    'A.8.26': {
        title: 'Sikkerhetskrav for applikasjoner', description: 'Sikkerhetskrav skal identifiseres og godkjennes ved utvikling eller anskaffelse av applikasjoner.', guidance: [
            { id: 'A.8.26-1', title: 'Definer sikkerhetskrav', description: 'Spesifiser sikkerhetskrav for all applikasjonsutvikling og anskaffelse.' },
        ]
    },
    'A.8.27': {
        title: 'Sikker systemarkitektur og ingeniørprinsipper', description: 'Prinsipper for sikre systemer skal etableres og anvendes.', guidance: [
            { id: 'A.8.27-1', title: 'Dokumenter arkitekturprinsipper', description: 'Etabler og vedlikehold sikre arkitektur- og ingeniørprinsipper.' },
        ]
    },
    'A.8.28': {
        title: 'Sikker koding', description: 'Prinsipper for sikker koding skal følges ved programvareutvikling.', guidance: [
            { id: 'A.8.28-1', title: 'Følg sikre kodestandarder', description: 'Følg OWASP-retningslinjer og gjennomfør kodegjennomganger for sikkerhet.' },
        ]
    },
    'A.8.29': {
        title: 'Sikkerhetstesting i utvikling og akseptanse', description: 'Sikkerhetstestprosesser skal defineres og implementeres i utviklingslivssyklusen.', guidance: [
            { id: 'A.8.29-1', title: 'Implementer sikkerhetstesting', description: 'Gjennomfør SAST, DAST og penetrasjonstesting under utvikling.' },
        ]
    },
    'A.8.30': {
        title: 'Utkontraktert utvikling', description: 'Organisasjonen skal styre og overvåke aktiviteter for utkontraktert systemutvikling.', guidance: [
            { id: 'A.8.30-1', title: 'Styr utkontraktert utvikling', description: 'Definer sikkerhetskrav og gjennomfør sikkerhetsgjennomganger av utkontraktert kode.' },
        ]
    },
    'A.8.31': {
        title: 'Separasjon av utviklings-, test- og produksjonsmiljøer', description: 'Utviklings-, test- og produksjonsmiljøer skal separeres og sikres.', guidance: [
            { id: 'A.8.31-1', title: 'Separer miljøer', description: 'Sørg for at utvikling, test og produksjon er isolert med tilpassede tilgangskontroller.' },
        ]
    },
    'A.8.32': {
        title: 'Endringshåndtering', description: 'Endringer i informasjonsbehandlingsfasiliteter skal underlegges endringshåndteringsprosedyrer.', guidance: [
            { id: 'A.8.32-1', title: 'Implementer endringshåndtering', description: 'Definer en formell endringshåndteringsprosess med risikovurdering og godkjenningsflyt.' },
        ]
    },
    'A.8.33': {
        title: 'Testinformasjon', description: 'Testinformasjon skal velges, beskyttes og håndteres på riktig måte.', guidance: [
            { id: 'A.8.33-1', title: 'Beskytt testdata', description: 'Sørg for at produksjonsdata anonymiseres eller at syntetiske data brukes i testmiljøer.' },
        ]
    },
    'A.8.34': {
        title: 'Beskyttelse under revisjonstesting', description: 'Revisjonstester som involverer vurdering av driftssystemer skal planlegges og avtales.', guidance: [
            { id: 'A.8.34-1', title: 'Planlegg revisjonstesting', description: 'Koordiner revisjonsaktiviteter for å minimere påvirkning på driftssystemer.' },
        ]
    },
};

export function getControlTranslation(controlId: string, _lang: Lang) {
    return noTranslations[controlId] || null;
}

export const domainTranslations: Record<string, Record<Lang, string>> = {
    'Organizational controls': { nb: 'Organisatoriske kontroller' },
    'People controls': { nb: 'Personellkontroller' },
    'Physical controls': { nb: 'Fysiske kontroller' },
    'Technological controls': { nb: 'Teknologiske kontroller' },
};

export const domainShortTranslations: Record<string, Record<Lang, string>> = {
    'Organizational controls': { nb: 'Organisatorisk' },
    'People controls': { nb: 'Personell' },
    'Physical controls': { nb: 'Fysisk' },
    'Technological controls': { nb: 'Teknologisk' },
};

export const statusTranslations: Record<string, Record<Lang, string>> = {
    'Not Started': { nb: 'Ikke startet' },
    'Planning': { nb: 'Planlegging' },
    'In Progress': { nb: 'Under arbeid' },
    'Implemented': { nb: 'Implementert' },
    'Not Applicable': { nb: 'Ikke aktuelt' },
};
