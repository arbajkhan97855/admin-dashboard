import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/administration.css";
import { useFetch } from "../../../customhook/useFetch";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useParams } from "react-router-dom";
export function CompanyUpdate() {
  const { id } = useParams();
  const [data, setdata] = useState({
    Company_Name: "",
    Address: "",
    Address_1: "",
    Country: "",
    State: "",
    PostCode: "",
    Email: "",
    City: "",
    Website: "",
    Alt_Email: "",
    Mobile: "",
    Landline: "",
    Fax: "",
  });
  async function fetchdata() {
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/company/getCompany/${id}`,
        {
          method: "GET",
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
        `${import.meta.env.VITE_API_URL}/api/admin/company/editCompany/${id}`,
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
        toast.success(res.message || "company update");
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
            <div className="title">Company Details</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/company"> Company </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handelSubmit}>
              <div className="input-group">
                <label>Company Name:</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={data.Company_Name}
                  onChange={handleChange}
                  name="Company_Name"
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
                <label>Address 1:</label>
                <input
                  type="text"
                  placeholder="Enter address line 1"
                  value={data.Address_1}
                  onChange={handleChange}
                  name="Address_1"
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
                <label>State:</label>
                <input
                  type="text"
                  placeholder="Enter state"
                  value={data.State}
                  onChange={handleChange}
                  name="State"
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
                <label>Post Code:</label>
                <input
                  type="text"
                  placeholder="Enter postcode"
                  value={data.PostCode}
                  onChange={handleChange}
                  name="PostCode"
                />
              </div>

              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={data.Email}
                  onChange={handleChange}
                  name="Email"
                />
              </div>

              <div className="input-group">
                <label>Alternate Email:</label>
                <input
                  type="email"
                  placeholder="Enter alternate email"
                  value={data.Alt_Email}
                  onChange={handleChange}
                  name="Alt_Email"
                />
              </div>

              <div className="input-group">
                <label>Website:</label>
                <input
                  type="text"
                  placeholder="Enter website"
                  value={data.Website}
                  onChange={handleChange}
                  name="Website"
                />
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
                <label>Landline:</label>
                <input
                  type="number"
                  placeholder="Enter landline number"
                  value={data.Landline}
                  onChange={handleChange}
                  name="Landline"
                />
              </div>

              <div className="input-group">
                <label>Fax:</label>
                <input
                  type="text"
                  placeholder="Enter fax number"
                  value={data.Fax}
                  onChange={handleChange}
                  name="Fax"
                />
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
