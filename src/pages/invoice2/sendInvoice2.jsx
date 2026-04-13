import React, { useEffect, useState } from "react";
import "./sendInvoice2.css";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useFetch } from "../../customhook/useFetch";

export function SendInvoice2() {
  const { id } = useParams();

 
  const [attachment, setAttachment] = useState(null);

  const [sendEmail, setsendEmail] = useState({
    smtp_title: "",
    message: "",
  });

  const [invoice] = useFetch(
    `${import.meta.env.VITE_API_URL}/invoice/getInvoice/${id}`
  );

  const [SMTPdata] = useFetch(`${import.meta.env.VITE_API_URL}/SMTP/getsmtp`);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setsendEmail((prev) => ({ ...prev, [name]: value }));
  };



  // new toast promise use
  const handleSend = (e) => {
    e.preventDefault();
  
    if (!attachment) {
      toast.error("Please attach PDF or Image");
      return;
    }
  
    const formData = new FormData();
    formData.append("smtp_title", sendEmail.smtp_title);
    formData.append("message", sendEmail.message);
    formData.append("attachment", attachment); //  FILE
  
    const sendInvoice = fetch(
      `${import.meta.env.VITE_API_URL}/invoice/sendInvoice/${id}`,
      {
        method: "POST",
        credentials: "include",
        body: formData, 
      }
    ).then(async (response) => {
      const res = await response.json();
  
      if (!response.ok) {
        throw new Error(res.message || "Failed to send email");
      }
  
      return res;
    });
  
    toast.promise(sendInvoice, {
      loading: "Sending email...",
      success: (res) => res.message || "Email sent successfully",
      error: (err) => err.message || "Something went wrong",
    });
  };
  

  return (
    <>
      <Toaster />
      <Navbar />

      <div className="email-wrapper">
        <div className="email-card">
          <h2 className="email-title">📧 Send Invoice</h2>

          {/* SMTP */}
          <div className="form-group">
            <label>Select SMTP Title</label>
            <select
              className="input"
              name="smtp_title"
              value={sendEmail.smtp_title}
              onChange={handelChange}
            >
              <option value="">-- Select Title --</option>
              {SMTPdata?.length > 0 ? (
                SMTPdata.map((item) => (
                  <option key={item._id} value={item.Title}>
                    {item.Title}
                  </option>
                ))
              ) : (
                <option value="">No SMTP Found</option>
              )}
            </select>
          </div>

          {/* To Email */}
          <div className="form-group">
            <label>To</label>
            <input
              type="email"
              className="input"
              name="client_email"
              value={invoice?.invoice.Email}
              readOnly
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="textarea"
              rows="5"
              placeholder="send your message."
              name="message"
              value={sendEmail.message}
              onChange={handelChange}
            />
          </div>

          <div className="form-group">
            <label>Attach File (PDF / Image)</label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>

          <button className="send-btn" onClick={handleSend}>
            ✉️ Send Mail
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
