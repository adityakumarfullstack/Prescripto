import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {
        const { doctortoken } = req.headers;

        // console.log("Received token:", doctortoken);

        if (!doctortoken) {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please login first",
            });
        }

        const decoded_token = jwt.verify(
            doctortoken,
            process.env.JWT_SECRET
        );

        // console.log("Decoded token:", decoded_token);

        req.doctorId = decoded_token.id;

        next();

    } catch (error) {
        // console.log("JWT ERROR:", error);

        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export default authDoctor