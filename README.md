# GT1 Part 2 — ITElect4 Project

A small TypeScript project that models a course submission system with typed users, courses, and submissions, plus generic API response shapes and utility type helpers.

## Defined interfaces and types
- Interfaces: `User`, `Course`, `Submission`, `ApiResponse<T>`
- Utility types: `UserUpdate`, `UserPreview`, `PublicUser`, `RoleCount`
- Enums: `SubmissionStatus`, `Role`
- Additional type helpers: `ID`, `Coordinate`, `Formatter`, `BookGenre`, `StringOrNumber`, `Status`, `StudentWithCourse`
- Generic functions: `getFirst`, `getById`

## How to install and run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Verify TypeScript compiles with zero errors:
   ```bash
   npx tsc --noEmit
   ```
3. Run the source directly with ts-node:
   ```bash
   npx ts-node src/index.ts
   ```
4. Alternatively run the Vite development server:
   ```bash
   npm run dev
   ```

## Notes
- `types/index.ts` is the main source of truth for all interfaces and Part 2 additions.
- `src/types/index.ts` currently re-exports from the root `types/index.ts`.
- Use the `gt1` git tag when submitting:
  ```bash
  git tag -a gt1 -m "GT1 Part 2: generics, utility types, enums"
  git push origin gt1
  ```
