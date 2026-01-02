import z from "zod";

export const allocateRoomsInput = z.object({
    studnetId: z.string(),
    roomNo: z.string().min(3)
})

export const createRoomsInput = z.object({
  rooms: z.array(
    z.object({
      roomNo: z.string().min(3)
    })
  ).min(1)
});

export const updateRoomInput = z.object({
  roomNo: z.string().optional(),
  capacity: z.number().int().positive().optional()
});



export type createRoomInput = z.infer<typeof createRoomsInput>
export type allocateRoomsInput = z.infer<typeof allocateRoomsInput>
export type updateRoomInput = z.infer<typeof updateRoomInput>