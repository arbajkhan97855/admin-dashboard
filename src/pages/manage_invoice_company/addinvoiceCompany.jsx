import React, { useState } from "react";
import "./invoiceCompany.css"
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AddInvoiceCompany() {
  const navigate = useNavigate()
  const insertObject = {
    Company_Name : "",
    Company_Email : "",
    Company_Phone : "",
    Company_Address : "",
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
        `${import.meta.env.VITE_API_URL}/Invoice_company/addInvoiceCompany`,
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
          navigate('/Invoice_Company')
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
            <h2 className="invoice-title">Create Invoice Company</h2>
            <form className="invoice-form" onSubmit={handleSubmit}>

               {/* Billed From */}
               <div className="invoice-section">
                <h3 className="section-heading">Billed From</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="Company_Name"
                      onChange={handleChange}
                      value={formdata.Company_Name}
                      placeholder="Enter name.."
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="Company_Email"
                      onChange={handleChange}
                      value={formdata.Company_Email}
                      placeholder="Enter email.."
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="number"
                      name="Company_Phone"
                      onChange={handleChange}
                      value={formdata.Company_Phone}
                      placeholder="Enter number.."
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea
                      name="Company_Address"
                      onChange={handleChange}
                      value={formdata.Company_Address}
                      placeholder="Enter Address.."
                    />
                  </div>
                </div>
              </div>
 
           
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Save Invoice
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
