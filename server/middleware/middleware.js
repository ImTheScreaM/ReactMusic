import { z } from "zod";

export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parse(req.body);
        next();
    } catch (error) {
        return res.json({status:"Error validate"})
    }
};

export const auth_schema = () => {
  const registerSchema = z.object({
    name: z.string().min(8),
    password: z.string().min(12),
    email: z.string().email(),
  });
  
  const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(9, "Pls write pass with 9 symbol"),
  });


  return {registerSchema,loginSchema}
}