import * as ts from "typescript";
export declare type DoneFunction = (err: any, results?: string[]) => void;
export declare type FilterFunction = (fileName: string) => boolean;
export declare function compile(
  fileNames: string[],
  options: ts.CompilerOptions,
  done: Function
): void;
export declare function compileDirectory(path: string, done: Function): void;
export declare function compileDirectory(
  path: string,
  options: ts.CompilerOptions,
  done: Function
): void;
export declare function compileDirectory(
  path: string,
  filter: FilterFunction,
  done: Function
): void;
export declare function compileDirectory(
  path: string,
  filter: FilterFunction,
  options: ts.CompilerOptions,
  done: Function
): void;
export declare function walk(dir: string, done: DoneFunction): void;
export declare function walk(
  dir: string,
  filter: FilterFunction,
  done: DoneFunction
): void;
