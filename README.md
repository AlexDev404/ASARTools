# ASARTools

Just a small repository that includes tools for unpacking, packing and obfuscating an ASAR/JavaScript file


## To Run
- Use the following to get usage instructions


```shell
node <tool>

```

## Pack.JS
```shell
pack <input>

Pack <input> ASAR Directory

Positionals:
  input  Input ASAR Directory

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Unpack.JS
```shell
unpack <input> [output]

Obfuscate <input> ASAR file

Positionals:
  input  input ASAR file to be unpacked

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  --output, -o  output ASAR file                                 [default: null]
```

## Obfuscate.JS
```shell
obfuscate <input>

Pack <input> JavaScript Directory

Positionals:
  input  Input Javascript Folder

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```
