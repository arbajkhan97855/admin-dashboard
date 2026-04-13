import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/administration.css";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useParams } from "react-router-dom";

export function DetailUpdate() {
  const usenavigate = useNavigate();
  const { id, service_id } = useParams();

  const [data, setdata] = useState({
    txt_name: "",
    txt_value: "",
    isActive: "",
  });

  async function fetchdata() {
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/Details_api/getDetail/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const json = await apiurl.json();
      setdata({
        ...json[0],
        isActive: json[0].isActive == 1 ? "Active" : "inActive",
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/Details_api/editDetail/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const res = await apiurl.json();
      if (apiurl.ok) {
        toast.success(res.message || "Detail update");
        setTimeout(()=>{
          usenavigate(`/detail_api/${service_id}`)
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
            <div className="title">Update Details</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to={`/detail_api/${data.service_id}`}> Details </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handelSubmit}>
              <div className="input-group">
                <label>Text Name:</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={data.txt_name}
                  onChange={handleChange}
                  name="txt_name"
                />
              </div>

              <div className="input-group">
                <label>Text Value:</label>
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
                  <option value="inActive">inActive</option>
                </select>
              </div>

              <div className="input-group">
                <button className="button" type="submit">
                  Update
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
