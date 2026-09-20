import { RegulationControl } from '../types';

export const doraDomains = [
    'ICT Risk Management',
    'Incident Management',
    'Resilience Testing',
    'Third-Party Risk',
    'Information Sharing',
    'Governance',
] as const;

export const doraControls: RegulationControl[] = [
    // ═══ ICT RISK MANAGEMENT (Articles 5-16) ═══
    {
        id: 'DORA-1', domain: 'ICT Risk Management',
        title: 'ICT risk management framework', titleNo: 'IKT-risikostyringsrammeverk',
        description: 'Financial entities shall have a sound, comprehensive and well-documented ICT risk management framework as part of their overall risk management system.',
        descriptionNo: 'Finansforetak skal ha et robust, omfattende og veldokumentert IKT-risikostyringsrammeverk som del av sitt overordnede risikostyringssystem.',
        guidance: [
            { id: 'DORA-1-1', title: 'Etabler IKT-risikostyringsrammeverk', description: 'Definer et dokumentert rammeverk for IKT-risikostyring integrert i overordnet risikostyring.', auditEvidence: 'Godkjent og signert IKT-risikostyringsrammeverk (styrende dokument) som refererer til DORA-kravene.' },
            { id: 'DORA-1-2', title: 'Tildel ansvar og roller', description: 'Utpek ansvarlige for IKT-risikostyring med klare mandater.', auditEvidence: 'Styreprotokoll eller stillingsbeskrivelser som viser formell tildeling av ansvaret for IKT-risiko og rapporteringslinjer.' },
            { id: 'DORA-1-3', title: 'Årlig gjennomgang', description: 'Gjennomgå og oppdater rammeverket minst årlig eller ved vesentlige hendelser.', auditEvidence: 'Revisjonshistorikk eller møtereferat fra styret/ledelsen som bekrefter årlig evaluering og godkjenning av IKT-rammeverket.' },
        ]
    },
    {
        id: 'DORA-2', domain: 'ICT Risk Management',
        title: 'ICT risk management strategy', titleNo: 'IKT-risikostyringsstrategi',
        description: 'Financial entities shall define and implement an ICT risk management strategy that specifies how ICT risk is managed.',
        descriptionNo: 'Finansforetak skal definere og implementere en IKT-risikostyringsstrategi som spesifiserer hvordan IKT-risiko håndteres.',
        guidance: [
            { id: 'DORA-2-1', title: 'Definer IKT-risikostrategi', description: 'Formuler en strategi som angir risikoappetitt, toleransenivåer og IKT-sikkerhetsmål.' },
            { id: 'DORA-2-2', title: 'Integrer med forretningsstrategi', description: 'Sørg for at IKT-risikostrategien er tilpasset forretningens overordnede strategi.' },
        ]
    },
    {
        id: 'DORA-3', domain: 'ICT Risk Management',
        title: 'Identification of ICT assets', titleNo: 'Identifisering av IKT-verdier',
        description: 'Financial entities shall identify, classify and adequately document all ICT supported business functions, roles and responsibilities, information assets and ICT assets.',
        descriptionNo: 'Finansforetak skal identifisere, klassifisere og tilstrekkelig dokumentere alle IKT-støttede forretningsfunksjoner, roller og ansvar, informasjonsverdier og IKT-verdier.',
        guidance: [
            { id: 'DORA-3-1', title: 'Kartlegg IKT-verdier', description: 'Identifiser og dokumenter alle IKT-eiendeler, systemer, nettverk og dataflytkart.', auditEvidence: 'Eiendelsregister (CMDB) eller tilsvarende systemoversikt over all IKT-maskinvare, programvare, nettverkskomponenter og dataflytkart.' },
            { id: 'DORA-3-2', title: 'Klassifiser etter kritikalitet', description: 'Kategoriser verdier basert på kritikalitet for forretningsfunksjoner.', auditEvidence: 'Klassifiseringsmetodikk og dokumentert rapport som viser kritikalitetsvurderingen for hver IKT-verdi og tilknyttet forretningsfunksjon.' },
            { id: 'DORA-3-3', title: 'Vedlikehold verdioversikt', description: 'Hold oversikten oppdatert ved endringer i IKT-infrastruktur.', auditEvidence: 'Endringslogger for registeret eller møtereferat fra periodiske revisjoner av IKT-verdioversikten.' },
        ]
    },
    {
        id: 'DORA-4', domain: 'ICT Risk Management',
        title: 'Protection and prevention', titleNo: 'Beskyttelse og forebygging',
        description: 'Financial entities shall continuously monitor and control the security and functioning of ICT systems and tools and minimise the impact of ICT risk through deployment of appropriate ICT security tools, policies and procedures.',
        descriptionNo: 'Finansforetak skal kontinuerlig overvåke og kontrollere sikkerheten og funksjonen til IKT-systemer og verktøy, og minimere virkningen av IKT-risiko gjennom bruk av passende sikkerhetstiltak.',
        guidance: [
            { id: 'DORA-4-1', title: 'Implementer sikkerhetskontroller', description: 'Deploy brannmurer, kryptering, tilgangskontroll og overvåkingsverktøy.' },
            { id: 'DORA-4-2', title: 'Patchhåndtering', description: 'Etabler prosess for rask installasjon av sikkerhetsoppdateringer.' },
            { id: 'DORA-4-3', title: 'Nettverkssikkerhet', description: 'Implementer nettverkssegmentering og overvåking.' },
        ]
    },
    {
        id: 'DORA-5', domain: 'ICT Risk Management',
        title: 'Detection', titleNo: 'Deteksjon',
        description: 'Financial entities shall have in place mechanisms to promptly detect anomalous activities, including ICT network performance issues and ICT-related incidents.',
        descriptionNo: 'Finansforetak skal ha mekanismer på plass for å raskt oppdage avvikende aktiviteter, inkludert IKT-ytelsesutfordringer og IKT-relaterte hendelser.',
        guidance: [
            { id: 'DORA-5-1', title: 'Implementer deteksjonsmekanismer', description: 'Deploy IDS/IPS, SIEM og anomalideteksjon for kontinuerlig overvåking.' },
            { id: 'DORA-5-2', title: 'Definer deteksjonsregler', description: 'Konfigurer varsler for avvikende aktivitet og ytelsesutfordringer.' },
        ]
    },
    {
        id: 'DORA-6', domain: 'ICT Risk Management',
        title: 'Response and recovery', titleNo: 'Respons og gjenoppretting',
        description: 'Financial entities shall put in place a comprehensive ICT business continuity policy as an integral part of the operational business continuity policy.',
        descriptionNo: 'Finansforetak skal etablere en omfattende IKT-kontinuitetspolicy som en integrert del av den operative kontinuitetspolicyen.',
        guidance: [
            { id: 'DORA-6-1', title: 'Utvikle IKT-kontinuitetsplan', description: 'Lag beredskapsplaner for IKT med RPO/RTO for kritiske funksjoner.', auditEvidence: 'Godkjent IKT-beredskaps- og kontinuitetsplan (BCP/DRP) som spesifiserer RPO- og RTO-mål for kritiske IKT-tjenester.' },
            { id: 'DORA-6-2', title: 'Definer gjenopprettingsprosedyrer', description: 'Dokumenter trinnvise prosedyrer for gjenoppretting etter hendelser.', auditEvidence: 'Trinnvise beredskapsrutiner (Disaster Recovery Runbooks) for alle kritiske applikasjoner og systemer.' },
            { id: 'DORA-6-3', title: 'Test planer regelmessig', description: 'Gjennomfør årlige tester av kontinuitets- og gjenopprettingsplaner.', auditEvidence: 'Testrapport fra den siste årlige gjenopprettingsøvelsen, inkludert evaluering av testresultater og loggførte forbedringstiltak.' },
        ]
    },
    {
        id: 'DORA-7', domain: 'ICT Risk Management',
        title: 'Backup policies and procedures', titleNo: 'Backuppolicyer og prosedyrer',
        description: 'Financial entities shall ensure adequate backup of ICT systems and data, including sufficient backup policies and recovery methods.',
        descriptionNo: 'Finansforetak skal sikre tilstrekkelig sikkerhetskopiering av IKT-systemer og data, inkludert backuppolicyer og gjenopprettingsmetoder.',
        guidance: [
            { id: 'DORA-7-1', title: 'Definer backuppolicy', description: 'Etabler krav til backupfrekvens, oppbevaring og geografisk separasjon.', auditEvidence: 'Godkjent backuppolicy som spesifiserer backupfrekvens og bevis på at backup lagres på en geografisk adskilt lokasjon/skykonto.' },
            { id: 'DORA-7-2', title: 'Test gjenoppretting', description: 'Verifiser regelmessig at backup kan gjenopprettes innenfor definerte tidsrammer.', auditEvidence: 'Logger eller testprotokoller fra regelmessig testgjenoppretting, som bekrefter at data kan gjenopprettes innenfor fastsatte RTO-er.' },
        ]
    },
    {
        id: 'DORA-8', domain: 'ICT Risk Management',
        title: 'Learning and evolving', titleNo: 'Læring og utvikling',
        description: 'Financial entities shall gather information on vulnerabilities and cyber threats, ICT-related incidents, and analyse their likely impacts on their digital operational resilience.',
        descriptionNo: 'Finansforetak skal samle inn informasjon om sårbarheter og cybertrusler, IKT-relaterte hendelser, og analysere deres sannsynlige innvirkning på digital operasjonell motstandskraft.',
        guidance: [
            { id: 'DORA-8-1', title: 'Samle inn trusseletterretning', description: 'Abonner på trusselfeeds og del informasjon gjennom bransjenettverk.' },
            { id: 'DORA-8-2', title: 'Lær av hendelser', description: 'Gjennomfør etterevaluering og implementer forbedringstiltak.' },
        ]
    },
    {
        id: 'DORA-9', domain: 'ICT Risk Management',
        title: 'Communication', titleNo: 'Kommunikasjon',
        description: 'Financial entities shall have in place communication plans enabling a responsible disclosure of ICT-related incidents or major vulnerabilities to clients and counterparts.',
        descriptionNo: 'Finansforetak skal ha kommunikasjonsplaner som muliggjør ansvarlig varsling av IKT-relaterte hendelser eller vesentlige sårbarheter til kunder og motparter.',
        guidance: [
            { id: 'DORA-9-1', title: 'Utvikle kommunikasjonsplaner', description: 'Lag planer for ansvarlig varsling til kunder, motparter og myndigheter.' },
        ]
    },

    // ═══ INCIDENT MANAGEMENT (Articles 17-23) ═══
    {
        id: 'DORA-10', domain: 'Incident Management',
        title: 'ICT-related incident management process', titleNo: 'IKT-relatert hendelseshåndteringsprosess',
        description: 'Financial entities shall define, establish and implement an ICT-related incident management process to detect, manage and notify ICT-related incidents.',
        descriptionNo: 'Finansforetak skal definere, etablere og implementere en IKT-relatert hendelseshåndteringsprosess for å oppdage, håndtere og varsle om IKT-relaterte hendelser.',
        guidance: [
            { id: 'DORA-10-1', title: 'Definer hendelseshåndteringsprosess', description: 'Etabler prosedyrer for deteksjon, analyse, inneslutning og gjenoppretting.' },
            { id: 'DORA-10-2', title: 'Utpek hendelsesresponseteam', description: 'Opprett et dedikert IRT med definerte roller og ansvarsområder.' },
        ]
    },
    {
        id: 'DORA-11', domain: 'Incident Management',
        title: 'Classification of ICT-related incidents', titleNo: 'Klassifisering av IKT-relaterte hendelser',
        description: 'Financial entities shall classify ICT-related incidents and determine their impact on the basis of criteria including geographical spread, duration, data losses and criticality of services affected.',
        descriptionNo: 'Finansforetak skal klassifisere IKT-relaterte hendelser og bestemme deres innvirkning basert på kriterier inkludert geografisk spredning, varighet, datatap og kritikalitet av berørte tjenester.',
        guidance: [
            { id: 'DORA-11-1', title: 'Definer klassifiseringskriterier', description: 'Etabler kriterier basert på geografisk spredning, varighet, datatap og kritikalitet.' },
            { id: 'DORA-11-2', title: 'Klassifiser alvorlige hendelser', description: 'Identifiser terskler for når en hendelse kvalifiserer som «major incident».' },
        ]
    },
    {
        id: 'DORA-12', domain: 'Incident Management',
        title: 'Reporting of major ICT-related incidents', titleNo: 'Rapportering av alvorlige IKT-hendelser',
        description: 'Financial entities shall report major ICT-related incidents to the relevant competent authority using standardised reporting templates.',
        descriptionNo: 'Finansforetak skal rapportere vesentlige IKT-relaterte hendelser til relevant tilsynsmyndighet ved bruk av standardiserte rapporteringsmaler.',
        guidance: [
            { id: 'DORA-12-1', title: 'Implementer rapporteringsrutiner', description: 'Definer prosess for initial- og oppfølgingsrapportering til tilsynsmyndigheter.', auditEvidence: 'Dokumentert hendelsesrapporteringsrutine med flytskjema for varsling til Finanstilsynet.' },
            { id: 'DORA-12-2', title: 'Bruk standardiserte maler', description: 'Forbered rapporteringsmaler iht. EBA/ESMA/EIOPA-krav.', auditEvidence: 'Rapporteringsmaler i samsvar med de europeiske tilsynsmyndighetenes (ESA) tekniske standarder.' },
            { id: 'DORA-12-3', title: 'Overhold tidsfrister', description: 'Sørg for rapportering innenfor 4 timer (initial) og 72 timer (mellomrapport).', auditEvidence: 'Tidsstempler og logger fra reelle hendelsesrapporteringer eller simulerte øvelser som beviser at varsling skjer innen tidsfristene.' },
        ]
    },
    {
        id: 'DORA-13', domain: 'Incident Management',
        title: 'Voluntary notification of significant cyber threats', titleNo: 'Frivillig varsling av vesentlige cybertrusler',
        description: 'Financial entities may, on a voluntary basis, notify relevant competent authorities of significant cyber threats.',
        descriptionNo: 'Finansforetak kan på frivillig basis varsle tilsynsmyndigheter om vesentlige cybertrusler.',
        guidance: [
            { id: 'DORA-13-1', title: 'Etabler varslingsprosedyre', description: 'Definer kriterier og prosess for frivillig varsling av vesentlige cybertrusler.' },
        ]
    },
    {
        id: 'DORA-14', domain: 'Incident Management',
        title: 'Harmonisation of reporting content and templates', titleNo: 'Harmonisering av rapporteringsinnhold og maler',
        description: 'Financial entities shall use harmonised reporting templates for incident reporting as specified by ESAs.',
        descriptionNo: 'Finansforetak skal bruke harmoniserte rapporteringsmaler for hendelsesrapportering som spesifisert av de europeiske tilsynsmyndighetene.',
        guidance: [
            { id: 'DORA-14-1', title: 'Implementer ESA-maler', description: 'Ta i bruk harmoniserte rapporteringsmaler fra tilsynsmyndighetene.' },
        ]
    },

    // ═══ RESILIENCE TESTING (Articles 24-27) ═══
    {
        id: 'DORA-15', domain: 'Resilience Testing',
        title: 'General requirements for digital operational resilience testing', titleNo: 'Generelle krav til testing av digital operasjonell motstandskraft',
        description: 'Financial entities shall establish, maintain and review a sound and comprehensive digital operational resilience testing programme.',
        descriptionNo: 'Finansforetak skal etablere, vedlikeholde og gjennomgå et robust og omfattende testprogram for digital operasjonell motstandskraft.',
        guidance: [
            { id: 'DORA-15-1', title: 'Etabler testprogram', description: 'Lag et strukturert program for testing av digital operasjonell motstandskraft.' },
            { id: 'DORA-15-2', title: 'Definer testomfang', description: 'Identifiser kritiske systemer og funksjoner som skal inkluderes i testprogrammet.' },
        ]
    },
    {
        id: 'DORA-16', domain: 'Resilience Testing',
        title: 'Testing of ICT tools and systems', titleNo: 'Testing av IKT-verktøy og systemer',
        description: 'Financial entities shall perform appropriate tests such as vulnerability assessments, network security assessments, penetration testing and gap analysis.',
        descriptionNo: 'Finansforetak skal gjennomføre passende tester som sårbarhetsvurderinger, nettverkssikkerhetsvurderinger, penetrasjonstesting og gapanalyser.',
        guidance: [
            { id: 'DORA-16-1', title: 'Gjennomfør sårbarhetsvurderinger', description: 'Utfør regelmessige sårbarhetsskanninger av alle kritiske systemer.' },
            { id: 'DORA-16-2', title: 'Penetrasjonstesting', description: 'Gjennomfør årlige penetrasjonstester utført av kvalifiserte testere.' },
            { id: 'DORA-16-3', title: 'Kodegjennomgang', description: 'Utfør sikkerhetsgjennomganger av kildekode for kritiske applikasjoner.' },
        ]
    },
    {
        id: 'DORA-17', domain: 'Resilience Testing',
        title: 'Threat-led penetration testing (TLPT)', titleNo: 'Trusseldrevet penetrasjonstesting (TLPT)',
        description: 'Financial entities identified by competent authorities shall carry out TLPT at least every three years using qualified external testers.',
        descriptionNo: 'Finansforetak utpekt av tilsynsmyndigheter skal gjennomføre TLPT minst hvert tredje år med kvalifiserte eksterne testere.',
        guidance: [
            { id: 'DORA-17-1', title: 'Planlegg TLPT', description: 'Planlegg trusseldrevet penetrasjonstesting basert på reelle trusselscenarioer.' },
            { id: 'DORA-17-2', title: 'Engasjer kvalifiserte testere', description: 'Velg eksterne testere med TIBER-EU eller tilsvarende sertifisering.' },
            { id: 'DORA-17-3', title: 'Rapporter resultater', description: 'Dokumenter funn, del med tilsynsmyndigheter og implementer utbedringstiltak.' },
        ]
    },
    {
        id: 'DORA-18', domain: 'Resilience Testing',
        title: 'Requirements for testers', titleNo: 'Krav til testere',
        description: 'TLPT shall be performed by qualified external testers meeting specific requirements regarding reputation, capability, and independence.',
        descriptionNo: 'TLPT skal utføres av kvalifiserte eksterne testere som oppfyller spesifikke krav til omdømme, kapabilitet og uavhengighet.',
        guidance: [
            { id: 'DORA-18-1', title: 'Definer kvalifikasjonskrav', description: 'Etabler krav til testeres kompetanse, uavhengighet og omdømme.' },
        ]
    },

    // ═══ THIRD-PARTY RISK (Articles 28-44) ═══
    {
        id: 'DORA-19', domain: 'Third-Party Risk',
        title: 'General principles for ICT third-party risk management', titleNo: 'Generelle prinsipper for IKT-tredjepartsrisikostyring',
        description: 'Financial entities shall manage ICT third-party risk as an integral component of ICT risk.',
        descriptionNo: 'Finansforetak skal styre IKT-tredjepartsrisiko som en integrert del av IKT-risikostyringen.',
        guidance: [
            { id: 'DORA-19-1', title: 'Integrer tredjeparts risikostyring', description: 'Innarbeid tredjepartsrisiko i det overordnede IKT-risikorammeverket.' },
            { id: 'DORA-19-2', title: 'Opprett tredjepartsoversikt', description: 'Vedlikehold et register over alle IKT-tredjepartsleverandører og deres kritikalitet.' },
        ]
    },
    {
        id: 'DORA-20', domain: 'Third-Party Risk',
        title: 'Preliminary assessment of ICT concentration risk', titleNo: 'Foreløpig vurdering av IKT-konsentrasjonsrisiko',
        description: 'Financial entities shall assess and monitor ICT concentration risk at entity level.',
        descriptionNo: 'Finansforetak skal vurdere og overvåke IKT-konsentrasjonsrisiko på foretaksnivå.',
        guidance: [
            { id: 'DORA-20-1', title: 'Vurder konsentrasjonsrisiko', description: 'Evaluer avhengigheter av enkeltleverandører for kritiske IKT-tjenester.' },
            { id: 'DORA-20-2', title: 'Definer diversifiseringsstrategi', description: 'Planlegg alternativer for å redusere konsentrasjonsrisiko.' },
        ]
    },
    {
        id: 'DORA-21', domain: 'Third-Party Risk',
        title: 'Key contractual provisions', titleNo: 'Sentrale kontraktsbestemmelser',
        description: 'Contractual arrangements with ICT third-party service providers shall include specific provisions on accessibility, availability, integrity, security and protection of personal data.',
        descriptionNo: 'Kontraktsavtaler med IKT-tredjepartsleverandører skal inkludere spesifikke bestemmelser om tilgjengelighet, integritet, sikkerhet og beskyttelse av personopplysninger.',
        guidance: [
            { id: 'DORA-21-1', title: 'Krev kontraktsbestemmelser', description: 'Inkluder bestemmelser om tilgjengelighet, integritet, sikkerhet og personvern i alle IKT-kontrakter.', auditEvidence: 'Signerte kontrakter eller databehandleravtaler med IKT-leverandører som eksplisitt inneholder bestemmelser om sikkerhet og personvern.' },
            { id: 'DORA-21-2', title: 'Definer SLA-er', description: 'Spesifiser tjenestenivåavtaler med målbare sikkerhetskrav.', auditEvidence: 'Avtalte tjenestenivåavtaler (SLA) som definerer konkrete og målbare krav til f.eks. oppetid, responstider og varslingstider.' },
            { id: 'DORA-21-3', title: 'Krev revisjonsrett', description: 'Sikre rett til å gjennomføre sikkerhetsrevisjoner av leverandørene.', auditEvidence: 'Kontraktsklausul som gir organisasjonen og dens uavhengige revisorer rett til å gjennomføre sikkerhetsrevisjoner og fysiske inspeksjoner.' },
        ]
    },
    {
        id: 'DORA-22', domain: 'Third-Party Risk',
        title: 'ICT services supporting critical or important functions', titleNo: 'IKT-tjenester som støtter kritiske funksjoner',
        description: 'Additional requirements for contractual arrangements regarding ICT services that support critical or important functions.',
        descriptionNo: 'Ytterligere krav til kontraktsavtaler for IKT-tjenester som støtter kritiske eller viktige funksjoner.',
        guidance: [
            { id: 'DORA-22-1', title: 'Identifiser kritiske tjenester', description: 'Kartlegg hvilke IKT-tjenester som støtter kritiske forretningsfunksjoner.' },
            { id: 'DORA-22-2', title: 'Skjerpede kontraktskrav', description: 'Implementer utvidede krav for leverandører av kritiske tjenester inkl. avslutningsplaner.' },
        ]
    },
    {
        id: 'DORA-23', domain: 'Third-Party Risk',
        title: 'Sub-outsourcing', titleNo: 'Underleverandørkjeder',
        description: 'Financial entities shall monitor risks related to sub-outsourcing of ICT services.',
        descriptionNo: 'Finansforetak skal overvåke risikoer knyttet til utkontraktering av IKT-tjenester til underleverandører.',
        guidance: [
            { id: 'DORA-23-1', title: 'Overvåk underleverandører', description: 'Krev transparens om og godkjenning av underleverandørkjeder.' },
        ]
    },
    {
        id: 'DORA-24', domain: 'Third-Party Risk',
        title: 'Exit strategies', titleNo: 'Avslutningsstrategier',
        description: 'Financial entities shall develop exit strategies for ICT third-party service providers.',
        descriptionNo: 'Finansforetak skal utvikle avslutningsstrategier for IKT-tredjepartsleverandører.',
        guidance: [
            { id: 'DORA-24-1', title: 'Utvikle avslutningsstrategier', description: 'Definer planer for migrasjon bort fra kritiske IKT-leverandører.' },
            { id: 'DORA-24-2', title: 'Test portabilitet', description: 'Verifiser at data og tjenester kan overføres til alternative leverandører.' },
        ]
    },

    // ═══ INFORMATION SHARING (Article 45) ═══
    {
        id: 'DORA-25', domain: 'Information Sharing',
        title: 'Cyber threat information sharing', titleNo: 'Deling av cybertrusselinformasjon',
        description: 'Financial entities may exchange amongst themselves cyber threat information and intelligence.',
        descriptionNo: 'Finansforetak kan utveksle cybertrusselinformasjon og etterretning seg imellom.',
        guidance: [
            { id: 'DORA-25-1', title: 'Delta i informasjonsdelingsnettverk', description: 'Bli med i relevante bransje-ISAC-er og informasjonsdelingsfora.' },
            { id: 'DORA-25-2', title: 'Etabler delingsprosedyrer', description: 'Definer regler for hva som kan deles og med hvem, inkl. TLP-merking.' },
        ]
    },

    // ═══ GOVERNANCE (Articles 5 & 13) ═══
    {
        id: 'DORA-26', domain: 'Governance',
        title: 'Management body responsibility', titleNo: 'Ledelsens ansvar',
        description: 'The management body shall define, approve, oversee and be responsible for the implementation of the ICT risk management framework.',
        descriptionNo: 'Ledelsen skal definere, godkjenne, overvåke og være ansvarlig for implementeringen av IKT-risikostyringsrammeverket.',
        guidance: [
            { id: 'DORA-26-1', title: 'Ledelsens ansvar for IKT-risiko', description: 'Sørg for at styret/ledelsen aktivt overvåker og godkjenner IKT-risikostrategien.' },
            { id: 'DORA-26-2', title: 'Kompetansekrav for ledelsen', description: 'Sørg for at ledelsen har tilstrekkelig kompetanse om IKT-risiko.' },
            { id: 'DORA-26-3', title: 'Regelmessig rapportering', description: 'Etabler kvartalsvis rapportering om IKT-risiko til styret.' },
        ]
    },
    {
        id: 'DORA-27', domain: 'Governance',
        title: 'ICT-related training and awareness', titleNo: 'IKT-relatert opplæring og bevisstgjøring',
        description: 'Financial entities shall ensure that all staff undergo specific ICT security training appropriate to their roles.',
        descriptionNo: 'Finansforetak skal sikre at alle ansatte gjennomfører spesifikk IKT-sikkerhetsopplæring tilpasset deres roller.',
        guidance: [
            { id: 'DORA-27-1', title: 'Obligatorisk IKT-opplæring', description: 'Gjennomfør rollespesifikk IKT-sikkerhetsopplæring for alle ansatte.' },
            { id: 'DORA-27-2', title: 'Ledelsesopplæring', description: 'Gi spesialtilpasset opplæring om IKT-risiko til toppledelse og styremedlemmer.' },
        ]
    },
    {
        id: 'DORA-28', domain: 'Governance',
        title: 'ICT security function', titleNo: 'IKT-sikkerhetsfunksjon',
        description: 'Financial entities shall ensure the independence of the ICT security function from ICT development and operations.',
        descriptionNo: 'Finansforetak skal sikre uavhengigheten til IKT-sikkerhetsfunksjonen fra IKT-utvikling og drift.',
        guidance: [
            { id: 'DORA-28-1', title: 'Etabler uavhengig sikkerhetsfunksjon', description: 'Sørg for at IKT-sikkerhetsfunksjonen er segregert fra utvikling og drift.' },
        ]
    },
];

export const doraDomainTranslations: Record<string, Record<import('../hooks/useLang').Lang, string>> = {
    'ICT Risk Management': { nb: 'IKT-risikostyring' },
    'Incident Management': { nb: 'Hendelseshåndtering' },
    'Resilience Testing': { nb: 'Motstandskraftstesting' },
    'Third-Party Risk': { nb: 'Tredjepartsrisiko' },
    'Information Sharing': { nb: 'Informasjonsdeling' },
    'Governance': { nb: 'Styring' },
};
