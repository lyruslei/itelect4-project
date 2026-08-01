import type { 
  User, Course, Submission, StringOrNumber, 
  ApiResponse, UserUpdate, UserPreview, PublicUser, RoleCount 
} from "../types/index";
import { SubmissionStatus, Role } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "itelect4-project";
const currentYear: number = 2026;
const isFullStack: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====
let anything: any = "hello"; // Explicit 'any' is allowed, though generally avoided
anything = 42; 

let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); 
}

function throwError(message: string): never {
  throw new Error(message);
}

// ===== USING INTERFACES =====
const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

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

// ==========================================
// ===== GT1 PART 2 ADDITIONS BELOW =====
// ==========================================

// ===== GENERIC FUNCTIONS =====
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const firstUser = getFirst<User>([student]);
const foundUser = getById<User>([student], 1);
console.log("\n--- Generics ---");
console.log("First User:", firstUser?.name); 
console.log("Found User Email:", foundUser?.email);

// ===== USING GENERIC INTERFACE =====
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
  message: "User fetched successfully"
};

const courseResponse: ApiResponse<Course[]> = {
  success: true,
  data: [course]
};
console.log("\n--- Generic Interface ---");
console.log("API Response Name:", userResponse.data.name);

// ===== USING UTILITY TYPES =====
console.log("\n--- Utility Types ---");
const patch: UserUpdate = { name: "Juan D. Cruz" }; // Partial
console.log("UserUpdate (Partial):", patch);

const preview: UserPreview = { id: 1, name: "Juan dela Cruz", role: "student" }; // Pick
console.log("UserPreview (Pick):", preview);

const publicProfile: PublicUser = { id: 1, name: "Juan dela Cruz", role: "student" }; // Omit
console.log("PublicUser (Omit):", publicProfile);

const roleCount: RoleCount = { student: 45, admin: 2, instructor: 3 }; // Record
console.log("RoleCount (Record):", roleCount);

function makeSubmission(courseCode: string) {
  return {
    id: 1,
    studentId: 1,
    courseCode,
    repoUrl: "https://github.com/user/repo",
    submittedAt: new Date(),
  };
}

// ReturnType: infers the shape directly from the function
type NewSubmission = ReturnType<typeof makeSubmission>;
const gt1Submission: NewSubmission = makeSubmission("ITELECT4");
console.log("NewSubmission (ReturnType):", gt1Submission);

// ===== USING ENUMS =====
console.log("\n--- Enums ---");
let status: SubmissionStatus = SubmissionStatus.Pending;
console.log("Regular Enum (Reverse Mapping):", SubmissionStatus[status]); // "Pending"

status = SubmissionStatus.Graded;
console.log("Regular Enum Comparison:", status === SubmissionStatus.Graded); // true

const currentRole: Role = Role.Student;
console.log("Const Enum Value:", currentRole); // "student"