import Layout from "../../../components/layout";
import { useEffect } from "react";
import { Router } from "next/router";
import { isAuth } from "../../../actions/auth";
import Link from "next/link";
import BlogCreate from "../../../components/crud/blogcreate"

const Blog = () => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else if (isAuth().role !== 1) {
      Router.replace("/");
    }
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2 className="main-head">Create a new Blog</h2>
          </div>
          <div className="col-md-12">
            <BlogCreate />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
