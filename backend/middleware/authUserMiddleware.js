import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        const decoded_token = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded_token.id;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

export default authUser;