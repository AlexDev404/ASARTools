var fs = require('fs');
var path = require('path');
var recursive = require('recursive-readdir');
var rimraf = require('rimraf');
var asar = require('asar');

// Parse/Get CLI arguments using yargs -> http://yargs.js.org/
const argv = require('yargs')
    .command('$0 <input> [output]', 'Obfuscate <input> ASAR file', (yargs) => {
        yargs
            .positional('input', {
                describe: 'input ASAR file to be unpacked',
                demandOption: true,
            })
            .option('output', {
                alias: 'o',
                description: 'output ASAR file',
                default: null
            })
}).argv;

// Set parameters from arguments
var asarFullFileName = path.normalize(argv.input);
var outputFullFileName = (argv.output) ? path.normalize(argv.output) : asarFullFileName + ".new";
var outputFolder = path.dirname(outputFullFileName);

// Set your resources folder
var resourcesFolder = path.dirname(asarFullFileName);

console.log('\n\nASAR Package Unpacker\n\n');

console.log('Unpacking archive');
asar.extractAll(asarFullFileName, outputFolder + '\\.temp');

//console.log('Deleting app.asar');
//fs.unlinkSync(resourcesFolder + '\\app.asar');

process.exit(0);

// Enter the directories to be ignored

/*

recursive(outputFolder + '\\.temp', ['node_modules', 'app'], function (err, files) {
    files.forEach(file => {
        if (path.extname(file) === '.js') {
            let contents = fs.readFileSync(file, 'utf8');
            //NOTE: This is a quick filter to bypass some syntaxis currently not supported by javascript-obfuscator
            //
            if((contents.indexOf("?.") < 0) && (contents.indexOf(".#") < 0)) {
            //
            // if(true) {
           //
                console.log('Protecting ' + file);

                // Change the settings here  -  https://github.com/javascript-obfuscator/javascript-obfuscator
                let ret = javaScriptObfuscator.obfuscate(contents, {
                    compact: true
                    , controlFlowFlattening: true
                    , controlFlowFlatteningThreshold: 0.75
                    , deadCodeInjection: false
                    , deadCodeInjectionThreshold: 0.4
                    , debugProtection: false
                    , debugProtectionInterval: false
                    , disableConsoleOutput: false
                    , domainLock: []
                    , identifierNamesGenerator: 'hexadecimal'
                    , identifiersPrefix: ''
                    , inputFileName: ''
                    , log: false
                    , renameGlobals: false
                    , reservedNames: []
                    , reservedStrings: []
                    , rotateStringArray: true
                    , seed: 0
                    , selfDefending: false
                    , sourceMap: false
                    , sourceMapBaseUrl: ''
                    , sourceMapFileName: ''
                    , sourceMapMode: 'separate'
                    , stringArray: true
                    , stringArrayEncoding: false
                    , stringArrayThreshold: 0.75
                    , target: 'node'
                    , transformObjectKeys: false
                    , unicodeEscapeSequence: false
                });
                fs.writeFileSync(file, ret);
            }
        }
    });
    console.log('Packing asar archive');
    asar.createPackage(outputFolder + '\\.temp', outputFullFileName)
    .then(() => {
        console.log('Created secure asar archive');
        console.log('Deleting src directory');
        rimraf(outputFolder + '\\.temp', function () {
            console.log('Done! Have fun.');
        });
    });
});
*/