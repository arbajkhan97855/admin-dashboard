import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "../../../assets/css/administration.css";
import { useFetch } from "../../../customhook/useFetch";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useParams } from "react-router-dom";
export function BranchUpdate() {
  const { id } = useParams();

  const [data, setdata] = useState({
    Company_name: "",
    Branch_name: "",
    Address: "",
    City: "",
    Country: "",
    Mobile: "",
    Status: "",
  });
  const [company, fcompany] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/company/getAllCompany`
  );
  async function fetchdata() {
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/branch/getBranch/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const json = await apiurl.json();
      setdata(json[0]);
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
        `${import.meta.env.VITE_API_URL}/api/admin/branch/editBranch/${id}`,
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
        toast.success(res.message || "branch update");
        setTimeout(() => {
          fetchdata();
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
                  <option value={data.Company_name}>
                    {" "}
                    {data.Company_name}
                  </option>
                  {company ? (
                    company.map((item, ind) => {
                      return (
                        <>
                          <option value={item.Company_Name} key={item.id}>
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
                  <option value={data.Country}> {data.Country}</option>
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
                  {" "}
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
