import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/administration.css";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useApi } from "../../../customhook/useApi";



export function Addservice() {
  const usenavigate = useNavigate()
  const object = {
    api_name: "",
    api_type: "",
    isactive: "",
    created_on: new Date().toISOString().slice(0, 19).replace("T", " "),
  };

  const [data, handleChange, setdata] = useApi(object);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/Service_api/addService`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const res = await apiurl.json();
      if (apiurl.ok) {
        toast.success(res.message || "Service add");
        setdata(object);
        setTimeout( () => {
          usenavigate('/service_api')
        },2000)
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
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">Add Api</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/service_api"> Api </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handelSubmit}>
              <div className="input-group">
                <label>Api Name:</label>
                <input
                  type="text"
                  placeholder="Enter Api Name"
                  value={data.api_name}
                  onChange={handleChange}
                  name="api_name"
                />
              </div>

              <div className="input-group">
                <label>Api Type:</label>
                <select
                  value={data.api_type}
                  onChange={handleChange}
                  name="api_type"
                >
                  <option value="">Select Api type</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Flight">Flight</option>
                </select>
              </div>
             
              <div className="input-group">
                <label>Status:</label>
                <select
                  value={data.isactive}
                  onChange={handleChange}
                  name="isactive"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
      {/* end .main-div */}
    </>
  );
}
