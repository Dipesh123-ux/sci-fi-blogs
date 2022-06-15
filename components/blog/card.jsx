import React from 'react'
import moment from 'moment'
import { API } from "../../config";
import Link from 'next/link'

const Card = ({blog}) => {


  const showBlogCategories = blog =>{
   return blog.categories.map((c,i)=>(
      <Link key={i} href={`/categories/${c.slug}`} >
        <a  className="tag cat-all ms-1 mt-3">{c.name}</a>
      </Link>
    ))
  }
  const showBlogTags= blog =>{
   return blog.tags.map((t,i)=>(
      <Link key={i} href={`/tags/${t.slug}`} >
        <a  className=" ms-1 mt-3">#{t.name}</a>
      </Link>
    ))
  }

  return (

  //   
  <div style={{backgroundImage : `url(${API}/blog/photo/${blog.slug})`}} class="blog-container container-fluid">
  
  <div class="blog-header">
          <div class="blog-cover">
            <div class="blog-author">
              Written by <Link href={`/profile/${blog.postedBy.username}`} ><a className="user-info" >{blog.postedBy.name}</a></Link>
            </div>
          </div>
        </div>

  <div class="blog-body">
    <div class="blog-title">
      <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h3 className="pt-3 pb-3 font-weight-bold card-head">
              {blog.title}
            </h3>
          </a>
        </Link>
    </div>

    <div class="blog-summary d-flex">
   
      <p className="sub-head-body" dangerouslySetInnerHTML={{__html: blog.excerpt}}></p>
    </div>
    <Link  href={`/blogs/${blog.slug}`}>
          <button id="btn-read" >
          Read more<i className="fa fa-arrow-right ms-1"  ></i>
          </button>
    </Link>
    <div class="blog-tags d-flex flex-wrap">
      {showBlogCategories(blog)}
      <br />
      {showBlogTags(blog)}
    </div>
  </div>
  
  <div class="blog-footer">
    <ul>
      <li class="published-date">Published {moment(blog.createdAt).fromNow()}</li>
    </ul>
  </div>

</div>
  )
}

export default Card