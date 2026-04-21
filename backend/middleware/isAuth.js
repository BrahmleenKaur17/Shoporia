import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verifyToken.userId; //

    next();
  } catch (error) {
    console.log("isAuth error", error);
    return res.status(500).json({ message: "isAuth error" });
  }
};

export default isAuth;
