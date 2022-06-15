import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { userPublicProfile } from "../../actions/user";
import moment from "moment";
import styled from "styled-components";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.username}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="mt-4 mb-4" key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a style={{ textDecoration: "underline" }} className="lead">
              {blog.title}
            </a>
          </Link>
        </div>
      );
    });
  };
  return (
    <>
      {head()}
      <Layout>
        <div style={{ marginTop: "100px" }} className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="container">
                <div
                  style={{
                    width: "100%",
                    border: "2px solid silver",
                    borderRadius: "5px",
                  }}
                  className="card-body"
                >
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="main-head">{user.name.toUpperCase()}</h5>
                      <p className="sub-head">
                        Joined {moment(user.updatedAt).fromNow()}
                      </p>
                      <h6 className="sub-head"> {user.about}</h6>
                    </div>
                    <div className="col-md-4">
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{
                          maxHeight: "200px",
                          maxWidth: "100%",
                          borderRadius: "50%",
                          marginTop: "20px",
                          boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                        }}
                        alt="user profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="">
                <div className="card-body text-center">
                  <h5
                    style={{
                      borderRadius: "5px",
                      boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                    }}
                    className="card-title bg-dark pt-2 pb-2 ps-2 pe-2 text-white"
                  >
                    Recent blogs by {user.name.toUpperCase()}
                  </h5>
                  {showUserBlogs()}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "" }} className="col-md-6">
              <div className="">
                <div className="card-body">
                  <h5
                    style={{
                      borderRadius: "5px",
                      boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                    }}
                    className="card-title bg-dark pt-2 pb-2 ps-2 pe-2 text-white"
                  >
                    Message {user.name.toUpperCase()}
                  </h5>
                  <form>
                    <div className="form-group">
                      <label className="sub-head">Name</label>
                      <input
                        // onChange={handleChange("username")}
                        type="text"
                        // value={username}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="sub-head">Email</label>
                      <input
                        // onChange={handleChange("name")}
                        type="text"
                        // value={name}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label className="sub-head">Message</label>
                      <textarea
                        // onChange={handleChange("email")}
                        type="text"
                        // value={email}
                        className="form-control"
                      />
                    </div>
                <button type="submit " className="mt-3 btn btn-dark">
                    Submit
                </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  console.log(query);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default UserProfile;
