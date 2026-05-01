import z from "zod";

export const allocateRoomsInput = z.object({
    studentId: z.string(),
    roomNo: z.string().min(1)
})

export const createRoomsInput = z.object({
  rooms: z.array(
    z.object({
      roomNo: z.string().min(1),
      capacity: z.number().min(1)
    })
  ).min(1)
});

export const updateRoomInput = z.object({
  capacity: z.number().int().positive(),
});


export type createRoomInput = z.infer<typeof createRoomsInput>
export type allocateRoomsInput = z.infer<typeof allocateRoomsInput>
export type updateRoomInput = z.infer<typeof updateRoomInput>