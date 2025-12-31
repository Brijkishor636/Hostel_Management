import z from "zod"

export const updateSelfDetail = z.object({
    name: z.string().optional(),
    mobNo: z.string().optional(),
    regNo: z.string().optional()
})

export type updateSelfDetail = z.infer<typeof updateSelfDetail>