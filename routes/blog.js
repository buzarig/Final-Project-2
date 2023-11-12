const express = require("express");
const router = express.Router();
const passport = require("passport"); // Passport for authentication (if needed)

// Import controllers for blogs
const {
  addBlog,
  updateBlog,
  deleteBlog,
  getBlogsByFilters,
  getBlogs,
} = require("../controllers/blog");

// @route   POST /blogs
// @desc    Add a new blog
// @access  Private (if authentication is required)
router.post("/", passport.authenticate("jwt", { session: false }), addBlog);

// @route   PUT /blogs/:id
// @desc    Update an existing blog
// @access  Private (if authentication is required)
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateBlog
);

router.get("/filter", getBlogsByFilters);

// @route   DELETE /blogs/:id
// @desc    Delete an existing blog
// @access  Private (if authentication is required)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBlog
);

// @route   GET /blogs
// @desc    Get all existing blogs
// @access  Public (no authentication required)
router.get("/", getBlogs);

module.exports = router;
