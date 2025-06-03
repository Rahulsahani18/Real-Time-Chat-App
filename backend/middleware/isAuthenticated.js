import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
     const token = req.cookies.token;
        if(!token) return res.status(401).json({error: 'Unauthorized'});
        //verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({error: 'Invalid token'});
        req.id = decoded.userId;
        next();
    }catch (err) {
      console.log(err);
    }
}

export default isAuthenticated;