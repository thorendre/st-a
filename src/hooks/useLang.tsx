import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'nb';

interface LangContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: string) => string;
}

const translations: Record<string, string> = {
    // ─── Navigasjon ───
    'nav.overview': 'Oversikt',
    'nav.controls': 'ISO 27001 Kontroller',
    'nav.documents': 'ISMS-dokumenter',
    'nav.about': 'Om',

    // ─── Dashboard ───
    'dash.export': 'Eksporter',
    'dash.import': 'Importer',
    'dash.reset': 'Tilbakestill',
    'dash.iso': 'ISO 27001',
    'dash.iso.sub': 'Kontroller',
    'dash.nist': 'NIST CSF 2.0',
    'dash.nist.sub': 'Funksjoner dekket',
    'dash.nsm': 'NSM Grunnprinsipper',
    'dash.nsm.sub': 'Prinsipper dekket',
    'dash.domain_breakdown': 'Domeneoversikt',
    'dash.go_controls': 'Gå til kontroller →',
    'dash.not_started': 'ikke startet',
    'dash.completed': 'fullført',
    'dash.controls': 'kontroller',
    'dash.isms_docs': 'ISMS-dokumenter',
    'dash.fields_filled': 'felter utfylt',
    'dash.impl_steps_total': 'Implementeringssteg (totalt)',

    // ─── Kontrollside ───
    'ctrl.implemented': 'implementert',
    'ctrl.in_progress': 'under arbeid',
    'ctrl.search': 'Søk i kontroller...',
    'ctrl.all_domains': 'Alle domener',
    'ctrl.all_statuses': 'Alle statuser',
    'ctrl.control': 'Kontroll',
    'ctrl.domain': 'Domene',
    'ctrl.status': 'Status',
    'ctrl.guide': 'Veiledning',
    'ctrl.no_match': 'Ingen kontroller matcher filtrene.',
    'ctrl.impl_status': 'Implementeringsstatus',
    'ctrl.framework_coverage': 'Rammeverksdekning',
    'ctrl.framework': 'Rammeverk',
    'ctrl.description': 'Beskrivelse',
    'ctrl.impl_steps': 'Implementeringssteg',
    'ctrl.done': 'ferdig',
    'ctrl.notes': 'Notater',
    'ctrl.notes_placeholder': 'Dokumenter bevis, beslutninger eller implementeringsdetaljer...',
    'ctrl.requirement': 'Krav',

    // ─── Statuser ───
    'status.not_started': 'Ikke startet',
    'status.planning': 'Planlegging',
    'status.in_progress': 'Under arbeid',
    'status.implemented': 'Implementert',
    'status.not_applicable': 'Ikke aktuelt',

    // ─── Domener ───
    'domain.organizational': 'Organisatoriske kontroller',
    'domain.people': 'Personellkontroller',
    'domain.physical': 'Fysiske kontroller',
    'domain.technological': 'Teknologiske kontroller',
    'domain.organizational.short': 'Organisatorisk',
    'domain.people.short': 'Personell',
    'domain.physical.short': 'Fysisk',
    'domain.technological.short': 'Teknologisk',

    // ─── Dokumentside ───
    'docs.title': 'ISMS-dokumenter',
    'docs.complete': 'fullført',
    'docs.fields_completed': 'felter utfylt',
    'docs.export_all': 'Eksporter alle dokumenter',
    'docs.export': 'Eksporter',
    'docs.select': 'Velg et dokument fra sidepanelet.',
    'docs.standard_text': 'Standardtekst',
    'docs.clause': 'Klausul',

    // ─── Footer ───
    'footer.text': 'Ståa – Styringssystem for informasjonssikkerhet og etterlevelse',
    'footer.edit_org': 'Rediger organisasjonsnavn',

    // ─── Risikomodul ───
    'nav.risk': 'Risiko',
    'risk.title': 'Risikovurderinger',
    'risk.subtitle': 'Utfør og administrer risikoanalyser med 5×5 risikomatrise',
    'risk.projects': 'Prosjekter',
    'risk.new_project': 'Nytt prosjekt',
    'risk.no_projects': 'Ingen risikovurderinger opprettet ennå. Opprett et nytt prosjekt for å starte.',
    'risk.project_name': 'Prosjektnavn',
    'risk.project_desc': 'Beskrivelse (valgfri)',
    'risk.create': 'Opprett',
    'risk.cancel': 'Avbryt',
    'risk.save': 'Lagre',
    'risk.delete': 'Slett',
    'risk.back_to_projects': 'Tilbake til prosjekter',
    'risk.risks_count': 'risikoer',
    'risk.categories_count': 'kategorier',
    'risk.categories': 'Kategorier',
    'risk.add_category': 'Ny kategori',
    'risk.import_template': 'Importer mal',
    'risk.cat_name': 'Kategorinavn',
    'risk.cat_desc': 'Beskrivelse',
    'risk.hide': 'Skjul kategori',
    'risk.show': 'Vis kategori',
    'risk.remove': 'Fjern kategori',
    'risk.filter_status': 'Filtrer status',
    'risk.all_statuses': 'Alle statuser',
    'risk.inherent': 'Iboende risiko',
    'risk.residual': 'Restrisiko',
    'risk.total': 'Totalt',
    'risk.total_score': 'Totalrisiko',
    'risk.matrix_title': 'Risikomatrise (Sannsynlighet × Konsekvens)',
    'risk.k_score': 'K – Konfidensialitet',
    'risk.i_score': 'I – Integritet',
    'risk.t_score': 'T – Tilgjengelighet',
    'risk.a_score': 'A – Autentisitet',
    'risk.kita_consequence': 'KITA Konsekvensvurdering',
    'risk.consequence_computed': 'Beregnet konsekvens (Høyeste KITA)',
    'risk.save_controls': 'Lagre tiltak',
    'risk.controls_saved': 'Tiltak lagret!',
    'risk.change_status': 'Endre status',
    'risk.critical': 'Kritisk',
    'risk.high': 'Høy',
    'risk.medium': 'Middels',
    'risk.low': 'Lav',
    'risk.matrix_inherent': 'Risikomatrise – Iboende risiko',
    'risk.matrix_residual': 'Risikomatrise – Restrisiko',
    'risk.likelihood': 'Sannsynlighet',
    'risk.consequence': 'Konsekvens',
    'risk.risk_list': 'Risikoliste',
    'risk.add_risk': 'Legg til risiko',
    'risk.edit_risk': 'Rediger risiko',
    'risk.no_risks': 'Ingen risikoer funnet. Legg til en ny risiko for å starte.',
    'risk.risk_name': 'Risikonavn',
    'risk.category': 'Kategori',
    'risk.inherent_score': 'Iboende',
    'risk.residual_score': 'Restrisiko',
    'risk.status_label': 'Status',
    'risk.description_label': 'Beskrivelse',
    'risk.threat_label': 'Trusselaktør',
    'risk.vulnerability_label': 'Sårbarhet',
    'risk.owner_label': 'Risikoeier',
    'risk.existing_controls_label': 'Eksisterende tiltak',
    'risk.planned_controls_label': 'Planlagte tiltak',

    // ─── Risikobank ───
    'risk.bank': 'Risikobank',
    'risk.bank_browse': 'Bla i risikobank',
    'risk.bank_subtitle': 'Velg ferdigutfylte risikoer å importere til prosjektet',
    'risk.bank_import_selected': 'Importer valgte',
    'risk.bank_select_all': 'Velg alle',
    'risk.bank_deselect_all': 'Fjern alle valg',
    'risk.bank_selected': 'valgt',
    'risk.bank_target_category': 'Importer til kategori',
    'risk.bank_empty': 'Alle risikoer fra denne banken er allerede importert.',
};

const LangContext = createContext<LangContextType>({
    lang: 'nb',
    setLang: () => { },
    t: (key: string) => key,
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>('nb');

    const changeLang = (l: Lang) => {
        setLang(l);
    };

    const t = (key: string): string => {
        return translations[key] || key;
    };

    return (
        <LangContext.Provider value={{ lang, setLang: changeLang, t }}>
            {children}
        </LangContext.Provider>
    );
};
