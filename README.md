# GT1 Part 2 — ITElect4 Project

A TypeScript project that models a course submission system with typed users, courses, submissions, and advanced type features.

## Project overview
- Models a simple academic system using TypeScript types and interfaces
- Includes:
  - `User`, `Course`, `Submission`
  - special types: `any`, `unknown`, `never`
  - generics: `getFirst<T>`, `getById<T>`, `ApiResponse<T>`
  - utility types: `Partial`, `Pick`, `Omit`, `Record`, `ReturnType`
  - enums for submission status and user roles
  - type narrowing, union types, and intersection types

## Repository structure
- `src/index.ts` — main application entry point and examples
- `types/index.ts` — shared type definitions and interfaces
- `tsconfig.json` — TypeScript compiler configuration
- `package.json` — dependency definitions and package metadata

## Prerequisites
- Node.js
- npm

## Install
```bash
cd itelect4-project
npm install
```

## Run
```bash
npx ts-node src/index.ts
```

## Type-check
```bash
npx tsc --noEmit
```

## Build
```bash
npx tsc
```

## Notes
- This project currently uses `ts-node` for direct execution of TypeScript.
- The `package.json` currently includes development dependencies for `typescript`, `ts-node`, and `@types/node`.
- Update `src/index.ts` and `types/index.ts` to explore additional TypeScript concepts.
