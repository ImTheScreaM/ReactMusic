const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parse(req.body);
        next();
    } catch (error) {
        return console.log("Error schema");
    }
};

export default validate