import { useState, useEffect } from 'react';
import { ProjectState, ControlAssessment, ImplementationStatus, ITSystem, PersonvernVurdering } from '../types';

const STORAGE_KEY = 'infosec_dashboard_state';

const defaultState: ProjectState = {
    companyName: 'My Organization',
    assessments: {},
    documentAnswers: {},
    systems: [],
    personvernVurderinger: {}
};

export function useAssessmentStore() {
    const [state, setState] = useState<ProjectState>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Merge with defaults to handle schema migrations
                return { ...defaultState, ...parsed };
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
        updatePrivacyAssessment
    };
}
