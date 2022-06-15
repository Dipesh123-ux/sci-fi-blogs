import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = ({username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error);
      } else {
        if(username){
          setBlogs(data)
        }
        else{
        setBlogs(data.blogs);
        }
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete your blog?");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    // if (isAuth() && isAuth().role == 0) {
    //   return <Link href={`/user/crud/${blog.slug}`}>
    //      <a className="btn btn-dark ms-2"><i className="fa fa-edit"></i></a>
    //     </Link>
    // } 
     if (isAuth() && isAuth().role == 1) {
      return  <Link href={`/user/crud/${blog.slug}`}>
          <a className="btn btn-dark ms-2"><i className="fa fa-edit"></i></a>
          </Link>
    }
  };

  const showAllBlogs = () => {
    if (blogs) {
      return blogs.map((blog, i) => {
        return (
          <div key={i} className="pb-5">
            <h3 className="sub-head" >{blog.title}</h3>
            <p style={{backgroundColor:"silver"}} className="mark">
              Written by {blog.postedBy.name} | Published on{" "}
              {moment(blog.updatedAt).fromNow()}
            </p>
            <button
              className="btn btn-dark"
              onClick={() => deleteConfirm(blog.slug)}
            >
             <i className="fa fa-trash" ></i>
            </button>
            {showUpdateButton(blog)}
          </div>
        );
      });
    }
  };

  const mouseMoveHandler = (e) => {
    setMessage(false);
  };

  return (
    <>
      <div onMouseMove={mouseMoveHandler} className="row">
        <div className="col-md-12">
          {message && <div className="show-result">{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </>
  );
};

export default BlogRead;
