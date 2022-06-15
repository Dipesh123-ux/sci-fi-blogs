import Link from 'next/link'
import renderHTML from 'react-render-html'
import {useState,useEffect} from 'react'
import {listSearch} from '../../actions/blog'

const search = () => {
  const [values,setValues] = useState({
    search : undefined,
    results : [],
    searched : false,
    message : ''
  })

  const {search,results,searched,message} = values;

  const searchSubmit = (e) =>{
     e.preventDefault();
     listSearch({search}).then(data=>{
       setValues({...values,results : data,searched: true,message : `${data.length} blogs found`})
     })

  }

  const handleChange = (e)=>{
   setValues({...values,search : e.target.value,searched :false,results:[]})
  }

  const searchedBlogs = (results = []) => {
    return (
        <div className="jumbotron">
            {message && <p className="pt-4 sub-head">{message}</p>}

            {results.map((blog, i) => {
                return (
                    <div key={i}>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a style={{textDecoration:"underline"}} className="text-white mt-3">{blog.title}</a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

  const searchForm = ()=>(
    <form onSubmit={searchSubmit} >
   <div className="search-box">
    <button type="button" className="btn-search"><i className="fas fa-search"></i></button>
    <input type="text" className="input-search" placeholder="Search blogs" onChange={handleChange}/>
   </div>
    </form>
  )

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-5">
        {searchForm()}
      </div>
      {searched && <div style={{ marginTop: '15px', marginBottom: '20px' }}>{searchedBlogs(results)}</div>}
    </div>
  )
}

export default search