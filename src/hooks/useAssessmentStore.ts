import { useState, useEffect } from 'react';
import { ProjectState, ControlAssessment, ImplementationStatus, ITSystem, PersonvernVurdering, Vendor } from '../types';

const STORAGE_KEY = 'infosec_dashboard_state';

const defaultVendors: Vendor[] = [
    {
        id: 'v-1',
        name: 'Microsoft Ireland Operations Limited',
        orgNumber: 'IE 9999999',
        contactPerson: 'Microsoft Security & Privacy Team',
        contactEmail: 'privacy@microsoft.com',
        servicesDelivered: 'Microsoft 365, Azure Cloud Services, Entra ID',
        dpaStatus: 'Signert',
        dpaLink: 'https://www.microsoft.com/licensing/docs/view/Data-Protection-Addendum-DPA',
        dpaSignDate: '2024-01-15',
        dpaReviewDate: '2025-01-15',
        country: 'Irland (EU/EØS)',
        transferBasis: 'EU_EOS',
        subProcessors: ['Microsoft Corp (USA - EU-U.S. Data Privacy Framework)'],
        securityCertifications: ['ISO 27001', 'ISO 27018', 'SOC 2 Type II'],
        riskLevel: 'Lav',
        connectedSystemIds: [],
        notes: 'Hovedleverandør av skyinfrastruktur og samhandling. Standard DPA dekket under Enterprise Agreement.'
    },
    {
        id: 'v-2',
        name: 'Amazon Web Services EMEA SARL',
        orgNumber: 'LU 27798135',
        contactPerson: 'AWS Compliance Support',
        contactEmail: 'aws-dpa-team@amazon.com',
        servicesDelivered: 'Skyinfrastruktur, hosting av applikasjonsservere og databaser',
        dpaStatus: 'Signert',
        dpaLink: 'https://aws.amazon.com/compliance/gdpr-center/',
        dpaSignDate: '2023-09-01',
        dpaReviewDate: '2025-09-01',
        country: 'Luxembourg (EU/EØS)',
        transferBasis: 'EU_EOS',
        subProcessors: ['Amazon.com Inc (USA)'],
        securityCertifications: ['ISO 27001', 'SOC 1/2/3', 'C5'],
        riskLevel: 'Lav',
        connectedSystemIds: [],
        notes: 'Datasenter i Stockholm (eu-north-1) og Frankfurt (eu-central-1).'
    },
    {
        id: 'v-3',
        name: 'Visma Software Norge AS',
        orgNumber: '980 500 585',
        contactPerson: 'Kundeansvarlig Visma',
        contactEmail: 'support@visma.no',
        servicesDelivered: 'ERP, økonomi- og lønnssystem',
        dpaStatus: 'Signert',
        dpaLink: 'https://www.visma.no/personvern/databehandleravtale/',
        dpaSignDate: '2023-05-10',
        dpaReviewDate: '2025-05-10',
        country: 'Norge',
        transferBasis: 'EU_EOS',
        subProcessors: ['Visma IT & Communications AS'],
        securityCertifications: ['ISO 27001', 'ISAE 3402 Type II'],
        riskLevel: 'Lav',
        connectedSystemIds: [],
        notes: 'Behandler ansattopplysninger og lønnsdata.'
    }
];

const defaultState: ProjectState = {
    companyName: 'My Organization',
    assessments: {},
    documentAnswers: {},
    systems: [],
    personvernVurderinger: {},
    vendors: defaultVendors,
};

