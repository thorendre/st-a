import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ControlsPage } from './components/ControlsPage';
import { DocumentsPage } from './components/DocumentsPage';
import { RegulationPage } from './components/RegulationPage';
import { AboutPage } from './components/AboutPage';
import { RiskPage } from './components/RiskPage';
import { SystemsPage } from './components/SystemsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { useAssessmentStore } from './hooks/useAssessmentStore';
import { useLang } from './hooks/useLang';
import { doraControls, doraDomains, doraDomainTranslations } from './data/dora';
import { nis2Controls, nis2Domains, nis2DomainTranslations } from './data/nis2';
import {
    Sun, Moon, ShieldCheck, LayoutDashboard,
    ListCheck, Activity, Shield, AlertTriangle,
    FileText, Info, Database, Fingerprint
} from 'lucide-react';

type Tab = 'overview' | 'controls' | 'dora' | 'nis2' | 'risk' | 'systems' | 'privacy' | 'documents' | 'about';
type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
    const saved = localStorage.getItem('comply-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light'; // Default to light mode
}

function App() {
    const [activeTab, setActiveTab] = useState<Tab>('controls');
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const { state, setCompanyName } = useAssessmentStore();
    const { lang, setLang, t } = useLang();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('comply-theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <div className="sidebar-layout">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                {/* Brand Logo */}
                <div className="sidebar-header">
                    <ShieldCheck size={22} style={{ color: 'var(--accent-teal)' }} />
                    <span style={{
                        fontWeight: 700,
                        fontSize: '18px',
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                    }}>
                        Ståa
                    </span>
                </div>

                {/* Sidebar Links */}
                <nav className="sidebar-nav" aria-label="Hovedmeny">
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <LayoutDashboard size={16} />
                        {t('nav.overview')}
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'controls' ? 'active' : ''}`}
                        onClick={() => setActiveTab('controls')}
                    >
                        <ListCheck size={16} />
                        {t('nav.controls')}
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'dora' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dora')}
                    >
                        <Activity size={16} />
                        DORA
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'nis2' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nis2')}
                    >
                        <Shield size={16} />
                        NIS2
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'risk' ? 'active' : ''}`}
                        onClick={() => setActiveTab('risk')}
                    >
                        <AlertTriangle size={16} />
                        {t('nav.risk')}
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'systems' ? 'active' : ''}`}
                        onClick={() => setActiveTab('systems')}
                    >
                        <Database size={16} />
                        Systemoversikt
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'privacy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('privacy')}
                    >
                        <Fingerprint size={16} />
                        Personvern
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'documents' ? 'active' : ''}`}
                        onClick={() => setActiveTab('documents')}
                    >
                        <FileText size={16} />
                        {t('nav.documents')}
                    </button>
                    <button
                        className={`sidebar-nav-btn ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        <Info size={16} />
                        {t('nav.about')}
                    </button>
                </nav>

                {/* Sidebar Footer Controls */}
                <div className="sidebar-footer">
                    {/* Organization Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {t('footer.edit_org') || 'Virksomhet'}
                        </label>
                        <input
                            type="text"
                            value={state.companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="risk-input"
                            style={{ padding: '6px 10px', fontSize: '12px' }}
                            placeholder="Organisasjonsnavn"
                        />
                    </div>

                    {/* Language and Theme Selectors */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                        {/* Theme Switcher */}
                        <button className="theme-toggle" onClick={toggleTheme}
                            title={theme === 'dark' ? 'Bytt til lys modus' : 'Bytt til mørk modus'}>
                            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        </button>

                        {/* Language Selection */}
                        <div style={{ display: 'flex', gap: '2px', background: 'var(--bg-tertiary)', borderRadius: '6px', padding: '2px', border: '1px solid var(--border)' }}>
                            <button onClick={() => setLang('nb')} title="Bokmål" style={{
                                padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer',
                                fontSize: '11px', fontWeight: 600, lineHeight: 1, fontFamily: 'var(--font-main)',
                                background: lang === 'nb' ? 'var(--bg-secondary)' : 'transparent',
                                color: lang === 'nb' ? 'var(--text-primary)' : 'var(--text-muted)',
                                opacity: lang === 'nb' ? 1 : 0.6, transition: 'all 0.15s ease',
                            }}>BM</button>
                            <button onClick={() => setLang('nn')} title="Nynorsk" style={{
                                padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer',
                                fontSize: '11px', fontWeight: 600, lineHeight: 1, fontFamily: 'var(--font-main)',
                                background: lang === 'nn' ? 'var(--bg-secondary)' : 'transparent',
                                color: lang === 'nn' ? 'var(--text-primary)' : 'var(--text-muted)',
                                opacity: lang === 'nn' ? 1 : 0.6, transition: 'all 0.15s ease',
                            }}>NN</button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                {/* Header/Top Bar */}
                <header className="top-bar">
                    <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {activeTab === 'overview' && t('nav.overview')}
                        {activeTab === 'controls' && `${t('nav.controls')} (ISO 27001)`}
                        {activeTab === 'dora' && 'DORA (Digital Operational Resilience Act)'}
                        {activeTab === 'nis2' && 'NIS2 (Network and Information Security Directive)'}
                        {activeTab === 'risk' && t('nav.risk')}
                        {activeTab === 'systems' && 'Systemoversikt'}
                        {activeTab === 'privacy' && 'Personvern (DPO-portal)'}
                        {activeTab === 'documents' && t('nav.documents')}
                        {activeTab === 'about' && t('nav.about')}
                    </h2>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {state.companyName || 'Ståa Compliance'}
                    </div>
                </header>

                {/* Main Scrollable View */}
                <div className="page-container">
                    {activeTab === 'overview' && <Dashboard onNavigateToControls={() => setActiveTab('controls')} />}
                    {activeTab === 'controls' && <ControlsPage />}
                    {activeTab === 'dora' && (
                        <RegulationPage
                            controls={doraControls}
                            domains={doraDomains}
                            domainTranslations={doraDomainTranslations}
                            regulationLabel="DORA"
                        />
                    )}
                    {activeTab === 'nis2' && (
                        <RegulationPage
                            controls={nis2Controls}
                            domains={nis2Domains}
                            domainTranslations={nis2DomainTranslations}
                            regulationLabel="NIS2"
                        />
                    )}
                    {activeTab === 'risk' && <RiskPage />}
                    {activeTab === 'systems' && <SystemsPage />}
                    {activeTab === 'privacy' && <PrivacyPage />}
                    {activeTab === 'documents' && <DocumentsPage />}
                    {activeTab === 'about' && <AboutPage />}
                </div>

                {/* Footer */}
                <footer style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {t('footer.text')}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Ståa · Klientside Informasjonssikkerhet
                    </span>
                </footer>
            </main>
        </div>
    );
}

export default App;
