import Layout from '../../../components/layout';
import BlogUpdate from '../../../components/crud/blogupdate';
import { Router } from "next/router";
import { isAuth } from "../../../actions/auth";
import { useEffect } from "react";

const Blog = () => {

    useEffect(() => {
        if (!isAuth()) {
          Router.push("/signin");
        }
      }, []);

    return (
        
        <Layout>
      
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2 className="main-head">Update blog</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogUpdate />
                        </div>
                    </div>
                </div>
           
        </Layout>
    );
};

export default Blog;