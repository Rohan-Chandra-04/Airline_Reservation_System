import {z} from "zod";

const passengerInput = z.object({
    P_FirstName: z.string(),
    P_LastName: z.string(),
    P_Email: z.coerce.string().email(),
    P_Password: z.coerce.string().min(6),
    P_PhoneNumber: z.coerce.string().min(10).max(10),
    P_Address: z.string(),
    P_City: z.string(),
    P_State: z.string(),
    P_Zipcode: z.string(),
    P_Country: z.string(),
});

export { passengerInput };