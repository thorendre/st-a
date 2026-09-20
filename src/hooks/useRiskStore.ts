import { useState, useEffect } from 'react';
import { RiskProject, RiskCategory, Risk, RiskStore, Likelihood, Consequence } from '../types';
import { defaultRiskCategories } from '../data/riskCategories';

const STORAGE_KEY = 'staa_risk_store';

const defaultStore: RiskStore = {
    projects: [],
    activeProjectId: null,
};

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function normalizeRisk(r: any): Risk {
    const c = (r.consequence >= 1 && r.consequence <= 5 ? r.consequence : 3) as Consequence;
    const k = (r.kScore >= 1 && r.kScore <= 5 ? r.kScore : c) as Consequence;
    const i = (r.iScore >= 1 && r.iScore <= 5 ? r.iScore : c) as Consequence;
    const t = (r.tScore >= 1 && r.tScore <= 5 ? r.tScore : c) as Consequence;
    const a = (r.aScore >= 1 && r.aScore <= 5 ? r.aScore : c) as Consequence;
    return {
        id: r.id || generateId(),
        title: r.title || '',
        description: r.description || '',
        categoryId: r.categoryId || '',
        threat: r.threat || '',
        vulnerability: r.vulnerability || '',
        likelihood: (r.likelihood >= 1 && r.likelihood <= 5 ? r.likelihood : 3) as Likelihood,
        consequence: Math.max(k, i, t, a) as Consequence,
        kScore: k,
        iScore: i,
        tScore: t,
        aScore: a,
        existingControls: r.existingControls || '',
        plannedControls: r.plannedControls || '',
        owner: r.owner || '',
        status: r.status || 'open',
    };
}

