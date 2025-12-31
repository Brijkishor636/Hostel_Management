import z, { email } from "zod";

export const createUserInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    mobNo: z.string()
})

export const updateUserInput = z.object({
    name: z.string().optional(),
    mobNo: z.string().optional(),
    isActive: z.boolean().optional()
})

export type updateUserInput = z.infer<typeof updateUserInput>
export type createUserInput = z.infer<typeof createUserInput>