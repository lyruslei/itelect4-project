// At the TOP of src/index.ts
import { createServer, type IncomingMessage, type ServerResponse } from "http";
import type { 
  User, 
  Course, 
  Submission, 
  ApiResponse, 
  UserUpdate, 
  UserPreview, 
  PublicUser, 
  RoleCount,
  BookGenre,
  StringOrNumber
} from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const libraryName: string = "ITE Library System";
const currentYear: number = 2026;
const isOpen: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(library: string, year: number): string {
  return `Welcome to ${library} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(libraryName, currentYear));

// ===== SPECIAL TYPES =====
let anything: any = "hello";
anything = 42;
anything = true;

console.log({
  isOpen,
  nothing,
  notSet,
  anything,
});

let userInput: unknown = "book search";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

function throwError(message: string): never {
  throw new Error(message);
}

const failFast = throwError;
void failFast;

// ===== USING INTERFACES =====
const member: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const book: Course = {
  code: "ISBN-978-3-16-148410-0",
  title: "Introduction to TypeScript",
  units: 5,
  semester: "Technology",
};

const borrowRecord: Submission = {
  id: 1,
  studentId: 1,
  courseCode: "ISBN-978-3-16-148410-0",
  repoUrl: "Return to Main Library",
  submittedAt: new Date(),
  score: 0,
};

console.log(member);
console.log(book);
console.log(borrowRecord);

// ===== TYPE NARROWING =====
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}

console.log(processInput("hello"));
console.log(processInput(3.14159));
console.log(formatDate(new Date()));

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

const firstUser = getFirst<User>([member]);
const foundUser = getById<User>([member], 1);

console.log(firstUser?.name);
console.log(foundUser?.email);

// ===== GENERIC INTERFACE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: member,
};

const booksResponse: ApiResponse<Course[]> = {
  success: true,
  data: [book],
};

console.log(userResponse.data.name);
console.log(booksResponse.data[0]?.title);

// ===== USING UTILITY TYPES =====
const patch: UserUpdate = { name: "Juan D. Cruz" };
const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" };
const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student" };
const roleCount: RoleCount = { student: 45, admin: 2, instructor: 3 };
console.log({ patch, preview, publicProfile, roleCount });

// ===== ReturnType<T> =====
function borrowBook(bookCode: string) {
  return { id: 1, userId: 1, bookCode, borrowedAt: new Date() };
}

type NewBorrowRecord = ReturnType<typeof borrowBook>;
const borrowRecord2: NewBorrowRecord = borrowBook("ISBN-978-3-16-148410-0");
console.log(borrowRecord2);

// ===== USING ENUMS =====
import { SubmissionStatus, Role } from "../types/index";

let status: SubmissionStatus = SubmissionStatus.Pending;
console.log(SubmissionStatus[status]); // "Pending"
status = SubmissionStatus.Graded;
console.log(status === SubmissionStatus.Graded); // true

const currentRole: Role = Role.Student;
console.log(currentRole); // "student"

// ===== USING BookGenre =====
function getBooksByGenre(books: Course[], genre: BookGenre): Course[] {
  return books.filter(book => book.semester === genre);
}

console.log(getBooksByGenre([book], "Technology"));

const host = "127.0.0.1";
const port = 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  void req;
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${libraryName}</title>
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        font-family: "Segoe UI", Arial, sans-serif;
        background: linear-gradient(135deg, #eff6ff, #f8fafc);
        color: #0f172a;
      }
      .container {
        max-width: 960px;
        margin: 0 auto;
        padding: 2.5rem 1.25rem 3rem;
      }
      .hero {
        background: linear-gradient(90deg, #2563eb, #3b82f6);
        color: white;
        border-radius: 22px;
        padding: 2rem;
        box-shadow: 0 12px 35px rgba(37, 99, 235, 0.25);
      }
      .hero h1 { margin: 0 0 0.5rem; font-size: 2rem; }
      .hero p { margin: 0; opacity: 0.95; }
      .buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin: 1.25rem 0;
      }
      button {
        border: none;
        padding: 0.8rem 1rem;
        border-radius: 999px;
        background: #1d4ed8;
        color: white;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 6px 16px rgba(29, 78, 216, 0.2);
      }
      button:hover { background: #1e40af; }
      .panel {
        background: white;
        border-radius: 18px;
        padding: 1rem 1.15rem;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
        max-height: 320px;
        overflow-y: auto;
      }
      .panel h2 { margin-top: 0; color: #1d4ed8; font-size: 1.1rem; }
      .pill {
        display: inline-block;
        padding: 0.3rem 0.7rem;
        border-radius: 999px;
        background: #dbeafe;
        color: #1d4ed8;
        font-size: 0.9rem;
        margin-bottom: 0.65rem;
      }
      ul { padding-left: 1rem; margin: 0.25rem 0 0; }
      li { margin-bottom: 0.35rem; }
    </style>
  </head>
  <body>
    <div class="container">
      <section class="hero">
        <span class="pill">TypeScript Demo</span>
        <h1>${libraryName}</h1>
        <p>Welcome to the ${libraryName} • AY ${currentYear}</p>
      </section>

      <div class="buttons">
        <button>Select Member</button>
        <button>Select Book</button>
        <button>Select Borrow Record</button>
        <button>Select Preview</button>
      </div>

      <div class="panel">
        <h2>Member</h2>
        <p><strong>Name:</strong> ${member.name}</p>
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Role:</strong> ${member.role}</p>
        <hr />
        <h2>Book</h2>
        <p><strong>Title:</strong> ${book.title}</p>
        <p><strong>Code:</strong> ${book.code}</p>
        <p><strong>Semester:</strong> ${book.semester}</p>
        <hr />
        <h2>Borrow Record</h2>
        <p><strong>Course Code:</strong> ${borrowRecord.courseCode}</p>
        <p><strong>Repo URL:</strong> ${borrowRecord.repoUrl}</p>
        <p><strong>Score:</strong> ${borrowRecord.score ?? "n/a"}</p>
        <hr />
        <h2>Preview</h2>
        <p><strong>ID:</strong> ${preview.id}</p>
        <p><strong>Name:</strong> ${preview.name}</p>
        <p><strong>Role:</strong> ${preview.role}</p>
        <hr />
        <h2>Role Counts</h2>
        <ul>
          <li>Students: ${roleCount.student}</li>
          <li>Admins: ${roleCount.admin}</li>
          <li>Instructors: ${roleCount.instructor}</li>
        </ul>
      </div>
    </div>
  </body>
</html>`;

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});