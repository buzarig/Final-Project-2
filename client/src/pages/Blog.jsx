import React, { useCallback, useState, useEffect } from "react";
import api from "../http/api";

function Blog() {
  const [blogData, setBlogData] = useState([]);

  const fetchBlogData = useCallback(async () => {
    try {
      const response = await api.get(`/blogs`);

      if (response.status === 200) {
        const blog = response.data;
        setBlogData(blog);
      } else {
        console.log("Произошла ошибка при получении данных о продукте.");
      }
    } catch (error) {
      console.error("Ошибка при получении данных о продукте:", error);
    }
  }, []);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      <div className="blog-content">
        <div className="categories">
          <h2>Categories</h2>
          <ul className="categories-list">
            <li>Fashion</li>
            <li>Accessories</li>
          </ul>
        </div>
        <div className="blogs">{blogData.map((item) => console.log(item))}</div>
      </div>
    </div>
  );
}
export default Blog;
