import fs from 'fs/promises';
import { tryFixRole, exit, ask } from './utils.js';

const sourceFile = process.argv[2];
const destFile = process.argv[3];

if (!sourceFile) {
    exit('Original profile path is not specified');
}

if (!destFile) {
    exit('Target profile path is not specified');
}

console.log('Reading the original profile ' + sourceFile);
const profile = JSON.parse(await fs.readFile(sourceFile));

const characters = profile.characters;
for (const character of Object.values(characters)) {
    const eft = character.Stats.Eft;
    eft.DeathCause.Role = tryFixRole(eft.DeathCause.Role);
    for (const victim of eft.Victims) {
        victim.Role = tryFixRole(victim.Role);
    }
}

const pmc = characters.pmc;
if (!pmc.moneyTransferLimitData) {
    pmc.moneyTransferLimitData = {
        nextResetTime: Math.floor(new Date().valueOf() / 1000),
        remainingLimit: 1000000,
        totalLimit: 1000000,
        resetInterval: 86400
    };
}

const result = JSON.stringify(profile, null, '\t');

const destExists = await fs.stat(destFile).then(() => true).catch(() => false);
if (destExists) {
    const overwrite = await ask(`The target file ${destFile} already exists. Overwrite?`);
    if (!overwrite) {
        console.log("Conversion aborted");
        process.exit(0);
    }
}

await fs.writeFile(destFile, result);
console.log('Saved the converted profile to ' + destFile);
