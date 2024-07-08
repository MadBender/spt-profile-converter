import fs from 'fs/promises';
import path from 'path';
import { tryFixRole, exit } from './utils.js';

const sourceFile = process.argv[2];
const destPath = process.argv[3];

if (!sourceFile) {
    exit('SPT 3.8 profile file is not specified');
}

if (!destPath) {
    exit('SPT 3.9 profile directory is not specified');
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
const fileName = path.basename(sourceFile);
const destFile = path.resolve(destPath, fileName);
await fs.writeFile(destFile, result);
console.log('Saved SPT 3.9 profile to ' + destFile);
