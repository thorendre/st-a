import { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'nb' | 'nn';

interface LangContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
    // ─── Navigasjon ───
    'nav.overview': { nb: 'Oversikt', nn: 'Oversikt' },
    'nav.controls': { nb: 'ISO 27001 Kontrollar', nn: 'ISO 27001 Kontrollar' },
    'nav.documents': { nb: 'ISMS-dokumenter', nn: 'ISMS-dokument' },
    'nav.about': { nb: 'Om', nn: 'Om' },

    // ─── Dashboard ───
    'dash.export': { nb: 'Eksporter', nn: 'Eksporter' },
    'dash.import': { nb: 'Importer', nn: 'Importer' },
    'dash.reset': { nb: 'Tilbakestill', nn: 'Tilbakestill' },
    'dash.iso': { nb: 'ISO 27001', nn: 'ISO 27001' },
    'dash.iso.sub': { nb: 'Kontroller', nn: 'Kontrollar' },
    'dash.nist': { nb: 'NIST CSF V2', nn: 'NIST CSF V2' },
    'dash.nist.sub': { nb: 'Kategorier dekket', nn: 'Kategoriar dekte' },
    'dash.nsm': { nb: 'NSM Grunnprinsipper', nn: 'NSM Grunnprinsipp' },
    'dash.nsm.sub': { nb: 'Prinsipper dekket', nn: 'Prinsipp dekte' },
    'dash.domain_breakdown': { nb: 'Domeneoversikt', nn: 'Domeneoversikt' },
    'dash.go_controls': { nb: 'Gå til kontroller →', nn: 'Gå til kontrollar →' },
    'dash.not_started': { nb: 'ikke startet', nn: 'ikkje starta' },
    'dash.completed': { nb: 'fullført', nn: 'fullført' },
    'dash.controls': { nb: 'kontroller', nn: 'kontrollar' },
    'dash.isms_docs': { nb: 'ISMS-dokumenter', nn: 'ISMS-dokument' },
    'dash.fields_filled': { nb: 'felter utfylt', nn: 'felt utfylte' },
    'dash.impl_steps_total': { nb: 'Implementeringssteg (totalt)', nn: 'Implementeringssteg (totalt)' },

    // ─── Kontrollside ───
    'ctrl.implemented': { nb: 'implementert', nn: 'implementert' },
    'ctrl.in_progress': { nb: 'under arbeid', nn: 'under arbeid' },
    'ctrl.search': { nb: 'Søk i kontroller...', nn: 'Søk i kontrollar...' },
    'ctrl.all_domains': { nb: 'Alle domener', nn: 'Alle domene' },
    'ctrl.all_statuses': { nb: 'Alle statuser', nn: 'Alle statusar' },
    'ctrl.control': { nb: 'Kontroll', nn: 'Kontroll' },
    'ctrl.domain': { nb: 'Domene', nn: 'Domene' },
    'ctrl.status': { nb: 'Status', nn: 'Status' },
    'ctrl.guide': { nb: 'Guide', nn: 'Rettleiing' },
    'ctrl.no_match': { nb: 'Ingen kontroller matcher filtrene.', nn: 'Ingen kontrollar samsvarar med filtera.' },
    'ctrl.impl_status': { nb: 'Implementeringsstatus', nn: 'Implementeringsstatus' },
    'ctrl.framework_coverage': { nb: 'Rammeverksdekning', nn: 'Rammeverkdekning' },
    'ctrl.framework': { nb: 'Rammeverk', nn: 'Rammeverk' },
    'ctrl.description': { nb: 'Beskrivelse', nn: 'Skildring' },
    'ctrl.impl_steps': { nb: 'Implementeringssteg', nn: 'Implementeringssteg' },
    'ctrl.done': { nb: 'ferdig', nn: 'ferdig' },
    'ctrl.notes': { nb: 'Notater', nn: 'Notat' },
    'ctrl.notes_placeholder': { nb: 'Dokumenter bevis, beslutninger eller implementeringsdetaljer...', nn: 'Dokumenter prov, avgjerder eller implementeringsdetaljar...' },
    'ctrl.requirement': { nb: 'Krav', nn: 'Krav' },

    // ─── Statuser ───
    'status.not_started': { nb: 'Ikke startet', nn: 'Ikkje starta' },
    'status.planning': { nb: 'Planlegging', nn: 'Planlegging' },
    'status.in_progress': { nb: 'Under arbeid', nn: 'Under arbeid' },
    'status.implemented': { nb: 'Implementert', nn: 'Implementert' },
    'status.not_applicable': { nb: 'Ikke aktuelt', nn: 'Ikkje aktuelt' },

    // ─── Domener ───
    'domain.organizational': { nb: 'Organisatoriske kontroller', nn: 'Organisatoriske kontrollar' },
    'domain.people': { nb: 'Personellkontroller', nn: 'Personellkontrollar' },
    'domain.physical': { nb: 'Fysiske kontroller', nn: 'Fysiske kontrollar' },
    'domain.technological': { nb: 'Teknologiske kontroller', nn: 'Teknologiske kontrollar' },
    'domain.organizational.short': { nb: 'Organisatorisk', nn: 'Organisatorisk' },
    'domain.people.short': { nb: 'Personell', nn: 'Personell' },
    'domain.physical.short': { nb: 'Fysisk', nn: 'Fysisk' },
    'domain.technological.short': { nb: 'Teknologisk', nn: 'Teknologisk' },

    // ─── Dokumentside ───
    'docs.title': { nb: 'ISMS-dokumenter', nn: 'ISMS-dokument' },
    'docs.complete': { nb: 'fullført', nn: 'fullført' },
    'docs.fields_completed': { nb: 'felter utfylt', nn: 'felt utfylte' },
    'docs.export_all': { nb: 'Eksporter alle dokumenter', nn: 'Eksporter alle dokument' },
    'docs.export': { nb: 'Eksporter', nn: 'Eksporter' },
    'docs.select': { nb: 'Velg et dokument fra sidepanelet.', nn: 'Vel eit dokument frå sidepanelet.' },
    'docs.standard_text': { nb: 'Standardtekst', nn: 'Standardtekst' },
    'docs.clause': { nb: 'Klausul', nn: 'Klausul' },

    // ─── Botn ───
    'footer.text': { nb: 'Ståa – ISO 27001, DORA og NIS2 styringssystem', nn: 'Ståa – ISO 27001, DORA og NIS2 styringssystem' },
    'footer.edit_org': { nb: 'Rediger organisasjonsnavn', nn: 'Rediger organisasjonsnamn' },

    // ─── Risikomodul ───
    'nav.risk': { nb: 'Risiko', nn: 'Risiko' },
    'risk.title': { nb: 'Risikovurderinger', nn: 'Risikovurderingar' },
    'risk.subtitle': { nb: 'Utfør og administrer risikoanalyser med 5×5 risikomatrise', nn: 'Utfør og administrer risikoanalysar med 5×5 risikomatrise' },
    'risk.projects': { nb: 'Prosjekter', nn: 'Prosjekt' },
    'risk.new_project': { nb: 'Nytt prosjekt', nn: 'Nytt prosjekt' },
    'risk.no_projects': { nb: 'Ingen risikovurderinger opprettet ennå. Opprett et nytt prosjekt for å starte.', nn: 'Ingen risikovurderingar oppretta enno. Opprett eit nytt prosjekt for å starte.' },
    'risk.project_name': { nb: 'Prosjektnavn', nn: 'Prosjektnamn' },
    'risk.project_desc': { nb: 'Beskrivelse (valgfri)', nn: 'Skildring (valfri)' },
    'risk.create': { nb: 'Opprett', nn: 'Opprett' },
    'risk.cancel': { nb: 'Avbryt', nn: 'Avbryt' },
    'risk.save': { nb: 'Lagre', nn: 'Lagre' },
    'risk.delete': { nb: 'Slett', nn: 'Slett' },
    'risk.back_to_projects': { nb: 'Tilbake til prosjekter', nn: 'Tilbake til prosjekt' },
    'risk.risks_count': { nb: 'risikoer', nn: 'risiko' },
    'risk.categories_count': { nb: 'kategorier', nn: 'kategoriar' },
    'risk.categories': { nb: 'Kategorier', nn: 'Kategoriar' },
    'risk.add_category': { nb: 'Ny kategori', nn: 'Ny kategori' },
    'risk.import_template': { nb: 'Importer mal', nn: 'Importer mal' },
    'risk.cat_name': { nb: 'Kategorinavn', nn: 'Kategorinamn' },
    'risk.cat_desc': { nb: 'Beskrivelse', nn: 'Skildring' },
    'risk.hide': { nb: 'Skjul kategori', nn: 'Skjul kategori' },
    'risk.show': { nb: 'Vis kategori', nn: 'Vis kategori' },
    'risk.remove': { nb: 'Fjern kategori', nn: 'Fjern kategori' },
    'risk.filter_status': { nb: 'Filtrer status', nn: 'Filtrer status' },
    'risk.all_statuses': { nb: 'Alle statuser', nn: 'Alle statusar' },
    'risk.inherent': { nb: 'Iboende risiko', nn: 'Ibuande risiko' },
    'risk.residual': { nb: 'Restrisiko', nn: 'Restrisiko' },
    'risk.total': { nb: 'Totalt', nn: 'Totalt' },
    'risk.total_score': { nb: 'Totalrisiko', nn: 'Totalrisiko' },
    'risk.matrix_title': { nb: 'Risikomatrise (Sannsynlighet × Konsekvens)', nn: 'Risikomatrise (Sannsyn × Konsekvens)' },
    'risk.k_score': { nb: 'K – Konfidensialitet', nn: 'K – Konfidensialitet' },
    'risk.i_score': { nb: 'I – Integritet', nn: 'I – Integritet' },
    'risk.t_score': { nb: 'T – Tilgjengelighet', nn: 'T – Tilgjengelegheit' },
    'risk.a_score': { nb: 'A – Autentisitet', nn: 'A – Autentisitet' },
    'risk.kita_consequence': { nb: 'KITA Konsekvensvurdering', nn: 'KITA Konsekvensvurdering' },
    'risk.consequence_computed': { nb: 'Beregnet konsekvens (Høyeste KITA)', nn: 'Utrekna konsekvens (Høgaste KITA)' },
    'risk.save_controls': { nb: 'Lagre tiltak', nn: 'Lagre tiltak' },
    'risk.controls_saved': { nb: 'Tiltak lagret!', nn: 'Tiltak lagra!' },
    'risk.change_status': { nb: 'Endre status', nn: 'Endre status' },
    'risk.critical': { nb: 'Kritisk', nn: 'Kritisk' },
    'risk.high': { nb: 'Høy', nn: 'Høg' },
    'risk.medium': { nb: 'Middels', nn: 'Middels' },
    'risk.low': { nb: 'Lav', nn: 'Låg' },
    'risk.matrix_inherent': { nb: 'Risikomatrise – Iboende risiko', nn: 'Risikomatrise – Ibuande risiko' },
    'risk.matrix_residual': { nb: 'Risikomatrise – Restrisiko', nn: 'Risikomatrise – Restrisiko' },
    'risk.likelihood': { nb: 'Sannsynlighet', nn: 'Sannsyn' },
    'risk.consequence': { nb: 'Konsekvens', nn: 'Konsekvens' },
    'risk.risk_list': { nb: 'Risikoliste', nn: 'Risikoliste' },
    'risk.add_risk': { nb: 'Legg til risiko', nn: 'Legg til risiko' },
    'risk.edit_risk': { nb: 'Rediger risiko', nn: 'Rediger risiko' },
    'risk.no_risks': { nb: 'Ingen risikoer funnet. Legg til en ny risiko for å starte.', nn: 'Ingen risiko funne. Legg til ein ny risiko for å starte.' },
    'risk.risk_name': { nb: 'Risikonavn', nn: 'Risikonamn' },
    'risk.category': { nb: 'Kategori', nn: 'Kategori' },
    'risk.inherent_score': { nb: 'Iboende', nn: 'Ibuande' },
    'risk.residual_score': { nb: 'Restrisiko', nn: 'Restrisiko' },
    'risk.status_label': { nb: 'Status', nn: 'Status' },
    'risk.description_label': { nb: 'Beskrivelse', nn: 'Skildring' },
    'risk.threat_label': { nb: 'Trusselaktør', nn: 'Trusselaktør' },
    'risk.vulnerability_label': { nb: 'Sårbarhet', nn: 'Sårbarheit' },
    'risk.owner_label': { nb: 'Risikoeier', nn: 'Risikoeiar' },
    'risk.existing_controls_label': { nb: 'Eksisterende tiltak', nn: 'Eksisterande tiltak' },
    'risk.planned_controls_label': { nb: 'Planlagte tiltak', nn: 'Planlagde tiltak' },

    // ─── Risikobank ───
    'risk.bank': { nb: 'Risikobank', nn: 'Risikobank' },
    'risk.bank_browse': { nb: 'Bla i risikobank', nn: 'Bla i risikobank' },
    'risk.bank_subtitle': { nb: 'Velg ferdigutfylte risikoer å importere til prosjektet', nn: 'Vel ferdigutfylte risiko å importere til prosjektet' },
    'risk.bank_import_selected': { nb: 'Importer valgte', nn: 'Importer valde' },
    'risk.bank_select_all': { nb: 'Velg alle', nn: 'Vel alle' },
    'risk.bank_deselect_all': { nb: 'Fjern alle valg', nn: 'Fjern alle val' },
    'risk.bank_selected': { nb: 'valgt', nn: 'valt' },
    'risk.bank_target_category': { nb: 'Importer til kategori', nn: 'Importer til kategori' },
    'risk.bank_empty': { nb: 'Alle risikoer fra denne banken er allerede importert.', nn: 'Alle risiko frå denne banken er allereie importert.' },
};



const LangContext = createContext<LangContextType>({
    lang: 'nb',
    setLang: () => { },
    t: (key: string) => key,
});

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>(() => {
        const stored = localStorage.getItem('staa_lang');
        return (stored === 'nb' || stored === 'nn') ? stored : 'nb';
    });

    const changeLang = (l: Lang) => {
        setLang(l);
        localStorage.setItem('staa_lang', l);
    };

    const t = (key: string): string => {
        return translations[key]?.[lang] || key;
    };

    return (
        <LangContext.Provider value={{ lang, setLang: changeLang, t }}>
            {children}
        </LangContext.Provider>
    );
};
