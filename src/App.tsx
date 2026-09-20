import { useState, useEffect, useMemo } from 'react';
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
import { nsmControls, nsmDomains, nsmDomainTranslations } from './data/nsm';
import {
    Sun, Moon, ShieldCheck, LayoutDashboard,
    ListCheck, Activity, Shield, AlertTriangle,
    FileText, Info, Database, Fingerprint, Sliders, X, Check, Menu
} from 'lucide-react';
import { ModuleId, ModuleConfig } from './types';

type Tab = ModuleId;
type Theme = 'dark' | 'light';

const MODULES_STORAGE_KEY = 'st-a-modules-config';

interface ModuleMeta {
    id: Tab;
    title: string;
    badge?: string;
    description: string;
    icon: any;
}

const ALL_MODULES: ModuleMeta[] = [
    { id: 'overview', title: 'Oversikt / Dashboard', description: 'Samlet modenhet, målinger og nøkkeltall', icon: LayoutDashboard },
    { id: 'controls', title: 'ISO/IEC 27001', description: '93 sikkerhetskontroller (Vedlegg A)', icon: ListCheck },
    { id: 'nsm', title: 'NSM Grunnprinsipper', badge: 'NO', description: 'Nasjonalt sikkerhetsorgans grunnprinsipper for IKT-sikkerhet (v2.0)', icon: ShieldCheck },
    { id: 'dora', title: 'DORA', badge: 'EU', description: 'Digital Operational Resilience Act for finans og IKT-leverandører', icon: Activity },
    { id: 'nis2', title: 'NIS2', badge: 'EU', description: 'Cybersikkerhetsdirektivet for samfunnsviktige virksomheter', icon: Shield },
    { id: 'risk', title: 'Risikovurdering & KITA', description: 'KITA/CIA konsekvensvurdering, 5x5 matrise og tiltak', icon: AlertTriangle },
    { id: 'systems', title: 'Systemoversikt', description: 'IT-arkitektur, driftsmodeller og systemeiere', icon: Database },
    { id: 'privacy', title: 'Personvern & Leverandører', description: 'Behandlingsprotokoll (GDPR art. 30) og DPA-register', icon: Fingerprint },
    { id: 'documents', title: 'ISMS Dokumenter', description: 'Sikkerhetspolicyer, instrukser og revisjonsstatus', icon: FileText },
    { id: 'about', title: 'Om & Veiledning', description: 'Veiledning, roller og revisjonsstandarder', icon: Info },
];

const defaultModuleConfig: ModuleConfig = {
    overview: true,
    controls: true,
    nsm: true,
    dora: true,
    nis2: true,
    risk: true,
    systems: true,
    privacy: true,
    documents: true,
    about: true,
};

function getInitialModuleConfig(): ModuleConfig {
    const stored = localStorage.getItem(MODULES_STORAGE_KEY);
    if (stored) {
        try {
            return { ...defaultModuleConfig, ...JSON.parse(stored) };
        } catch (e) {
            console.error('Failed to parse stored module config', e);
        }
    }
    return defaultModuleConfig;
}

