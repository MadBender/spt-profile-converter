/** Fixes errors like `converting value "sptBear" to type 'EFT.WildSpawnType'. Path '[1].Stats.Eft.DeathCause.Role'` */
function tryFixRole(role) {
    switch (role) {
        case 'sptBear':
        case 'sptUsec':
            return 'pmcbot';
    }
    return role;
}

/** Prints error message, help message and exits */
function exit(error) {
    console.log(error);
    console.log('');
    console.log('Usage:');
    console.log('    node convertProfile.js [SPT 3.8 profile file] [SPT 3.9 profiles directory]');
    console.log('');
    console.log('Example:');
    console.log('    node convertProfile.js E:\\Games\\SPT\\user\\profiles\\660c886400014ca378101db4.json \'E:\\Games\\SPT 3.9.0\\user\\profiles\'');
    console.log('');
    console.log('Make sure SPT server 3.9 is not running during the profile conversion');
    process.exit(1);
}

export { tryFixRole, exit }