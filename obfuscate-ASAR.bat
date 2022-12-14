        git clone https://github.com/alexdev404/js-obfuscator-cli.git tools
        cd $(pwd)/tools
        npm install
        cd ..
        export PATH=$PATH:$(pwd)/tools
        cd build/win/launcher-win32-ia32/resources
        unpack app.asar
        rm -rf .temp/launch_unpacked.bat
        rm -rf .temp/docs
        rm -rf .temp/.github
        rm -rf .temp/.gitignore
        rm -rf .temp/MAINTAINER_NOTES
        rm -rf .temp/installList.json
        rm -rf .temp/theme.json
        rm -rf .temp/tailwind-config.js
        rm -rf .temp/.postcssrc.js
        obfuscate .temp/src/assets/js
        rm -rf .temp/src/assets/js/
        mv output .temp/src/assets/js/
        mkdir .temp/src/assets/js/modules/
        mv .temp/src/assets/js/blaze.js .temp/src/assets/js/modules/blaze.js
        mv .temp app
        pack app