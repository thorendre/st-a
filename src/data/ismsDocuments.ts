/**
 * ISO 27001 ISMS Document Templates
 * 
 * These represent the mandatory documented information required by ISO 27001:2022.
 * Each document has standardized sections with fields the organization fills in.
 * Completing all documents produces a complete Information Security Management System.
 */

export interface ISMSField {
    id: string;
    label: string;
    helpText: string;
    type: 'text' | 'textarea' | 'date';
    placeholder: string;
}

export interface ISMSSection {
    id: string;
    title: string;
    description: string;
    standardText?: string;  // Pre-written standard content
    fields: ISMSField[];
}

export interface ISMSDocument {
    id: string;
    clause: string;        // ISO 27001 clause reference
    title: string;
    description: string;
    sections: ISMSSection[];
}

export const ismsDocuments: ISMSDocument[] = [
    // ─── CLAUSE 4: CONTEXT ───
    {
        id: 'isms-scope',
        clause: '4.3',
        title: 'ISMS Scope',
        description: 'Defines the boundaries and applicability of the Information Security Management System.',
        sections: [
            {
                id: 'scope-org',
                title: 'Organization Overview',
                description: 'Describe the organization and its context relevant to information security.',
                fields: [
                    { id: 'scope-org-name', label: 'Organization name', helpText: 'Full legal name of the organization.', type: 'text', placeholder: 'e.g. Acme AS' },
                    { id: 'scope-org-desc', label: 'Organization description', helpText: 'Brief description of the organization, its industry, and its core activities.', type: 'textarea', placeholder: 'e.g. Acme AS is a software development company specializing in cloud-based solutions for the healthcare sector...' },
                    { id: 'scope-org-locations', label: 'Locations', helpText: 'Physical locations covered by the ISMS.', type: 'textarea', placeholder: 'e.g. Headquarters: Oslo, Norway\nDevelopment office: Bergen, Norway\nCloud infrastructure: Azure West Europe' },
                ]
            },
            {
                id: 'scope-boundary',
                title: 'Scope Boundary',
                description: 'Define what is included in and excluded from the ISMS.',
                fields: [
                    { id: 'scope-included', label: 'Included in scope', helpText: 'Business processes, departments, systems, and locations covered.', type: 'textarea', placeholder: 'e.g. All IT operations, software development, customer data processing, internal administration systems, and supporting infrastructure.' },
                    { id: 'scope-excluded', label: 'Excluded from scope (with justification)', helpText: 'Any areas explicitly excluded and why.', type: 'textarea', placeholder: 'e.g. Physical facility management is outsourced to Property Management AS and governed by separate SLA.' },
                ]
            },
            {
                id: 'scope-stakeholders',
                title: 'Interested Parties',
                description: 'Identify interested parties and their requirements relevant to the ISMS.',
                fields: [
                    { id: 'scope-stakeholders-list', label: 'Interested parties and their requirements', helpText: 'List stakeholders (customers, regulators, employees, partners) and what they require regarding information security.', type: 'textarea', placeholder: 'e.g.\n- Customers: Expect data confidentiality, GDPR compliance\n- Datatilsynet: Compliance with personvernforordningen\n- Employees: Protection of personal data\n- NSM: Compliance with grunnprinsipper for IKT-sikkerhet' },
                ]
            },
        ]
    },

    // ─── CLAUSE 5: LEADERSHIP ───
    {
        id: 'isms-policy',
        clause: '5.2',
        title: 'Information Security Policy',
        description: 'Top-level policy establishing the organization\'s commitment to information security.',
        sections: [
            {
                id: 'policy-purpose',
                title: 'Purpose and Commitment',
                description: 'State the purpose of the policy and management\'s commitment.',
                standardText: 'This policy establishes the framework for managing information security within the organization. Top management is committed to ensuring the confidentiality, integrity, and availability of all information assets.',
                fields: [
                    { id: 'policy-objectives', label: 'Security objectives', helpText: 'High-level information security objectives aligned with business strategy.', type: 'textarea', placeholder: 'e.g.\n- Protect customer data and maintain trust\n- Ensure regulatory compliance (GDPR, sector requirements)\n- Minimize risk of security incidents\n- Foster a security-aware culture' },
                ]
            },
            {
                id: 'policy-principles',
                title: 'Key Principles',
                description: 'Fundamental principles that guide information security decisions.',
                standardText: 'The organization commits to:\n• Continuously improving the ISMS and its effectiveness\n• Meeting applicable legal, regulatory, and contractual requirements\n• Providing adequate resources for information security\n• Ensuring all employees understand their responsibilities\n• Conducting regular risk assessments and applying appropriate controls',
                fields: [
                    { id: 'policy-additional', label: 'Additional organization-specific principles', helpText: 'Any additional principles specific to your organization or industry.', type: 'textarea', placeholder: 'e.g. All cloud services must be approved before use. Development follows secure SDLC practices.' },
                ]
            },
            {
                id: 'policy-approval',
                title: 'Approval and Review',
                description: 'Document approval and review cycle.',
                fields: [
                    { id: 'policy-approved-by', label: 'Approved by', helpText: 'Name and role of the person approving this policy.', type: 'text', placeholder: 'e.g. Ola Nordmann, CEO' },
                    { id: 'policy-date', label: 'Approval date', helpText: 'Date of approval.', type: 'date', placeholder: '' },
                    { id: 'policy-review', label: 'Review frequency', helpText: 'How often this policy is reviewed.', type: 'text', placeholder: 'e.g. Annually, or upon significant changes' },
                ]
            },
        ]
    },

    {
        id: 'isms-roles',
        clause: '5.3',
        title: 'Roles, Responsibilities, and Authorities',
        description: 'Defines information security roles and their responsibilities within the organization.',
        sections: [
            {
                id: 'roles-structure',
                title: 'Security Organization',
                description: 'Describe the organizational structure for information security.',
                standardText: 'Top management retains overall accountability for the ISMS. Specific roles are assigned to ensure effective implementation, monitoring, and improvement of information security.',
                fields: [
                    { id: 'roles-ciso', label: 'CISO / Security Manager', helpText: 'Who is responsible for the ISMS and what are their key responsibilities?', type: 'textarea', placeholder: 'e.g. Kari Nordmann, IT Manager\n- Overall responsibility for ISMS\n- Reports to CEO on ISMS performance\n- Coordinates risk assessments\n- Manages incident response' },
                    { id: 'roles-dpo', label: 'Data Protection Officer (DPO)', helpText: 'If applicable, who is the DPO?', type: 'textarea', placeholder: 'e.g. Per Hansen, Legal\n- Monitors GDPR compliance\n- Advises on data protection impact assessments\n- Contact point for Datatilsynet' },
                    { id: 'roles-it', label: 'IT Operations / System Administration', helpText: 'Who is responsible for day-to-day IT security operations?', type: 'textarea', placeholder: 'e.g. IT team (3 persons)\n- Patch management\n- Access control administration\n- Backup and recovery\n- Monitoring and logging' },
                    { id: 'roles-other', label: 'Other roles', helpText: 'Any other key security roles (security champions, incident responders, asset owners, etc.).', type: 'textarea', placeholder: 'e.g.\n- Department managers: Asset owners for their area\n- All employees: Report security incidents, follow policies' },
                ]
            },
        ]
    },

    // ─── CLAUSE 6: PLANNING ───
    {
        id: 'isms-risk-process',
        clause: '6.1.2',
        title: 'Risk Assessment Process',
        description: 'Defines how the organization identifies, analyzes, and evaluates information security risks.',
        sections: [
            {
                id: 'risk-methodology',
                title: 'Risk Assessment Methodology',
                description: 'Describe the approach and criteria for assessing risks.',
                standardText: 'The organization uses a structured risk assessment methodology that considers the likelihood and impact of threats exploiting vulnerabilities in information assets.',
                fields: [
                    { id: 'risk-approach', label: 'Risk assessment approach', helpText: 'Describe your method: qualitative, quantitative, or hybrid. What matrix/scale do you use?', type: 'textarea', placeholder: 'e.g. We use a qualitative 5x5 risk matrix.\nLikelihood: 1 (Rare) to 5 (Almost certain)\nImpact: 1 (Negligible) to 5 (Critical)\nRisk = Likelihood × Impact\nRisks ≥ 12 require treatment.' },
                    { id: 'risk-frequency', label: 'Assessment frequency', helpText: 'How often are risk assessments conducted?', type: 'text', placeholder: 'e.g. Annually, and upon significant changes to scope, systems, or threat landscape' },
                    { id: 'risk-owner', label: 'Risk assessment owner', helpText: 'Who is responsible for conducting risk assessments?', type: 'text', placeholder: 'e.g. CISO, with support from department managers' },
                ]
            },
            {
                id: 'risk-criteria',
                title: 'Risk Acceptance Criteria',
                description: 'Define when a risk is acceptable and when it must be treated.',
                fields: [
                    { id: 'risk-accept', label: 'Risk acceptance criteria', helpText: 'Define the threshold for risk acceptance. Risks above this threshold must be treated.', type: 'textarea', placeholder: 'e.g.\n- Low risk (1-5): Accept – monitor during regular reviews\n- Medium risk (6-11): Accept with documented justification from asset owner\n- High risk (12-19): Treat – requires risk treatment plan\n- Critical risk (20-25): Treat immediately – escalate to management' },
                ]
            },
        ]
    },

    {
        id: 'isms-risk-treatment',
        clause: '6.1.3',
        title: 'Risk Treatment Plan',
        description: 'Documents how identified risks are treated and which controls are selected.',
        sections: [
            {
                id: 'treatment-options',
                title: 'Treatment Options',
                description: 'How the organization selects treatment options for risks.',
                standardText: 'For each risk requiring treatment, the organization selects one or more options:\n• Modify the risk by applying controls (from ISO 27001 Annex A or other sources)\n• Avoid the risk by eliminating the activity or condition\n• Share the risk through insurance or outsourcing\n• Retain the risk with documented acceptance by the risk owner',
                fields: [
                    { id: 'treatment-process', label: 'Treatment decision process', helpText: 'Who approves risk treatment decisions? What documentation is required?', type: 'textarea', placeholder: 'e.g. Risk treatment plans are proposed by the CISO and approved by the management team. Each plan documents: the risk, selected treatment option, controls to implement, responsible person, timeline, and expected residual risk.' },
                ]
            },
            {
                id: 'treatment-register',
                title: 'Risk Register',
                description: 'Where risks and treatment plans are tracked.',
                fields: [
                    { id: 'treatment-tool', label: 'Risk register location/tool', helpText: 'Where is the risk register maintained?', type: 'text', placeholder: 'e.g. SharePoint document library / Dedicated GRC tool / This dashboard' },
                    { id: 'treatment-review', label: 'Risk register review frequency', helpText: 'How often is the risk register reviewed and updated?', type: 'text', placeholder: 'e.g. Quarterly by CISO, annually during management review' },
                ]
            },
        ]
    },

    {
        id: 'isms-soa',
        clause: '6.1.3 d)',
        title: 'Statement of Applicability (SoA)',
        description: 'Lists all ISO 27001 Annex A controls and documents whether each is applicable, with justification.',
        sections: [
            {
                id: 'soa-approach',
                title: 'Approach',
                description: 'How the Statement of Applicability is managed.',
                standardText: 'The Statement of Applicability (SoA) lists all 93 controls from ISO 27001:2022 Annex A. For each control, it documents whether the control is applicable, the justification for inclusion or exclusion, and the implementation status. The SoA is maintained in the Controls tab of this tool.',
                fields: [
                    { id: 'soa-note', label: 'Additional SoA notes', helpText: 'Any additional notes about how you manage the SoA. Note: The Controls tab serves as your living SoA.', type: 'textarea', placeholder: 'e.g. The SoA is reviewed annually as part of the management review. Controls marked "Not Applicable" require documented justification.' },
                ]
            },
        ]
    },

    {
        id: 'isms-objectives',
        clause: '6.2',
        title: 'Information Security Objectives',
        description: 'Measurable information security objectives aligned with the security policy.',
        sections: [
            {
                id: 'obj-list',
                title: 'Security Objectives',
                description: 'Define measurable objectives for the ISMS.',
                fields: [
                    { id: 'obj-1', label: 'Objective 1', helpText: 'Define a specific, measurable security objective.', type: 'textarea', placeholder: 'e.g. Achieve 100% of critical patches applied within 7 days of release.\nMeasured by: Monthly patch compliance report\nResponsible: IT Operations\nTarget date: Ongoing' },
                    { id: 'obj-2', label: 'Objective 2', helpText: 'Define another objective.', type: 'textarea', placeholder: 'e.g. Complete security awareness training for 100% of employees annually.\nMeasured by: Training completion records in HR system\nResponsible: CISO\nTarget date: Q4 each year' },
                    { id: 'obj-3', label: 'Objective 3', helpText: 'Define another objective.', type: 'textarea', placeholder: 'e.g. Reduce mean time to detect (MTTD) security incidents to under 24 hours.\nMeasured by: Incident response metrics\nResponsible: IT Operations\nTarget date: Within 12 months' },
                    { id: 'obj-4', label: 'Objective 4 (optional)', helpText: 'Additional objective if needed.', type: 'textarea', placeholder: '' },
                ]
            },
        ]
    },

    // ─── CLAUSE 7: SUPPORT ───
    {
        id: 'isms-competence',
        clause: '7.2',
        title: 'Competence and Training',
        description: 'How the organization ensures personnel have the necessary competence for information security.',
        sections: [
            {
                id: 'comp-requirements',
                title: 'Competence Requirements',
                description: 'Define competence requirements for key security roles.',
                fields: [
                    { id: 'comp-general', label: 'General security competence', helpText: 'What level of security awareness is required for all employees?', type: 'textarea', placeholder: 'e.g. All employees must complete annual security awareness training covering:\n- Phishing recognition\n- Password hygiene\n- Data classification and handling\n- Incident reporting procedures' },
                    { id: 'comp-specialized', label: 'Specialized competence', helpText: 'What specialized training is required for IT, security, and management roles?', type: 'textarea', placeholder: 'e.g.\n- IT staff: Secure configuration, vulnerability management\n- Developers: Secure coding practices (OWASP Top 10)\n- CISO: ISO 27001 Lead Implementer certification\n- Management: Security governance and risk management' },
                ]
            },
            {
                id: 'comp-program',
                title: 'Training Program',
                description: 'How training is delivered and tracked.',
                fields: [
                    { id: 'comp-delivery', label: 'Training delivery method', helpText: 'How is training delivered?', type: 'textarea', placeholder: 'e.g. Online e-learning platform (KnowBe4), supplemented with quarterly workshops and phishing simulations.' },
                    { id: 'comp-tracking', label: 'Training records', helpText: 'How are training records maintained?', type: 'text', placeholder: 'e.g. HR system tracks completion. Reports reviewed quarterly by CISO.' },
                ]
            },
        ]
    },

    {
        id: 'isms-communication',
        clause: '7.4',
        title: 'Communication Plan',
        description: 'Defines what, when, and how information security is communicated internally and externally.',
        sections: [
            {
                id: 'comm-plan',
                title: 'Communication Plan',
                description: 'Define the communication approach for information security.',
                fields: [
                    { id: 'comm-internal', label: 'Internal communication', helpText: 'How is security information communicated internally? (policies, incidents, changes)', type: 'textarea', placeholder: 'e.g.\n- Security policies: Published on intranet, communicated during onboarding\n- Security incidents: Email notification to affected parties, status in Slack channel\n- ISMS updates: Quarterly newsletter from CISO\n- Risk assessment results: Presented at management meetings' },
                    { id: 'comm-external', label: 'External communication', helpText: 'How is security information communicated externally? (customers, authorities, partners)', type: 'textarea', placeholder: 'e.g.\n- Data breaches: Notified to Datatilsynet within 72 hours per GDPR Art. 33\n- Customer inquiries: Handled by security team with standard responses\n- Certifications: Published on website\n- Vendor security: Communicated through procurement process' },
                ]
            },
        ]
    },

    {
        id: 'isms-doc-control',
        clause: '7.5',
        title: 'Document Control',
        description: 'How documented information within the ISMS is managed, stored, and controlled.',
        sections: [
            {
                id: 'docctrl-process',
                title: 'Document Management',
                description: 'Define how ISMS documents are controlled.',
                standardText: 'All documented information required by the ISMS shall be properly identified, stored, protected, and subject to version control. Documents must be reviewed and approved before distribution.',
                fields: [
                    { id: 'docctrl-storage', label: 'Document storage', helpText: 'Where are ISMS documents stored?', type: 'textarea', placeholder: 'e.g. All ISMS documents are stored in SharePoint under /ISMS/. Access is restricted to authorized personnel. This tool serves as the operational dashboard.' },
                    { id: 'docctrl-versioning', label: 'Version control', helpText: 'How are document versions managed?', type: 'text', placeholder: 'e.g. SharePoint versioning with major version numbers. Change log maintained in each document.' },
                    { id: 'docctrl-retention', label: 'Retention period', helpText: 'How long are ISMS records retained?', type: 'text', placeholder: 'e.g. Minimum 3 years, or as required by regulatory obligations' },
                ]
            },
        ]
    },

    // ─── CLAUSE 9: EVALUATION ───
    {
        id: 'isms-monitoring',
        clause: '9.1',
        title: 'Monitoring, Measurement, and Evaluation',
        description: 'Defines what the organization monitors and measures to evaluate ISMS effectiveness.',
        sections: [
            {
                id: 'mon-metrics',
                title: 'Security Metrics',
                description: 'Define what is measured and how.',
                fields: [
                    { id: 'mon-kpis', label: 'Key performance indicators (KPIs)', helpText: 'List the security metrics you track and how they are measured.', type: 'textarea', placeholder: 'e.g.\n- Patch compliance rate (% of systems patched within SLA)\n- Security awareness training completion rate\n- Number of security incidents per quarter\n- Mean time to detect / respond to incidents\n- Percentage of controls implemented (from SoA)\n- Number of open high/critical risks' },
                    { id: 'mon-reporting', label: 'Reporting frequency and audience', helpText: 'How often are metrics reported and to whom?', type: 'textarea', placeholder: 'e.g. Monthly: CISO dashboard reviewed by IT management\nQuarterly: Security report to executive management\nAnnually: Comprehensive ISMS performance report for management review' },
                ]
            },
        ]
    },

    {
        id: 'isms-internal-audit',
        clause: '9.2',
        title: 'Internal Audit Program',
        description: 'Plan and process for conducting internal audits of the ISMS.',
        sections: [
            {
                id: 'audit-program',
                title: 'Audit Program',
                description: 'Define the internal audit approach.',
                fields: [
                    { id: 'audit-frequency', label: 'Audit frequency', helpText: 'How often are internal ISMS audits conducted?', type: 'text', placeholder: 'e.g. Full ISMS audit annually, with targeted audits of high-risk areas semi-annually' },
                    { id: 'audit-scope', label: 'Audit scope and plan', helpText: 'How is the audit scope determined? Who conducts audits?', type: 'textarea', placeholder: 'e.g. Audit scope covers all ISMS clauses and applicable Annex A controls over a 12-month cycle. Audits are conducted by qualified internal auditors who are independent of the area being audited. External auditors may be engaged for certification audits.' },
                    { id: 'audit-findings', label: 'Findings management', helpText: 'How are audit findings tracked and resolved?', type: 'textarea', placeholder: 'e.g. Findings are classified as Major NC, Minor NC, or Observation. All nonconformities require a corrective action plan with owner and deadline. Status tracked in this tool and reviewed at management meetings.' },
                ]
            },
        ]
    },

    {
        id: 'isms-mgmt-review',
        clause: '9.3',
        title: 'Management Review',
        description: 'Process for top management to review the ISMS at planned intervals.',
        sections: [
            {
                id: 'mgmtrev-process',
                title: 'Management Review Process',
                description: 'Define how management reviews are conducted.',
                standardText: 'Top management reviews the ISMS at planned intervals to ensure its continuing suitability, adequacy, and effectiveness.',
                fields: [
                    { id: 'mgmtrev-frequency', label: 'Review frequency', helpText: 'How often are management reviews held?', type: 'text', placeholder: 'e.g. Annually in Q1, with ad-hoc reviews if significant changes occur' },
                    { id: 'mgmtrev-inputs', label: 'Review inputs', helpText: 'What information is reviewed?', type: 'textarea', placeholder: 'e.g.\n- Status of actions from previous reviews\n- Changes in internal/external issues\n- ISMS performance metrics and trends\n- Audit results and nonconformities\n- Risk assessment and treatment status\n- Opportunities for improvement\n- Feedback from interested parties' },
                    { id: 'mgmtrev-participants', label: 'Participants', helpText: 'Who participates in the management review?', type: 'textarea', placeholder: 'e.g. CEO, CTO, CISO, Department managers, DPO' },
                ]
            },
        ]
    },

    // ─── CLAUSE 10: IMPROVEMENT ───
    {
        id: 'isms-incident-nc',
        clause: '10.1 / 10.2',
        title: 'Incident Management and Corrective Action',
        description: 'Process for managing security incidents and nonconformities, including corrective actions.',
        sections: [
            {
                id: 'incident-process',
                title: 'Incident Management Process',
                description: 'Define how security incidents are handled.',
                fields: [
                    { id: 'incident-reporting', label: 'Incident reporting', helpText: 'How do employees report security incidents? What channels are available?', type: 'textarea', placeholder: 'e.g. Employees report incidents via:\n- Email to security@company.com\n- Slack channel #security-incidents\n- Phone to CISO for urgent matters\n- Anonymous tip form on intranet' },
                    { id: 'incident-classification', label: 'Incident classification', helpText: 'How are incidents classified by severity?', type: 'textarea', placeholder: 'e.g.\n- Critical: Data breach, ransomware, system compromise\n- High: Successful phishing, unauthorized access attempt\n- Medium: Policy violation, suspicious activity\n- Low: Failed login attempts, spam' },
                    { id: 'incident-response', label: 'Response process', helpText: 'Steps taken when an incident is reported.', type: 'textarea', placeholder: 'e.g.\n1. Triage and classify severity\n2. Contain the incident\n3. Investigate root cause\n4. Eradicate and recover\n5. Document lessons learned\n6. Report to authorities if required (Datatilsynet within 72h for data breaches)' },
                ]
            },
            {
                id: 'nc-corrective',
                title: 'Corrective Action Process',
                description: 'How nonconformities are addressed.',
                standardText: 'When a nonconformity is identified (through incidents, audits, or monitoring), the organization takes corrective action to eliminate the cause and prevent recurrence.',
                fields: [
                    { id: 'nc-process', label: 'Corrective action process', helpText: 'How are root causes identified and corrective actions tracked?', type: 'textarea', placeholder: 'e.g. Root cause analysis using 5-Why method. Corrective actions documented with owner, deadline, and verification criteria. Tracked in action log and reviewed monthly by CISO.' },
                ]
            },
        ]
    },

    {
        id: 'isms-continual-improvement',
        clause: '10.2',
        title: 'Continual Improvement',
        description: 'How the organization continually improves the suitability, adequacy, and effectiveness of the ISMS.',
        sections: [
            {
                id: 'improvement-approach',
                title: 'Improvement Process',
                description: 'Define how the ISMS is continually improved.',
                standardText: 'The organization is committed to continually improving the ISMS through the use of corrective actions, management reviews, audits, risk assessments, and monitoring of security objectives.',
                fields: [
                    { id: 'improvement-sources', label: 'Sources of improvement', helpText: 'What inputs drive improvement? How are improvement opportunities captured?', type: 'textarea', placeholder: 'e.g.\n- Management review decisions\n- Internal and external audit findings\n- Incident lessons learned\n- Risk assessment updates\n- Benchmark against industry best practices\n- Employee feedback and suggestions\n- Changes in threat landscape' },
                    { id: 'improvement-tracking', label: 'How improvements are tracked', helpText: 'How do you track and verify improvements?', type: 'textarea', placeholder: 'e.g. Improvement actions are logged in the ISMS action register with owner, target date, and completion status. Effectiveness is verified at the next management review.' },
                ]
            },
        ]
    },
];
