import React from 'react'
import { Link } from 'react-router-dom'

export function Homemid() {

  return (
    <>
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="search_in">
              <i className="fa-solid fa-magnifying-glass" />
              <input type="text" placeholder="Name/PNR/Ticket no/Booking Ref" />
            </div>
            <Link to="/create_travel_policy" className="back_button">
              <i className="fa-solid fa-circle-plus" /> Create Travel Policy
            </Link>
          </div>
          <ul className="booking-listing">
            <li className="booking_info">
              <span>
                <i className="fa fa-bar-chart" />
              </span>
              <div className="right">
                <p>Total Employees</p>
                <a>18</a>
              </div>
            </li>
            <li className="booking_info">
              <span className="color1">
                <i className="fa fa-bar-chart" />
              </span>
              <div className="right">
                <p>Pending Approvals</p>
                <a>6</a>
              </div>
            </li>
            <li className="booking_info">
              <span className="color2">
                <i className="fa fa-ticket" />
              </span>
              <div className="right">
                <p>Monthly Spend</p>
                <a>42</a>
              </div>
            </li>
            <li className="booking_info">
              <span>
                <i className="fa fa-ticket" />
              </span>
              <div className="right">
                <p>Policy Violations</p>
                <a>1,284</a>
              </div>
            </li>
          </ul>
          <div className="data_table"></div>
          <section className="upcoming-trips">
            <h3>Upcoming Trips</h3>
            <table>
              <thead>
                <tr>
                  <th>Traveler</th>
                  <th>Route</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ahmed Khan</td>
                  <td>DXB → LHR</td>
                  <td className="center">Flight</td>
                  <td className="center">22 Dec 2025</td>
                  <td className="center confirmed">Confirmed</td>
                </tr>
                <tr>
                  <td>
                    <Link to="/ApprovedBooking">
                      Rohit Patel
                    </Link>
                  </td>
                  <td>BOM → SIN</td>
                  <td className="center">Flight + Hotel</td>
                  <td className="center">26 Dec 2025</td>
                  <td className="center pending">Pending Approval</td>
                </tr>
                <tr>
                  <td>Sarah Williams</td>
                  <td>AUH → JFK</td>
                  <td className="center">Flight</td>
                  <td className="center">02 Jan 2026</td>
                  <td className="center confirmed">Confirmed</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section style={{ marginTop: "2rem" }} className="dashboard-grid">
            <div className="card">
              <h3>Approval Queue</h3>
              <div className="slip">
                <ul className="list">
                  <li>
                    <span>Flight: AUH → JFK (Business Class)</span>
                    <Link to="/ApprovedBooking">
                      <button className="link-btn">Review</button>
                    </Link>
                  </li>
                  <li>
                    <span>Hotel: Marina Bay Sands (Singapore)</span>
                    <Link to="/ApprovedBooking">
                      <button className="link-btn">Review</button>
                    </Link>
                  </li>
                  <li>
                    <span>Flight: DXB → CDG (Flexible Fare)</span>
                    <Link to="/ApprovedBooking">
                      <button className="link-btn">Review</button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card">
              <h3>Policy Violations</h3>
              <div className="slip">
                <p className="muted-text">5 bookings flagged this month</p>
                <ul className="violation-list">
                  <li>Business class booked for &lt; 4 hr flight</li>
                  <li>Hotel rate exceeded allowed nightly cap</li>
                  <li>Non-preferred airline selected</li>
                  <li>Last-minute booking without approval</li>
                </ul>
              </div>
            </div>
          </section>
          <section style={{ marginTop: "2rem" }} className="billing-grid">
            <div className="card">
              <h3>Invoices &amp; Billing</h3>
              <div className="slip">
                <p className="billing-text">
                  Outstanding Amount: <strong>AED 85,200</strong>
                </p>
                <ul className="report-list">
                  <li>December 2025 Spend Report</li>
                  <li>Department-wise Travel Cost</li>
                  <li>Top Airlines &amp; Hotels</li>
                  <li>Policy Compliance Report</li>
                </ul>
                <button className="primary-btn">View Invoices</button>
              </div>
            </div>
            <div className="card">
              <h3>Quick Reports</h3>
              <div className="slip">
                <ul className="report-list">
                  <li>Monthly Spend Report</li>
                  <li>Traveler-wise Cost</li>
                  <li>Supplier Usage</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
