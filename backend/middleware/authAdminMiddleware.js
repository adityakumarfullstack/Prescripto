/* import jwt from "jsonwebtoken";

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

export default authAdmin */

import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
   
        console.log("Headers:", req.headers);

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

        console.log(
            "Expected:",
            process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        );

        if (
            decoded_token !==
            process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
        ) {
            //TOKEN DOES NOT MATCH

            return res.status(401).json({
                success: false,
                message: "Not authorized. Please try again!",
            });
        }

         //ADMIN AUTHENTICATED

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Error: ${error.message}`,
        });
    }
};

export default authAdmin;