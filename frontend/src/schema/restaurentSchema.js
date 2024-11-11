import { z } from "zod";

export let restaurentSchema = z.object({
  restaurentName: z.string().min(1, "name Your restaurentName"),
  city: z.string().min(1, "name Your city"),
  country: z.string().min(1, "name Your country"),
  deleveryTime: z.number().min(0, "delevery time cannot be negetive"),
  cuisiens: z.array(z.string()).min(1, "name Your cuisiens"),
  restaurentPhoto: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "file is required" }),
});
