import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/administration.css";
import { useFetch } from "../../../customhook/useFetch";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useParams } from "react-router-dom";

export function EmployeeUpdate() {
  const { id } = useParams();
  const [filterbranch, setfilterbranch] = useState(null);
  const [data, setdata] = useState({
    name: "",
    dob: "",
    Company: "",
    Branch: "",
    Department: "",
    Address: "",
    City: "",
    Country: "",
    Mobile: "",
  });

  const [company] = useFetch(
    `${import.meta.env.VITE_API_URL}/company/getAllCompany`
  );
  const [branch] = useFetch(
    `${import.meta.env.VITE_API_URL}/branch/getAllBranch`
  );
  const [department] = useFetch(
    `${import.meta.env.VITE_API_URL}/department/getAllDepartment`
  );

  // advance
  const handleCompanyChange = (e) => {
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
  };

  useEffect(() => {
    if (data.Company && branch) {
      const selectedBranch = branch.filter(
        (b) => b.Company_name === data.Company
      );
      setfilterbranch(selectedBranch);
    }
  }, [data.Company, branch]);
  // advance

  async function fetchdata() {
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/employee/getEmployee/${id}`,
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
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/employee/editEmployee/${id}`,
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
        toast.success(res.message || "employee update");
        setTimeout(() => {
          fetchdata();
        }, 2000);
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
          {/* start .common-input-form */}
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
