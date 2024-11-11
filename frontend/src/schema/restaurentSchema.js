import { z } from "zod";

export let restaurentSchema = z.object({
  Restaurent: z.string().min(1, "name Your restaurent"),
  Address: z.string().min(1, "name Your Address"),
  Country: z.string().min(1, "name Your Country"),
  DeleveryTime: z.number().min(0, "delevery time cannot be negetive"),
  Cuisiens: z.array(z.string()).min(1, "name Your cuisiens"),
  RestaurentPhoto: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "file is required" }),
});
