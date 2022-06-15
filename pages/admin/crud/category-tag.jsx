import Layout from "../../../components/Layout";
import { useEffect } from "react";
import { Router } from "next/router";
import { isAuth } from "../../../actions/auth";
import Link from "next/link";
import Category from "../../../components/crud/category";
import Tag from "../../../components/crud/tag";

const CategoryTag = () => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else if (isAuth().role !== 1) {
      Router.push("/");
    }
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2 className="main-head" >Manage Categories and Tags</h2>
          </div>
          <div className="col-md-6">
            <p className="main-head" >Categories</p>
            <Category />
          </div>
          <div className="col-md-6">
            <p className="main-head" >Tags</p>
            <Tag />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryTag;
