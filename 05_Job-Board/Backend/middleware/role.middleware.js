export const isEmployer = (req, res, next) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Access denied. Employer only." });
  }
  next();
};
