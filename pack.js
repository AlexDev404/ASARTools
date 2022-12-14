var fs = require('fs');
var path = require('path');
var recursive = require('recursive-readdir');
var rimraf = require('rimraf');
var asar = require('asar');

// Parse/Get CLI arguments using yargs -> http://yargs.js.org/
const argv = require('yargs')
    .command('$0 <input>', 'Pack <input> ASAR Directory', (yargs) => {
        yargs
            .positional('input', {
                describe: 'Input ASAR Directory',
                demandOption: true,
            })
}).argv;

// Set parameters from arguments
var asarFullFileName = path.normalize(argv.input);
var outputFullFileName = (argv.output) ? path.normalize(argv.output) : asarFullFileName + ".asar";
var outputFolder = path.dirname(outputFullFileName);

// Set your resources folder
var resourcesFolder = path.dirname(asarFullFileName);

console.log('\n\nASAR Package Javascript Packer\n\n');

//console.log('Deleting app.asar');
//fs.unlinkSync(resourcesFolder + '\\app.asar');

//process.exit(0);

    console.log(`Packing asar archive (${argv.input}.asar)`);
    asar.createPackage(`${argv.input}`, outputFullFileName)
    .then(() => {
        console.log('Created secure ASAR Archive!');
        console.log('All done! Have fun.');
    });
