import React from "react";
import "./addAgent.css";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import { useApi } from "../../customhook/useApi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AddAgent() {
  const agencyData = {
    Agency_Name: "",
    Agency_Type: "",
    Year_Establishment: "",
    GST: "",
    IATA_Number: "",
    Website: "",
    Office_Address: "",
    City: "",
    Zipcode: "",
    Country: "",
    Full_Name: "",
    Designation: "",
    Mobile_Number: "",
    Email: "",
    Password: "",
    Confirm_Password: "",
    IsFlight: false,
    IsHotel: false,
    IsHotelFlight: false,
    IsVisa: false,
    IsCarRental: false,
    Logo: null,
    License: null,
    ID_Proof: null,
  };
  const usenavigate = useNavigate();
  const [formdata, handleChange, setformdata] = useApi(agencyData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(formdata).forEach((key) => {
        if (key === "License" || key === "Logo" || key === "ID_Proof") {
          if (formdata[key]) {
            formData.append(key, formdata[key]);
          }
        } else {
          formData.append(key, formdata[key]);
        }
      });

      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/Agency/addAgency`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const res = await apiurl.json();
      if (apiurl.ok) {
        toast.success(res.message || "Agency Create Done");
        setformdata(agencyData);
        setTimeout(()=>{
          usenavigate('/agent')
        },1000)
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
      <div className="agent_container">
        <h1>B2B Travel Agent Signup</h1>
        <form
          className="agent_form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2>Agency Information</h2>

          <div className="row">
            <div className="col">
              <label>Agency Name *</label>
              <input
                type="text"
                name="Agency_Name"
                value={formdata.Agency_Name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Agency Type *</label>
              <select
                name="Agency_Type"
                value={formdata.Agency_Type}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Retail Travel Agency">
                  Retail Travel Agency
                </option>
                <option value="Corporate Travel Agent">
                  Corporate Travel Agent
                </option>
                <option value="Tour Operator">Tour Operator</option>
                <option value="Wholesaler / Consolidator">
                  Wholesaler / Consolidator
                </option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Year of Establishment</label>
              <input
                type="number"
                name="Year_Establishment"
                value={formdata.Year_Establishment}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label>GST / Tax ID</label>
              <input
                type="text"
                name="GST"
                value={formdata.GST}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>IATA / TIDS Number</label>
              <input
                type="text"
                name="IATA_Number"
                value={formdata.IATA_Number}
                onChange={handleChange}
              />
            </div>

            <div className="col">
              <label>Website</label>
              <input
                type="text"
                name="Website"
                value={formdata.Website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Office Address *</label>
              <textarea
                name="Office_Address"
                value={formdata.Office_Address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>City *</label>
              <input
                type="text"
                name="City"
                value={formdata.City}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Zipcode *</label>
              <input
                type="text"
                name="Zipcode"
                value={formdata.Zipcode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Country *</label>
              <select
                name="Country"
                value={formdata.Country}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UAE">UAE</option>
                <option value="Russia">Russia</option>
              </select>
            </div>
          </div>

          {/* Contact Person */}
          <h2>Primary Contact Person</h2>

          <div className="row">
            <div className="col">
              <label>Full Name *</label>
              <input
                type="text"
                name="Full_Name"
                value={formdata.Full_Name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Designation *</label>
              <input
                type="text"
                name="Designation"
                value={formdata.Designation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Mobile Number *</label>
              <input
                type="tel"
                name="Mobile_Number"
                value={formdata.Mobile_Number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Email (Login ID) *</label>
              <input
                type="email"
                name="Email"
                value={formdata.Email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Login Credentials */}
          <h2>Login Credentials</h2>

          <div className="row">
            <div className="col">
              <label>Password *</label>
              <input
                type="password"
                name="Password"
                value={formdata.Password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="Confirm_Password"
                value={formdata.Confirm_Password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Business Preferences */}
          <h2>Business Preferences</h2>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formdata.IsFlight}
                onChange={(e) =>
                  setformdata({ ...formdata, IsFlight: e.target.checked })
                }
              />
              Flight
            </label>

            <label>
              <input
                type="checkbox"
                checked={formdata.IsHotel}
                onChange={(e) =>
                  setformdata({ ...formdata, IsHotel: e.target.checked })
                }
              />
              Hotel
            </label>

            <label>
              <input
                type="checkbox"
                checked={formdata.IsHotelFlight}
                onChange={(e) =>
                  setformdata({ ...formdata, IsHotelFlight: e.target.checked })
                }
              />
              Flight + Hotel
            </label>

            <label>
              <input
                type="checkbox"
                checked={formdata.IsVisa}
                onChange={(e) =>
                  setformdata({ ...formdata, IsVisa: e.target.checked })
                }
              />
              Visa
            </label>

            <label>
              <input
                type="checkbox"
                checked={formdata.IsCarRental}
                onChange={(e) =>
                  setformdata({ ...formdata, IsCarRental: e.target.checked })
                }
              />
              Car Rental
            </label>
          </div>

          <div className="row">
            <div className="col">
              <label>Logo *</label>
              <input type="file" name="Logo" onChange={handleChange} required />
            </div>
          </div>

          {/* Document Upload */}
          <h2>Document Upload</h2>

          <div className="row">
            <div className="col">
              <label>GST / Trade License *</label>
              <input
                type="file"
                name="License"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col">
              <label>PAN / ID Proof *</label>
              <input
                type="file"
                name="ID_Proof"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit for Approval
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
