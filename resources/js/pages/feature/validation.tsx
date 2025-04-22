import { z } from "zod";
const createFeatureSchema = z.object({
    name: z.string({
        message: `Name field cannot be null, fulfill this field!`
    }),
    description: z.string({
        message: `Description field cannot be null, fulfill this field!`
    }),
    picture: z.instanceof(File)
    .refine((file) => ['image/jpg', 'image/png', 'image/jpeg'].includes(file.type), {
        message: `Only image with format jpg, png, jpeg is allowed!`
    })
    .refine((file) => file.size <= 4000000, {
        message: `File cannot grather than 4MB`
    }),
    price: z.string({
        message: `Price field cannot be null, fulfill this field!`
    })
});

const editFeatureSchema = z.object({
    name: z.string({
        message: `Name field cannot be null, fulfill this field!`
    }),
    description: z.string({
        message: `Description field cannot be null, fulfill this field!`
    }),
    picture: z.instanceof(File)
    .refine((file) => ['image/jpg', 'image/png', 'image/jpeg'].includes(file.type), {
        message: `Only image with format jpg, png, jpeg is allowed!`
    })
    .refine((file) => file.size <= 4000000, {
        message: `File cannot grather than 4MB`
    })
    .optional()
    .or(z.literal(null)),
    price: z.string({
        message: `Price field cannot be null, fulfill this field!`
    })
});
export { createFeatureSchema, editFeatureSchema };
