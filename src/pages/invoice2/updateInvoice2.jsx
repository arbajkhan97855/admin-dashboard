import React, { useEffect, useState } from "react";
import { useFetch } from "../../customhook/useFetch";

import "./addInvoice2.css";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateInvoice2() {
  const usenavigate = useNavigate();
  const { id } = useParams();

  const [items, setItems] = useState([
    { description: "", qty: 1, rate: 0, total: 0 },
  ]);
  const [logoPreview, setLogoPreview] = useState(null);

  const invoiceObject = {
    Invoice_Number: "",
    Invoice_Date: "",
    Due_Date: "",
    Client_Name: "",
    Email: "",
    Phone: "",
    Address: "",
    S_Name: "",
    S_Email: "",
    S_Phone: "",
    S_Address: "",
    Status: "Pending",
    Payment_Method: "Cash",
    Grand_Total: 0,
    Logo: null,
  };

  const [formData, setFormData] = useState(invoiceObject);

  // FETCH SINGLE INVOICE DATA
  const fetchInvoice = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/invoice/getInvoice/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const json = await res.json();
      setFormData({
        ...json.invoice,
        Invoice_Date: json.invoice.Invoice_Date
          ? json.invoice.Invoice_Date.split("T")[0]
          : "",
        Due_Date: json.invoice.Due_Date
          ? json.invoice.Due_Date.split("T")[0]
          : "",
        Logo: null,
      });

      if (json.invoice.Logo) {
        setLogoPreview(`http://localhost:4000/upload/${json.invoice.Logo}`);
      }

      setItems(
        json.items.map((item) => ({
          description: item.Description || "",
          qty: item.Qty || 1,
          rate: item.Rate || 0,
          total: item.Total || 0,
        }))
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  // InvoiceCompany data Auto fill
  const [InvoiceCompany] = useFetch(`${import.meta.env.VITE_API_URL}/Invoice_company/getInvoiceCompany`);
  
  const handleCompanyNameChange = (e) => {
    const selectedCompanyName = e.target.value;

    const selected = InvoiceCompany?.find(
      (item) => item.Company_Name === selectedCompanyName
    );

    if (selected) {
      setFormData((prev) => ({
        ...prev,
        S_Name: selected.Company_Name || "",
        S_Email: selected.Company_Email || "",
        S_Phone: selected.Company_Phone || "",
        S_Address: selected.Company_Address || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        S_Name: "",
        S_Email: "",
        S_Phone: "",
        S_Address: "",
      }));
    }
  };
  // InvoiceCompany data Auto fill

  // HANDLE FORM CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Logo" && files[0]) {
      setFormData((prev) => ({ ...prev, Logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ITEMS FUNCTIONS
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "qty" || field === "rate") {
      updatedItems[index].total =
        Number(updatedItems[index].qty) * Number(updatedItems[index].rate);
    }

    setItems(updatedItems);
    const grandTotal = updatedItems.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0
    );
    setFormData((prev) => ({ ...prev, Grand_Total: grandTotal }));
  };

  const addItem = () =>
    setItems([...items, { description: "", qty: 1, rate: 0, total: 0 }]);
  const removeItem = (index) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      const grandTotal = updatedItems.reduce(
        (sum, item) => sum + Number(item.total || 0),
        0
      );
      setFormData((prev) => ({ ...prev, Grand_Total: grandTotal }));
      return updatedItems;
    });
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "Logo") {
        if (formData.Logo) invoiceData.append("Logo", formData.Logo);
      } else {
        invoiceData.append(key, formData[key]);
      }
    });

    invoiceData.append("items", JSON.stringify(items));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/invoice/editInvoice/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: invoiceData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Invoice Updated Successfully");
        setTimeout(() => usenavigate("/invoice"), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <section className="invoice-page">
        <div className="invoice-container">
          <div className="invoice-card">
            <h2 className="invoice-title">Update Invoice</h2>
            <form className="invoice-form" onSubmit={handleSubmit}>
              {/* Invoice Info */}
              <div className="invoice-section">
                <h3 className="section-heading">Invoice Info</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Invoice Number</label>
                    <input
                      type="text"
                      name="Invoice_Number"
                      value={formData.Invoice_Number}
                      onChange={handleChange}
                      placeholder="INV-2026-001"
                    />
                  </div>
                  <div className="form-group">
                    <label>Invoice Date</label>
                    <input
                      type="date"
                      name="Invoice_Date"
                      value={formData.Invoice_Date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input
                      type="date"
                      name="Due_Date"
                      value={formData.Due_Date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Billed From */}
              <div className="invoice-section">
                <h3 className="section-heading">Billed From</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Company Name</label>
                    <select onChange={handleCompanyNameChange} value={formData.S_Name}>
                      <option value="">Select Title</option>

                      {InvoiceCompany && InvoiceCompany.length > 0 ? (
                        InvoiceCompany.map((item, ind) => (
                          <option key={ind} value={item.Title}>
                            {item.Company_Name}
                          </option>
                        ))
                      ) : (
                        <option value="">No company found</option>
                      )}
                    </select>
                  </div>

                
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="S_Email"
                      value={formData.S_Email}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="S_Phone"
                      value={formData.S_Phone}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea
                      name="S_Address"
                      value={formData.S_Address}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              {/* Client Details */}
              <div className="invoice-section">
                <h3 className="section-heading">Client Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      name="Client_Name"
                      value={formData.Client_Name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea
                      name="Address"
                      value={formData.Address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="invoice-section">
                <h3 className="section-heading">Invoice Items</h3>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) =>
                              handleItemChange(index, "qty", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) =>
                              handleItemChange(index, "rate", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          <input type="number" value={item.total} readOnly />
                        </td>
                        <td>
                          <span
                            className="trash_btn"
                            onClick={() => removeItem(index)}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="total-due">
                      <td colSpan="3" className="text-right bold">
                        Grand Total{" "}
                      </td>
                      <td colSpan="2" className="bold">
                        {formData.Grand_Total}.00 INR
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="button"
                  className="btn-add-item"
                  onClick={addItem}
                >
                  + Add Item
                </button>
              </div>

              {/* Payment & Logo */}
              <div className="invoice-section">
                <h3 className="section-heading">Payment Info & Logo</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="Status"
                      value={formData.Status}
                      onChange={handleChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <select
                      name="Payment_Method"
                      value={formData.Payment_Method}
                      onChange={handleChange}
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Logo</label>
                    <div className="image-upload-wrapper">
                      <input type="file" name="Logo" onChange={handleChange} />

                      {logoPreview && (
                        <img
                          src={logoPreview}
                          alt="Invoice Logo"
                          className="preview-image"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Update Invoice
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
