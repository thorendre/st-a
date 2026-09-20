# ST-A ISMS & Risikostyring: Enterprise Arkitektur & Integrasjonsstrategi

Dette dokumentet beskriver produksjonsarkitekturen, sikkerhetsrammeverket og integrasjonsstrategiene for ST-A ISMS (Informasjonssikkerhet, Risikostyring og Personvern).

---

## 1. Systemoversikt & Arkitektur

ST-A er designet som et moderne, modulært styringssystem (ISMS / GRC) for informasjonssikkerhet, personvern (GDPR), IKT-sikkerhetskrav (DORA, NIS2) og risikovurderinger basert på ISO 27001, NS 5832 og Digdirs retningslinjer.

```
                      ┌──────────────────────────────────────────────┐
                      │             Brukergrensesnitt                │
                      │   React 18 + TypeScript + Vite + Tailwind    │
                      │  (WCAG 2.1 AA · Trygghet & Innsikt-design)   │
                      └──────────────────────┬───────────────────────┘
                                             │ HTTPS / WSS
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │    Reverse Proxy / Hardened Edge Web Server  │
                      │        Nginx (Non-Root Unprivileged)         │
                      │    Port 8080 · OWASP CSP · Strict Headers    │
                      └──────────────────────┬───────────────────────┘
                                             │
             ┌───────────────────────────────┴──────────────────────────────┐
             ▼                                                              ▼
┌─────────────────────────┐                                    ┌─────────────────────────┐
│   Microsoft Entra ID    │                                    │  Atlassian Jira Cloud   │
│  (Azure AD SSO + RBAC)  │                                    │   (REST API v3 / Webhook│
│   OIDC / OAuth 2.0 PKCE │                                    │    Epics & Tiltaksoppg.)│
└─────────────────────────┘                                    └─────────────────────────┘
```

---

## 2. Docker & Containeriseringsstrategi

### 2.1 Sikkerhetsherding (Zero-Trust Container)
Tradisjonelle Nginx-containere kjører som `root` (UID 0). ST-A benytter `nginxinc/nginx-unprivileged:alpine` som kjører under en dedikert uprivilegert bruker (`nginx`, UID 101):
1. **Ingen Root-privilegier:** `no-new-privileges: true` forhindrer privilege escalation.
2. **Kompakt Multi-stage build:** Kildekode, npm-cache og byggverktøy kastes etter `npm run build`. Produksjonsimaget inneholder utelukkende statiske kompilerte filer og den herdede webserveren.
3. **Sikkerhetsheadere i `nginx.conf`:**
   - `Content-Security-Policy`: Begrenser skriptutførelse, stiler og forbindelser til godkjente endepunkter (`login.microsoftonline.com`, `*.atlassian.net`).
   - `X-Frame-Options: SAMEORIGIN`: Forhindrer Clickjacking.
   - `X-Content-Type-Options: nosniff`: Forhindrer MIME-sniffing.
   - `Referrer-Policy: strict-origin-when-cross-origin`: Skjuler sensitiv URL-sti ved eksterne oppslag.
   - `Permissions-Policy`: Deaktiverer kamera, mikrofon og geolokasjon.
4. **Healthcheck Probe:** Innebygd `/healthz` liveness- og readiness-endepunkt for Kubernetes / Docker Swarm uten loggforurensing.

### 2.2 Kjøring med Docker Compose
```bash
# Bygg og start lokalt på http://localhost:8080
docker compose up -d --build

# Sjekk container-helse
docker ps --filter "name=isms-dashboard"
```

---

## 3. Identitets- og Tilgangsstyring: Microsoft Entra ID (Azure AD SSO)

### 3.1 Autentiseringsmønster: Backend-for-Frontend (BFF) vs. MSAL SPA
For enterprise-installasjoner anbefales **Backend-for-Frontend (BFF)** mønsteret:
- **Hvorfor ikke ren frontend-tokenlagring?** Lagring av rå `access_token` eller `refresh_token` i `localStorage` eller `sessionStorage` gjør sesjonen sårbar for token-tyveri dersom et tredjepartsbibliotek kompromitteres (XSS).
- **BFF-tilnærmingen:** En lettvekts API-gateway (f.eks. Azure Container Apps EasyAuth eller Envoy/OAuth2-Proxy) håndterer OIDC-flyten mot Microsoft Entra ID. Sesjonstokens lagres i krypterte, `HttpOnly`, `SameSite=Strict`, `Secure` cookies. Frontend mottar kun en profil-payload og CSRF-beskyttet sesjon.

### 3.2 Rollebasert Tilgangsstyring (RBAC / App Roles)
I Microsoft Entra ID (Enterprise Applications -> App Roles) konfigureres følgende roller:

| Entra ID App Role | Rollebeskrivelse | Modultilgang i ST-A |
| :--- | :--- | :--- |
| `ISMS.Admin` | ISMS-administrator / IT-drift | Full tilgang til alle moduler, systeminnstillinger, revisjonslogg og modulstyring. |
| `ISMS.CISO` | Sikkerhetsleder / CISO | Godkjenning av risiko, unntak, overordnet sikkerhetsstrategi, DORA, NIS2 og ISO 27001. |
| `ISMS.DPO` | Personvernombud (DPO) | Behandlingsprotokoll (Art. 30), Leverandøroversikt & DPA (Art. 28), TIA og DPIA. |
| `ISMS.SystemOwner` | System- / Tjenesteeier | Registrering og oppdatering av egne IT-systemer, risikovurdering og tiltak for egne systemer. |
| `ISMS.Auditor` | Intern / Ekstern Revisor | Skrivebeskyttet (Read-only) tilgang til rapporter, gap-analyser og compliance-bevis. |

