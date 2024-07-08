import fs from 'fs/promises';
import path from 'path';
import { tryFixRole, exit } from './utils.js';

const rawSourceFile = process.argv[2];
const rawDestPath = process.argv[3];

if (!rawSourceFile) {
    exit('SPT 3.8 profile is not specified');
}

if (!rawDestPath) {
    exit('SPT 3.9 profile directory is not specified');
}

const sourceFile = path.normalize(rawSourceFile);
const destPath = path.normalize(rawDestPath);

const fileName = path.basename(sourceFile);
const destFile = path.resolve(destPath, fileName);
if (sourceFile == destFile) {
    exit(`SPT 3.9 profile cannot be saved to the same file ${destFile} where the original SPT 3.8 profile is located`);
}

console.log('Reading SPT 3.8 profile ' + sourceFile);
const profile = JSON.parse(await fs.readFile(sourceFile));

const characters = profile.characters;
for (const character of Object.values(characters)) {
    const eft = character.Stats.Eft;
    eft.DeathCause.Role = tryFixRole(eft.DeathCause.Role);
    for (const victim of eft.Victims) {
        victim.Role = tryFixRole(victim.Role);
    }
}

const result = JSON.stringify(profile, null, '\t');
await fs.writeFile(destFile, result);
console.log('Saved SPT 3.9 profile to ' + destFile);
