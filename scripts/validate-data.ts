// Validation script: checks for data integrity issues
import { iso27001Controls } from '../src/data/iso27001';
import { doraControls } from '../src/data/dora';
import { nis2Controls } from '../src/data/nis2';
import { norwegianTranslations } from '../src/data/translations';

const errors: string[] = [];
const warnings: string[] = [];

function checkControls(name: string, controls: any[]) {
    console.log(`\n=== ${name} (${controls.length} controls) ===`);

    // 1. Check unique IDs
    const ids = controls.map(c => c.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length > 0) errors.push(`${name}: Duplicate control IDs: ${dupes.join(', ')}`);
    else console.log(`  ✓ All ${ids.length} control IDs unique`);

    // 2. Check guidance step IDs are unique within each control
    let stepIssues = 0;
    controls.forEach(c => {
        const stepIds = c.guidance.map((s: any) => s.id);
        const stepDupes = stepIds.filter((id: string, i: number) => stepIds.indexOf(id) !== i);
        if (stepDupes.length > 0) {
            errors.push(`${name}: ${c.id} has duplicate step IDs: ${stepDupes.join(', ')}`);
            stepIssues++;
        }
    });
    if (stepIssues === 0) console.log(`  ✓ All guidance step IDs unique within controls`);

    // 3. Check every control has at least 1 guidance step
    const noGuide = controls.filter(c => c.guidance.length === 0);
    if (noGuide.length > 0) warnings.push(`${name}: ${noGuide.length} controls with no guidance steps: ${noGuide.map(c => c.id).join(', ')}`);
    else console.log(`  ✓ All controls have guidance steps`);

    // 4. Total guidance step count
    const totalSteps = controls.reduce((sum, c) => sum + c.guidance.length, 0);
    console.log(`  Total guidance steps: ${totalSteps}`);

    // 5. Check domains
    const domains = [...new Set(controls.map(c => c.domain))];
    console.log(`  Domains (${domains.length}): ${domains.join(', ')}`);

    return ids;
}

// Check each regulation
const isoIds = checkControls('ISO 27001', iso27001Controls);
const doraIds = checkControls('DORA', doraControls);
const nis2Ids = checkControls('NIS2', nis2Controls);

// 6. Check for ID collisions between regulations (critical - would share state!)
console.log('\n=== Cross-regulation ID collision check ===');
const allIds = [...isoIds, ...doraIds, ...nis2Ids];
const crossDupes = allIds.filter((id, i) => allIds.indexOf(id) !== i);
if (crossDupes.length > 0) {
    errors.push(`CRITICAL: Cross-regulation ID collisions: ${crossDupes.join(', ')}`);
} else {
    console.log('  ✓ No ID collisions between regulations');
}

// 7. Check Norwegian translations for ISO 27001
console.log('\n=== Norwegian Translation Coverage ===');
const missingTranslations: string[] = [];
iso27001Controls.forEach((c: any) => {
    if (!(norwegianTranslations as any)[c.id]) {
        missingTranslations.push(c.id);
    }
});
if (missingTranslations.length > 0) {
    errors.push(`Missing Norwegian translations: ${missingTranslations.join(', ')}`);
} else {
    console.log(`  ✓ All ${iso27001Controls.length} ISO controls have Norwegian translations`);
}

// Check translation has guidance count matching control
let guidanceMismatch = 0;
iso27001Controls.forEach((c: any) => {
    const trans = (norwegianTranslations as any)[c.id];
    if (trans && trans.guidance) {
        if (trans.guidance.length !== c.guidance.length) {
            errors.push(`${c.id}: EN has ${c.guidance.length} guidance steps, NO translation has ${trans.guidance.length}`);
            guidanceMismatch++;
        }
    }
});
if (guidanceMismatch === 0) {
    console.log(`  ✓ All guidance step counts match between EN and NO translations`);
}

// Summary
console.log('\n========== SUMMARY ==========');
if (errors.length === 0) {
    console.log('✅ No errors found!');
} else {
    console.log(`❌ ${errors.length} error(s) found:`);
    errors.forEach(e => console.log(`  ❌ ${e}`));
}
if (warnings.length > 0) {
    console.log(`⚠️ ${warnings.length} warning(s):`);
    warnings.forEach(w => console.log(`  ⚠️ ${w}`));
}
