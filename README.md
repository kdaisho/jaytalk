<img src="./logo.webp" style="float: right; width: 90px">

<h1 style="border: none">Moth</h1>

A sleek and engaging language that transpiles to JavaScript, crafted with TypeScript atop Bun.js.

## Required

[Bun.js](https://bun.sh/)

## Try it out

1. Install dependencies (either `bun install` or `npm install` should work)

```bash
pnpm install
```

2. Build

```bash
bun build ./src/moth.ts --compile --outfile ./bin/moth
```

3. Register the current package (moth) as a "linkable" package.

```bash
bun link
```

4. Run moth repl

```bash
moth
```

## Standard library

Moth currently supports the following syntax:

-   Summation: `(add 1 2)`
-   Subtraction: `(subtract 2 1)`
-   Multiplication: `(multiply 2 2)`
-   Division: `(divide 4 2)`
-   Modulo: `(modulo 5 2)`
-   Max: `(max 10 5 3 8)`
-   Min: `(min 10 5 3 8)`
-   PI: `(pi)`
-   Log: `(log "Hello, world!")`
-   Variable declaration: `(define myName "Moth")`

Usage example: `(add 1 (subtract 2 3))`

## Development notes

### The stages of a compiler

-   Parsing: Take the source code and turn it into a representation of that
    code.
-   Transformation: Take that source code and transforms it to do whatever the
    compiler wants it to do.
-   Generation: Take the transformed representation and turns it into a new
    string of code.
