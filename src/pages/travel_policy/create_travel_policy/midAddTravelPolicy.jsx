import React, { useEffect, useState } from "react";
import "../../../assets/css/main.css";
import { useApi } from "../../../customhook/useApi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../customhook/useFetch";

export function MidAddTravelPolicy() {
  const [policyId, setPolicyId] = useState(null);

  const objects = {
    Policy_Name: "",
    Policy_Code: "",
    Status: "",
    Department: "",
    Designation: "",
    Travel_Scope: "",
    Allowed_Cabin_Class: "",
    Cheapest_Flight_Mandatory: "",
    Max_Price_Deviation: "",
    Advance_Booking_Days: "",
    Blocked_Airlines: "",
    If_Policy_Followed: "",
    If_Policy_Violated: "",
    Approval_Level_1: "",
    Approval_Level_2: "",
    Payment_Mode: "",
    Cost_Center_Mandatory: "",
    Monthly_Spend_Limit: "",
    Invoice_Cycle: "",
  };
    const [formdata, handelChange, setformdata] = useApi(objects);
  const [Alldata] = useFetch(`${import.meta.env.VITE_API_URL}/api/admin/travelPolicy/getAllTravelPolicy`)
 async function fetchdata(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/travelPolicy/getTravelPolicy/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const json = await res.json();
    setformdata(json[0]);
  } catch (error) {
    console.log(error.message);
  }
}