export function useRiskStore() {
    const [store, setStore] = useState<RiskStore>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const normalizedProjects = (parsed.projects || []).map((p: any) => ({
                    ...p,
                    categories: (p.categories || []).map((cat: any) => ({
                        ...cat,
                        risks: (cat.risks || []).map(normalizeRisk),
                    })),
                }));
                return { ...defaultStore, ...parsed, projects: normalizedProjects };
            } catch {
                console.error('Failed to parse risk store');
            }
        }
        return defaultStore;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }, [store]);

    const activeProject = store.projects.find(p => p.id === store.activeProjectId) || null;

    // ─── Project CRUD ───

    const createProject = (name: string, description: string, importDefaults: boolean = true, systemId?: string) => {
        const id = generateId();
        const now = new Date().toISOString();
        const categories: RiskCategory[] = importDefaults
            ? defaultRiskCategories.map(c => ({
                ...c,
                id: `${c.id}-${id}`,
                risks: c.risks.map(r => ({
                    ...r,
                    id: `${r.id}-${id}`,
                    categoryId: `${c.id}-${id}`,
                })),
            }))
            : [];
        const project: RiskProject = { id, name, description, systemId, createdAt: now, updatedAt: now, categories };
        setStore(prev => ({
            ...prev,
            projects: [...prev.projects, project],
            activeProjectId: id,
        }));
        return id;
    };

    const setActiveProject = (id: string | null) => {
        setStore(prev => ({ ...prev, activeProjectId: id }));
    };

    const deleteProject = (id: string) => {
        setStore(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== id),
            activeProjectId: prev.activeProjectId === id ? null : prev.activeProjectId,
        }));
    };

    const updateProject = (id: string, updates: Partial<Pick<RiskProject, 'name' | 'description' | 'systemId'>>) => {
        setStore(prev => ({
            ...prev,
            projects: prev.projects.map(p =>
                p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
            ),
        }));
    };

    // ─── Category Operations ───

    const addCategory = (projectId: string, category: Omit<RiskCategory, 'id' | 'risks' | 'isDefault' | 'enabled'>) => {
        const catId = generateId();
        const newCat: RiskCategory = {
            ...category,
            id: catId,
            isDefault: false,
            enabled: true,
            risks: [],
        };
        updateProjectCategories(projectId, cats => [...cats, newCat]);
    };

    const importDefaultCategory = (projectId: string, templateCategoryId: string) => {
        const template = defaultRiskCategories.find(c => c.id === templateCategoryId);
        if (!template) return;
        const suffix = generateId();
        const newCat: RiskCategory = {
            ...template,
            id: `${template.id}-${suffix}`,
            risks: template.risks.map(r => ({
                ...r,
                id: `${r.id}-${suffix}`,
                categoryId: `${template.id}-${suffix}`,
            })),
        };
        updateProjectCategories(projectId, cats => [...cats, newCat]);
    };

    const toggleCategory = (projectId: string, categoryId: string) => {
        updateProjectCategories(projectId, cats =>
            cats.map(c => c.id === categoryId ? { ...c, enabled: !c.enabled } : c)
        );
    };

    const removeCategory = (projectId: string, categoryId: string) => {
        updateProjectCategories(projectId, cats => cats.filter(c => c.id !== categoryId));
    };

    // ─── Risk CRUD ───

    const addRisk = (projectId: string, categoryId: string, risk: Omit<Risk, 'id' | 'categoryId'>) => {
        const riskId = generateId();
        const consequence = Math.max(risk.kScore, risk.iScore, risk.tScore, risk.aScore) as Consequence;
        const newRisk: Risk = { ...risk, consequence, id: riskId, categoryId };
        updateProjectCategories(projectId, cats =>
            cats.map(c =>
                c.id === categoryId ? { ...c, risks: [...c.risks, newRisk] } : c
            )
        );
    };

    const updateRisk = (projectId: string, categoryId: string, riskId: string, updates: Partial<Risk>) => {
        updateProjectCategories(projectId, cats =>
            cats.map(c =>
                c.id === categoryId
                    ? {
                        ...c,
                        risks: c.risks.map(r => {
                            if (r.id !== riskId) return r;
                            const merged = { ...r, ...updates };
                            if (updates.kScore !== undefined || updates.iScore !== undefined || updates.tScore !== undefined || updates.aScore !== undefined) {
                                merged.consequence = Math.max(merged.kScore, merged.iScore, merged.tScore, merged.aScore) as Consequence;
                            }
                            return merged;
                        })
                    }
                    : c
            )
        );
    };

    const deleteRisk = (projectId: string, categoryId: string, riskId: string) => {
        updateProjectCategories(projectId, cats =>
            cats.map(c =>
                c.id === categoryId
                    ? { ...c, risks: c.risks.filter(r => r.id !== riskId) }
                    : c
            )
        );
    };

    // ─── Helpers ───

    function updateProjectCategories(projectId: string, updater: (cats: RiskCategory[]) => RiskCategory[]) {
        setStore(prev => ({
            ...prev,
            projects: prev.projects.map(p =>
                p.id === projectId
                    ? { ...p, categories: updater(p.categories), updatedAt: new Date().toISOString() }
                    : p
            ),
        }));
    }

    // ─── Risk bank import ───

    const addRisksFromBank = (projectId: string, categoryId: string, bankEntries: Array<{
        title: string; description: string; threat: string; vulnerability: string;
        likelihood: Likelihood; consequence: Consequence;
        kScore: Consequence; iScore: Consequence; tScore: Consequence; aScore: Consequence;
        existingControls: string; plannedControls: string;
    }>) => {
        updateProjectCategories(projectId, cats =>
            cats.map(c => {
                if (c.id !== categoryId) return c;
                const newRisks = bankEntries.map(entry => ({
                    ...entry,
                    id: generateId(),
                    categoryId,
                    owner: '',
                    status: 'open' as const,
                }));
                return { ...c, risks: [...c.risks, ...newRisks] };
            })
        );
    };

    // ─── Computed helpers ───

    const getAllRisks = (project: RiskProject | null): Risk[] => {
        if (!project) return [];
        return project.categories
            .filter(c => c.enabled)
            .flatMap(c => c.risks);
    };

    const getRiskLevel = (likelihood: Likelihood, consequence: Consequence): 'low' | 'medium' | 'high' | 'critical' => {
        const score = likelihood * consequence;
        if (score <= 4) return 'low';
        if (score <= 9) return 'medium';
        if (score <= 16) return 'high';
        return 'critical';
    };

    return {
        store,
        activeProject,
        createProject,
        setActiveProject,
        deleteProject,
        updateProject,
        addCategory,
        importDefaultCategory,
        toggleCategory,
        removeCategory,
        addRisk,
        updateRisk,
        deleteRisk,
        addRisksFromBank,
        getAllRisks,
        getRiskLevel,
    };
}

