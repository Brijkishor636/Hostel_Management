import z from "zod";

export const allocateRoomsInput = z.object({
    studnetId: z.string().uuid(),
    roomNumber: z.string().min(3)
})