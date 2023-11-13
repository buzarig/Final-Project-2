const Blog = require("../models/Blog");
const _ = require("lodash");

exports.addBlog = (req, res, next) => {
  const blogData = _.cloneDeep(req.body);

  console.log(req);
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      message: "Only admin users can add blogs.",
    });
  }

  const newBlog = new Blog(blogData);

  newBlog
    .save()
    .then((blog) => res.json(blog))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.updateBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      if (!blog) {
        return res.status(400).json({
          message: `Blog with _id "${req.params.id}" is not found.`,
        });
      } else {
        const blogData = _.cloneDeep(req.body);

        Blog.findOneAndUpdate(
          { _id: req.params.id },
          { $set: blogData },
          { new: true }
        )
          .then((blog) => res.json(blog))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id }).then(async (blog) => {
    if (!blog) {
      return res.status(400).json({
        message: `Blog with id "${req.params.id}" is not found.`,
      });
    } else {
      const blogToDelete = await Blog.findOne({
        _id: req.params.id,
      });

      Blog.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Blog with id "${blogToDelete._id}" is successfully deleted from DB.`,
            deletedBlogInfo: blogToDelete,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.getBlogs = (req, res, next) => {
  Blog.find()
    .then((blogs) => res.status(200).json(blogs))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getBlogsByFilters = async (req, res, next) => {
  const perPage = Number(req.query.perPage) || 10;
  const startPage = Number(req.query.startPage) || 1;
  const sort = req.query.sort || "-date";
  const category = req.query.category || null;

  try {
    const query = Blog.find();

    if (category) {
      query.where("category").equals(category);
    }

    const data = await query
      .skip(perPage * startPage - perPage)
      .limit(perPage)
      .sort(sort);

    const blogsQuantity = await Blog.countDocuments();

    res.json({ data, blogsQuantity });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};
