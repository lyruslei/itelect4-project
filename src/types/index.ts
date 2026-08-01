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

// ===== GENERIC INTERFACE =====
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<"student" | "admin" | "instructor", number>;

// ===== ENUMS =====
export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
}

export const enum Role {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}