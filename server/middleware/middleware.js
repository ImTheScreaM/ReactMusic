const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parse(req.body);
        next();
    } catch (error) {
        return res.json({status:"Error validate"})
    }
};

export default validate