export function useAssessmentStore() {
    const [state, setState] = useState<ProjectState>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Merge with defaults to handle schema migrations
                return {
                    ...defaultState,
                    ...parsed,
                    vendors: (parsed.vendors && parsed.vendors.length > 0) ? parsed.vendors : defaultVendors,
                };
            } catch (e) {
                console.error('Failed to parse stored state', e);
            }
        }
        return defaultState;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const updateAssessment = (controlId: string, status: ImplementationStatus, notes: string = '') => {
        setState(prev => ({
            ...prev,
            assessments: {
                ...prev.assessments,
                [controlId]: {
                    controlId,
                    status,
                    notes,
                    completedSteps: prev.assessments[controlId]?.completedSteps || [],
                    lastUpdated: new Date().toISOString()
                }
            }
        }));
    };

    const toggleStep = (controlId: string, stepId: string, totalSteps: number) => {
        setState(prev => {
            const existing = prev.assessments[controlId];
            const completedSteps = existing?.completedSteps || [];
            const newCompleted = completedSteps.includes(stepId)
                ? completedSteps.filter(s => s !== stepId)
                : [...completedSteps, stepId];

            // Auto-derive status from completed step count (unless manually set to Not Applicable)
            const currentStatus = existing?.status || 'Not Started';
            let newStatus = currentStatus;
            if (currentStatus !== 'Not Applicable') {
                if (newCompleted.length === 0) {
                    newStatus = 'Not Started';
                } else if (newCompleted.length >= totalSteps) {
                    newStatus = 'Implemented';
                } else {
                    newStatus = 'In Progress';
                }
            }

            return {
                ...prev,
                assessments: {
                    ...prev.assessments,
                    [controlId]: {
                        controlId,
                        status: newStatus as any,
                        notes: existing?.notes || '',
                        completedSteps: newCompleted,
                        lastUpdated: new Date().toISOString()
                    }
                }
            };
        });
    };

    const setCompanyName = (name: string) => {
        setState(prev => ({ ...prev, companyName: name }));
    };

    const getAssessment = (controlId: string): ControlAssessment => {
        return state.assessments[controlId] || {
            controlId,
            status: 'Not Started',
            notes: '',
            completedSteps: [],
            lastUpdated: new Date().toISOString()
        };
    };

    const resetData = () => {
        setState(defaultState);
    }

    const exportData = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "infosec-export.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    const importData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                if (imported.assessments) {
                    setState(imported);
                }
            } catch (err) {
                alert('Invalid file format. Please upload a valid JSON export.');
            }
        };
        reader.readAsText(file);
    }

    const updateDocField = (fieldId: string, value: string) => {
        setState(prev => ({
            ...prev,
            documentAnswers: {
                ...prev.documentAnswers,
                [fieldId]: value
            }
        }));
    };

    const addSystem = (systemData: Omit<ITSystem, 'id'>) => {
        const newSystem: ITSystem = {
            ...systemData,
            id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9)
        };
        setState(prev => {
            const updatedSystems = [...(prev.systems || []), newSystem];
            const updatedAssessments = { ...(prev.personvernVurderinger || {}) };
            if (newSystem.behandlerPersonopplysninger && !updatedAssessments[newSystem.id]) {
                updatedAssessments[newSystem.id] = {
                    systemId: newSystem.id,
                    status: 'waiting_on_owner',
                    databehandlerAvtaleSignert: 'Ikke_relevant',
                    dpiaPakrevd: false,
                    dpiaGodkjent: false,
                    informertRegistrerte: false,
                    sletterutineEtablert: false,
                };
            }
            return {
                ...prev,
                systems: updatedSystems,
                personvernVurderinger: updatedAssessments
            };
        });
    };

    const updateSystem = (updated: ITSystem) => {
        setState(prev => {
            const updatedSystems = (prev.systems || []).map(s => s.id === updated.id ? updated : s);
            const updatedAssessments = { ...(prev.personvernVurderinger || {}) };
            if (updated.behandlerPersonopplysninger) {
                if (!updatedAssessments[updated.id]) {
                    updatedAssessments[updated.id] = {
                        systemId: updated.id,
                        status: 'under_review',
                        databehandlerAvtaleSignert: 'Ikke_relevant',
                        dpiaPakrevd: false,
                        dpiaGodkjent: false,
                        informertRegistrerte: false,
                        sletterutineEtablert: false,
                    };
                } else if (updatedAssessments[updated.id].status === 'waiting_on_owner') {
                    updatedAssessments[updated.id].status = 'under_review';
                }
            } else {
                delete updatedAssessments[updated.id];
            }
            return {
                ...prev,
                systems: updatedSystems,
                personvernVurderinger: updatedAssessments
            };
        });
    };

    const deleteSystem = (id: string) => {
        setState(prev => {
            const updatedSystems = (prev.systems || []).filter(s => s.id !== id);
            const updatedAssessments = { ...(prev.personvernVurderinger || {}) };
            delete updatedAssessments[id];
            return {
                ...prev,
                systems: updatedSystems,
                personvernVurderinger: updatedAssessments
            };
        });
    };

    const updatePrivacyAssessment = (updated: PersonvernVurdering) => {
        setState(prev => ({
            ...prev,
            personvernVurderinger: {
                ...(prev.personvernVurderinger || {}),
                [updated.systemId]: {
                    ...updated,
                    sistVurdertAvDpo: new Date().toISOString()
                }
            }
        }));
    };

    const addVendor = (vendor: Omit<Vendor, 'id'>) => {
        const id = `vendor-${Date.now()}`;
        const newVendor: Vendor = { ...vendor, id };
        setState(prev => ({
            ...prev,
            vendors: [...(prev.vendors || []), newVendor]
        }));
        return newVendor;
    };

    const updateVendor = (updated: Vendor) => {
        setState(prev => ({
            ...prev,
            vendors: (prev.vendors || []).map(v => v.id === updated.id ? updated : v)
        }));
    };

    const deleteVendor = (id: string) => {
        setState(prev => ({
            ...prev,
            vendors: (prev.vendors || []).filter(v => v.id !== id)
        }));
    };

    return {
        state,
        updateAssessment,
        toggleStep,
        setCompanyName,
        getAssessment,
        resetData,
        exportData,
        importData,
        updateDocField,
        addSystem,
        updateSystem,
        deleteSystem,
        updatePrivacyAssessment,
        addVendor,
        updateVendor,
        deleteVendor
    };
}
