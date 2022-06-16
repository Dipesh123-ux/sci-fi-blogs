import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { singleBlog, relatedBlogs } from "../../actions/blog";
import renderHTML from "react-render-html";
import moment from "moment";
import styled from "styled-components";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import SmallCard from "../../components/blog/smallCard";
import DisqusThread from "../../components/disqus";

const SingleBlog = ({ query, blog }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    relatedBlogs({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link title="category" key={i} href={`/categories/${c.slug}`}>
        <a className="tag cat-all t-one mt-2 me-1">{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link title="tag" key={i} href={`/tags/${t.slug}`}>
        <a className="tag tag-all mt-2 me-1">#{t.name}</a>
      </Link>
    ));

  const showRelatedBlogs = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <SmallCard blog={blog}></SmallCard>
      </div>
    ));
  };

  const showComments = () => {
    return (
      <div  >
        <DisqusThread style={{color:"white"}}
          id={blog._id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        ></DisqusThread>
      </div>
    );
  };

  return (
    <>
      {head()}
      <Layout>
        <Body>
          <article>
            <div className="container-fluid mt-5">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold  main-head">
                    {blog.title}
                  </h1>
                  <p style={{backgroundColor:"silver",borderRadius:"5px"}} className="lead mt-3 mark">
                    Written by{" "}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a style={{color:"black"}} >{blog.postedBy.name}</a>
                    </Link>{" "}
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className="d-flex flex-wrap">
                    {showBlogCategories(blog)}
                    </div>
                    <br />
                    <div className="d-flex flex-wrap">
                    {showBlogTags(blog)}
                  </div>
                </div>
              </section>
            </div>

            <div className="container-fluid">
                <div style={{wordWrap:"break-word"}} className="sub-head">{renderHTML(blog.body)}</div>
              
            </div>

            <div className="container">
              <h4 className="text-center pt-5 pb-5 h2 main-head">Related blogs</h4>
              <hr />
              <div className="row">{showRelatedBlogs()}</div>
            </div>

            <div className="container pb-5 mt-3 pt-3 text-white">{showComments()}</div>
          </article>
        </Body>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blog: data,
        query,
      };
    }
  });
};

const Body = styled.div`
  margin-top: 90px;
`;

export default withRouter(SingleBlog);
