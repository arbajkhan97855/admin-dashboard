import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

export function UpdateBlog() {
  const { id } = useParams();
  const [formdata, setformdata] = useState({
    Title: "",
    Subtitle: "",
    Image: null,
    Status: "",
    Description: "",
    Meta_Title: "",
    Meta_Keyword: "",
    Meta_Description: "",
  });

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };
  async function fetchdata() {
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/blog/getBlog/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await apiurl.json();
      setformdata(json[0]);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  const handleChange = (e) => {
    try {
      const { name, value, files } = e.target;
      setformdata((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(formdata).forEach((key) => {
        if (key === "Image") {
          if (formdata.Image) {
            formData.append("Image", formdata.Image);
          }
        } else {
          formData.append(key, formdata[key]);
        }
      });

      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/blog/editBlog/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const res = await apiurl.json();
      if (apiurl.ok) {
        toast.success(res.message || "Blog Update Done");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">Update Blog</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/blog"> Blog </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Enter title name"
                  name="Title"
                  value={formdata.Title}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Subtitle:</label>
                <input
                  type="text"
                  placeholder="Enter subtitle"
                  name="Subtitle"
                  value={formdata.Subtitle}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Upload Image:</label>
                <div className="image-upload-wrapper">
                  <input type="file" name="Image" onChange={handleChange} />

                  {formdata.Image && (
                    <img
                      src={`http://localhost:4000/upload/${formdata.Image}`}
                      alt="Blog"
                      className="preview-image"
                    />
                  )}
                </div>
              </div>

              <div className="input-group">
                <label>Status:</label>
                <select
                  name="Status"
                  value={formdata.Status}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="input-group">
                <label>Description:</label>
                <ReactQuill
                  theme="snow"
                  modules={quillModules}
                  value={formdata.Description}
                  onChange={(value) =>
                    setformdata((prev) => ({
                      ...prev,
                      Description: value,
                    }))
                  }
                  placeholder="Enter blog description..."
                />
              </div>
              <div className="input-group">
                <label>Meta Title:</label>
                <input
                  type="text"
                  placeholder="Enter meta title"
                  name="Meta_Title"
                  value={formdata.Meta_Title || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Meta Keyword:</label>
                <input
                  type="text"
                  placeholder="Enter meta keyword"
                  name="Meta_Keyword"
                  value={formdata.Meta_Keyword}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Meta Description:</label>
                <input
                  type="text"
                  placeholder="Enter meta description"
                  name="Meta_Description"
                  value={formdata.Meta_Description}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <button className="button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* end .common-input-form */}
        </div>
      </section>
      <Footer />
    </>
  );
}
