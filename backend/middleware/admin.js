const adminMiddleware = (req, res, next) => {
  // authMiddleware must be called before this to populate req.user
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin role required." });
  }

  next();
};

export default adminMiddleware;
