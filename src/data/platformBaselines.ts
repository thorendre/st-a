import { RiskCategory } from '../types';

export interface PlatformBaseline {
    id: string;
    name: string;
    description: string;
    platformType: 'kubernetes' | 'cloud' | 'onprem';
    provider: string;
    managedControlsSummary: string;
    category: RiskCategory;
}

// ═══════════════════════════════════════════════════════════════════
//  PLATTFORM 1: INTERN KUBERNETES / OPENSHIFT PLATTFORM (K8s)
// ═══════════════════════════════════════════════════════════════════
export const k8sPlatformBaseline: PlatformBaseline = {
    id: 'platform-k8s',
    name: 'Intern Kubernetes / OpenShift Plattform (K8s)',
    description: 'Virksomhetens interne container- og orkestreringsplattform. Plattformteamet drifter og herder nodene, klyngenettverket, ingress og kjøretidsmiljøet.',
    platformType: 'kubernetes',
    provider: 'Internt Plattformteam (DevOps / SRE)',
    managedControlsSummary: 'Plattformteamet håndterer: Nodepatching og herdet OS, Kubernetes RBAC, etcd-kryptering i hvile, felles Ingress/WAF med automatisk TLS-sertifikathåndtering, Calico/Cilium mikrosegmentering (NetworkPolicies), PodSecurityStandards (Restricted), og sentralisert Prometheus/Loki overvåking.',
    category: {
        id: 'cat-platform-k8s',
        name: 'Arvet Plattformrisiko: Intern Kubernetes Plattform',
        description: 'Infrastruktur- og driftssikkerhet som ivaretas av det sentrale plattformteamet. Systemeier bygger på denne grunnmuren.',
        isDefault: false,
        enabled: true,
        risks: [
            {
                id: 'k8s-base-1',
                categoryId: 'cat-platform-k8s',
                title: 'Nodepatching og sårbarheter i vert-operativsystem',
                description: 'Sårbarheter i underliggende Linux-kernel eller klynge-noder kan gi angripere fotfeste på infrastrukturnivå.',
                threat: 'Ekstern angriper via kjente klynge-CVE-er',
                vulnerability: 'Utdaterte noder og manglende kjerneoppdateringer',
                likelihood: 1, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
                existingControls: 'Automatisert nodepatching ukentlig, uforanderlige node-images (CoreOS/Talos), automatisk drain/cordon uten nedetid.',
                plannedControls: '',
                owner: 'Plattformteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Intern Kubernetes Plattform',
                inheritedMitigationDetails: 'Driftes og patches kontinuerlig av sentralt plattformteam.'
            },
            {
                id: 'k8s-base-2',
                categoryId: 'cat-platform-k8s',
                title: 'Container-isolasjon og privilegieeskalering i pods',
                description: 'En sårbar container forsøker å bryte ut til vertsnoden eller manipulere andre pods i klyngen.',
                threat: 'Kompromittert applikasjons-pod',
                vulnerability: 'Kjøring som root eller overflødige Linux-capabilities',
                likelihood: 2, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
                existingControls: 'PodSecurityStandards "Restricted" håndheves i alle app-namespaces. Root-bruker er forbudt (runAsNonRoot: true), allowPrivilegeEscalation: false, readOnlyRootFilesystem: true.',
                plannedControls: '',
                owner: 'Plattformteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Intern Kubernetes Plattform',
                inheritedMitigationDetails: 'Plattformens adgangskontroll (Admission Controller) avviser pods som krever root eller eskalering.'
            },
            {
                id: 'k8s-base-3',
                categoryId: 'cat-platform-k8s',
                title: 'Nettverkssegmentering og uautorisert trafikk mellom pods',
                description: 'Lateral bevegelse mellom ulike applikasjoner eller namespaces i klyngen.',
                threat: 'Intern angriper eller kompromittert nabo-tjeneste',
                vulnerability: 'Flatt pod-nettverk uten brannmurregler',
                likelihood: 2, consequence: 4, kScore: 4, iScore: 4, tScore: 4, aScore: 4,
                existingControls: 'Calico / Cilium CNI håndhever Default-Deny NetworkPolicies mellom alle namespaces. All inter-service trafikk krever eksplisitte tillatelser og mTLS via Service Mesh (Istio/Linkerd).',
                plannedControls: '',
                owner: 'Plattformteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Intern Kubernetes Plattform',
                inheritedMitigationDetails: 'Plattformen isolerer automatisk hvert namespace og krever eksplisitt NetworkPolicy.'
            },
            {
                id: 'k8s-base-4',
                categoryId: 'cat-platform-k8s',
                title: 'DDoS og volumetrisk overbelastning av klynge-ingress',
                description: 'Tjenestenektangrep rettet mot plattformens inngangsporter gjør alle applikasjoner utilgjengelige.',
                threat: 'Eksterne cyberkriminelle / botnets',
                vulnerability: 'Utilstrekkelig båndbredde eller manglende rate-limiting',
                likelihood: 2, consequence: 4, kScore: 3, iScore: 3, tScore: 4, aScore: 3,
                existingControls: 'Cloudflare / AWS Shield DDoS-beskyttelse foran klyngen. Felles Envoy/Nginx Ingress-kontrollere med global rate-limiting og WAF-inspeksjon.',
                plannedControls: '',
                owner: 'Plattformteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Intern Kubernetes Plattform',
                inheritedMitigationDetails: 'Felles klynge-ingress filtrerer volumetrisk trafikk før den når applikasjonen.'
            },
            {
                id: 'k8s-base-5',
                categoryId: 'cat-platform-k8s',
                title: 'Eksponering av hemmeligheter og nøkler i klyngelager (etcd)',
                description: 'Uautorisert uthenting av databasetilgang, API-tokens og sertifikater fra klyngens database.',
                threat: 'Innsidetrussel eller uautorisert klyngetilgang',
                vulnerability: 'Ukryptert etcd-database eller for vide RBAC-roller',
                likelihood: 1, consequence: 5, kScore: 5, iScore: 4, tScore: 4, aScore: 4,
                existingControls: 'etcd krypteres at rest med AES-CBC/KMS envelope-kryptering. HashiCorp Vault / External Secrets Operator benyttes for dynamisk hemmelighetshåndtering og kortlevde tokens.',
                plannedControls: '',
                owner: 'Plattformteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Intern Kubernetes Plattform',
                inheritedMitigationDetails: 'Lagring av hemmeligheter er kryptert med HSM/KMS på plattformnivå.'
            },
            {
                id: 'k8s-base-6',
                categoryId: 'cat-platform-k8s',
                title: 'Ressursuttømming og «Noisy Neighbor» på delte noder',
                description: 'En feilende applikasjon forbruker all minne eller CPU på noden, og påvirker andre kjørende tjenester.',
                threat: 'Programvarefeil / minnelekkasje hos andre tjenester',
                vulnerability: 'Manglende ressurskvoter på pods',
                likelihood: 2, consequence: 3, kScore: 2, iScore: 2, tScore: 3, aScore: 2,
                existingControls: 'Påkrevd ResourceQuota og LimitRange per namespace. Pods uten definert memory/CPU limits avvises ved deployment.',
                plannedControls: '',
                owner: 'Plattformteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Intern Kubernetes Plattform',
                inheritedMitigationDetails: 'Plattformen garanterer ressursisolasjon mellom applikasjoner.'
            }
        ]
    }
};

