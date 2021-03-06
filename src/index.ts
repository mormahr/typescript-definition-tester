import AssertionError from 'assertion-error';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as ts from 'typescript';

var defaultCompilerOptions: ts.CompilerOptions = {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
};

function handleDiagnostics(
  type: string,
  diagnostics: ReadonlyArray<ts.Diagnostic>
) {
  diagnostics.forEach((diagnostic) => {
    const { file, start, messageText } = diagnostic;

    if (file === undefined || start === undefined) {
      throw new AssertionError(`{type}: ${messageText}`);
    }

    var { line, character } = file.getLineAndCharacterOfPosition(start);
    var message = ts.flattenDiagnosticMessageText(messageText, '\n');
    throw new AssertionError(
      `${type}: ${file.fileName} (${line + 1},${character + 1}): ${message}`,
      {
        actual: diagnostic,
      }
    );
  });
}

export type DoneFunction = (err: any, results?: string[]) => void;
export type FilterFunction = (fileName: string) => boolean;

export function compile(
  fileNames: string[],
  options: ts.CompilerOptions,
  done: Function
): void {
  try {
    const program = ts.createProgram(fileNames, options);

    // TODO: this is generating errors so disabling for now. Will continue to investigate.
    // handleDiagnostics('Declaration', program.getDeclarationDiagnostics());
    handleDiagnostics('Global', program.getGlobalDiagnostics());
    handleDiagnostics('Semantic', program.getSemanticDiagnostics());
    handleDiagnostics('Syntactic', program.getSyntacticDiagnostics());
    done();
  } catch (e) {
    done(e);
  }
}

export function compileDirectory(path: string, done: Function): void;
export function compileDirectory(
  path: string,
  options: ts.CompilerOptions,
  done: Function
): void;
export function compileDirectory(
  path: string,
  filter: FilterFunction,
  done: Function
): void;
export function compileDirectory(
  path: string,
  filter: FilterFunction,
  options: ts.CompilerOptions,
  done: Function
): void;
export function compileDirectory(
  path: string,
  filter?: any,
  options?: any,
  done?: Function
): void {
  if (!done) {
    if (!options) {
      done = filter;
      filter = undefined;
    } else {
      done = options;
      if (!_.isFunction(filter)) {
        options = filter;
        options = undefined;
      }
    }
  }

  options = _.merge(defaultCompilerOptions, options || {});

  walk(path, filter, (err, results) => {
    if (err || results === undefined) {
      console.log('error error error');
      throw new AssertionError('Error while walking directory for files.', {
        actual: err,
      });
    } else {
      compile(results, options, done!);
    }
  });
}

export function walk(dir: string, done: DoneFunction): void;
export function walk(
  dir: string,
  filter: FilterFunction,
  done: DoneFunction
): void;
export function walk(
  dir: string,
  filter: FilterFunction | DoneFunction,
  done?: DoneFunction
): void {
  if (!done) {
    done = filter;
    // @ts-ignore
    filter = undefined;
  }

  var results: string[] = [];
  fs.readdir(dir, function (err, list) {
    if (err) {
      return done!(err);
    }
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done!(null, results);
      file = dir + '/' + file;
      fs.stat(file, function (_err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (_err, res) {
            results = results.concat(res!);
            next();
          });
        } else {
          if (!filter || (filter as FilterFunction)(file)) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
}
