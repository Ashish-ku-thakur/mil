import { z } from "zod";

export let addRestaurentMenuSchema = z.object({
  Name: z.string().min(1, "name Your restaurent"),
  Description: z.string().min(1, "name Your Address"),
  PriceInRupess: z.number().min(0, "delevery time cannot be negetive"),
  RestaurentMenuPhoto: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "file is required" }),
});
export default addRestaurentMenuSchema