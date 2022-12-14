const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");
const dir = "output";

// Parse/Get CLI arguments using yargs -> http://yargs.js.org/
const argv = require("yargs").command(
   "$0 <input>",
   "Pack <input> JavaScript Directory",
   (yargs) => {
      yargs.positional("input", {
         describe: "Input Javascript Folder",
         demandOption: true,
      });
   }
).argv;

const traverse = function (dir, result = []) {
   // list files in directory and loop through
   fs.readdirSync(dir).forEach((file) => {
      // builds full path of file
      const fPath = path.resolve(dir, file);

      // prepare stats obj
      const fileStats = { file, path: fPath };

      // is the file a directory ?
      // if yes, traverse it also, if no just add it to the result
      if (fs.statSync(fPath).isDirectory()) {
         fileStats.type = "dir";
         fileStats.files = [];
         result.push(fileStats);

         // Make recursive
         // return traverse(fPath, fileStats.files);
         traverse(fPath, result);
         return;
      }

      fileStats.type = "file";
      result.push(fileStats);
   });
   return result;
};

const t = traverse(process.argv[2]);
console.log("\nJavaScript Obfuscator");
console.log(`© ${new Date().getFullYear()} Immanuel Garcia\n\n`);

t.forEach((x) => {
   if (x.type === "file") {
      if (path.extname(x.file) === ".js") {
         const data = fs.readFileSync(x.path, { encoding: "utf8", flag: "r" });

         console.log(`READING: "${x.file}", `, x.type, `, (${x.path})`);

         //  Obfuscate the code
         let obfuscationResult = JavaScriptObfuscator.obfuscate(data, {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.5,
		deadCodeInjection: true,
		deadCodeInjectionThreshold: 0.8,
		debugProtection: true,
		debugProtectionInterval: true,
		disableConsoleOutput: true,
		selfDefending: true,
		splitStrings: true,
		splitStringsChunkLength: 100,
		ignoreRequireImports: true,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1,
         });

         if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
               recursive: true,
            });
         }

         fs.writeFileSync(
            path.join(dir, x.file),
            obfuscationResult.getObfuscatedCode(),
            "utf-8"
         );
         console.log(`OUTPUT TO: "${path.join(dir, x.file)}"\n`);
      }
   }
});
console.log(`OUTPUT FILES TO: "${path.join(dir)}\\"`);