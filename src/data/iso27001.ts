import { ISOControl } from '../types';

export const isoDomains = [
    'Organizational controls',
    'People controls',
    'Physical controls',
    'Technological controls',
] as const;

export const iso27001Controls: ISOControl[] = [
    // ═══ A.5 ORGANIZATIONAL CONTROLS (37 controls) ═══
    {
        id: 'A.5.1', domain: 'Organizational controls', title: 'Policies for information security', description: 'Information security policy and topic-specific policies shall be defined, approved by management, published, communicated to and acknowledged by relevant personnel and relevant interested parties, and reviewed at planned intervals and if significant changes occur.', mappedNistIds: ['GV.PO'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.1-1', title: 'Draft a top-level information security policy', description: 'Create the master document defining goals, scope, and commitment.' },
            { id: 'A.5.1-2', title: 'Define topic-specific policies', description: 'Create supporting policies for access control, data classification, acceptable use, etc.' },
            { id: 'A.5.1-3', title: 'Obtain management approval', description: 'Present policies to top management for formal review and sign-off.' },
            { id: 'A.5.1-4', title: 'Publish and communicate', description: 'Distribute via intranet, email, or training and collect acknowledgements.' },
            { id: 'A.5.1-5', title: 'Schedule periodic reviews', description: 'Set a review frequency (e.g. annual) and assign a responsible person.' },
        ]
    },
    {
        id: 'A.5.2', domain: 'Organizational controls', title: 'Information security roles and responsibilities', description: 'Information security roles and responsibilities shall be defined and allocated.', mappedNistIds: ['GV.RR'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.2-1', title: 'Identify key security roles', description: 'Define roles such as CISO, DPO, security contacts, and incident handlers.' },
            { id: 'A.5.2-2', title: 'Document responsibilities per role', description: 'Create a RACI matrix or role descriptions.' },
            { id: 'A.5.2-3', title: 'Assign roles to personnel', description: 'Formally appoint people and communicate their responsibilities.' },
        ]
    },
    {
        id: 'A.5.3', domain: 'Organizational controls', title: 'Segregation of duties', description: 'Conflicting duties and conflicting areas of responsibility shall be segregated.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['2.3'], guidance: [
            { id: 'A.5.3-1', title: 'Identify conflicting duties', description: 'Map critical processes and identify where one person performing multiple functions creates risk.' },
            { id: 'A.5.3-2', title: 'Implement separation', description: 'Ensure no one can control all aspects of a critical transaction without independent oversight.' },
        ]
    },
    {
        id: 'A.5.4', domain: 'Organizational controls', title: 'Management responsibilities', description: 'Management shall require all personnel to apply information security in accordance with the established information security policy and topic-specific policies and procedures of the organization.', mappedNistIds: ['GV.RR'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.4-1', title: 'Management commitment', description: 'Ensure management visibly supports and communicates the importance of information security.' },
            { id: 'A.5.4-2', title: 'Integrate into employment agreements', description: 'Include security responsibilities in contracts, job descriptions, and onboarding.' },
        ]
    },
    {
        id: 'A.5.5', domain: 'Organizational controls', title: 'Contact with authorities', description: 'The organization shall establish and maintain contact with relevant authorities.', mappedNistIds: ['RS.CO'], mappedNsmIds: ['4.2'], guidance: [
            { id: 'A.5.5-1', title: 'Identify relevant authorities', description: 'List supervisory bodies, police, CERT/CSIRT, and sector-specific agencies.' },
            { id: 'A.5.5-2', title: 'Establish contact procedures', description: 'Define when and how to contact each authority.' },
        ]
    },
    {
        id: 'A.5.6', domain: 'Organizational controls', title: 'Contact with special interest groups', description: 'The organization shall establish and maintain contact with special interest groups or other specialist security forums and professional associations.', mappedNistIds: ['ID.IM'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.6-1', title: 'Identify relevant groups', description: 'Join industry ISACs, security forums, and professional bodies.' },
            { id: 'A.5.6-2', title: 'Participate actively', description: 'Attend meetings, subscribe to feeds, and share intelligence where appropriate.' },
        ]
    },
    {
        id: 'A.5.7', domain: 'Organizational controls', title: 'Threat intelligence', description: 'Information relating to information security threats shall be collected and analysed to produce threat intelligence.', mappedNistIds: ['ID.RA'], mappedNsmIds: ['2.6'], guidance: [
            { id: 'A.5.7-1', title: 'Subscribe to threat sources', description: 'Establish subscriptions to relevant threat intelligence sources.' },
            { id: 'A.5.7-2', title: 'Analyse and contextualise threats', description: 'Evaluate threat information against organizational assets and risk appetite.' },
        ]
    },
    {
        id: 'A.5.8', domain: 'Organizational controls', title: 'Information security in project management', description: 'Information security shall be integrated into project management.', mappedNistIds: ['GV.PO'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.8-1', title: 'Add security to project methodology', description: 'Include security checkpoints in the project framework.' },
            { id: 'A.5.8-2', title: 'Conduct security risk assessments', description: 'Require risk assessment at project start and key milestones.' },
        ]
    },
    {
        id: 'A.5.9', domain: 'Organizational controls', title: 'Inventory of information and other associated assets', description: 'An inventory of information and other associated assets, including owners, shall be developed and maintained.', mappedNistIds: ['ID.AM'], mappedNsmIds: ['2.2'], guidance: [
            { id: 'A.5.9-1', title: 'Create asset inventory', description: 'List all information assets, hardware, software, and services.' },
            { id: 'A.5.9-2', title: 'Assign owners', description: 'Designate an owner for each asset responsible for its protection.' },
        ]
    },
    {
        id: 'A.5.10', domain: 'Organizational controls', title: 'Acceptable use of information and other associated assets', description: 'Rules for the acceptable use of information and other associated assets shall be identified, documented and implemented.', mappedNistIds: ['GV.PO'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.10-1', title: 'Define acceptable use policy', description: 'Document rules for using organizational assets, internet, email, and personal devices.' },
            { id: 'A.5.10-2', title: 'Communicate to all users', description: 'Distribute policy and obtain acknowledgement from all employees and contractors.' },
        ]
    },
    {
        id: 'A.5.11', domain: 'Organizational controls', title: 'Return of assets', description: 'Personnel and other interested parties as appropriate shall return all the organization\'s assets in their possession upon change or termination of their employment, contract or agreement.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['2.3'], guidance: [
            { id: 'A.5.11-1', title: 'Define return procedures', description: 'Create a checklist for asset return during offboarding.' },
            { id: 'A.5.11-2', title: 'Track and verify returns', description: 'Ensure all equipment, keys, and access tokens are returned and logged.' },
        ]
    },
    {
        id: 'A.5.12', domain: 'Organizational controls', title: 'Classification of information', description: 'Information shall be classified according to the information security needs of the organization based on confidentiality, integrity, availability and relevant interested party requirements.', mappedNistIds: ['ID.AM'], mappedNsmIds: ['2.2'], guidance: [
            { id: 'A.5.12-1', title: 'Define classification scheme', description: 'Establish levels such as Public, Internal, Confidential, Strictly Confidential.' },
            { id: 'A.5.12-2', title: 'Create classification guidelines', description: 'Document how to classify different types of information.' },
        ]
    },
    {
        id: 'A.5.13', domain: 'Organizational controls', title: 'Labelling of information', description: 'An appropriate set of procedures for information labelling shall be developed and implemented in accordance with the information classification scheme adopted by the organization.', mappedNistIds: ['ID.AM'], mappedNsmIds: ['2.2'], guidance: [
            { id: 'A.5.13-1', title: 'Define labelling procedures', description: 'Specify how documents, emails, and media should be marked with classification labels.' },
        ]
    },
    {
        id: 'A.5.14', domain: 'Organizational controls', title: 'Information transfer', description: 'Information transfer rules, procedures, or agreements shall be in place for all types of transfer facilities within the organization and between the organization and other parties.', mappedNistIds: ['PR.DS'], mappedNsmIds: ['2.4'], guidance: [
            { id: 'A.5.14-1', title: 'Define transfer rules', description: 'Establish procedures for secure file transfer, email, and physical media handling.' },
            { id: 'A.5.14-2', title: 'Set up secure channels', description: 'Implement encryption for data in transit (TLS, SFTP, VPN).' },
        ]
    },
    {
        id: 'A.5.15', domain: 'Organizational controls', title: 'Access control', description: 'Rules to control physical and logical access to information and other associated assets shall be established and implemented based on business and information security requirements.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['2.3'], guidance: [
            { id: 'A.5.15-1', title: 'Define access control policy', description: 'Establish rules for granting, modifying, and revoking access.' },
            { id: 'A.5.15-2', title: 'Implement least privilege', description: 'Ensure users only have access necessary for their role.' },
        ]
    },
    {
        id: 'A.5.16', domain: 'Organizational controls', title: 'Identity management', description: 'The full life cycle of identities shall be managed.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['2.3'], guidance: [
            { id: 'A.5.16-1', title: 'Manage identity lifecycle', description: 'Define processes for creating, modifying, disabling, and deleting user accounts.' },
        ]
    },
    {
        id: 'A.5.17', domain: 'Organizational controls', title: 'Authentication information', description: 'Allocation and management of authentication information shall be controlled by a management process including advising personnel on appropriate handling of authentication information.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['2.3'], guidance: [
            { id: 'A.5.17-1', title: 'Define password/credential policy', description: 'Establish rules for password complexity, MFA, and credential storage.' },
        ]
    },
    {
        id: 'A.5.18', domain: 'Organizational controls', title: 'Access rights', description: 'Access rights to information and other associated assets shall be provisioned, reviewed, modified and removed in accordance with the organization\'s topic-specific policy on and rules for access control.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['2.3'], guidance: [
            { id: 'A.5.18-1', title: 'Implement access provisioning process', description: 'Create formal request/approval workflows for access rights.' },
            { id: 'A.5.18-2', title: 'Conduct periodic access reviews', description: 'Review access rights at least annually and upon role changes.' },
        ]
    },
    {
        id: 'A.5.19', domain: 'Organizational controls', title: 'Information security in supplier relationships', description: 'Processes and procedures shall be defined and implemented to manage the information security risks associated with the use of supplier\'s products or services.', mappedNistIds: ['GV.SC'], mappedNsmIds: ['2.5'], guidance: [
            { id: 'A.5.19-1', title: 'Define supplier security requirements', description: 'Establish minimum security requirements for suppliers and include in contracts.' },
        ]
    },
    {
        id: 'A.5.20', domain: 'Organizational controls', title: 'Addressing information security within supplier agreements', description: 'Relevant information security requirements shall be established and agreed with each supplier based on the type of supplier relationship.', mappedNistIds: ['GV.SC'], mappedNsmIds: ['2.5'], guidance: [
            { id: 'A.5.20-1', title: 'Include security clauses in contracts', description: 'Add NDA, data handling, incident notification, and audit rights to supplier agreements.' },
        ]
    },
    {
        id: 'A.5.21', domain: 'Organizational controls', title: 'Managing information security in the ICT supply chain', description: 'Processes and procedures shall be defined and implemented to manage the information security risks associated with the ICT products and services supply chain.', mappedNistIds: ['GV.SC'], mappedNsmIds: ['2.5'], guidance: [
            { id: 'A.5.21-1', title: 'Assess supply chain risks', description: 'Evaluate risks in the ICT supply chain including software components and services.' },
        ]
    },
    {
        id: 'A.5.22', domain: 'Organizational controls', title: 'Monitoring, review and change management of supplier services', description: 'The organization shall regularly monitor, review, evaluate and manage change in supplier information security practices and service delivery.', mappedNistIds: ['GV.SC'], mappedNsmIds: ['2.5'], guidance: [
            { id: 'A.5.22-1', title: 'Monitor supplier performance', description: 'Regularly review supplier security posture and compliance with agreements.' },
        ]
    },
    {
        id: 'A.5.23', domain: 'Organizational controls', title: 'Information security for use of cloud services', description: 'Processes for acquisition, use, management and exit from cloud services shall be established in accordance with the organization\'s information security requirements.', mappedNistIds: ['GV.SC'], mappedNsmIds: ['2.5'], guidance: [
            { id: 'A.5.23-1', title: 'Define cloud security policy', description: 'Establish policy for acceptable cloud use and approved providers.' },
            { id: 'A.5.23-2', title: 'Assess cloud providers', description: 'Evaluate certifications, data location, and contractual obligations.' },
        ]
    },
    {
        id: 'A.5.24', domain: 'Organizational controls', title: 'Information security incident management planning and preparation', description: 'The organization shall plan and prepare for managing information security incidents by defining, establishing and communicating information security incident management processes, roles and responsibilities.', mappedNistIds: ['RS.MA'], mappedNsmIds: ['4.1'], guidance: [
            { id: 'A.5.24-1', title: 'Develop incident response plan', description: 'Create an incident response plan with roles, procedures, and escalation paths.' },
            { id: 'A.5.24-2', title: 'Test the plan regularly', description: 'Conduct tabletop exercises and simulations at least annually.' },
        ]
    },
    {
        id: 'A.5.25', domain: 'Organizational controls', title: 'Assessment and decision on information security events', description: 'The organization shall assess information security events and decide if they are to be categorized as information security incidents.', mappedNistIds: ['DE.AE'], mappedNsmIds: ['3.4'], guidance: [
            { id: 'A.5.25-1', title: 'Define event classification criteria', description: 'Create criteria for categorizing security events vs. incidents.' },
        ]
    },
    {
        id: 'A.5.26', domain: 'Organizational controls', title: 'Response to information security incidents', description: 'Information security incidents shall be responded to in accordance with the documented procedures.', mappedNistIds: ['RS.MA'], mappedNsmIds: ['4.1'], guidance: [
            { id: 'A.5.26-1', title: 'Execute response procedures', description: 'Follow documented containment, eradication, and recovery steps.' },
        ]
    },
    {
        id: 'A.5.27', domain: 'Organizational controls', title: 'Learning from information security incidents', description: 'Knowledge gained from information security incidents shall be used to strengthen and improve the information security controls.', mappedNistIds: ['ID.IM'], mappedNsmIds: ['4.3'], guidance: [
            { id: 'A.5.27-1', title: 'Conduct post-incident reviews', description: 'Perform lessons-learned analysis after every significant incident.' },
        ]
    },
    {
        id: 'A.5.28', domain: 'Organizational controls', title: 'Collection of evidence', description: 'The organization shall establish and implement procedures for the identification, collection, acquisition and preservation of evidence related to information security events.', mappedNistIds: ['RS.MA'], mappedNsmIds: ['4.1'], guidance: [
            { id: 'A.5.28-1', title: 'Define evidence collection procedures', description: 'Establish chain-of-custody and forensic evidence handling processes.' },
        ]
    },
    {
        id: 'A.5.29', domain: 'Organizational controls', title: 'Information security during disruption', description: 'The organization shall plan how to maintain information security at an appropriate level during disruption.', mappedNistIds: ['RC.RP'], mappedNsmIds: ['4.4'], guidance: [
            { id: 'A.5.29-1', title: 'Include security in BCP', description: 'Ensure business continuity plans address information security requirements.' },
        ]
    },
    {
        id: 'A.5.30', domain: 'Organizational controls', title: 'ICT readiness for business continuity', description: 'ICT readiness shall be planned, implemented, maintained and tested based on business continuity objectives and ICT continuity requirements.', mappedNistIds: ['RC.RP'], mappedNsmIds: ['4.4'], guidance: [
            { id: 'A.5.30-1', title: 'Develop ICT continuity plans', description: 'Define recovery objectives (RPO/RTO) and test backup/restore procedures.' },
        ]
    },
    {
        id: 'A.5.31', domain: 'Organizational controls', title: 'Legal, statutory, regulatory and contractual requirements', description: 'Legal, statutory, regulatory and contractual requirements relevant to information security and the organization\'s approach to meet these requirements shall be identified, documented and kept up to date.', mappedNistIds: ['GV.OC'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.31-1', title: 'Maintain compliance register', description: 'Identify and track all applicable legal and regulatory requirements.' },
        ]
    },
    {
        id: 'A.5.32', domain: 'Organizational controls', title: 'Intellectual property rights', description: 'The organization shall implement appropriate procedures to protect intellectual property rights.', mappedNistIds: ['GV.OC'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.32-1', title: 'Identify IP assets', description: 'Catalogue intellectual property and ensure proper licensing compliance.' },
        ]
    },
    {
        id: 'A.5.33', domain: 'Organizational controls', title: 'Protection of records', description: 'Records shall be protected from loss, destruction, falsification, unauthorized access and unauthorized release.', mappedNistIds: ['PR.DS'], mappedNsmIds: ['2.4'], guidance: [
            { id: 'A.5.33-1', title: 'Define records management', description: 'Establish retention periods, storage, and protection requirements for records.' },
        ]
    },
    {
        id: 'A.5.34', domain: 'Organizational controls', title: 'Privacy and protection of PII', description: 'The organization shall identify and meet the requirements regarding the preservation of privacy and protection of PII as applicable.', mappedNistIds: ['PR.DS'], mappedNsmIds: ['2.4'], guidance: [
            { id: 'A.5.34-1', title: 'Implement privacy controls', description: 'Establish GDPR compliance measures including DPIAs and data subject rights processes.' },
        ]
    },
    {
        id: 'A.5.35', domain: 'Organizational controls', title: 'Independent review of information security', description: 'The organization\'s approach to managing information security and its implementation including people, processes and technologies shall be reviewed independently at planned intervals, or when significant changes occur.', mappedNistIds: ['ID.IM'], mappedNsmIds: ['2.7'], guidance: [
            { id: 'A.5.35-1', title: 'Schedule independent reviews', description: 'Plan periodic independent reviews or audits of the ISMS.' },
        ]
    },
    {
        id: 'A.5.36', domain: 'Organizational controls', title: 'Compliance with policies, rules and standards for information security', description: 'Compliance with the organization\'s established information security policy, topic-specific policies, rules and standards shall be regularly reviewed.', mappedNistIds: ['ID.IM'], mappedNsmIds: ['2.7'], guidance: [
            { id: 'A.5.36-1', title: 'Conduct compliance checks', description: 'Regularly verify that operations comply with security policies.' },
        ]
    },
    {
        id: 'A.5.37', domain: 'Organizational controls', title: 'Documented operating procedures', description: 'Operating procedures for information processing facilities shall be documented and made available to personnel who need them.', mappedNistIds: ['GV.PO'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.5.37-1', title: 'Document operating procedures', description: 'Create and maintain standard operating procedures for IT systems and processes.' },
        ]
    },
    // ═══ A.6 PEOPLE CONTROLS (8 controls) ═══
    {
        id: 'A.6.1', domain: 'People controls', title: 'Screening', description: 'Background verification checks on all candidates to become personnel shall be carried out prior to joining the organization and on an ongoing basis taking into consideration applicable laws, regulations and ethics and be proportional to the business requirements, the classification of the information to be accessed and the perceived risks.', mappedNistIds: ['GV.RR'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.6.1-1', title: 'Define screening requirements', description: 'Specify background checks proportional to role sensitivity.' },
            { id: 'A.6.1-2', title: 'Integrate into HR onboarding', description: 'Make screening a mandatory step in recruitment.' },
        ]
    },
    {
        id: 'A.6.2', domain: 'People controls', title: 'Terms and conditions of employment', description: 'The employment contractual agreements shall state the personnel\'s and the organization\'s responsibilities for information security.', mappedNistIds: ['GV.RR'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.6.2-1', title: 'Include security clauses in contracts', description: 'Add confidentiality, acceptable use, and security responsibilities to employment agreements.' },
        ]
    },
    {
        id: 'A.6.3', domain: 'People controls', title: 'Information security awareness, education and training', description: 'Personnel of the organization and relevant interested parties shall receive appropriate information security awareness, education and training and regular updates of the organization\'s information security policy, topic-specific policies and procedures, as relevant for their job function.', mappedNistIds: ['PR.AT'], mappedNsmIds: ['2.8'], guidance: [
            { id: 'A.6.3-1', title: 'Develop awareness program', description: 'Create a structured program covering phishing, social engineering, and incident reporting.' },
            { id: 'A.6.3-2', title: 'Deliver role-specific training', description: 'Provide targeted training for IT staff, developers, and management.' },
            { id: 'A.6.3-3', title: 'Track completion', description: 'Maintain records of who has completed training.' },
        ]
    },
    {
        id: 'A.6.4', domain: 'People controls', title: 'Disciplinary process', description: 'A disciplinary process shall be formalized and communicated to take actions against personnel and other relevant interested parties who have committed an information security policy violation.', mappedNistIds: ['GV.RR'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.6.4-1', title: 'Define disciplinary procedures', description: 'Establish a graduated process for security violations.' },
        ]
    },
    {
        id: 'A.6.5', domain: 'People controls', title: 'Responsibilities after termination or change of employment', description: 'Information security responsibilities and duties that remain valid after termination or change of employment shall be defined, enforced and communicated to relevant personnel and other interested parties.', mappedNistIds: ['GV.RR'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.6.5-1', title: 'Define post-employment obligations', description: 'Specify ongoing confidentiality and non-disclosure obligations.' },
        ]
    },
    {
        id: 'A.6.6', domain: 'People controls', title: 'Confidentiality or non-disclosure agreements', description: 'Confidentiality or non-disclosure agreements reflecting the organization\'s needs for the protection of information shall be identified, documented, regularly reviewed and signed by personnel and other relevant interested parties.', mappedNistIds: ['GV.PO'], mappedNsmIds: ['2.1'], guidance: [
            { id: 'A.6.6-1', title: 'Implement NDA process', description: 'Create standard NDAs and ensure all relevant personnel sign them.' },
        ]
    },
    {
        id: 'A.6.7', domain: 'People controls', title: 'Remote working', description: 'Security measures shall be implemented when personnel are working remotely to protect information accessed, processed or stored outside the organization\'s premises.', mappedNistIds: ['PR.DS'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.6.7-1', title: 'Define remote work policy', description: 'Establish security requirements for remote work including VPN, encryption, and physical security.' },
        ]
    },
    {
        id: 'A.6.8', domain: 'People controls', title: 'Information security event reporting', description: 'The organization shall provide a mechanism for personnel to report observed or suspected information security events through appropriate channels in a timely manner.', mappedNistIds: ['DE.AE'], mappedNsmIds: ['4.1'], guidance: [
            { id: 'A.6.8-1', title: 'Establish reporting channels', description: 'Set up email, phone, and web-based reporting mechanisms for security events.' },
        ]
    },
    // ═══ A.7 PHYSICAL CONTROLS (14 controls) ═══
    {
        id: 'A.7.1', domain: 'Physical controls', title: 'Physical security perimeters', description: 'Security perimeters shall be defined and used to protect areas that contain information and other associated assets.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.1-1', title: 'Define security zones', description: 'Map physical zones (public, office, restricted/server room) with required access levels.' },
            { id: 'A.7.1-2', title: 'Implement perimeter controls', description: 'Install access controls at zone boundaries.' },
        ]
    },
    {
        id: 'A.7.2', domain: 'Physical controls', title: 'Physical entry', description: 'Secure areas shall be protected by appropriate entry controls and access points.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.2-1', title: 'Implement entry controls', description: 'Deploy card readers, biometrics, or key locks at entry points.' },
        ]
    },
    {
        id: 'A.7.3', domain: 'Physical controls', title: 'Securing offices, rooms and facilities', description: 'Physical security for offices, rooms and facilities shall be designed and implemented.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.3-1', title: 'Secure sensitive areas', description: 'Ensure server rooms, archives, and executive offices have appropriate physical security.' },
        ]
    },
    {
        id: 'A.7.4', domain: 'Physical controls', title: 'Physical security monitoring', description: 'Premises shall be continuously monitored for unauthorized physical access.', mappedNistIds: ['DE.CM'], mappedNsmIds: ['3.4'], guidance: [
            { id: 'A.7.4-1', title: 'Install monitoring systems', description: 'Deploy cameras, motion sensors, and intrusion detection.' },
        ]
    },
    {
        id: 'A.7.5', domain: 'Physical controls', title: 'Protecting against physical and environmental threats', description: 'Protection against physical and environmental threats, such as natural disasters and other intentional or unintentional physical threats to infrastructure shall be designed and implemented.', mappedNistIds: ['PR.IR'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.5-1', title: 'Assess environmental risks', description: 'Identify risks from fire, flood, power failure, and implement protections.' },
        ]
    },
    {
        id: 'A.7.6', domain: 'Physical controls', title: 'Working in secure areas', description: 'Security measures for working in secure areas shall be designed and implemented.', mappedNistIds: ['PR.AA'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.6-1', title: 'Define secure area procedures', description: 'Establish rules for working in restricted zones (no phones, escort policies).' },
        ]
    },
    {
        id: 'A.7.7', domain: 'Physical controls', title: 'Clear desk and clear screen', description: 'Clear desk rules for papers and removable storage media and clear screen rules for information processing facilities shall be defined and appropriately enforced.', mappedNistIds: ['PR.DS'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.7-1', title: 'Implement clean desk policy', description: 'Define and enforce rules for securing papers and locking screens.' },
        ]
    },
    {
        id: 'A.7.8', domain: 'Physical controls', title: 'Equipment siting and protection', description: 'Equipment shall be sited securely and protected.', mappedNistIds: ['PR.IR'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.8-1', title: 'Site equipment securely', description: 'Ensure servers and network equipment are in protected, climate-controlled environments.' },
        ]
    },
    {
        id: 'A.7.9', domain: 'Physical controls', title: 'Security of assets off-premises', description: 'Off-site assets shall be protected.', mappedNistIds: ['PR.DS'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.9-1', title: 'Protect off-site assets', description: 'Define security measures for equipment and media taken off-premises.' },
        ]
    },
    {
        id: 'A.7.10', domain: 'Physical controls', title: 'Storage media', description: 'Storage media shall be managed through their life cycle of acquisition, use, transportation and disposal in accordance with the organization\'s classification scheme and handling requirements.', mappedNistIds: ['PR.DS'], mappedNsmIds: ['2.4'], guidance: [
            { id: 'A.7.10-1', title: 'Manage storage media lifecycle', description: 'Define handling, transport, and disposal procedures for storage media.' },
        ]
    },
    {
        id: 'A.7.11', domain: 'Physical controls', title: 'Supporting utilities', description: 'Information processing facilities shall be protected from power failures and other disruptions caused by failures in supporting utilities.', mappedNistIds: ['PR.IR'], mappedNsmIds: ['3.2'], guidance: [
            { id: 'A.7.11-1', title: 'Ensure utility resilience', description: 'Implement UPS, redundant power, and environmental controls.' },
        ]
    },
    {
        id: 'A.7.12', domain: 'Physical controls', title: 'Cabling security', description: 'Cables carrying power, data or supporting information services shall be protected from interception, interference or damage.', mappedNistIds: ['PR.IR'], mappedNsmIds: ['3.1'], guidance: [
            { id: 'A.7.12-1', title: 'Protect cabling', description: 'Secure cable runs, label cables, and protect against unauthorized access or damage.' },
        ]
    },
    {
        id: 'A.7.13', domain: 'Physical controls', title: 'Equipment maintenance', description: 'Equipment shall be maintained correctly to ensure availability, integrity and confidentiality of information.', mappedNistIds: ['PR.MA'], mappedNsmIds: ['3.3'], guidance: [
            { id: 'A.7.13-1', title: 'Schedule regular maintenance', description: 'Maintain equipment per manufacturer recommendations and track service records.' },
        ]
    },
    {
        id: 'A.7.14', domain: 'Physical controls', title: 'Secure disposal or re-use of equipment', description: 'Items of equipment containing storage media shall be verified to ensure that any sensitive data and licensed software has been removed or securely overwritten prior to disposal or re-use.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.7.14-1', title: 'Implement secure disposal', description: 'Verify data destruction before disposing or reassigning equipment.' },
        ]
    },
    // ═══ A.8 TECHNOLOGICAL CONTROLS (34 controls) ═══
    {
        id: 'A.8.1', domain: 'Technological controls', title: 'User endpoint devices', description: 'Information stored on, processed by or accessible via user endpoint devices shall be protected.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.1-1', title: 'Deploy endpoint protection', description: 'Install anti-malware, EDR, and host-based firewall on all devices.' },
            { id: 'A.8.1-2', title: 'Require device encryption', description: 'Enable full disk encryption (BitLocker, FileVault) on all laptops and workstations.' },
            { id: 'A.8.1-3', title: 'Configure automatic updates', description: 'Ensure OS and application updates are installed within defined timeframes.' },
        ]
    },
    {
        id: 'A.8.2', domain: 'Technological controls', title: 'Privileged access rights', description: 'The allocation and use of privileged access rights shall be restricted and managed.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.2-1', title: 'Inventory privileged accounts', description: 'Create and maintain a register of all admin/root/service accounts.' },
            { id: 'A.8.2-2', title: 'Implement least privilege', description: 'Grant only necessary rights and use separate admin accounts.' },
            { id: 'A.8.2-3', title: 'Review access regularly', description: 'Conduct quarterly reviews of privileged access.' },
        ]
    },
    {
        id: 'A.8.3', domain: 'Technological controls', title: 'Information access restriction', description: 'Access to information and other associated assets shall be restricted in accordance with the established topic-specific policy on access control.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.3-1', title: 'Implement RBAC', description: 'Configure systems to use role-based access control.' },
            { id: 'A.8.3-2', title: 'Require MFA for sensitive systems', description: 'Enforce multi-factor authentication for critical applications.' },
        ]
    },
    {
        id: 'A.8.4', domain: 'Technological controls', title: 'Access to source code', description: 'Read and write access to source code, development tools and software libraries shall be appropriately managed.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.4-1', title: 'Restrict source code access', description: 'Limit repository access to authorized developers with role-based permissions.' },
        ]
    },
    {
        id: 'A.8.5', domain: 'Technological controls', title: 'Secure authentication', description: 'Secure authentication technologies and procedures shall be established and implemented based on information access restrictions and the topic-specific policy on access control.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.5-1', title: 'Enforce strong password policy', description: 'Require minimum 12 characters, complexity, and prohibit common/leaked passwords.' },
            { id: 'A.8.5-2', title: 'Implement MFA', description: 'Deploy multi-factor authentication for all user accounts.' },
        ]
    },
    {
        id: 'A.8.6', domain: 'Technological controls', title: 'Capacity management', description: 'The use of resources shall be monitored and adjusted in line with current and expected capacity requirements.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.6-1', title: 'Monitor resource usage', description: 'Implement monitoring for CPU, memory, storage, and network utilization.' },
        ]
    },
    {
        id: 'A.8.7', domain: 'Technological controls', title: 'Protection against malware', description: 'Protection against malware shall be implemented and supported by appropriate user awareness.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.7-1', title: 'Deploy anti-malware solutions', description: 'Install and maintain anti-malware software with automatic updates.' },
            { id: 'A.8.7-2', title: 'Conduct awareness training', description: 'Train users to recognize and avoid malware threats.' },
        ]
    },
    {
        id: 'A.8.8', domain: 'Technological controls', title: 'Management of technical vulnerabilities', description: 'Information about technical vulnerabilities of information systems in use shall be obtained, the organization\'s exposure to such vulnerabilities shall be evaluated and appropriate measures shall be taken.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.8-1', title: 'Implement vulnerability scanning', description: 'Use automated tools to scan at least monthly.' },
            { id: 'A.8.8-2', title: 'Define patching timelines', description: 'Set timeframes based on severity (critical: 48h, high: 7d).' },
        ]
    },
    {
        id: 'A.8.9', domain: 'Technological controls', title: 'Configuration management', description: 'Configurations, including security configurations, of hardware, software, services and networks shall be established, documented, implemented, monitored and reviewed.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.9-1', title: 'Define secure baselines', description: 'Create hardened configuration baselines for OS, apps, and network devices.' },
            { id: 'A.8.9-2', title: 'Monitor configuration drift', description: 'Alert when configurations deviate from approved baselines.' },
        ]
    },
    {
        id: 'A.8.10', domain: 'Technological controls', title: 'Information deletion', description: 'Information stored in information systems, devices or in any other storage media shall be deleted when no longer required.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.10-1', title: 'Define data retention and deletion', description: 'Establish retention periods and implement automatic or scheduled deletion.' },
        ]
    },
    {
        id: 'A.8.11', domain: 'Technological controls', title: 'Data masking', description: 'Data masking shall be used in accordance with the organization\'s topic-specific policy on access control and other related topic-specific policies, and business requirements, taking applicable legislation into consideration.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.11-1', title: 'Implement data masking', description: 'Mask sensitive data in non-production environments and reports.' },
        ]
    },
    {
        id: 'A.8.12', domain: 'Technological controls', title: 'Data leakage prevention', description: 'Data leakage prevention measures shall be applied to systems, networks and any other devices that process, store or transmit sensitive information.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.12-1', title: 'Classify sensitive data', description: 'Identify and tag all data types requiring protection.' },
            { id: 'A.8.12-2', title: 'Implement DLP tools', description: 'Deploy Data Loss Prevention solutions to monitor and block data leakage.' },
        ]
    },
    {
        id: 'A.8.13', domain: 'Technological controls', title: 'Information backup', description: 'Backup copies of information, software and systems shall be maintained and regularly tested in accordance with the agreed topic-specific policy on backup.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.13-1', title: 'Define backup policy', description: 'Establish backup frequency, retention, and offsite storage requirements.' },
            { id: 'A.8.13-2', title: 'Test restore procedures', description: 'Regularly test backup restoration to verify recoverability.' },
        ]
    },
    {
        id: 'A.8.14', domain: 'Technological controls', title: 'Redundancy of information processing facilities', description: 'Information processing facilities shall be implemented with sufficient redundancy to meet availability requirements.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.14-1', title: 'Implement redundancy', description: 'Deploy redundant systems, clustering, or failover mechanisms for critical services.' },
        ]
    },
    {
        id: 'A.8.15', domain: 'Technological controls', title: 'Logging', description: 'Logs that record activities, exceptions, faults and other relevant events shall be produced, stored, protected and analysed.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.15-1', title: 'Define logging requirements', description: 'Specify which events to log across all critical systems.' },
            { id: 'A.8.15-2', title: 'Centralise log collection', description: 'Implement SIEM or log aggregation to consolidate logs.' },
            { id: 'A.8.15-3', title: 'Protect and retain logs', description: 'Ensure logs are tamper-proof and retained per requirements.' },
        ]
    },
    {
        id: 'A.8.16', domain: 'Technological controls', title: 'Monitoring activities', description: 'Networks, systems and applications shall be monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.16-1', title: 'Deploy monitoring solutions', description: 'Implement network monitoring (IDS/IPS), endpoint detection (EDR), and application monitoring.' },
            { id: 'A.8.16-2', title: 'Define anomaly detection rules', description: 'Configure alerts for unusual patterns.' },
        ]
    },
    {
        id: 'A.8.17', domain: 'Technological controls', title: 'Clock synchronization', description: 'The clocks of information processing systems used by the organization shall be synchronized to approved time sources.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.17-1', title: 'Configure NTP', description: 'Synchronize all systems to approved NTP time sources.' },
        ]
    },
    {
        id: 'A.8.18', domain: 'Technological controls', title: 'Use of privileged utility programs', description: 'The use of utility programs that might be capable of overriding system and application controls shall be restricted and tightly controlled.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.18-1', title: 'Restrict utility programs', description: 'Limit access to system utilities and maintain an approved software list.' },
        ]
    },
    {
        id: 'A.8.19', domain: 'Technological controls', title: 'Installation of software on operational systems', description: 'Procedures and measures shall be implemented to securely manage software installation on operational systems.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.19-1', title: 'Control software installation', description: 'Implement application whitelisting or approval processes for software installation.' },
        ]
    },
    {
        id: 'A.8.20', domain: 'Technological controls', title: 'Networks security', description: 'Networks and network devices shall be secured, managed and controlled to protect information in systems and applications.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.20-1', title: 'Implement network security', description: 'Deploy firewalls, network segmentation, and secure configurations.' },
        ]
    },
    {
        id: 'A.8.21', domain: 'Technological controls', title: 'Security of network services', description: 'Security mechanisms, service levels and service requirements of network services shall be identified, implemented and monitored.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.21-1', title: 'Secure network services', description: 'Define and enforce security requirements for all network services.' },
        ]
    },
    {
        id: 'A.8.22', domain: 'Technological controls', title: 'Segregation of networks', description: 'Groups of information services, users and information systems shall be segregated in the organization\'s networks.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.22-1', title: 'Segment networks', description: 'Implement VLANs, zones, and micro-segmentation to separate environments.' },
        ]
    },
    {
        id: 'A.8.23', domain: 'Technological controls', title: 'Web filtering', description: 'Access to external websites shall be managed to reduce exposure to malicious content.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.23-1', title: 'Implement web filtering', description: 'Deploy web proxy or DNS filtering to block malicious and inappropriate content.' },
        ]
    },
    {
        id: 'A.8.24', domain: 'Technological controls', title: 'Use of cryptography', description: 'Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.24-1', title: 'Define cryptography policy', description: 'Specify approved algorithms, key lengths, and use cases.' },
            { id: 'A.8.24-2', title: 'Implement key management', description: 'Establish procedures for key generation, storage, rotation, and destruction.' },
        ]
    },
    {
        id: 'A.8.25', domain: 'Technological controls', title: 'Secure development life cycle', description: 'Rules for the secure development of software and systems shall be established and applied.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.25-1', title: 'Implement secure SDLC', description: 'Integrate security activities into each phase of the development lifecycle.' },
        ]
    },
    {
        id: 'A.8.26', domain: 'Technological controls', title: 'Application security requirements', description: 'Information security requirements shall be identified, specified and approved when developing or acquiring applications.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.26-1', title: 'Define security requirements', description: 'Specify security requirements for all application development and procurement.' },
        ]
    },
    {
        id: 'A.8.27', domain: 'Technological controls', title: 'Secure system architecture and engineering principles', description: 'Principles for engineering secure systems shall be established, documented, maintained and applied to any information system development activities.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.27-1', title: 'Document architecture principles', description: 'Establish and maintain secure system architecture and engineering principles.' },
        ]
    },
    {
        id: 'A.8.28', domain: 'Technological controls', title: 'Secure coding', description: 'Secure coding principles shall be applied to software development.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.28-1', title: 'Apply secure coding standards', description: 'Follow OWASP guidelines and conduct code reviews for security.' },
        ]
    },
    {
        id: 'A.8.29', domain: 'Technological controls', title: 'Security testing in development and acceptance', description: 'Security testing processes shall be defined and implemented in the development life cycle.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.29-1', title: 'Implement security testing', description: 'Conduct SAST, DAST, and penetration testing during development.' },
        ]
    },
    {
        id: 'A.8.30', domain: 'Technological controls', title: 'Outsourced development', description: 'The organization shall direct, monitor and review the activities related to outsourced system development.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.30-1', title: 'Manage outsourced development', description: 'Define security requirements and conduct security reviews of outsourced code.' },
        ]
    },
    {
        id: 'A.8.31', domain: 'Technological controls', title: 'Separation of development, test and production environments', description: 'Development, testing and production environments shall be separated and secured.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.31-1', title: 'Separate environments', description: 'Ensure dev, test, and prod are isolated with appropriate access controls.' },
        ]
    },
    {
        id: 'A.8.32', domain: 'Technological controls', title: 'Change management', description: 'Changes to information processing facilities and information systems shall be subject to change management procedures.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.32-1', title: 'Implement change management', description: 'Define a formal change management process with risk assessment and approval workflows.' },
        ]
    },
    {
        id: 'A.8.33', domain: 'Technological controls', title: 'Test information', description: 'Test information shall be appropriately selected, protected and managed.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.33-1', title: 'Protect test data', description: 'Ensure production data is anonymized or synthetic data is used in test environments.' },
        ]
    },
    {
        id: 'A.8.34', domain: 'Technological controls', title: 'Protection of information systems during audit testing', description: 'Audit tests and other assurance activities involving assessment of operational systems shall be planned and agreed between the tester and appropriate management.', mappedNistIds: [], mappedNsmIds: [], guidance: [
            { id: 'A.8.34-1', title: 'Plan audit testing', description: 'Coordinate audit activities to minimize impact on production systems.' },
        ]
    },
];