function getInitialTheme(): Theme {
    const saved = localStorage.getItem('comply-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light'; // Default to light mode
}

function App() {
    const [moduleConfig, setModuleConfig] = useState<ModuleConfig>(getInitialModuleConfig);
    const [showModuleSettings, setShowModuleSettings] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

    useEffect(() => {
        localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(moduleConfig));
        // If current tab is disabled, switch to first available tab
        if (!moduleConfig[activeTab]) {
            const firstEnabled = ALL_MODULES.find(m => moduleConfig[m.id]);
            if (firstEnabled) {
                setActiveTab(firstEnabled.id);
            }
        }
    }, [moduleConfig, activeTab]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    const toggleModule = (id: Tab) => {
        setModuleConfig(prev => {
            const next = { ...prev, [id]: !prev[id] };
            // Ensure at least one module is always enabled
            const anyEnabled = Object.values(next).some(v => v);
            if (!anyEnabled) return prev;
            return next;
        });
    };

    const enableAllModules = () => {
        const all: ModuleConfig = {
            overview: true,
            controls: true,
            nsm: true,
            dora: true,
            nis2: true,
            risk: true,
            systems: true,
            privacy: true,
            documents: true,
            about: true,
        };
        setModuleConfig(all);
    };

    const setCoreOnlyModules = () => {
        const coreOnly: ModuleConfig = {
            overview: true,
            controls: true,
            nsm: false,
            dora: false,
            nis2: false,
            risk: true,
            systems: true,
            privacy: true,
            documents: true,
            about: true,
        };
        setModuleConfig(coreOnly);
    };

    const visibleModules = useMemo(() => {
        return ALL_MODULES.filter(m => moduleConfig[m.id]);
    }, [moduleConfig]);

    return (
        <div className="sidebar-layout">
            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
                <div 
                    className="sidebar-backdrop" 
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                {/* Brand Logo & Security Seal */}
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '8px',
                            background: 'rgba(13, 148, 136, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(13, 148, 136, 0.25)'
                        }}>
                            <ShieldCheck size={18} style={{ color: 'var(--accent-teal)' }} />
                        </div>
                        <div>
                            <span style={{
                                fontWeight: 700,
                                fontSize: '16px',
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)',
                                display: 'block',
                                lineHeight: 1.2
                            }}>
                                Ståa
                            </span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>
                                ISMS & Personvern
                            </span>
                        </div>
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(false)}
                        title="Lukk meny"
                        aria-label="Lukk meny"
                        style={{ border: 'none' }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modules Header & Customize Button */}
                <div style={{ padding: '12px 14px 4px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Moduler ({visibleModules.length}/{ALL_MODULES.length})
                    </span>
                    <button
                        onClick={() => setShowModuleSettings(true)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--accent-teal)', display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '11px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px'
                        }}
                        title="Tilpass hvilke moduler og menyer som skal vises"
                    >
                        <Sliders size={12} /> Tilpass
                    </button>
                </div>

                {/* Sidebar Links */}
                <nav className="sidebar-nav" aria-label="Hovedmeny">
                    {visibleModules.map(mod => {
                        const Icon = mod.icon;
                        const isActive = activeTab === mod.id;
                        return (
                            <button
                                key={mod.id}
                                className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab(mod.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <Icon size={16} />
                                <span style={{ flex: 1, textAlign: 'left' }}>
                                    {mod.id === 'overview' && t('nav.overview')}
                                    {mod.id === 'controls' && t('nav.controls')}
                                    {mod.id === 'nsm' && 'NSM Grunnprinsipper'}
                                    {mod.id === 'dora' && 'DORA'}
                                    {mod.id === 'nis2' && 'NIS2'}
                                    {mod.id === 'risk' && t('nav.risk')}
                                    {mod.id === 'systems' && 'Systemoversikt'}
                                    {mod.id === 'privacy' && 'Personvern & DPA'}
                                    {mod.id === 'documents' && t('nav.documents')}
                                    {mod.id === 'about' && t('nav.about')}
                                </span>
                                {mod.badge && (
                                    <span style={{
                                        fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px',
                                        background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-primary)',
                                        border: '1px solid rgba(59, 130, 246, 0.25)'
                                    }}>
                                        {mod.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                        <button 
                            className="mobile-menu-btn" 
                            onClick={() => setMobileMenuOpen(prev => !prev)}
                            aria-label="Åpne eller lukk meny"
                        >
                            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {activeTab === 'overview' && t('nav.overview')}
                            {activeTab === 'controls' && t('controls.title')}
                            {activeTab === 'nsm' && 'NSM Grunnprinsipper v2.0'}
                            {activeTab === 'dora' && 'DORA'}
                            {activeTab === 'nis2' && 'NIS2'}
                            {activeTab === 'risk' && t('nav.risk')}
                            {activeTab === 'systems' && 'Systemoversikt'}
                            {activeTab === 'privacy' && 'Personvern & DPA'}
                            {activeTab === 'documents' && t('nav.documents')}
                            {activeTab === 'about' && t('nav.about')}
                        </h2>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, flexShrink: 0 }}>
                        {state.companyName || 'Ståa Compliance'}
                    </div>
                </header>

                {/* Main Scrollable View */}
                <div className="page-container">
                    {activeTab === 'overview' && <Dashboard onNavigateToControls={() => setActiveTab('controls')} />}
                    {activeTab === 'controls' && <ControlsPage />}
                    {activeTab === 'nsm' && (
                        <RegulationPage
                            controls={nsmControls}
                            domains={nsmDomains}
                            domainTranslations={nsmDomainTranslations}
                            regulationLabel="NSM"
                        />
                    )}
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

            {/* ─── Module Settings Modal ─── */}
            {showModuleSettings && (
                <div className="risk-modal-overlay" onClick={() => setShowModuleSettings(false)}>
                    <div className="risk-modal card" style={{ maxWidth: '580px', width: '92vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '8px',
                                    background: 'rgba(13, 148, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--accent-teal)'
                                }}>
                                    <Sliders size={18} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Tilpass moduler & menyer</h3>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                                        Skru av rammeverk eller moduler som ikke er relevante for din virksomhet.
                                    </p>
                                </div>
                            </div>
                            <button className="risk-btn-icon" onClick={() => setShowModuleSettings(false)}>
                                <X size={16} />
                            </button>
                        </div>

                        {/* Quick Action Presets */}
                        <div style={{ display: 'flex', gap: '8px', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                            <button
                                className="risk-btn"
                                style={{ fontSize: '11px', padding: '4px 10px' }}
                                onClick={enableAllModules}
                            >
                                <Check size={12} /> Vis alle ({ALL_MODULES.length})
                            </button>
                            <button
                                className="risk-btn"
                                style={{ fontSize: '11px', padding: '4px 10px' }}
                                onClick={setCoreOnlyModules}
                            >
                                Kun ISO 27001 kjerne (uten DORA/NIS2)
                            </button>
                        </div>

                        {/* Module List */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {ALL_MODULES.map(mod => {
                                const Icon = mod.icon;
                                const isEnabled = moduleConfig[mod.id];
                                return (
                                    <div
                                        key={mod.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 14px',
                                            borderRadius: '8px',
                                            background: isEnabled ? 'var(--hover-overlay)' : 'var(--card-inner-bg)',
                                            border: '1px solid var(--border)',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, paddingRight: '12px' }}>
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '6px',
                                                background: isEnabled ? 'rgba(13, 148, 136, 0.1)' : 'var(--bg-tertiary)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: isEnabled ? 'var(--accent-teal)' : 'var(--text-muted)'
                                            }}>
                                                <Icon size={16} />
                                            </div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <span style={{ fontSize: '13px', fontWeight: 600, color: isEnabled ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                                        {mod.title}
                                                    </span>
                                                    {mod.badge && (
                                                        <span style={{
                                                            fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px',
                                                            background: 'rgba(59, 130, 246, 0.12)', color: 'var(--accent-primary)',
                                                            border: '1px solid rgba(59, 130, 246, 0.25)'
                                                        }}>
                                                            {mod.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                    {mod.description}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Toggle switch */}
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={isEnabled}
                                                onChange={() => toggleModule(mod.id)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Modal Footer */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)', marginTop: '8px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                Endringer oppdateres i sanntid og huskes i nettleseren.
                            </span>
                            <button
                                className="risk-btn risk-btn-primary"
                                onClick={() => setShowModuleSettings(false)}
                            >
                                <Check size={14} /> Ferdig
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
