import { RegulationControl } from '../types';
import { Lang } from '../hooks/useLang';

export const soc2Domains = [
    '1. CC: Sikkerhet (Security / Common Criteria)',
    '2. A: Tilgjengelighet (Availability)',
    '3. PI: Behandlingsintegritet (Processing Integrity)',
    '4. C: Konfidensialitet (Confidentiality)',
    '5. P: Personvern (Privacy)',
] as const;

export const soc2Controls: RegulationControl[] = [
    // ═══════════════════════════════════════════════════════════════════
    //  1. CC: SIKKERHET (COMMON CRITERIA / SECURITY)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'SOC2-CC1.1',
        domain: '1. CC: Sikkerhet (Security / Common Criteria)',
        title: 'Integritet, etiske retningslinjer og ledelsesansvar (CC1.1)',
        titleNo: 'Integritet, etiske retningslinjer og leiaransvar (CC1.1)',
        description: 'Organisasjonen demonstrerer forpliktelse til integritet og etiske verdier gjennom dokumenterte retningslinjer og styreoppfølging.',
        descriptionNo: 'Organisasjonen demonstrerer plikt til integritet og etiske verdiar gjennom dokumenterte retningslinjer.',
        guidance: [
            {
                id: 'SOC2-CC1.1-1',
                title: 'Etiske retningslinjer og Code of Conduct',
                description: 'Etabler og krev årlig signatur på etiske retningslinjer og taushetsplikt for alle ansatte.',
                auditEvidence: 'Signerte taushetserklæringer og kvittering på gjennomlest Code of Conduct ved ansettelse.'
            },
            {
                id: 'SOC2-CC1.1-2',
                title: 'Bakgrunnssjekk ved rekruttering',
                description: 'Gjennomfør referansesjekk og eventuell politiattest/kredittsjekk for ansatte med tilgang til produksjonsmiljøer.',
                auditEvidence: 'HR-prosess for bakgrunnssjekk og anonymisert utvalg av sjekkede nyansatte.'
            }
        ]
    },
    {
        id: 'SOC2-CC3.2',
        domain: '1. CC: Sikkerhet (Security / Common Criteria)',
        title: 'Risikovurdering og trusselkartlegging (CC3.2)',
        titleNo: 'Risikovurdering og trusselkartlegging (CC3.2)',
        description: 'Organisasjonen identifiserer og vurderer cybersikkerhetsrisiko knyttet til mål og systemintegritet minst årlig.',
        descriptionNo: 'Organisasjonen identifiserer og vurderer cybersikkerheitsrisiko minst årleg.',
        guidance: [
            {
                id: 'SOC2-CC3.2-1',
                title: 'Årlig helhetlig risikovurdering',
                description: 'Gjennomfør formell risikovurdering av applikasjon, skyinfrastruktur og personopplysninger med tiltaksplan.',
                auditEvidence: 'Årlig risikorapport med risikomatrise, tildelt ledelsesansvar og godkjenning av restrisiko.'
            }
        ]
    },
    {
        id: 'SOC2-CC6.1',
        domain: '1. CC: Sikkerhet (Security / Common Criteria)',
        title: 'Logisk tilgangsstyring og RBAC (CC6.1)',
        titleNo: 'Logisk tilgangsstyring og RBAC (CC6.1)',
        description: 'Tilgang til systemer og produksjonsdata begrenses basert på godkjente roller (Role-Based Access Control) og forretningsbehov.',
        descriptionNo: 'Tilgang til system og produksjonsdata vert avgrensa basert på roller og forretningsbehov.',
        guidance: [
            {
                id: 'SOC2-CC6.1-1',
                title: 'Formell tilgangsgodkjenning (Access Request)',
                description: 'Krev skriftlig godkjenning fra systemeier før tilgang til produksjonsmiljøer innvilges.',
                auditEvidence: 'Tickets eller godkjenningslogger i Jira/ServiceNow for tilgangsforespørsler.'
            },
            {
                id: 'SOC2-CC6.1-2',
                title: 'Kvartalsvis tilgangsrevisjon (Access Review)',
                description: 'Gjennomgå alle aktive kontoer og rettigheter kvartalsvis; deaktiver umiddelbart overflødige tilganger.',
                auditEvidence: 'Signert protokoll fra siste kvartalsvise tilgangsrevisjon og liste over fjernede rettigheter.'
            }
        ]
    },
    {
        id: 'SOC2-CC6.6',
        domain: '1. CC: Sikkerhet (Security / Common Criteria)',
        title: 'Nettverkssikkerhet og perimetersikring (CC6.6)',
        titleNo: 'Nettverkstryggleik og perimetersikring (CC6.6)',
        description: 'Grensesnitt mot offentlige nettverk og interne soner beskyttes med brannmurer, WAF og mikrosegmentering.',
        descriptionNo: 'Grensesnitt mot offentlege nettverk vert verna med brannmurar og segmentering.',
        guidance: [
            {
                id: 'SOC2-CC6.6-1',
                title: 'Skybrannmur og Web Application Firewall (WAF)',
                description: 'Plasser WAF foran alle eksternt eksponerte webgrensesnitt for å blokkere OWASP Top 10-angrep.',
                auditEvidence: 'WAF-konfigurasjon og inspeksjonslogger som viser blokkerte ondsinnede forespørsler.'
            },
            {
                id: 'SOC2-CC6.6-2',
                title: 'Nettverkssegmentering (VPC / Subnet Isolation)',
                description: 'Isoler produksjonsmiljøer strengt fra test- og utviklingsmiljøer; forby direkte databasetilgang fra internett.',
                auditEvidence: 'Nettverksarkitekturdiagram og Security Group / Firewall-regler.'
            }
        ]
    },
    {
        id: 'SOC2-CC6.8',
        domain: '1. CC: Sikkerhet (Security / Common Criteria)',
        title: 'Beskyttelse mot ondsinnet kode og sårbarheter (CC6.8)',
        titleNo: 'Vern mot vondsinna kode og sårbarheiter (CC6.8)',
        description: 'Endepunkter og servere beskyttes med antimalware/EDR, og sårbarheter oppdages og utbedres kontinuerlig.',
        descriptionNo: 'Endepunkt og servere vert verna med antimalware og kontinuerlege oppdateringar.',
        guidance: [
            {
                id: 'SOC2-CC6.8-1',
                title: 'EDR-dekning og automatisk signaturoppdatering',
                description: 'Installer sentralt administrert EDR-løsning på samtlige enheter med sanntidsbeskyttelse.',
                auditEvidence: 'Konsollrapport som viser 100% EDR-dekning og oppdaterte definisjoner.'
            },
            {
                id: 'SOC2-CC6.8-2',
                title: 'Sårbarhetsskanning av container-images og avhengigheter',
                description: 'Skann alle applikasjonsavhengigheter og Docker-images i CI/CD før produksjonssetting.',
                auditEvidence: 'CI/CD pipeline-logger fra Trivy/Snyk som blokkerer kritiske sårbarheter.'
            }
        ]
    },
    {
        id: 'SOC2-CC7.1',
        domain: '1. CC: Sikkerhet (Security / Common Criteria)',
        title: 'Sikkerhetsovervåking og hendelseshåndtering (CC7.1)',
        titleNo: 'Sikkerheitsovervaking og hendingshandtering (CC7.1)',
        description: 'Systemet overvåkes kontinuerlig for uautorisert aktivitet, og avvik behandles etter en etablert hendelsesprosedyre.',
        descriptionNo: 'Systemet vert overvaka kontinuerleg og avvik vert behandla etter faste prosedyrar.',
        guidance: [
            {
                id: 'SOC2-CC7.1-1',
                title: 'Uforanderlig sikkerhetslogging (Audit Logs)',
                description: 'Samle revisjonslogger for administrative handlinger, pålogginger og dataendringer med minst 1 års oppbevaring.',
                auditEvidence: 'Logglagringspolicy og skjermbilde fra sentralt loggarkiv (f.eks. CloudWatch / Log Analytics).'
            },
            {
                id: 'SOC2-CC7.1-2',
                title: 'Incident Response Plan og årlig test',
                description: 'Ha en etablert prosedyre for å varsle berørte kunder ved datainnbrudd i henhold til SLA.',
                auditEvidence: 'Godkjent IRP-prosedyre og referat fra siste beredskapstest.'
            }
        ]
    },
    {
        id: 'SOC2-CC8.1',
        domain: '1. CC: Sikkerhet (Security / Common Criteria)',
        title: 'Endringshåndtering og kodekvalitet (CC8.1)',
        titleNo: 'Endringshandtering og kodekvalitet (CC8.1)',
        description: 'Endringer i infrastruktur og applikasjonskode godkjennes, testes og dokumenteres før produksjonssetting.',
        descriptionNo: 'Endringar i infrastruktur og kode vert godkjende og testa før produksjon.',
        guidance: [
            {
                id: 'SOC2-CC8.1-1',
                title: 'Obligatorisk fagfellevurdering (Peer Review / Pull Request)',
                description: 'Krev at minst én annen utvikler godkjenner koden via Pull Request før fletting til hovedgren.',
                auditEvidence: 'Branch Protection-innstillinger i GitHub/GitLab som håndhever godkjenning.'
            },
            {
                id: 'SOC2-CC8.1-2',
                title: 'Automatisert bygg og utrulling (CI/CD)',
                description: 'Bruk automatiserte tester i pipeline; hindre manuelle endringer direkte i produksjonsmiljøet.',
                auditEvidence: 'Pipeline-historikk og logg som bekrefter at deploy kun skjer via godkjent CI/CD.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  2. A: TILGJENGELIGHET (AVAILABILITY)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'SOC2-A1.1',
        domain: '2. A: Tilgjengelighet (Availability)',
        title: 'Ytelsesovervåking og SLA-oppfølging (A1.1)',
        titleNo: 'Ytingskontroll og SLA-oppfølging (A1.1)',
        description: 'Systemoppetid og ytelse overvåkes kontinuerlig for å sikre at avtalte servicenivåer (SLA) oppfylles.',
        descriptionNo: 'Systemoppetid vert overvaka kontinuerleg for å sikre at SLA vert oppfylt.',
        guidance: [
            {
                id: 'SOC2-A1.1-1',
                title: 'Ekstern oppetidsovervåking (Synthetic Monitoring)',
                description: 'Bruk eksterne helsesjekker som tester systemets nøkkelendepunkter hvert minutt med varsling ved nedetid.',
                auditEvidence: 'Uptime-rapporter (f.eks. Pingdom, Datadog) som viser historisk oppetid mot SLA.'
            }
        ]
    },
    {
        id: 'SOC2-A1.2',
        domain: '2. A: Tilgjengelighet (Availability)',
        title: 'Sikkerhetskopiering og Disaster Recovery (A1.2)',
        titleNo: 'Tryggleikskopiering og Disaster Recovery (A1.2)',
        description: 'Data sikkerhetskopieres regelmessig, krypteres og testes for gjenoppretting i henhold til RTO og RPO.',
        descriptionNo: 'Data vert kopierte regelmessig, krypteres og testast for attreising.',
        guidance: [
            {
                id: 'SOC2-A1.2-1',
                title: 'Daglige automatiserte sikkerhetskopier med georedundans',
                description: 'Ta automatisk backup av databaser og kritiske lagringsområder; oppbevar kopier i en separat skyregion.',
                auditEvidence: 'Sikkerhetskopi-konfigurasjon og bekreftelse på georedundant lagring.'
            },
            {
                id: 'SOC2-A1.2-2',
                title: 'Halvårlig gjenopprettingstest (Restore Drill)',
                description: 'Utfør praktisk test av gjenoppretting til et isolert testmiljø og dokumenter tidsbruken.',
                auditEvidence: 'Protokoll fra siste vellykkede gjenopprettingstest signert av teknisk leder.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  3. PI: BEHANDLINGSINTEGRITET (PROCESSING INTEGRITY)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'SOC2-PI1.1',
        domain: '3. PI: Behandlingsintegritet (Processing Integrity)',
        title: 'Datavalidering og feilhåndtering i systemet (PI1.1)',
        titleNo: 'Datavalidering og feilhandtering i systemet (PI1.1)',
        description: 'Systembehandling er fullstendig, nøyaktig og tidsriktig; inndata og utdata valideres for å forhindre datakorrupsjon.',
        descriptionNo: 'Systembehandling er fullstendig og nøyaktig; inndata vert validerte.',
        guidance: [
            {
                id: 'SOC2-PI1.1-1',
                title: 'Skjemavalidering og typesikkerhet på API-endepunkter',
                description: 'Håndhev streng validering på alle API-kall (f.eks. JSON schema / Zod) for å avvise ugyldige formater.',
                auditEvidence: 'Kildekodeeksempler og automatiserte integrasjonstester for datavalidering.'
            },
            {
                id: 'SOC2-PI1.1-2',
                title: 'Feillogging og overvåking av feilede transaksjoner',
                description: 'Loggfør ubehandlede unntak og feilede meldinger i en dead-letter queue med automatisk varsling til vakt.',
                auditEvidence: 'Sentry / Datadog feillogger og prosedyrer for manuell rekjøring av feilede jobber.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  4. C: KONFIDENSIALITET (CONFIDENTIALITY)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'SOC2-C1.1',
        domain: '4. C: Konfidensialitet (Confidentiality)',
        title: 'Kryptering og hemmelighetshåndtering (C1.1)',
        titleNo: 'Kryptering og løyndomshandtering (C1.1)',
        description: 'Konfidensiell informasjon er beskyttet mot uautorisert innsyn gjennom hele livssyklusen med sterk kryptering.',
        descriptionNo: 'Konfidensiell informasjon er verna mot uautorisert innsyn med sterk kryptering.',
        guidance: [
            {
                id: 'SOC2-C1.1-1',
                title: 'Sentralisert hemmelighetshåndtering (Key Vault / Secrets Manager)',
                description: 'Lagre API-nøkler, sertifikater og databasepassord i en dedikert hvelvløsning; forby hardkodede passord.',
                auditEvidence: 'Bruk av AWS Secrets Manager, Azure Key Vault eller HashiCorp Vault i arkitekturen.'
            },
            {
                id: 'SOC2-C1.1-2',
                title: 'Kryptering i hvile med kundestyrte eller forvaltede nøkler',
                description: 'Sikre at alle databaser, tabeller og filområder er kryptert med AES-256.',
                auditEvidence: 'Skjermbilde fra skykonsoll som viser krypteringsstatus for alle produksjonsdatabaser.'
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════
    //  5. P: PERSONVERN (PRIVACY)
    // ═══════════════════════════════════════════════════════════════════
    {
        id: 'SOC2-P1.1',
        domain: '5. P: Personvern (Privacy)',
        title: 'Personvernerklæring og formålsbegrensning (P1.1)',
        titleNo: 'Personvernerklæring og formålsavgrensing (P1.1)',
        description: 'Organisasjonen informerer registrerte om hvilke personopplysninger som samles inn, formålet og hvordan rettigheter ivaretas.',
        descriptionNo: 'Organisasjonen informerer registrerte om kva personopplysningar som vert samla inn og formålet.',
        guidance: [
            {
                id: 'SOC2-P1.1-1',
                title: 'Offentlig tilgjengelig personvernerklæring',
                description: 'Publiser en oppdatert personvernerklæring som beskriver databehandling, lagringstid og kontaktdetaljer til DPO.',
                auditEvidence: 'Lenke til aktiv personvernerklæring på virksomhetens nettsider med revisjonsdato.'
            },
            {
                id: 'SOC2-P1.1-2',
                title: 'Rutiner for sletting og retting (GDPR Art. 17)',
                description: 'Etabler automatiserte eller manuelle rutiner for å slette personopplysninger når formålet er opphørt.',
                auditEvidence: 'Dokumentert sletterutine og logg over utførte sletteforespørsler.'
            }
        ]
    }
];

export const soc2DomainTranslations: Record<string, Record<Lang, string>> = {
    '1. CC: Sikkerhet (Security / Common Criteria)': { nb: '1. CC: Sikkerhet (Common Criteria)', nn: '1. CC: Sikkerheit (Common Criteria)' },
    '2. A: Tilgjengelighet (Availability)': { nb: '2. A: Tilgjengelighet (Availability)', nn: '2. A: Tilgjengelegheit (Availability)' },
    '3. PI: Behandlingsintegritet (Processing Integrity)': { nb: '3. PI: Behandlingsintegritet (Integrity)', nn: '3. PI: Behandlingsintegritet (Integrity)' },
    '4. C: Konfidensialitet (Confidentiality)': { nb: '4. C: Konfidensialitet (Confidentiality)', nn: '4. C: Konfidensialitet (Confidentiality)' },
    '5. P: Personvern (Privacy)': { nb: '5. P: Personvern (Privacy)', nn: '5. P: Personvern (Privacy)' },
};
