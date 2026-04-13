import React, { useState } from "react";
import {Link} from "react-router-dom"
import "../../../assets/css/administration.css";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useApi } from "../../../customhook/useApi";
import { useFetch } from "../../../customhook/useFetch";

export function EmployeeAdd() {
  const object = {
    name: "",
    dob: "",
    Company: "",
    Branch: "",
    Department: "",
    Address: "",
    City: "",
    Country: "",
    Mobile: "",
  };

  const [filterbranch, setfilterbranch] = useState(null);

  const [company] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/company/getAllCompany`
  );
  const [branch] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/branch/getAllBranch`
  );

  const [department] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/department/getAllDepartment`
  );

  // advance
  const handleCompanyChange = (e) => {
    try {
      const selectedBranch = branch.filter(
        (b) => b.Company_name === e.target.value
      );

      handleChange({
        target: {
          name: "Company",
          value: e.target.value,
        },
      });

      if (selectedBranch) {
        setfilterbranch(selectedBranch);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // advance

  const [data, handleChange, setdata] = useApi(object);

  const handelSubmit = async (e) => {
     e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/employee/addEmployee`,
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
        toast.success(res.message || "Employee Added Successfully");
        setdata(object);
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
            <div className="title">Employee Details</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/employee"> Employee </Link>
              </li>
            </ul>
          </div>

          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handelSubmit}>
              <div className="input-group">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={data.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Company:</label>
                <select
                  id=""
                  value={data.Company}
                  onChange={handleCompanyChange}
                  name="Company"
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
                <label>Branch:</label>
                <select
                  id=""
                  value={data.Branch}
                  onChange={handleChange}
                  name="Branch"
                >
                  <option value="">Select Branch</option>
                  {filterbranch
                    ? filterbranch.map((item, ind) => {
                        return (
                          <>
                            <option value={item.Branch_name}>
                              {item.Branch_name}
                            </option>
                          </>
                        );
                      })
                    : null}
                </select>
              </div>

              <div className="input-group">
                <label>Department:</label>
                <select
                  id=""
                  value={data.Department}
                  onChange={handleChange}
                  name="Department"
                >
                  <option value="">Select Department</option>
                  {department ? (
                    department.map((item, ind) => {
                      return (
                        <>
                          <option value={item.department_name}>
                            {item.department_name}
                          </option>
                        </>
                      );
                    })
                  ) : (
                    <option value="">Not department found</option>
                  )}
                </select>
              </div>

              <div className="input-group">
                <label>Address:</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  name="Address"
                  value={data.Address}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>City:</label>
                <input
                  type="text"
                  placeholder="Enter city"
                  name="City"
                  value={data.City}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Country:</label>
                <select
                  name="Country"
                  value={data.Country}
                  onChange={handleChange}
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
                  name="Mobile"
                  value={data.Mobile}
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
        </div>
      </section>

      <Footer />
    </>
  );
}
