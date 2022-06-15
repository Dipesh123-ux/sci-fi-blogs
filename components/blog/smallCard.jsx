import React from 'react'
import moment from 'moment'
import { API } from "../../config";
import Link from 'next/link'
import renderHTML from 'react-render-html';

const SmallCard = ({blog}) => {
  return (
    <div  className="card">
        <div style={{margin:"auto",marginTop:"20px"}}>
            <Link href={`/blogs/${blog.slug}`} >
                <a>
                    <img style={{height:"140px",width:"auto"}} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid" />
                </a>
            </Link>
        </div>
        <div className="card-body">
            <section>
                <Link href={`/blogs/${blog.slug}`} >
                    <h5 style={{cursor:"pointer"}} className="card-title">{blog.title}</h5>
                </Link>
                <p className="card-text">{renderHTML(blog.excerpt)}</p>
            </section>
                <br />
                Posted {moment(blog.updatedAt).fromNow()} by <Link href={`/profile/${blog.postedBy.username}`} ><a>{blog.postedBy.name}</a></Link>
         </div>
    </div>
  )
}

export default SmallCard