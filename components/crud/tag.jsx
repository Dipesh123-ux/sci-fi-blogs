import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import {
  create,
  getTags,
  singleTag,
  deleteTag,
} from "../../actions/tags";

const Tag = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    Tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, removed, Tags, reload } = values;
  const token = getCookie("token");

  useEffect(() => { 
    loadTags();
  }, [reload]);

const loadTags = () => {
       getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values,Tags: data });
      }
    });
  };

  const showCategories = () => {
if(Tags !=undefined)  
    return Tags.map((c, i) => {
      return (
        <button onDoubleClick={()=>deletetag(c.slug)} title="Double click to delete" key={i} className="tag tag-all ms-1 me-1 mt-3">
          #{c.name}
        </button>
      );
    });
  };

  const deletetag = slug=>{

    let ans = window.confirm('Are you sure you want to delete this category?')

    if(ans){
         removeTag(slug)
    }
  };
 
  const removeTag = (slug) =>{
    deleteTag(slug,token).then((data)=>{
      if(data.error){
          console.log(data.error);
      }
      else{
          setValues({...values,error:false,success: false,name:'',removed : !removed,reload:!reload});
      }
  })
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          removed : !removed,
          reload : !reload
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false, 
      removed  : ''
      
    });
  };

  const showSuccess = () => {
    if (success) {
        return <p className="show-result">Tag is created</p>;
    }
};

const showError = () => {
  if (error) {
      return <p className="show-result">Tag already exist</p>;
  }
};

const showRemoved = () => {
  if (removed && !success) {
      return <p className="show-result">Tag is removed</p>;
  }
};

const mouseMoveHandler = e => {
  setValues({ ...values, error: false, success: false, removed: false,reload : false });
};

  function newCategoryForm() {
    return (
      <form action="" onSubmit={handleSubmit}>
        <div style={{marginTop:"-45px"}} className="form-group">
          <label className="main-head mb-2">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            required
          />
          <button type="submit" className="btn btn-dark mt-3">
            Create
          </button>
        </div>
      </form>
    );
  }

  return (
    <React.Fragment>
    {showSuccess()}
    {showError()}
    {showRemoved()}
    <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        <div className="d-flex flex-wrap">
        {showCategories()}  
        </div>
       
    </div>
</React.Fragment>
  );
};

export default Tag;
