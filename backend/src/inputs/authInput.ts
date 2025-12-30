import z from "zod"

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})

export type SigninInput = z.infer<typeof signinInput>