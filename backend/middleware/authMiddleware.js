const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies && req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ message: "Admin required" });
};

module.exports = { protect, admin };
