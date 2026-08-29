import { z } from "zod";

export const itemSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(50, "Title must not exceed 50 characters"),
    location: z
      .string()
      .min(3, "Location must be at least 3 characters long"),
    description: z
      .string()
      .min(5, "Description must be at least 5 characters long"),
    status: z.enum(["lost", "found"], {
      message: "Status must be either lost or found",
    }),
  })
  .refine(
    (data) => data.description.trim().toLowerCase() !== data.title.trim().toLowerCase(),
    {
      message: "Description must provide additional details beyond the item title",
      path: ["description"],
    }
  );

export type ItemFormValues = z.infer<typeof itemSchema>;
