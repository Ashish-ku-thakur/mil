import { z } from "zod";

export let addRestaurentMenuSchema = z.object({
  name: z.string().min(1, "name Your restaurent"),
  description: z.string().min(1, "name Your Address"),
  price: z.number().min(0, "delevery time cannot be negetive"),
  menuPhoto: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "file is required" }),
});


export default addRestaurentMenuSchema