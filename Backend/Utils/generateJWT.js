import jwt from "jsonwebtoken";

const generateJWTandCookie = (uesrId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000
    });


}

export default generateJWTandCookie;