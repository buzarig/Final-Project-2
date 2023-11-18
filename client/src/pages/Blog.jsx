/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useState, useEffect } from "react";
import "../styles/_blog.scss";
import { useLocation } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { format } from "date-fns";
import api from "../http/api";

function Blog() {
  const location = useLocation();

  const [blogData, setBlogData] = useState([]);

  const fetchBlogData = useCallback(
    async (category) => {
      try {
        const queryParams = `category=${category}&sort=-date`;
        const response = await api.get(`/blogs/filter?${queryParams}`);

        if (response.status === 200) {
          const blog = response.data.data;
          setBlogData(blog);

          // Update query parameters in the address bar
          const searchParams = new URLSearchParams(location.search);
          searchParams.set("category", category);
          searchParams.set("sort", "-date");

          // Replace the current location with the updated query parameters
          window.history.replaceState(
            {},
            "",
            `${location.pathname}?${searchParams.toString()}`
          );
        } else {
          console.log("Произошла ошибка при получении данных о продукте.");
        }
      } catch (error) {
        console.error("Ошибка при получении данных о продукте:", error);
      }
    },
    [location]
  );

  useEffect(() => {
    fetchBlogData("Fashion");
  }, [fetchBlogData]);

  return (
    <div className="blog-container">
      <div className="blog-content">
        <div className="categories">
          <h1>Blog</h1>
          <h2>Categories</h2>
          <ul className="categories-list">
            <li>
              <button type="button" onClick={() => fetchBlogData("Fashion")}>
                Fashion
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => fetchBlogData("Accessories")}
              >
                Accessories
              </button>
            </li>
          </ul>
        </div>
        <div className="blogs">
          {blogData.map((item) => (
            <div key={item._id} className="grid-item">
              {blogData.length === 0 ? (
                <ColorRing
                  visible
                  height="70"
                  width="70"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["#0000"]}
                />
              ) : (
                <>
                  <div className="image-container">
                    <img src={item.blogImage} alt="" />
                  </div>
                  <div className="item-content">
                    <span className="date">
                      {format(new Date(item.date), "d MMMM, yyyy")}
                    </span>
                    <h1 className="item-title">{item.title}</h1>
                    <p className="item-text">{item.content}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Blog;
