import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/administration.css";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useApi } from "../../../customhook/useApi";
import { useFetch } from "../../../customhook/useFetch";
export function Addbranch() {
  const object = {
    Company_name: "",
    Branch_name: "",
    Address: "",
    City: "",
    Country: "",
    Mobile: "",
    Status: "",
  };

  const [company, fcompany] = useFetch(
    `${import.meta.env.VITE_API_URL}/company/getAllCompany`
  );

  const [data, handleChange, setdata] = useApi(object);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/branch/addBranch`,
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
        toast.success(res.message || "branch add");
        setdata({
          Company_name: "",
          Branch_name: "",
          Address: "",
          City: "",
          Country: "",
          Mobile: "",
          Status: "",
        });
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
            <div className="title">Branch Details</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/branch"> Branch </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handelSubmit}>
              <div className="input-group">
                <label>Company_name:</label>
                <select
                  value={data.Company_name}
                  onChange={handleChange}
                  name="Company_name"
                >
                  <option value="">Select Company</option>
                  {company ? (
                    company.map((item, ind) => {
                      return (
                        <>
                          <option value={item.Company_Name}>
                            {item.Company_Name}
                          </option>
                        </>
                      );
                    })
                  ) : (
                    <option value="">Not company found</option>
                  )}
                </select>
              </div>

              <div className="input-group">
                <label>Branch Name:</label>
                <input
                  type="text"
                  placeholder="Enter branch name"
                  value={data.Branch_name}
                  onChange={handleChange}
                  name="Branch_name"
                />
              </div>

              <div className="input-group">
                <label>Address:</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={data.Address}
                  onChange={handleChange}
                  name="Address"
                />
              </div>

              <div className="input-group">
                <label>City:</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={data.City}
                  onChange={handleChange}
                  name="City"
                />
              </div>

              <div className="input-group">
                <label>Country:</label>
                <select
                  value={data.Country}
                  onChange={handleChange}
                  name="Country"
                >
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </div>

              <div className="input-group">
                <label>Mobile:</label>
                <input
                  type="number"
                  placeholder="Enter mobile number"
                  value={data.Mobile}
                  onChange={handleChange}
                  name="Mobile"
                />
              </div>

              <div className="input-group">
                <label>Status:</label>
                <select
                  value={data.Status}
                  onChange={handleChange}
                  name="Status"
                >
                  <option value="">Select status</option>
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
