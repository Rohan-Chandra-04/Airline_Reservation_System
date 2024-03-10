
import {z} from 'zod';

export const passengerLoginInput = z.object({
    P_Email: z.string().email(),
    P_Password: z.string().min(6).max(100),
})