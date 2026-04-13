import React, { useEffect, useState } from "react";
import "./add&updateTicket.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function UpdateTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    Subject: "",
    Image: null,
    Status: "",
    Description: "",
  });

  async function fetchdata() {
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/Ticket/getTicket/${id}`,
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

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
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
        `${import.meta.env.VITE_API_URL}/Ticket/editTicket/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const res = await apiurl.json();
      if (apiurl.ok) {
        toast.success(res.message || "Ticket Update Done");
        setTimeout(() => {
          navigate("/Ticket");
        }, 2000);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <Toaster />
        <Navbar />
        <section className="add-ticket-section">
          <div className="container">
            <div className="dashboard-header">
              <div className="title-area">
                <h1 className="main-title">Update Ticket</h1>
                <p className="subtitle">
                  Fill out the details below to create a support ticket
                </p>
              </div>
              <ul className="modern-breadcrumb">
                <li>
                  <Link to="/dashboard">
                    <i className="fa fa-home" /> Home
                  </Link>
                </li>
                <li className="separator">/</li>
                <li>
                  <Link to="/Ticket" className="active">
                    Ticket
                  </Link>
                </li>
              </ul>
            </div>

            <div className="form-container-card">
              <form className="modern-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  {/* Subject Field */}
                  <div className="input-group full-width">
                    <label>Subject</label>
                    <div className="input-wrapper">
                      <i className="fa fa-tag icon"></i>
                      <input
                        type="text"
                        placeholder="e.g. Technical issue with login"
                        name="Subject"
                        value={formdata.Subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Status Field */}
                  <div className="input-group">
                    <label>Status</label>
                    <div className="input-wrapper">
                      <i className="fa fa-info-circle icon"></i>
                      <select
                        name="Status"
                        value={formdata.Status}
                        onChange={handleChange}
                      >
                        <option value="">Select status</option>
                        <option value="Open">Open</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="input-group">
                    <label>Attachment (Image)</label>
                    <div className="file-input-wrapper">
                      <input type="file" name="Image" onChange={handleChange} />
                      {formdata.Image && (
                    <img
                      src={`http://localhost:4000/upload/${formdata.Image}`}
                      alt="Ticket"
                      height="40px"
                      width="60px"
                    />
                  )}
                    </div>
                  </div>

                  {/* Description - Full Width */}
                  <div className="input-group full-width">
                    <label>Detailed Description</label>
                    <div className="quill-editor-container">
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
                        placeholder="Describe your issue in detail..."
                      />
                    </div>
                  </div>
                </div>

                <div className="form-footer">
                  <button className="submit-btn" type="submit">
                    <span>Create Ticket</span>
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
