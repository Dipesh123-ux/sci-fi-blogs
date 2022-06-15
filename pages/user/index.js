import Layout from "../../components/layout";
import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";
import Link from "next/link";

const UserIndex = () => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, []);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <h1 className="main-head">User Dashboard</h1>
        </div>
        <div className="all">
          <div className="row ">
            <div className="col-md-6">
              <Link href="/user/crud/blog">
                <a>
                  <div class="admin-option">
                    <div class="icon-set">
                      <i class="fa fa-pen"></i>
                    </div>
                    create Blog
                  </div>
                </a>
              </Link>
            </div>
            <div className="col-md-6">
              <Link href="/user/crud/blogs">
                <a>
                  <div class="admin-option ">
                    <div class="icon-set">
                      <i class="fa fa-edit"></i>
                    </div>
                    Update Blog
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Link href="/user/crud/blogs">
                <a>
                  <div class="admin-option">
                    <div class="icon-set">
                      <i class="fa fa-trash"></i>
                    </div>
                    Delete Blog
                  </div>
                </a>
              </Link>
            </div>
            <div className="col-md-6">
              <Link href="/user/update">
                <a>
                  <div class="admin-option">
                    <div class="icon-set">
                      <i class="fa fa-user"></i>
                    </div>
                    Update profile
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserIndex;
