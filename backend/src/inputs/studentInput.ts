import z, { email } from "zod";

export const createStudentInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    mobNo: z.string(),
    regNo: z.string(),
    roomNo: z.string().min(3).optional()
})

export const updateStudentSchema = z.object({
    name: z.string().optional(),
    mobNo: z.string().optional(),
    regNo: z.string().optional(),
    isActive: z.boolean().optional(),
    roomNo: z.string().min(3).optional()
});


export type updateStudentSchema = z.infer<typeof updateStudentSchema>
export type createStudentInput = z.infer<typeof createStudentInput>