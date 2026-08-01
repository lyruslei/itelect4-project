// ===== INTERFACES (Part 1) =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number; // optional field
}

// ===== TYPE ALIASES (Part 1) =====
export type ID = number | string;
export type Coordinate = { x: number; y: number };
export type Formatter = (value: number) => string;
export type StringOrNumber = string | number;
export type Status = "pending" | "active" | "inactive";

export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa: number;
};

// ===== GENERIC INTERFACE (New for GT1 Part 2) =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES (New for GT1 Part 2) =====
// Partial: makes all fields optional (great for update payloads)
export type UserUpdate = Partial<User>;

// Pick: keeps ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;

// Omit: keeps every field EXCEPT the listed ones (safe for public display)
export type PublicUser = Omit<User, "email" | "isActive">;

// Record: maps a fixed set of keys to the same value type
export type RoleCount = Record<"student" | "admin" | "instructor", number>;

// ===== ENUMS (New for GT1 Part 2) =====
// Regular enum: exists at runtime, supports reverse mapping
export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
}

// Const enum: inlined at compile time for zero runtime overhead
export const enum Role {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}