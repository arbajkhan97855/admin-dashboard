import React from 'react';
import { Header } from './header';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <>
      <Header />
      <section className="navbar-nav">
        <div className="container">
          <ul className="menu_list">
            <li className="dropdown_mainmenu">
              <Link to="/dashboard" className="dropdown_item">
                <i className="fa fa-gauge" /> Dashboard
              </Link>
            </li>

            <li className="dropdown_mainmenu">
              <span className="dropdown_item">
                <i className="fa fa-building" />
                <span>Administration</span> <i className="fa fa-angle-down" />
              </span>
              <ul className="dropdown_menu">
                <li className="dropdown-submenu">
                  <Link to="/company">
                    <i className="fa fa-building" /> <span>Company</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/department">
                    <i className="fa fa-building" /> <span>Department</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/employee">
                    <i className="fa fa-credit-card" /> <span>Employee</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/invoice2">
                    <i className="fa fa-building" /> <span>invoice2</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/agent">
                    <i className="fa fa-credit-card" /> <span>User's</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/dashboardhome">
                    <i className="fa fa-credit-card" /> <span>Travel Profiles</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/branch">
                    <i className="fa fa-credit-card" /> <span>Branch</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
              </ul>
            </li>

            <li className="dropdown_mainmenu">
              <span className="dropdown_item">
                <i className="fa fa-bar-chart" /> <span>Booking</span>{" "}
                <i className="fa fa-angle-down" />
              </span>
              <ul className="dropdown_menu">
                <li className="dropdown-submenu">
                  <Link to="/Ticket2">
                    <i className="fa fa-building" /> <span>Ticket2</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/PendingforApprovals">
                    <i className="fa fa-building" /> <span>Pending for Approvals</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/ApprovedBooking">
                    <i className="fa fa-building" /> <span>Approved Booking</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/RejectedBooking">
                    <i className="fa fa-building" /> <span>Rejected Booking</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/CancelBooking">
                    <i className="fa fa-building" /> <span>Cancel Booking</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
              </ul>
            </li>

            <li className="dropdown_mainmenu">
              <span className="dropdown_item">
                <i className="fa fa-bar-chart" /> <span>Manage</span>{" "}
                <i className="fa fa-angle-down" />
              </span>
              <ul className="dropdown_menu">
                <li className="dropdown-submenu">
                  <Link to="/blog">
                    <i className="fa fa-credit-card" /> <span>Blog</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/FAQ">
                    <i className="fa fa-credit-card" /> <span>FAQ</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/invoice">
                    <i className="fa fa-credit-card" /> <span>Invoice</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/Ticket">
                    <i className="fa fa-credit-card" /> <span>Ticket</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/CancelBooking">
                    <i className="fa fa-credit-card" /> <span>Travel Policy</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/CancelBooking">
                    <i className="fa fa-credit-card" /> <span>Branch</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
              </ul>
            </li>

            <li className="dropdown_mainmenu">
              <span className="dropdown_item">
                <i className="fa fa-bar-chart" /> <span>Create</span>{" "}
                <i className="fa fa-angle-down" />
              </span>
              <ul className="dropdown_menu">
                <li className="dropdown-submenu">
                  <Link to="/create_travel_policy">
                    <i className="fa fa-building" /> <span>Create Travel Policy</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/view_travel_policy">
                    <i className="fa fa-building" /> <span>View Travel Policy</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
              </ul>
            </li>

            <li className="dropdown_mainmenu">
              <span className="dropdown_item">
                <i className="fa fa-building" /> <span>Api Manage</span>{" "}
                <i className="fa fa-angle-down" />
              </span>
              <ul className="dropdown_menu">
                
                <li className="dropdown-submenu">
                  <Link to="/service_api">
                    <i className="fa fa-building" /> <span>Manage Api</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/api_setting">
                    <i className="fa fa-building" /> <span>Api Setting</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                
              </ul>
            </li>

            <li className="dropdown_mainmenu">
              <span className="dropdown_item">
              <i className="fa fa-bar-chart" /> <span>Invoice</span>{" "}
                <i className="fa fa-angle-down" />
              </span>
              <ul className="dropdown_menu">
                
               <li className="dropdown-submenu">
                  <Link to="/invoice">
                    <i className="fa fa-credit-card" /> <span>Invoice</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>

                <li className="dropdown-submenu">
                  <Link to="/SMTP">
                    <i className="fa fa-credit-card" /> <span>Manage SMTP</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                <li className="dropdown-submenu">
                  <Link to="/Invoice_Company">
                    <i className="fa fa-credit-card" /> <span>Manage Invoice Company</span>{" "}
                    <i className="fa fa-angle-right right_arrow" />
                  </Link>
                </li>
                
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