// ═══════════════════════════════════════════════════════════════════
//  PLATTFORM 2: SKYPLATTFORM (AZURE / AWS ENTERPRISE LANDING ZONE)
// ═══════════════════════════════════════════════════════════════════
export const cloudPlatformBaseline: PlatformBaseline = {
    id: 'platform-cloud',
    name: 'Skyplattform (Azure / AWS Landing Zone)',
    description: 'Virksomhetens standardiserte bedriftsmiljø i skyen. Inkluderer felles sikkerhetsperimeter, Entra ID IAM, sentralisert logging og managed services.',
    platformType: 'cloud',
    provider: 'Microsoft Azure / AWS Enterprise Cloud Platform',
    managedControlsSummary: 'Skyplattformen håndterer: Fysisk datasentersikkerhet og redundans på tvers av 3 Availability Zones, sentralisert IAM med Microsoft Entra ID Conditional Access, DDoS Protection Standard, Azure Firewall / NSG perimeter, disk- og databasekryptering med kundestyrte nøkler (KMS), samt Microsoft Sentinel SIEM-overvåking.',
    category: {
        id: 'cat-platform-cloud',
        name: 'Arvet Plattformrisiko: Skyplattform (Landing Zone)',
        description: 'Sikkerhetstiltak levert av skyleverandør og sentralt skyteam.',
        isDefault: false,
        enabled: true,
        risks: [
            {
                id: 'cloud-base-1',
                categoryId: 'cat-platform-cloud',
                title: 'Fysisk sikkerhetsbrudd eller strømavbrudd i datasenter',
                description: 'Fysisk skade på servere, naturkatastrofer eller sabotasje i datasenteret.',
                threat: 'Fysisk inntrenger / naturhendelse',
                vulnerability: 'Datasentersvikt',
                likelihood: 1, consequence: 5, kScore: 4, iScore: 4, tScore: 5, aScore: 4,
                existingControls: 'ISO 27001, SOC 1/2/3 sertifiserte skydatasentre med 3 uavhengige Availability Zones, redundant strøm/kjøling og biometrisk adgang.',
                plannedControls: '',
                owner: 'Skyleverandør',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Skyplattform (Azure/AWS)',
                inheritedMitigationDetails: 'Ivaretatt av skyleverandørens datasenterkontroller og soneredundans.'
            },
            {
                id: 'cloud-base-2',
                categoryId: 'cat-platform-cloud',
                title: 'Uautorisert administrativ tilgang til skyinfrastruktur',
                description: 'En angriper kompromitterer en driftskonto og får tilgang til virtuelle maskiner, databaser eller lagring.',
                threat: 'Konto-overtakelse / credential theft',
                vulnerability: 'Svake passord eller manglende MFA',
                likelihood: 1, consequence: 5, kScore: 5, iScore: 5, tScore: 5, aScore: 5,
                existingControls: 'Microsoft Entra ID PIM (Privileged Identity Management) med Just-In-Time aktivering, påkrevd FIDO2 MFA og godkjenning fra CISO.',
                plannedControls: '',
                owner: 'Skyteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Skyplattform (Azure/AWS)',
                inheritedMitigationDetails: 'Sentralisert PIM krever tidsbegrenset godkjenning for all administrativ tilgang.'
            },
            {
                id: 'cloud-base-3',
                categoryId: 'cat-platform-cloud',
                title: 'Lekkasje av ukryptert data i skylager (Blob/S3)',
                description: 'Lagringsbøtter eksponeres utilsiktet åpent på internett.',
                threat: 'Feilkonfigurasjon / menneskelig feil',
                vulnerability: 'Standard public-tilgang på lagring',
                likelihood: 1, consequence: 5, kScore: 5, iScore: 4, tScore: 4, aScore: 4,
                existingControls: 'Azure Policy håndhever "Deny public blob access" på abonnementsnivå. All lagring krypteres automatisk med 256-bit AES med kundestyrte nøkler (Customer-Managed Keys i Key Vault).',
                plannedControls: '',
                owner: 'Skyteamet',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'Skyplattform (Azure/AWS)',
                inheritedMitigationDetails: 'Azure Policy forhindrer automatisk offentlig eksponering av lagringsområder.'
            }
        ]
    }
};

