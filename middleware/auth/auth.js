const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer"
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("Token:", token);
    console.log("Secret:", process.env.JWT_SECRET);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).send("User is not authorized");
      }

      // Attach decoded information to req.user if needed
      req.user = decoded; // Make sure your JWT contains the necessary user info
      next();
    });
  } else {
    // Send response if token is missing or improperly formatted
    return res.status(401).send("User is not authorized or token is missing");
  }
};

const adminAuth = (req, res, next) => {
  try {
      // Extract token from Authorization header (Bearer Token)
      const completeToken =req.headers.Authorization || req.headers.authorization;
      //console.log("Complete ",completeToken);
      const token = completeToken.split(" ")[1];


     // console.log("token", token);
      
      // Verify the token and decode its payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the decoded token contains the isAdmin field and it's true
      if (!decoded.isAdmin) {
          return res.status(403).json({ message: "Access denied. Admins only." });
      }

      // Attach the decoded user info to the request object (for further use in route handlers)
      req.user = decoded;
      
      next();  // Move on to the next middleware or route handler
  } catch (error) {
    console.log("error", error);
      return res.status(401).json({ message: "Unauthorized access. Invalid or expired token." });
  }
};
module.exports = {validateToken,adminAuth};