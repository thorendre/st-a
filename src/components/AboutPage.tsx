import { Database, Download, Upload, Shield, Code, Server, FileText, Info, Layers, CheckCircle2 } from 'lucide-react';

export const AboutPage = () => {
    const sectionStyle: React.CSSProperties = {
        marginBottom: '32px',
    };

    const headingStyle: React.CSSProperties = {
        fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)',
        marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px',
    };

    const subHeadingStyle: React.CSSProperties = {
        fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
        marginBottom: '8px', marginTop: '16px',
    };

    const textStyle: React.CSSProperties = {
        fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px',
    };

    const listStyle: React.CSSProperties = {
        fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8,
        paddingLeft: '20px', marginBottom: '12px',
    };

    const chipStyle: React.CSSProperties = {
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
        background: 'var(--bg-tertiary)', color: 'var(--accent-teal)',
        border: '1px solid var(--border)',
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px', marginBottom: '16px',
    };

    return (
        <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Om Ståa
            </h1>
            <p style={{ ...textStyle, fontSize: '15px', marginBottom: '32px' }}>
                Ståa er et lokalt og sikkert styringssystem for informasjonssikkerhet (ISMS) og cybersikkerhetsstyring. Løsningen hjelper norske og internasjonale virksomheter med å implementere, spore og dokumentere etterlevelse mot <strong>ISO 27001</strong>, <strong>NSM Grunnprinsipper 2.1</strong>, <strong>NIST CSF 2.0</strong>, <strong>SOC 2 Type II</strong>, <strong>DORA</strong> og <strong>NIS2</strong>.
            </p>

            {/* Arkitektur */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Layers size={20} color="var(--accent-teal)" />
                    Arkitektur og Funksjonalitet
                </h2>
                <p style={textStyle}>
                    Ståa er en fullstendig klientside-applikasjon (Single Page Application) som kjører direkte i nettleseren din. Ingen data sendes til eksterne servere – all informasjon forblir strengt konfidensiell og lagret lokalt.
                </p>

                <h3 style={subHeadingStyle}>Hovedkomponenter</h3>
                <ul style={listStyle}>
                    <li><strong>Oversikt & Dashbord</strong> – Samlet modenhet og fremdriftsgrafer på tvers av alle rammeverk.</li>
                    <li><strong>ISO/IEC 27001</strong> – Alle 93 kontroller fra Annex A med veiledning og revisjonsbevis.</li>
                    <li><strong>NSM Grunnprinsipper v2.1</strong> – Alle 21 offisielle prinsipper fra Nasjonal sikkerhetsmyndighet med tydeliggjøring av de 15 prioriterte tiltakene.</li>
                    <li><strong>NIST CSF 2.0</strong> – Kjernefunksjonene Govern, Identify, Protect, Detect, Respond og Recover.</li>
                    <li><strong>SOC 2 Type II</strong> – AICPA Trust Services Criteria (Sikkerhet, Tilgjengelighet, Integritet, Konfidensialitet og Personvern).</li>
                    <li><strong>DORA</strong> – Krav fra Digital Operational Resilience Act for finansforetak og IKT-tredjeparter.</li>
                    <li><strong>NIS2</strong> – Krav fra cybersikkerhetsdirektivet for samfunnsviktige og vesentlige virksomheter.</li>
                    <li><strong>Flerlags Risikostyring</strong> – 5×5 KITA-risikomatrise med plattformarv (Kubernetes/sky) for å unngå dobbeltarbeid.</li>
                    <li><strong>Personvern & Leverandørregister</strong> – Kartlegging av databehandlere, DPA-er og overføringsgrunnlag.</li>
                    <li><strong>ISMS-dokumenter</strong> – Standardiserte styringsdokumenter med veiledet utfylling.</li>
                </ul>
            </div>

            {/* Datalagring */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Database size={20} color="var(--accent-teal)" />
                    Lokal Datalagring og Personvern
                </h2>
                <p style={textStyle}>
                    All data lagres i nettleserens <code style={{ color: 'var(--accent-teal)' }}>localStorage</code>. Dette gir en rekke fordeler:
                </p>
                <ul style={listStyle}>
                    <li>✅ <strong>Full datakontroll:</strong> Data forblir på din egen maskin – ingen ukontrollert skylagring.</li>
                    <li>✅ <strong>Ingen innlogging nødvendig:</strong> Ingen brukerkontoer eller ekstern autentisering kreves.</li>
                    <li>✅ <strong>Offline-støtte:</strong> Fungerer problemfritt uten internettilkobling etter første lasting.</li>
                    <li>⚠️ <strong>Nettleserspesifikt:</strong> Data lagres per nettleserprofil; bruk eksport/import ved bytte av maskin eller nettleser.</li>
                    <li>⚠️ <strong>Rensing:</strong> Dersom nettleserdata tømmes, slettes også lagret tilstand. Ta jevnlige sikkerhetskopier via JSON-eksport.</li>
                </ul>

                <h3 style={subHeadingStyle}>Hva lagres?</h3>
                <ul style={listStyle}>
                    <li>Organisasjonsnavn og valgte moduler</li>
                    <li>Status og merknader for hver kontroll og hvert krav</li>
                    <li>Fullførte implementeringssteg per kontroll</li>
                    <li>Risikoprosjekter, kategorier, tiltak og KITA-skårer</li>
                    <li>Leverandøroversikt og databehandleravtaler</li>
                    <li>Utfylte felter i ISMS-dokumenter</li>
                </ul>
            </div>

            {/* Eksport og import */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <FileText size={20} color="var(--accent-teal)" />
                    Sikkerhetskopiering (Eksport og Import)
                </h2>
                <p style={textStyle}>
                    Du kan enkelt sikkerhetskopiere og overføre data mellom maskiner via Oversikt-fanen:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                    <div style={{ padding: '16px', background: 'var(--card-inner-bg)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Download size={16} color="var(--accent-green)" />
                            <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Eksporter</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Last ned hele styringssystemets tilstand som en kryptert/sikret JSON-fil. Inkluderer alle kontroller, risikoprosjekter, leverandører og dokumenter.
                        </p>
                    </div>
                    <div style={{ padding: '16px', background: 'var(--card-inner-bg)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Upload size={16} color="var(--accent-teal)" />
                            <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Importer</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Last opp en tidligere eksportert JSON-fil for å gjenopprette tilstanden umiddelbart.
                        </p>
                    </div>
                </div>
            </div>

            {/* Automatisk statusoppdatering */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Shield size={20} color="var(--accent-teal)" />
                    Automatisk Statusoppdatering
                </h2>
                <p style={textStyle}>
                    Statusen for kontroller og prinsipper oppdateres automatisk etter hvert som du fullfører implementeringsstegene:
                </p>
                <ul style={listStyle}>
                    <li><strong style={{ color: 'var(--status-not-started-color)' }}>Ikke startet</strong> – Ingen implementeringssteg er fullført.</li>
                    <li><strong style={{ color: 'var(--accent-gold)' }}>Under arbeid</strong> – Minst ett implementeringssteg er fullført.</li>
                    <li><strong style={{ color: 'var(--accent-green)' }}>Implementert</strong> – Alle definerte steg og revisjonsbevis er oppfylt.</li>
                    <li><strong style={{ color: 'var(--status-not-applicable-color)' }}>Ikke aktuelt</strong> – Manuelt satt status som overstyrer steglogikken.</li>
                </ul>
                <p style={{ ...textStyle, fontSize: '12px', fontStyle: 'italic' }}>
                    Du kan alltid overstyre statusen manuelt via nedtrekkslisten dersom du har andre kompenserende tiltak.
                </p>
            </div>

            {/* Teknologistack */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Code size={20} color="var(--accent-teal)" />
                    Teknologistack og Sikkerhetsdesign
                </h2>
                <div style={gridStyle}>
                    <div style={chipStyle}><Code size={14} /> React 18</div>
                    <div style={chipStyle}><Code size={14} /> TypeScript 5</div>
                    <div style={chipStyle}><Server size={14} /> Vite</div>
                    <div style={chipStyle}><Info size={14} /> Lucide Icons</div>
                    <div style={chipStyle}><Database size={14} /> localStorage</div>
                    <div style={chipStyle}><FileText size={14} /> Modern CSS</div>
                </div>
                <ul style={listStyle}>
                    <li><strong>React 18 & TypeScript</strong> – Robust, typesikker og modulær arkitektur.</li>
                    <li><strong>Vite</strong> – Lynrask kompilering og optimalisert produksjonsbygg.</li>
                    <li><strong>Lucide React</strong> – Konsistent, universelt tilgjengelig ikondesign.</li>
                    <li><strong>CSS Custom Properties</strong> – Fuldynamisk tema med profesjonell lys og mørk modus.</li>
                    <li><strong>Responsivt design</strong> – Fullverdig mobilopplevelse med dedikert skuffemeny og berøringsvennlige tabeller.</li>
                </ul>
            </div>

            {/* Språk */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <CheckCircle2 size={20} color="var(--accent-teal)" />
                    Språk og Terminologi
                </h2>
                <p style={textStyle}>
                    Ståa er skrevet på helhetlig og profesjonelt <strong>norsk bokmål</strong> tilpasset nasjonale og internasjonale standarder (NSM, Digdir, Datatilsynet, ISO og EU/EØS-direktiver).
                </p>
            </div>
        </div>
    );
};