// ═══════════════════════════════════════════════════════════════════
//  PLATTFORM 3: ON-PREMISE DATASENTER & FELLES NETTVERK
// ═══════════════════════════════════════════════════════════════════
export const onPremPlatformBaseline: PlatformBaseline = {
    id: 'platform-onprem',
    name: 'On-Premise Datasenter & Felles Nettverk',
    description: 'Virksomhetens eget datasenter og serverrom med felles lokal infrastruktur, nødstrøm og kjernebrannmurer.',
    platformType: 'onprem',
    provider: 'Internt IKT-driftsteam',
    managedControlsSummary: 'Datasenterdrift ivaretar: Fysisk adgangskontroll med adgangskort og videoovervåking, nødstrøm (redundant UPS og dieselaggregat), automatisk gassbasert brannslukking, overvåket kjøling, og sentrale redundante kjernebrannmurer.',
    category: {
        id: 'cat-platform-onprem',
        name: 'Arvet Plattformrisiko: On-Premise Datasenter',
        description: 'Fysisk sikring, strøm, kjøling og nettverk ivaretatt av lokal IKT-drift.',
        isDefault: false,
        enabled: true,
        risks: [
            {
                id: 'onprem-base-1',
                categoryId: 'cat-platform-onprem',
                title: 'Strømbrudd eller feil på kjøleanlegg i serverrom',
                description: 'Uforutsett strømstans eller overoppheting fører til ukontrollert nedstenging av servere.',
                threat: 'Ekstern strømsvikt / teknisk feil',
                vulnerability: 'Manglende redundans på strøm',
                likelihood: 1, consequence: 4, kScore: 3, iScore: 3, tScore: 5, aScore: 3,
                existingControls: 'Dobbel redundant UPS-batteribank med automatisk innkobling av dieselaggregat innen 30 sekunder. Temperatur- og fuktighetssensorer med 24/7 SMS-alarm.',
                plannedControls: '',
                owner: 'Eiendom / Drift',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'On-Premise Datasenter',
                inheritedMitigationDetails: 'Nødstrøm og kjøling testes månedlig av driftsteamet.'
            },
            {
                id: 'onprem-base-2',
                categoryId: 'cat-platform-onprem',
                title: 'Uvedkommende fysisk adgang til servere og nettverksskap',
                description: 'Uautoriserte personer tar seg inn i serverrommet og kobler til utstyr eller stjeler maskinvare.',
                threat: 'Fysisk inntrenger / tyv',
                vulnerability: 'Svak fysisk låsing',
                likelihood: 1, consequence: 5, kScore: 5, iScore: 5, tScore: 4, aScore: 5,
                existingControls: 'To-sone adgangskontroll med personlig adgangskort og PIN. Døralarmer og kontinuerlig CCTV-overvåking loggføres i 90 dager.',
                plannedControls: '',
                owner: 'Sikkerhetsavdelingen',
                status: 'mitigated',
                scope: 'inherited_platform',
                inheritedFrom: 'On-Premise Datasenter',
                inheritedMitigationDetails: 'Adgangsbegrensning håndheves strengt av sikkerhetsavdelingen.'
            }
        ]
    }
};

