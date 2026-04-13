import React from "react";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useApi } from "../../customhook/useApi";

export function AddFAQ() {
  const faqObject = {
   faq_question : "", 
   faq_answer : "", 
   status : ""
  };

  const [formdata, handleChange, setformdata] = useApi(faqObject);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/FAQ/addFAQ`,
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
        toast.success(res.message || "FAQ Create Done");
        setformdata(faqObject);
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
            <div className="title">Add FAQ</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/FAQ"> FAQ </Link>
              </li>
            </ul>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handleSubmit}>
             <div className="input-group">
                <label>FAQ Question:</label>
                <textarea
                  name="faq_question"
                  value={formdata.faq_question}
                  onChange={handleChange}
                  placeholder="Enter FAQ Question"
                />
              </div>
              <div className="input-group">
                <label>FAQ Answer:</label>
                <textarea
                  name="faq_answer"
                  value={formdata.faq_answer}
                  onChange={handleChange}
                  placeholder="Enter FAQ Answer"
                />
              </div>
            
               <div className="input-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={formdata.status}
                  onChange={handleChange}
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
    </>
  );
}
