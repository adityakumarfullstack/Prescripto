import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
   

        const { atoken } = req.headers;
        //The reason we are recieving 'atoken' instead of 'aToken' is because The HTTP header names are case-insensitive, and Node.js/Express normalizes incoming request header names to lowercase.

        // console.log("Received atoken:", atoken);

        if (!atoken) {
            // console.log("TOKEN NOT RECEIVED");

            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        // console.log("TOKEN RECEIVED");

        const decoded_token = jwt.verify(
            atoken,
            process.env.JWT_SECRET
        );

        // console.log(" JWT VERIFIED");
        // console.log("Decoded token:", decoded_token);

        req.body.userId=decoded_token.id

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

export default authUser;