export const allPlatformBaselines: PlatformBaseline[] = [
    k8sPlatformBaseline,
    cloudPlatformBaseline,
    onPremPlatformBaseline,
];

// ═══════════════════════════════════════════════════════════════════
//  FOKUSERTE SYSTEMSPESIFIKKE KATEGORIER FOR NYE PROSJEKTER
//  (Her jobber systemeier – applikasjon, kodelogikk, data, API)
// ═══════════════════════════════════════════════════════════════════
export const defaultSystemSpecificCategories: RiskCategory[] = [
    {
        id: 'cat-sys-appsec',
        name: 'Applikasjonssikkerhet & Kodelogikk',
        description: 'Sårbarheter og feil i systemets egen kildekode, brukergrensesnitt og forretningslogikk (OWASP Top 10).',
        isDefault: true,
        enabled: true,
        risks: [
            {
                id: 'sys-app-1',
                categoryId: 'cat-sys-appsec',
                title: 'Sårbarheter i applikasjonskode (injeksjon, XSS, autentiseringsfeil)',
                description: 'Kjente kodefeil (f.eks. SQL-injeksjon, Cross-Site Scripting eller feil i sesjonshåndtering) gjør at angripere kan manipulere eller hente ut data.',
                threat: 'Ekstern angriper / cyberkriminelle',
                vulnerability: 'Utilstrekkelig validering av inndata, usikre biblioteker',
                likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 3, aScore: 4,
                existingControls: 'Bruk av moderne rammeverk med innebygd XSS/SQLi-beskyttelse.',
                plannedControls: 'Innføre automatisert kodeskanning (SAST/DAST) i CI/CD-pipeline og periodisk penetrasjonstesting.',
                owner: '',
                status: 'open',
                scope: 'system_specific'
            },
            {
                id: 'sys-app-2',
                categoryId: 'cat-sys-appsec',
                title: 'Sårbarheter i tredjeparts avhengigheter (npm, NuGet, Python-pakker)',
                description: 'Applikasjonen importerer eksterne biblioteker med kjente sikkerhetshull som kan utnyttes.',
                threat: 'Supply chain-angrep via open source biblioteker',
                vulnerability: 'Utdaterte avhengigheter, ingen sårbarhetsskanning',
                likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 3, aScore: 4,
                existingControls: '',
                plannedControls: 'Aktivere Dependabot / Snyk for automatiske oppdateringer og blokkering av sårbare pakker.',
                owner: '',
                status: 'open',
                scope: 'system_specific'
            }
        ]
    },
    {
        id: 'cat-sys-data',
        name: 'Informasjonsbehandling & Personvern (GDPR)',
        description: 'Risiko knyttet til systemets behandling, lagring og eksponering av sensitive personopplysninger eller forretningshemmeligheter.',
        isDefault: true,
        enabled: true,
        risks: [
            {
                id: 'sys-data-1',
                categoryId: 'cat-sys-data',
                title: 'Uautorisert innsyn i sensitive personopplysninger i applikasjonen',
                description: 'Brukere eller administratorer får tilgang til data de ikke har tjenstlig behov for pga. mangelfull intern tilgangsstyring.',
                threat: 'Intern bruker / uautorisert innsyn',
                vulnerability: 'Manglende finmasket rollebasert tilgangskontroll (RBAC) i applikasjonen',
                likelihood: 3, consequence: 4, kScore: 4, iScore: 3, tScore: 2, aScore: 4,
                existingControls: '',
                plannedControls: 'Implementere minste privilegium i applikasjonsroller og detaljert tilgangslogging av alle dataoppslag.',
                owner: '',
                status: 'open',
                scope: 'system_specific'
            },
            {
                id: 'sys-data-2',
                categoryId: 'cat-sys-data',
                title: 'Brudd på sletterutiner og oppbevaringstid (GDPR Art. 17)',
                description: 'Data lagres utover lovlig formål eller slettes ikke ved krav om sletting fra den registrerte.',
                threat: 'Regulatorisk sanksjon fra Datatilsynet',
                vulnerability: 'Manglende automatiserte sletterutiner i databasen',
                likelihood: 3, consequence: 3, kScore: 3, iScore: 3, tScore: 2, aScore: 3,
                existingControls: '',
                plannedControls: 'Utvikle automatisk slettejobb basert på definerte slettefrister og retensjonspolicy.',
                owner: '',
                status: 'open',
                scope: 'system_specific'
            }
        ]
    },
    {
        id: 'cat-sys-api',
        name: 'API-er, Integrasjoner & Eksterne avhengigheter',
        description: 'Risiko knyttet til systemets grensesnitt mot andre fagsystemer, databaser og tredjepartstjenester.',
        isDefault: true,
        enabled: true,
        risks: [
            {
                id: 'sys-api-1',
                categoryId: 'cat-sys-api',
                title: 'Uautorisert kall mot applikasjonens API-er',
                description: 'Eksterne eller interne aktører kaller åpne API-endepunkter uten gyldig autentisering eller autorisering (BOLA/IDOR).',
                threat: 'Ekstern angriper / ondsinnet bruker',
                vulnerability: 'Manglende validering av objekt-tilgang (Broken Object Level Authorization)',
                likelihood: 3, consequence: 4, kScore: 4, iScore: 4, tScore: 3, aScore: 4,
                existingControls: '',
                plannedControls: 'Kreve OAuth 2.0 / JWT token-validering og eksplisitt sjekk av brukereierskap for hvert API-kall.',
                owner: '',
                status: 'open',
                scope: 'system_specific'
            },
            {
                id: 'sys-api-2',
                categoryId: 'cat-sys-api',
                title: 'Nedetid forårsaket av feilende integrasjonspartnere',
                description: 'En ekstern tjeneste eller API slutter å svare, noe som fører til kaskadefeil og henger applikasjonen.',
                threat: 'Tredjeparts driftsavbrudd',
                vulnerability: 'Manglende feilhåndtering, timeouts og circuit breakers',
                likelihood: 3, consequence: 3, kScore: 2, iScore: 2, tScore: 4, aScore: 2,
                existingControls: '',
                plannedControls: 'Implementere Circuit Breaker-mønster, asynkro overføring og robuste fallback-mekanismer.',
                owner: '',
                status: 'open',
                scope: 'system_specific'
            }
        ]
    },
    {
        id: 'cat-sys-user',
        name: 'Systemspesifikke Brukerfeil & Operasjonell drift',
        description: 'Feilhandlinger og utilsiktede hendelser knyttet til bruken og administrasjonen av dette spesifikke systemet.',
        isDefault: true,
        enabled: true,
        risks: [
            {
                id: 'sys-user-1',
                categoryId: 'cat-sys-user',
                title: 'Feilaktig masseoppdatering eller sletting av forretningsdata',
                description: 'En superbruker eller saksbehandler utfører en feilaktig batch-oppdatering som korrumperer store datamengder.',
                threat: 'Menneskelig svikt / brukerfeil',
                vulnerability: 'Manglende bekreftelsesdialog og angrefunksjon for kritiske massehandlinger',
                likelihood: 3, consequence: 4, kScore: 3, iScore: 4, tScore: 3, aScore: 4,
                existingControls: '',
                plannedControls: 'Innføre to-trinns bekreftelse ("fire-øyne-prinsipp") for masseendringer og mulighet for "soft delete".',
                owner: '',
                status: 'open',
                scope: 'system_specific'
            }
        ]
    }
];
