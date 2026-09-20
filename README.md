# Ståa – Styringssystem for Informasjonssikkerhet (ISMS) & Personvern

**Ståa** er et helhetlig, moderne styrings- og etterlevelsessystem utviklet for å hjelpe norske virksomheter med å kartlegge, vurdere og demonstrere samsvar med ledende sikkerhetsstandarder, regelverk og beste praksiser.

Løsningen er bygget for å fungere like godt som et internt styringsverktøy for CISO og personvernombud (DPO), som et interaktivt vurderingsverktøy for ledelse og systemeiere.

---

## 🌟 Hovedmoduler

### 1. 🛡️ Sikkerhetskontroller & Rammeverk
- **ISO/IEC 27001:2022**: Full dekning av alle 93 kontroller i Vedlegg A, organisert i de fire domenene (Organisatorisk, Personell, Fysisk og Teknologisk).
- **DORA (Digital Operational Resilience Act)**: Spesialtilpassede kontroller for finansiell og digital robusthet.
- **NIS2**: Kontroller for styring av cybersikkerhetsrisiko for kritiske og viktige virksomheter.
- **Gap-analyse & modenhetsmåling**: 5-nivås modenhetsskala (Initial til Optimalisert) med interaktiv radar-visualisering og poengberegning.

### 2. ⚡ Risikovurdering & KITA Konsekvensanalyse
- **Totalrisiko med KITA / CIA**:
  $$\text{Konsekvens} = \max(\text{Konfidensialitet}, \text{Integritet}, \text{Tilgjengelighet}, \text{Autentisitet})$$
  $$\text{Totalrisiko} = \text{Sannsynlighet} \times \text{Konsekvens} \quad (1 - 25)$$
- **5×5 Interaktiv Risikomatrise**: Dynamisk fargekodet matrise med direkte navigasjon og filtrering.
- **Innebygde Risikobanker**: Ferdige risikobanker for **OpenShift / Container-plattformer**, **SaaS-løsninger**, **Virtuelle maskiner (IaaS)**, samt **NSM Grunnprinsipper** og **Digdir**-anbefalte risikokategorier.
- **Raske tiltak**: Direkte statusoppdatering (Åpen, Mitigert, Akseptert, Lukket) og inline redigering av forebyggende og planlagte tiltak.

### 3. 🖥️ Systemoversikt & IT-arkitektur
- Komplett fortegnelse over virksomhetens IT-systemer og tjenester.
- Dokumentasjon av systemeier, teknisk ansvarlig, hostingtype (Cloud, On-prem, SaaS, Hybrid) og kritikalitetsnivå.
- Kobling mot relevante risikovurderinger og direkte propagering av data til personvernmodulen.

### 4. 🔒 Personvern & Behandlingsprotokoll (GDPR Art. 30)
- Helhetlig oversikt over virksomhetens behandlinger av personopplysninger.
- Registrering av behandlingsansvarlig, behandlingsgrunnlag (GDPR art. 6 & 9), databehandlere (DPA) og internasjonale overføringer (SCC/Tredjeland).
- Sporing av DPIA (Data Protection Impact Assessment) og vurderinger fra Personvernombud (DPO).

### 5. 📚 ISMS Dokumentbibliotek
- Sentralt dokumentarkiv for sikkerhetspolicyer, instrukser, beredskapsplaner og standarder.
- Oppfølging av revisjonsintervaller og godkjenningsstatus.

---

## 🚀 Teknologistakk

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS med CSS Custom Properties (Lys og Mørk modus)
- **Ikoner**: [Lucide React](https://lucide.dev)
- **Tilgjengelighet**: Følger WCAG 2.1 AA prinsipper for kontrast og tastaturnavigasjon
- **Språk**: Full støtte for både Bokmål (`nb`) og Nynorsk (`nn`)

---

## 🛠️ Lokal Installasjon & Utvikling

```bash
# Klon prosjektet
git clone https://github.com/thorendre/st-a.git
cd st-a

# Installer avhengigheter
npm install

# Start lokal utviklingsserver
npm run dev
```

Applikasjonen vil nå være tilgjengelig på `http://localhost:5173/`.

### Bygg for produksjon

```bash
npm run build
```

---

## 🌐 Distribusjon (GitHub Pages)

Prosjektet er konfigurert for automatisk distribusjon til GitHub Pages via GitHub Actions:
1. Gå til repositoriet på GitHub: `https://github.com/thorendre/st-a`
2. Naviger til **Settings** > **Pages**
3. Under **Build and deployment > Source**, velg **GitHub Actions**
4. Ved hver push til `main` vil appen automatisk bygges og publiseres til:
   **`https://thorendre.github.io/st-a/`**
