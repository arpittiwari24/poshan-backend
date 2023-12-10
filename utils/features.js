import jwt from "jsonwebtoken"

 export const storeCookie = (user, res, message, statusCode = 200 ) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    
    res.status(statusCode).cookie("token",token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({message})
}

export const storeAdminCookie = (user, res, message, statusCode = 200 ) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    
    res.status(statusCode).cookie("admin_token",token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({message})
}
