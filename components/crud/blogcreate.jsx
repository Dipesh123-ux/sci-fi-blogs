import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import {RotatingLines} from "react-loader-spinner"

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags

  const [body, setBody] = useState('');
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: '',
    title: "",
    hidePublishButton: false,
    loading: false,
    reload : false
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
    loading,
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values,formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values ,error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = e => {
    setValues({ ...values, loading: true });
    e.preventDefault();
    // console.log('ready to publishBlog');
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        console.log(data);
        setValues({
          ...values,
          loading: false,  
          title: "",
          error: "",
          success: `A new blog titled "${data.result.title}" is created`
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData , error: "" });
  };

  const handleBody = (e) => {

    // console.log(e)
    setBody(e);
    formData.set('body', e)
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = c => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };

  const handleTagsToggle = t => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled list-cat-tag">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="ms-2"
          />
          <label className="ms-2 form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled list-cat-tag">
          <input
            onChange={handleTagsToggle(t._id)}
            type="checkbox"
            className="ms-2"
          />
          <label className="ms-2 form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage = () => (success ? <div className="alert alert-success">{success}</div> : '');
  const showLoading = () => ( loading ?<div className="d-flex justify-content-center mt-4" style={{position : "fixed",right:"39vw",top:"33vh"}} >   <RotatingLines width="100" strokeColor="silver" strokeWidth="2" /> </div>: "");

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="main-head mb-2 ms-1 ">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group mt-3">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
            preserveWhitespace={true}
          />
        </div>

        <div className="mt-3" >
          <button style={{background:"silver"}} type="submit" className="btn">
            Publish
          </button>
        </div>
      </form>
    );
  };



  return (
    <div className="container-fluid pb-5">
      <div  className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <div  className="pt-3">
            {showError()}
            {showMessage()}
            {showLoading()}
          </div>
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5 className="sub-head" >Featured image</h5>
              <hr />

              <small style={{color:"silver"}} className="">Max size: 1mb</small>
              <br />
              <label className="btn btn-dark mt-2">
                <i style={{color:"white"}} className="fa fa-plus" ></i>
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div  >
            <h5 className="sub-head" >Categories</h5>
            <hr />

            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5 className="sub-head">Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);