### 3.3 Conditional Access (Betinget Tilgang)
1. **MFA-krav:** Obligatorisk FIDO2 / Microsoft Authenticator for alle brukere.
2. **Device Compliance:** Kun godkjente bedriftsenheter (Intune-compliant eller Hybrid Entra Joined).
3. **Geoblokkering:** Kun innlogging fra Norge/EØS eller bedriftens VPN.

---

## 4. Jira Integrasjonsstrategi: Risikostyring til Tiltak

### 4.1 Formål
Risikostyring i et ISMS har liten verdi dersom tiltakene ikke blir utført i den daglige utviklingen og driften. Integrasjonen med Atlassian Jira bygger bro mellom sikkerhetsstrategi og smidig gjennomføring:
1. Et **Risikoprosjekt** i ST-A oppretter automatisk et overordnet **Jira Epic**.
2. Hvert **Planlagt tiltak** på en risiko oppretter automatisk en **Jira Task / Subtask** lenket til prosjektets Epic.
3. Statusendringer i Jira (`IN PROGRESS`, `DONE`) synkroniseres tilbake til ST-A, og oppdaterer tiltaksstatus og samlet restrisiko automatisk.

### 4.2 Arkitektur for Bi-direksjonell Synkronisering

```
[ ST-A ISMS ]                                                  [ Atlassian Jira Cloud ]
      │                                                                    │
      ├──── 1. Opprett Risikoprosjekt ────────────────────────────────────►│ POST /rest/api/3/issue
      │     (Genererer Epic: "SEC-100: Risikovurdering Skyovergang")       │ (Type: Epic)
      │◄─── Returnerer Epic Key & URL ─────────────────────────────────────┤
      │                                                                    │
      ├──── 2. Legg til Tiltak på Risiko ─────────────────────────────────►│ POST /rest/api/3/issue
      │     (Genererer Task: "SEC-101: Aktivere MFA & SSO")                │ (Parent: SEC-100)
      │◄─── Returnerer Issue Key ──────────────────────────────────────────┤
      │                                                                    │
      │                                                                    │
      │     3. Utvikler fullfører oppgave i Jira (Flytt til "Done")        │
      │◄─── Webhook: issue_updated ────────────────────────────────────────┤ (POST /api/jira/webhook)
      │     (ST-A oppdaterer status til "Mitigert" & reberegner score)     │
```

### 4.3 Data Mapping Schema

| ST-A Entitet | Jira Cloud REST v3 Felt | Eksempelverdi |
| :--- | :--- | :--- |
| `RiskProject.name` | `summary` (Epic) | `Risikovurdering - Pasientjournalsystem v2` |
| `RiskProject.description` | `description` (ADF format) | Beskrivelse, rammebetingelser og systemreferanse |
| `Risk.title` + `plannedControls` | `summary` & `description` (Task) | `Tiltak: Etablere kryptering i hvile (AES-256)` |
| `Risk.consequence` / `Risk.likelihood` | `priority` | High / Highest (Score >= 15) |
| `Risk.jiraEpicKey` | `parent` (for Tasks) / `customfield_epic` | `SEC-42` |
| `Risk.status` | `status.name` | `Åpen` -> `To Do` / `Mitigert` -> `Done` |

---

## 5. Personvern & Leverandørovervåking (GDPR Art. 28)

Leverandørmodulen i ST-A er integrert med IT-systemregisteret og personvernmodulen for å dekke kravene i GDPR Kapittel IV:
1. **Databehandleravtaler (DPA):** Sporing av signert dato, revisjonsintervall og direkte hyperlenke til avtalearkiv.
2. **Tredjelandsoverføringer (GDPR Kap. V):** Dokumentasjon av overføringsgrunnlag (EU/EØS, EU-US Data Privacy Framework, Standard Contractual Clauses - SCC).
3. **Koblede IT-systemer:** Varsling dersom et kritisk system benytter en leverandør der DPA mangler eller er under reforhandling.
4. **Sikkerhetssertifiseringer:** Verifisering av ISO 27001, SOC 2 Type II og ISO 27701.

---

## 6. Oppsummering og Anbefalt Implementasjonsplan

1. **Fase 1 (Fullført):** Klientbasert prototype med komplett WCAG 2.1 AA-redesign, modulstyring (toggle), GDPR Art. 28 leverandøroversikt og Jira-datamodell.
2. **Fase 2 (Infrastruktur):** Rulle ut `nginxinc/nginx-unprivileged` container i testmiljø med automatisk helsesjekk.
3. **Fase 3 (SSO & IdP):** Registrere ST-A i bedriftens Microsoft Entra ID-leietaker og sette opp RBAC-roller.
4. **Fase 4 (Jira Integrasjon):** Konfigurere Atlassian Connect API-nøkkel og aktivere webhook for toveis synkronisering av tiltak.