useEffect(() => {
  if (Alldata && Alldata.length > 0) {
    const lastPolicy = Alldata[0];
    setPolicyId(lastPolicy.id);
    fetchdata(lastPolicy.id);
  }
}, [Alldata]);

  const usenavigate = useNavigate()

  
  const handleSave = async (e) => {
  e.preventDefault();

  const url = policyId
    ? `${import.meta.env.VITE_API_URL}/api/admin/travelPolicy/editTravelPolicy/${policyId}`
    : `${import.meta.env.VITE_API_URL}/api/admin/travelPolicy/addTravelPolicy`;

  const method = policyId ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formdata),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(
        policyId ? data.message : data.message
      );
    
      // second time add na ho
      if (!policyId && data?.id) {
        setPolicyId(data.id);
      }

      setTimeout(() => {
        usenavigate("/view_travel_policy");
      }, 1500);
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.log(err.message);
  }
};

  return (
    <>
    <Toaster />
      <div className="container">
        <h2>Add Travel Policy</h2>
        <div className="section">
          <h3>Policy Basic Details</h3>
          <div className="inline">
            <div>
              <label>Policy Name</label>
              <input
                placeholder="Domestic Flight Policy – Sales"
                name="Policy_Name"
                type="text"
                onChange={handelChange}
                value={formdata.Policy_Name}
              />
            </div>
            <div>
              <label>Policy Code</label>
              <input
                placeholder="SALES_DOM_FLT"
                name="Policy_Code"
                type="text"
                onChange={handelChange}
                value={formdata.Policy_Code}
              />
            </div>
            <div>
              <label>Status</label>
              <select onChange={handelChange} 
             value={formdata.Status}
              name="Status" >
                <option>Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>
        <div className="section">
          <h3>Applicable To</h3>
          <div className="inline">
            <div>
              <label>Department</label>
              <select onChange={handelChange} 
               value={formdata.Department}
              name="Department">
                <option>Select Department</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Finance</option>
                <option>HR</option>
                <option>IT</option>
                <option>All</option>
              </select>
            </div>
            <div>
              <label>Designation</label>
              <select onChange={handelChange} 
             value={formdata.Designation}
               name="Designation">
                <option>Select Designation</option>
                <option>Executive</option>
                <option>Senior Executive</option>
                <option>Manager</option>
                <option>Senior Manager</option>
                <option>Director</option>
                <option>CXO</option>
              </select>
            </div>
            <div>
              <label>Travel Scope</label>
              <select onChange={handelChange} 
             value={formdata.Travel_Scope}
              name="Travel_Scope">
                <option>Select Scope</option>
                <option>All Locations</option>
                <option>Domestic Only</option>
                <option>International Only</option>
              </select>
            </div>
          </div>
        </div>
        <div className="section">
          <h3>Flight Booking Rules</h3>
          <div className="slipper-box">
            <label>Allowed Cabin Class</label>
            <select
              onChange={handelChange}
              value={formdata.Allowed_Cabin_Class}
              name="Allowed_Cabin_Class"
            >
               <option>Select Cabin</option>
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
          <div className="inline">
            <div>
              <label>Cheapest Flight Mandatory</label>
              <select
                onChange={handelChange}
                value={formdata.Cheapest_Flight_Mandatory}
                name="Cheapest_Flight_Mandatory"
              >
                <option>Select Flight Mandatory</option>
                <option>Lowest Fare Only</option>
                <option>Within Price Threshold</option>
                <option>No Restriction</option>
              </select>
            </div>
            <div>
              <label>Max Price Deviation (₹)</label>
              <select
                onChange={handelChange}
                value={formdata.Max_Price_Deviation}
                name="Max_Price_Deviation"
              >
                <option>Select Price</option>
                <option>500</option>
                <option>1000</option>
                <option>3000</option>
                <option>5000</option>
              </select>
            </div>
            <div>
              <label>Advance Booking Days</label>
              <select
                onChange={handelChange}
                value={formdata.Advance_Booking_Days}
                name="Advance_Booking_Days"
              >
                <option>Select Booking Days</option>
                <option>0</option>
                <option>3</option>
                <option>7</option>
                <option>14</option>
                <option>30</option>
              </select>
            </div>
          </div>
          <div className="slipper-box">
            <label>Blocked Airlines</label>
            <select onChange={handelChange} 
            value={formdata.Blocked_Airlines}
            name="Blocked_Airlines">
               <option>Select Airlines</option>
              <option>None</option>
              <option>IndiGo (6E)</option>
              <option>Air India (AI)</option>
              <option>Vistara (UK)</option>
              <option>Akasa Air (QP)</option>
              <option>SpiceJet (SG)</option>
            </select>
          </div>
        </div>
        <div className="section">
          <h3>Approval Rules</h3>
          <div className="inline">
            <div>
              <label>If Policy Followed</label>
              <select
                onChange={handelChange}
                value={formdata.If_Policy_Followed}
                name="If_Policy_Followed"
              >
                <option>Select Policy Followed</option>
                <option>Auto Approve</option>
              </select>
            </div>
            <div>
              <label>If Policy Violated</label>
              <select
                onChange={handelChange}
               value={formdata.If_Policy_Violated}
                name="If_Policy_Violated"
              >
                <option>Select Policy Violated</option>
                <option>Approval Required</option>
                <option>Booking Blocked</option>
                <option>Warning Only</option>
              </select>
            </div>
            <div>
              <label>Approval Level 1</label>
              <select onChange={handelChange}
               value={formdata.Approval_Level_1}
               name="Approval_Level_1">
                <option>Select Approval Level 1</option>
                <option>Reporting Manager</option>
                <option>Department Head</option>
                <option>Travel Desk</option>
              </select>
            </div>
            <div>
              <label>Approval Level 2</label>
              <select onChange={handelChange} 
              value={formdata.Approval_Level_2}
              name="Approval_Level_2">
                <option>Select Approval Level 2</option>
                <option>Finance Team</option>
                <option>Admin</option>
                <option>None</option>
              </select>
            </div>
          </div>
        </div>
        <div className="section">
          <h3>Payment &amp; Billing</h3>
          <div className="inline">
            <div>
              <label>Payment Mode</label>
              <select onChange={handelChange}
                value={formdata.Payment_Mode}
               name="Payment_Mode">
                <option>Select Payment Mode</option>
                <option>Company Wallet</option>
                <option>Company Credit Card</option>
                <option>Employee Reimbursement</option>
                <option>Postpaid Invoice</option>
              </select>
            </div>
            <div>
              <label>Cost Center Mandatory</label>
              <select
                onChange={handelChange}
                 value={formdata.Cost_Center_Mandatory}
                name="Cost_Center_Mandatory"
              >
                <option>Select Center Mandatory</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label>Monthly Spend Limit</label>
              <select
                onChange={handelChange}
                value={formdata.Monthly_Spend_Limit}
                name="Monthly_Spend_Limit"
              >
                  <option>Select Monthly Limit</option>
                <option>No Limit</option>
                <option>100000</option>
                <option>500000</option>
                <option>1000000</option>
              </select>
            </div>
            <div>
              <label>Invoice Cycle</label>
              <select onChange={handelChange} 
               value={formdata.Invoice_Cycle}
              name="Invoice_Cycle">
                 <option>Select Invoice Cycle</option>
                <option>Per Booking</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
        </div>
        <div className="footers">
          <button className="btn secondary">Save Draft</button>
       
            <button className="btn primary" onClick={handleSave}>Save &amp; Activate Policy</button>
       
        </div>
      </div>
    </>
  );
}
