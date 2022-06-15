import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { useState } from "react";
import { withRouter } from "next/router";
import { listAllBlogsCatAndTag } from "../../actions/blog";
import Card from "../../components/blog/card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import Search from "../../components/blog/search";


const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogsSkip,
  router,
}) => {
  const head = () => {
    return (
      <Head>
        <title>Blogs And Blogs | {APP_NAME}</title>
        <meta
          name="description"
          content="all kinds of blogs with sci-fi ,technology and machine learning "
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta
          property="og:title"
          content={`Latest blogs with great science technologies | ${APP_NAME}`}
        />
        <meta
          property="og:description"
          content="Science fiction blogs with some advanced technologies like machine learning and blockchain"
        />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:type" content="website" />
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
  };

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(blogsSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listAllBlogsCatAndTag(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setLoadedBlogs([...loadedBlogs, ...data.blogs]);
      setSize(data.size);
      setSkip(toSkip);
    });
  };

  const loadMoreBtn = () => {
    return (
      size > 0 &&
      size >= limit && (
        <i onClick={loadMore} className="fa fa-arrow-down load-more"></i>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="tag cat-all ms-1 mt-3">{c.name}</a>
      </Link>
    ));
  };
  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="tag tag-all ms-1 mt-3">#{t.name}</a>
      </Link>
    ));
  };

  const showLoadedBlog = () => {
    return loadedBlogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog}></Card>
        </article>
      );
    });
  };

  return (
    <>
      {head()}
      <Layout>
          <Search />
     
    

        <main>
          <div className="mt-5 container-fluid d-flex justify-content-center">
            <header>
              <div className="col-md-12 pt-3">
                <h2 className="font-weight-bold text-center mb-5 main-head">
                  Know facts about all sci-fi movies and series
                </h2>
              </div>
              <div className="">
                <div className="pb-5 text-center d-flex flex-wrap">
                  {showAllCategories()}
                </div>
                <br />
                <div className="pb-5 text-center d-flex flex-wrap">
                  {showAllTags()}
                </div>
              </div>
            </header>
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlog()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreBtn()}</div>
        </main>
      </Layout>
    </>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listAllBlogsCatAndTag(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogsSkip: skip,
      };
    }
  });
};



export default withRouter(Blogs);
