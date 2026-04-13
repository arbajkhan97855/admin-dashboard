import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/administration.css";
import { useFetch } from "../../../customhook/useFetch";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";
import { useParams } from "react-router-dom";
export function DepartmentUpdate() {
  const { id } = useParams();

  const [data, setdata] = useState({
    department_name: "",
  });
  async function fetchdata() {
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/department/getDepartment/${id}`,
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
        `${import.meta.env.VITE_API_URL}/department/editDepartment/${id}`,
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
        toast.success(res.message || "department update");
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
            <div className="title">Department Details</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/department"> Department </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handelSubmit}>
              <div className="input-group">
                <label>Department Name:</label>
                <input
                  type="text"
                  value={data.department_name}
                  onChange={handleChange}
                  name="department_name"
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
