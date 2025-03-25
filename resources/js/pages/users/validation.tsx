import { z } from 'zod';
const createUserSchema = z.object({
    name: z.string({
        message: `Name field cannot be null, fulfill this field!`
    }),
    phone: z.string({
        message: `Phone field cannot be null, fulfill this field!`
    }).max(16, {
        message: `Maximum digits for phone number is 16!`
    }),
    email: z.string({
        message: `Email field cannot be null, fulfill this field!`
    }).email({
        message: `Input valid email!`
    }),
    roles: z.enum(['admin', 'customer', 'courier'], {
        message: `Selected role doesn't match with our system (admin,customer,courier)!`
    })
});

const editUserSchema = z.object({
    name: z.string({
        message: `Name field cannot be null, fulfill this field!`
    }),
    phone: z.string({
        message: `Phone field cannot be null, fulfill this field!`
    }).max(16, {
        message: `Maximum digits for phone number is 16!`
    }),
    email: z.string({
        message: `Email field cannot be null, fulfill this field!`
    }).email({
        message: `Input valid email!`
    }),
    roles: z.enum(['admin', 'customer', 'courier'], {
        message: `Selected role doesn't match with our system (admin,customer,courier)!`
    })
});

export { createUserSchema, editUserSchema };
