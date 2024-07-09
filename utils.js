import readline from 'readline';


/** Fixes errors like `converting value "sptBear" to type 'EFT.WildSpawnType'. Path '[1].Stats.Eft.DeathCause.Role'` */
function tryFixRole(role) {
    switch (role) {
        case 'sptBear':
        case 'sptUsec':
            return 'pmcbot';
    }
    return role;
}

function tryFixGpCoins(obj) {
    if (typeof obj != 'object' || obj == null) {
        return;
    }

    if (obj._tpl == '5d235b4d86f7742e017bc88a') {
        delete obj.upd.Resource;
        if (!obj.upd.StackObjectsCount) {
            obj.upd.StackObjectsCount = 1;
        }
    }

    for (const c of Object.values(obj)) {
        tryFixGpCoins(c);
    }
}

/** Prints error message, help message and exits */
function exit(error) {
    console.log(error);
    console.log('');
    console.log('Usage:');
    console.log('    node convertProfile.js [original profile] [converted profile]');
    console.log('');
    console.log('Example:');
    console.log('    node convertProfile.js E:\\Games\\SPT\\user\\profiles\\660c886400014ca378101db4.json E:\\Games\\SPT_3.9.0\\user\\profiles\E:\\Games\\SPT\\user\\profiles\\660c886400014ca378101db4.json');
    console.log('');
    console.log('Make sure that neither SPT server nor SPT launcher are running during the profile conversion');
    process.exit(1);
}

async function ask(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let result = null;
    while (result == null) {
        result = await showPrompt(rl, prompt);
    }

    rl.close();
    return result;
}

async function showPrompt(rl, prompt) {
    return new Promise(resolve => {
        rl.question(prompt + ' [Y/n] ', answer => {
            if (/^($|y)/i.test(answer)) {
                resolve(true);
            } else if (/^n/i.test(answer)) {
                resolve(false);
            }
            resolve(null);
        });
    });
}

export { tryFixRole, exit, ask, tryFixGpCoins };