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
  });
  
  const loginSchema = z.object({
    email: z.string(),
  });


  return {registerSchema,loginSchema}
}