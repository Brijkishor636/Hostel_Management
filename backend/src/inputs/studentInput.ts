import z, { email } from "zod";

export const createStudentInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    mobNo: z.string(),
    regNo: z.string()
})

export const updateStudentSchema = z.object({
    name: z.string().optional(),
    mobNo: z.string().optional(),
    regNo: z.string(),
    isActive: z.boolean().optional()
});


export type updateStudentSchema = z.infer<typeof updateStudentSchema>
export type createStudentInput = z.infer<typeof createStudentInput>