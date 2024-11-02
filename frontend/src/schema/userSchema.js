import { z } from "zod";

export let userSignupSchema = z.object({
  fullname: z.string().min(2, "Fullname at lest 3 charecter"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 charecter"),
  contact: z.string().min(10, "contact number must be 10 charecter"),
});

export let userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 charecter"),
});
