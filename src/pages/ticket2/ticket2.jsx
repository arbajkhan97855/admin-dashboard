import React, { useEffect, useState } from "react";
import "./tickets2.css";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import { Link } from "react-router-dom";
import { useFetch } from "../../customhook/useFetch";
import { usePagination } from "../../customhook/usePagination";

import toast, { Toaster } from "react-hot-toast";

export function Tickets2() {
  const [allTickets, tfunc] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/Ticket/getTickets`
  );
  const [tickets, settickets] = useState([]);
  const [activeClass, setactiveClass] = useState("All");


  useEffect(() => {
    if (allTickets?.length) {
      settickets(allTickets);
    }
  }, [allTickets]);

    // search ticket
    const [searchTerm, setSearchTerm] = useState("");
    const filteredTickets = tickets.filter((ticket) => 
      ticket.Subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  // pagination
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(filteredTickets, 4);

  //  Last Activity
  const getDaysAgo = (created_on) => {
    const createdDate = new Date(created_on);
    const todayDate = new Date();

    createdDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);

    const diffTime = todayDate - createdDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // filter by status
  function FilterData(status) {
    const filtered = allTickets.filter((item) => item.Status === status);
    settickets(filtered);
    setactiveClass(status);
    if (status === "All") {
      settickets(allTickets);
    }
  }


  return (
    <>
    <Toaster />
      <Navbar />

      <div className="tk-wrapper">
        {/* Header */}
        <header className="tk-header">
          <div>
            <h2>
              <i className="fa fa-ticket tk-icon" /> Support Tickets
            </h2>
            <p>Manage and track customer issues</p>
          </div>

          <button className="tk-btn-primary">
            <Link to="/add_Ticket2">
              <i className="fa fa-plus" /> New Ticket
            </Link>
          </button>
        </header>

        <div className="tk-layout">
          {/* Sidebar */}
          <aside className="tk-sidebar">
            <div className="tk-search-box">
              <i className="fa fa-search" />
              <input
                placeholder="Search Ticket Subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="tk-filter">
              <label>Ticket Age</label>
              <select>
                <option>Last 30 Days</option>
                <option>Last 60 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>

            <div className="tk-status">
              <span
                className={activeClass === "All" ? "active" : ""}
                onClick={() => FilterData("All")}
              >
                <i className="fa fa-list" /> All
              </span>
              <span
                className={activeClass === "Open" ? "active" : ""}
                onClick={() => FilterData("Open")}
              >
                <i className="fa fa-folder-open" /> Open
              </span>
              <span
                className={activeClass === "On Hold" ? "active" : ""}
                onClick={() => FilterData("On Hold")}
              >
                <i className="fa fa-pause-circle" /> On Hold
              </span>
              <span
                className={activeClass === "Closed" ? "active" : ""}
                onClick={() => FilterData("Closed")}
              >
                <i className="fa fa-check-circle" /> Closed
              </span>
            </div>
          </aside>

          {/* TABLE */}
          <main className="tk-content">
            <div className="tk-table-wrapper">
              <table className="tk-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Ticket</th>
                    <th>Status</th>
                    <th>Last Replier</th>
                    <th>Last Activity</th>
         
                  </tr>
                </thead>

                <tbody>
                  {values ? (
                    values
                      .slice(firstPageOfItem, lastPageOfItem)
                      .map((item, ind) => {
                        return (
                          <>
                            <tr key={item.id}>
                              <td>{firstPageOfItem + ind + 1}</td>
                              <td>
                                <p>{item.Subject}</p>
                                <Link
                                  to={`/ticket_Details2/${item.id}`}
                                  className="sub-subject"
                                >
                                  {" "}
                                  Manage Ticket {item.Subject}
                                </Link>
                              </td>
                              <td>{item.Status}</td>
                              <td>Admin</td>
                              <td>{getDaysAgo(item.created_on)} days ago</td>
                              
                            </tr>
                          </>
                        );
                      })
                  ) : (
                    <td>ticket not found</td>
                  )}

                  <div className="pagi-btn">
                    <button onClick={handlePrevPage}>{currentPage}</button>
                    <span>To</span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPage}
                    >
                      {currentPage + 1}
                    </button>
                  </div>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}
