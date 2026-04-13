import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import "./viewInvoice2.css";
import { useParams } from "react-router-dom";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";



export function ViewInvoice2() {
    const { id } = useParams()
    const [invoice, setinvoice] = useState({})
    const [invoiceItem, setinvoiceItem] = useState([])
    const invoiceRef = useRef(); 

   async function ViewFetch(){
    const apiurl = await fetch(`${import.meta.env.VITE_API_URL}/invoice/getInvoice/${id}`, {
        method : "GET",
        credentials: "include",
    })
    const jsondata = await apiurl.json()
    setinvoice({...jsondata.invoice, 
                    Invoice_Date: jsondata.invoice.Invoice_Date ? jsondata.invoice.Invoice_Date.split("T")[0] : "",
                    Due_Date: jsondata.invoice.Due_Date ? jsondata.invoice.Due_Date.split("T")[0] : "", })
    setinvoiceItem(jsondata.items)
    console.log(jsondata.invoice)
    console.log(jsondata.items)
   }

   useEffect(()=>{
     ViewFetch()
   },[id])


// PDF download function
const downloadPDF = () => {
  const element = invoiceRef.current;
  const opt = {
    filename: `${invoice.Invoice_Number || "invoice"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
};
  
  
  return (
    <>
    <Navbar />
    <button className="download-btn" onClick={downloadPDF} id="download_pdf">Download Pdf</button>
     <div className="invoice-body" ref={invoiceRef}>
      <table className="invoice-wrapper">
        {/* Header */}
        <tr>
          <td className="invoice-padding">
            <table>
              <tr>
                <td>
                  <img src={`http://localhost:4000/upload/${invoice.Logo}`} alt="Logo" className="invoice-logo" crossOrigin="anonymous" />
                </td>
                <td className="invoice-header-right">
                  <strong className="invoice-title">INVOICE</strong>
                  
                  <div className="invoice-meta">
                    <span>INVOICE NUMBER</span>
                    <small>{invoice.Invoice_Number}</small>
                  </div>

                  <div className="invoice-meta">
                    <span>INVOICE DATE</span>
                    <small>{invoice.Invoice_Date}</small>
                  </div>

                  <div className="invoice-meta">
                    <span>DUE DATE</span>
                    <small>{invoice.Due_Date}</small>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Billing Info */}
        <tr>
          <td className="invoice-padding">
            <table>
              <tr>
                <td className="billing-left">
                  <span>Billed From</span>
                  <span>{invoice.S_Name}</span>
                  <a href={`mailto:${invoice.S_Email}`}>
                  {invoice.S_Email}
                  </a>
                  <span>{invoice.S_Phone}</span>
                  <span>{invoice.S_Address}</span>
   
                </td>

                <td className="billing-right">
                  <span>Billed To</span>
                  <span>{invoice.Client_Name}</span>
                  <a href={`mailto:${invoice.Email}`} >
                  {invoice.Email}
                  </a>
                  <span>{invoice.Phone}</span>
      
                  <span>{invoice.Address}</span>

                 

                  <span className="status unpaid">{invoice.Status}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>


  {/* Invoice Table */}
  <tr>
          <td className="invoice-padding">
            <table className="invoice-table">
              <tr>
                <th colSpan="3">Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount (INR)</th>
              </tr>
            {
              invoiceItem && invoiceItem.length > 0 ? (
                invoiceItem.map((item,ind)=>{
                    return(
                        <>
                        <tr>
                <td colSpan="3">{item.Description}</td>
                <td>{item.Qty}</td>
                <td>{item.Rate}</td>
                <td>{item.Total}</td>
              </tr>
                        </>
                    )
                })
              ): <tr> <td>Not found invoice items</td></tr>  
            }
              

      
              <tr className="total-due">
                <td colSpan="5" className="text-right bold">Grand Total </td>
                <td className="bold">{invoice.Grand_Total} INR</td>
              </tr>

             
            </table>
          </td>
        </tr>
       
       
        
        <tr>
          <td className="invoice-padding">
            <table>
              <tr>
                <td className="terms-title">Terms and Conditions</td>
              </tr>
              <tr>
                <td>
                  Please visit{" "}
                  <a href="https://www.amazingweb.design">
                    www.amazingweb.design
                  </a>{" "}
                  for any assistance.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <Footer />
    </>
  )
}

   



