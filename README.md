## Fork

This project has been [forked](https://github.com/adamcarr/typescript-definition-tester), due to inactivity of the original project. The purpose of this fork is primarily as a testing tool for [express-promise-router](https://github.com/express-promise-router/express-promise-router).

## Purpose

The purpose of this project is to wrap the TypeScript compiler so that a consumer can easily test their ambient module declarations against example \*.ts files.
This module uses chai assertions so that a user can easily add this step to existing unit test infrastructure.

## Install

Add typescript-definition-tester to your devDependencies property in your package.json file

```
npm install @mormahr/typescript-definition-tester --save-dev
```

## Testing

The recommended way to test ambient module declarations is to create an "examples" directory in your test folder. Then, you can pull in these \*.ts example files
in a single test file that will pass these files to the TypeScript compiler.

Example:

```
/// <reference path="../typings/tsd.d.ts" />

import * as ts from "typescript";
import * as tt from "typescript-definition-tester";
import * as fs from "fs";
import * as chai from "chai";

describe('ambient declaration tests', () => {
    it('should compile examples successfully against my-module.d.ts', (done) => {
        tt.compileDirectory(
            __dirname + '/examples',
            (fileName: string) => fileName.indexOf('.ts') > -1,
            () => done()
            );
    });
});
```

You should be able to run this test file with mocha `mocha test/my-test-file.js`. The above example is written in TypeScript. You will need to compile this using `tsc --module commonjs test/my-test-file.js` or you can just write your test using normal JavaScript.
