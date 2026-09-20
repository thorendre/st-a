import { useLang } from '../hooks/useLang';
import { Database, Download, Upload, Globe, Shield, Code, Server, FileText, Info, Layers } from 'lucide-react';

export const AboutPage = () => {
    const { lang } = useLang();
    const nn = lang === 'nn';

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
                {nn
                    ? 'Ståa er eit lokalt styringssystem for informasjonstryggleik som hjelper organisasjonar med å implementere og spore samsvar med ISO 27001, DORA og NIS2.'
                    : 'Ståa er et lokalt styringssystem for informasjonssikkerhet som hjelper organisasjoner med å implementere og spore samsvar med ISO 27001, DORA og NIS2.'}
            </p>

            {/* Arkitektur */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Layers size={20} color="var(--accent-teal)" />
                    Arkitektur
                </h2>
                <p style={textStyle}>
                    {nn
                        ? 'Ståa er ein fullstendig klientside-applikasjon (SPA) som køyrer heilt i nettlesaren din. Ingen data vert sendt til nokon tenar – alt vert lagra lokalt på di maskin.'
                        : 'Ståa er en fullstendig klientside-applikasjon (SPA) som kjører helt i nettleseren din. Ingen data sendes til noen server – alt lagres lokalt på din maskin.'}
                </p>

                <h3 style={subHeadingStyle}>
                    {nn ? 'Hovudkomponentar' : 'Hovedkomponenter'}
                </h3>
                <ul style={listStyle}>
                    <li><strong>Oversikt</strong> – {nn ? 'Aggregert status for alle rammeverk med framgangsdiagram' : 'Aggregert status for alle rammeverk med fremgangsdiagrammer'}</li>
                    <li><strong>ISO 27001</strong> – {nn ? 'Alle 93 kontrollar frå Annex A med implementeringsrettleiing' : 'Alle 93 kontroller fra Annex A med implementeringsveiledning'}</li>
                    <li><strong>DORA</strong> – {nn ? '28 krav frå Digital Operational Resilience Act med implementeringssteg' : '28 krav fra Digital Operational Resilience Act med implementeringssteg'}</li>
                    <li><strong>NIS2</strong> – {nn ? '26 krav frå Network and Information Security Directive med implementeringssteg' : '26 krav fra Network and Information Security Directive med implementeringssteg'}</li>
                    <li><strong>{nn ? 'ISMS-dokument' : 'ISMS-dokumenter'}</strong> – {nn ? 'Standardiserte styringsdokument med rettleia utfylling' : 'Standardiserte styringsdokumenter med veiledet utfylling'}</li>
                </ul>
            </div>

            {/* Datalagring */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Database size={20} color="var(--accent-teal)" />
                    Datalagring
                </h2>
                <p style={textStyle}>
                    {nn
                        ? 'All data vert lagra i nettlesaren sin localStorage under nøkkelen infosec_dashboard_state. Det tyder:'
                        : 'All data lagres i nettleserens localStorage under nøkkelen infosec_dashboard_state. Det betyr:'}
                </p>
                <ul style={listStyle}>
                    <li>{nn ? '✅ Data vert verande på di maskin – ingen skylagring' : '✅ Data forblir på din maskin – ingen skylagring'}</li>
                    <li>{nn ? '✅ Ingen brukarkontoar eller innlogging naudsynt' : '✅ Ingen brukerkontoer eller innlogging nødvendig'}</li>
                    <li>{nn ? '✅ Fungerer heilt offline etter fyrste lasting' : '✅ Fungerer helt offline etter første lasting'}</li>
                    <li>{nn ? '⚠️ Data er per nettlesar – ulike nettlesarar har ulike data' : '⚠️ Data er per nettleser – ulike nettlesere har ulike data'}</li>
                    <li>{nn ? '⚠️ Sletting av nettlesardata vil slette tilstanden' : '⚠️ Sletting av nettleserdata vil slette tilstanden'}</li>
                </ul>

                <h3 style={subHeadingStyle}>
                    {nn ? 'Kva vert lagra?' : 'Hva lagres?'}
                </h3>
                <ul style={listStyle}>
                    <li>{nn ? 'Organisasjonsnamn' : 'Organisasjonsnavn'}</li>
                    <li>{nn ? 'Status for kvar kontroll/krav' : 'Status for hver kontroll/krav'}</li>
                    <li>{nn ? 'Fullførte implementeringssteg per kontroll' : 'Fullførte implementeringssteg per kontroll'}</li>
                    <li>{nn ? 'Notat knytte til kontrollar' : 'Notater knyttet til kontroller'}</li>
                    <li>{nn ? 'Svar på ISMS-dokumentfelt' : 'Svar på ISMS-dokumentfelter'}</li>
                    <li>{nn ? 'Valt språk og tema' : 'Valgt språk og tema'}</li>
                </ul>
            </div>

            {/* Eksport og import */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <FileText size={20} color="var(--accent-teal)" />
                    Eksport og import
                </h2>
                <p style={textStyle}>
                    {nn
                        ? 'Du kan ta sikkerheitskopi og overføre data mellom nettlesarar/maskinar via Oversikt-fana:'
                        : 'Du kan sikkerhetskopiere og overføre data mellom nettlesere/maskiner via Oversikt-fanen:'}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px' }}>
                    <div style={{ padding: '16px', background: 'var(--card-inner-bg)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Download size={16} color="var(--accent-green)" />
                            <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Eksporter</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {nn
                                ? 'Last ned all tilstand som ei JSON-fil. Inkluderer kontrollstatusar, steg, notat og dokumentsvar.'
                                : 'Last ned all tilstand som en JSON-fil. Inkluderer kontrollstatuser, steg, notater og dokumentsvar.'}
                        </p>
                    </div>
                    <div style={{ padding: '16px', background: 'var(--card-inner-bg)', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Upload size={16} color="var(--accent-teal)" />
                            <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Importer</strong>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {nn
                                ? 'Last opp ei tidlegare eksportert JSON-fil for å gjenopprette tilstanden. Erstattar all eksisterande data.'
                                : 'Last opp en tidligere eksportert JSON-fil for å gjenopprette tilstanden. Erstatter all eksisterende data.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Automatisk statusoppdatering */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Shield size={20} color="var(--accent-teal)" />
                    Automatisk statusoppdatering
                </h2>
                <p style={textStyle}>
                    {nn
                        ? 'Statusen til kontrollar vert oppdatert automatisk basert på implementeringsstega du gjennomfører:'
                        : 'Statusen til kontroller oppdateres automatisk basert på implementeringsstegene du gjennomfører:'}
                </p>
                <ul style={listStyle}>
                    <li><strong style={{ color: 'var(--status-not-started-color)' }}>{nn ? 'Ikkje starta' : 'Ikke startet'}</strong> – {nn ? 'Ingen steg fullførte' : 'Ingen steg fullført'}</li>
                    <li><strong style={{ color: 'var(--accent-gold)' }}>Under arbeid</strong> – {nn ? 'Nokre steg fullførte' : 'Noen steg fullført'}</li>
                    <li><strong style={{ color: 'var(--accent-green)' }}>Implementert</strong> – {nn ? 'Alle steg fullførte' : 'Alle steg fullført'}</li>
                    <li><strong style={{ color: 'var(--status-not-applicable-color)' }}>{nn ? 'Ikkje aktuelt' : 'Ikke aktuelt'}</strong> – {nn ? 'Manuelt satt, vert ikkje endra av steglogikken' : 'Manuelt satt, endres ikke av steglogikken'}</li>
                </ul>
                <p style={{ ...textStyle, fontSize: '12px', fontStyle: 'italic' }}>
                    {nn
                        ? 'Du kan alltid overstyre statusen manuelt via nedtrekkslista.'
                        : 'Du kan alltid overstyre statusen manuelt via nedtrekkslisten.'}
                </p>
            </div>

            {/* Teknologistack */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Code size={20} color="var(--accent-teal)" />
                    Teknologistack
                </h2>
                <div style={gridStyle}>
                    <div style={chipStyle}><Globe size={14} /> React 18</div>
                    <div style={chipStyle}><Code size={14} /> TypeScript</div>
                    <div style={chipStyle}><Server size={14} /> Vite</div>
                    <div style={chipStyle}><Info size={14} /> Lucide Icons</div>
                    <div style={chipStyle}><Database size={14} /> localStorage</div>
                    <div style={chipStyle}><FileText size={14} /> Vanilla CSS</div>
                </div>
                <ul style={listStyle}>
                    <li><strong>React 18</strong> – Komponentbasert UI-rammeverk</li>
                    <li><strong>TypeScript</strong> – {nn ? 'Typetryggleik og betre utviklaoppleving' : 'Typesikkerhet og bedre utvikleropplevelse'}</li>
                    <li><strong>Vite</strong> – {nn ? 'Rask utviklingsserver og byggeverktøy' : 'Rask utviklingsserver og byggeverktøy'}</li>
                    <li><strong>Lucide React</strong> – {nn ? 'Ikonbibliotek for konsistent visuelt uttrykk' : 'Ikonbibliotek for konsistent visuelt uttrykk'}</li>
                    <li><strong>localStorage</strong> – {nn ? 'Nettlesarbasert datalagring – ingen database naudsynt' : 'Nettleserbasert datalagring – ingen database nødvendig'}</li>
                    <li><strong>CSS Variables</strong> – {nn ? 'Temastøtte med lys/mørk modus via CSS custom properties' : 'Temastøtte med lys/mørk modus via CSS custom properties'}</li>
                </ul>
            </div>

            {/* Språkstøtte */}
            <div className="card" style={{ padding: '28px', ...sectionStyle }}>
                <h2 style={headingStyle}>
                    <Globe size={20} color="var(--accent-teal)" />
                    {nn ? 'Språkstøtte' : 'Språkstøtte'}
                </h2>
                <p style={textStyle}>
                    {nn
                        ? 'Ståa støttar bokmål og nynorsk. Byt språk med BM/NN-knappane i toppmenyen. Alle kontrollar, krav, domene, implementeringssteg og brukargrensesnittelement er omsette.'
                        : 'Ståa støtter bokmål og nynorsk. Bytt språk med BM/NN-knappene i toppmenyen. Alle kontroller, krav, domener, implementeringssteg og brukergrensesnittelementer er oversatt.'}
                </p>
            </div>
        </div>
    );
};
