import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const {aToken}=req.headers
        if (!aToken) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        const decoded_token = jwt.verify(aToken, process.env.JWT_SECRET);
        
        if(decoded_token !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({
                success: false,
                message: "Not authorized. Please try again!",
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

export default authAdmin