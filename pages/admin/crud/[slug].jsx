import Layout from "../../../components/layout";
import { useEffect } from "react";
import { Router } from "next/router";
import { isAuth } from "../../../actions/auth";
import Link from "next/link";
import BlogUpdate from "../../../components/crud/blogupdate"

const isA = isAuth() || false;

const UpdateBlog = () => {
  useEffect(() => {
    if (!isA) {
      Router.push("/signin");
    } 
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5 ms-4">
            <h2 className="main-head" >Update Blog</h2>
          </div>
          <div className="col-md-12">
            <BlogUpdate />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBlog;
