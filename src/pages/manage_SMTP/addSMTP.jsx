import React, { useState } from "react";
import "./addSMTP.css"
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function AddSMTP() {
  const navigate = useNavigate()
  const insertObject = {
    Title : "",
    SMTP_Host : "",
    SMTP_Username : "",
    SMTP_Password : "",
    SMTP_Status : "",
  }
  const [formdata, setformdata] = useState(insertObject)
 const handleChange = (e) =>{
   const { value, name} = e.target;
   setformdata((prev)=>({
    ...prev,
    [name]: value
   }))
 }

 const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/SMTP/addsmtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formdata),
        }
      );
      const res = await apiurl.json();
      if (apiurl.ok) {
        toast.success(res.message || "Create successfull");
        setTimeout(()=>{
          navigate('/SMTP')
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
      <section className="invoice-page">
        <div className="invoice-container">
          <div className="invoice-card">
            <h2 className="invoice-title">Create SMTP</h2>
            <form className="invoice-form" onSubmit={handleSubmit}>
              {/* Invoice SMTP */}
              <div className="invoice-section">
                <h3 className="section-heading">Info SMTP</h3>
                <div className="form-grid">
                <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="Title"
                      value={formdata.Title}
                      onChange={handleChange}
                      placeholder="Enter title.."
                    />
                  </div>
                  <div className="form-group">
                    <label>SMTP Host</label>
                    <select
                      name="SMTP_Host"
                      onChange={handleChange}
                      value={formdata.SMTP_Host}
                    >
                      <option value="">Select Host</option>
                      <option value="smtp.gmail.com">smtp.gmail.com</option>
                      <option value="smt..tiwd.com">smt..tiwd.com</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>SMTP Username</label>
                    <input
                      type="text"
                      name="SMTP_Username"
                      onChange={handleChange}
                      value={formdata.SMTP_Username}
                      placeholder="Enter your SMTP username.."
                    />
                  </div>
                  <div className="form-group">
                    <label>SMTP Password</label>
                    <input
                      type="text"
                      name="SMTP_Password"
                      onChange={handleChange}
                      value={formdata.SMTP_Password}
                      placeholder="Enter your SMTP password.."
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="SMTP_Status"
                      onChange={handleChange}
                      value={formdata.SMTP_Status}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Save SMTP
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
