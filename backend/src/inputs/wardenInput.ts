import z, { email } from "zod";

export const createWardenInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    mobNo: z.string()
})

export type createWardenInput = z.infer<typeof createWardenInput>