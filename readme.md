A script to convert SPT 3.8 profiles to SPT 3.9. 

The implementation is just enough to convert my own profiles. There may be more problems, especially if you use custom content such as items, traders or quests.

Use at your own risk. If you are not sure what you are doing, make a backup of your profiles.

If you manage to encounter and fix other problems, feel free to contribute to this script.

# Prerequisites
1. Have an installation of SPT 3.8 or at least its profile files.
1. New installation of SPT 3.9, separate from SPT 3.8.
1. Install [nodejs](https://nodejs.org/)

# Usage
1. Clone or download this repository
1. Make sure SPT server 3.9 is not running.
1. Open the terminal in the root directory and run: 
    ```
    node convertProfile [SPT 3.8 profile] [SPT 3.9 profile directory]
    ```
    The 3.9 profile will be saved into the target directory with the same name as the original 3.8 profile

    Example: 
    ```
    node convertProfile E:\Games\SPT\user\profiles\660c886400014ca378101db4.json 'E:\Games\SPT 3.9.0\user\profiles'
    ```
1. Start SPT, in the launcher select the converted profile and launch the game.
