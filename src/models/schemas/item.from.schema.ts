import { z } from "zod";

export const addItemFormSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(1, "name is required"),
  color: z
    .string({ required_error: "color is required" })
    .trim()
    .min(1, "color is required"),
  categoryId: z
    .string({ required_error: "categoryId is required" })
    .trim()
    .min(1, "categoryId is required"),
});
