import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/administration.css";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useApi } from "../../../customhook/useApi";

export function AddDetail() {
  const usenavigate = useNavigate();
  const { service_id } = useParams();
  const object = {
    txt_name: "",
    txt_value: "",
    isActive: "",
  };

  const [data, handleChange, setdata] = useApi(object);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/Details_api/addDetail/${service_id}`,
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
        setTimeout(() => {
          usenavigate(`/detail_api/${service_id}`);
        },2000);
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
            <div className="title">Add Details</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to={`/detail_api/${service_id}`}> Detail </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handelSubmit}>
              <div className="input-group">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={data.txt_name}
                  onChange={handleChange}
                  name="txt_name"
                />
              </div>

              <div className="input-group">
                <label>Value:</label>
                <input
                  type="text"
                  placeholder="Enter value"
                  value={data.txt_value}
                  onChange={handleChange}
                  name="txt_value"
                />
              </div>

              <div className="input-group">
                <label>Status:</label>
                <select
                  value={data.isActive}
                  onChange={handleChange}
                  name="isActive"
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
