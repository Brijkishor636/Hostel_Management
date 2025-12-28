import z from "zod";
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type SigninInput = z.infer<typeof signinInput>;
