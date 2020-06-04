// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../typescript

declare module "@mormahr/typescript-definition-tester" {
  import * as ts from "typescript";
  export type DoneFunction = (err: any, results?: string[]) => void;
  export type FilterFunction = (fileName: string) => boolean;
  export function compile(
    fileNames: string[],
    options: ts.CompilerOptions,
    done: Function
  ): void;
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
  export function walk(dir: string, done: DoneFunction): void;
  export function walk(
    dir: string,
    filter: FilterFunction,
    done: DoneFunction
  ): void;
}
