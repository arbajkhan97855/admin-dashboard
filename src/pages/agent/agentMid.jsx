import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useFetch } from "../../customhook/useFetch";
import { useDelete } from "../../customhook/useDelete";
import { usePagination } from "../../customhook/usePagination";

export function AgentMid() {
  const [deleteId, setDeleteId] = useState(null);
  const [agentdata, fbranch, setagentdata] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/Agency/getAllAgency`
  );
  const [success, errormsg, DeleteAgent] = useDelete(
    `${import.meta.env.VITE_API_URL}/api/admin/Agency/deleteAgency`
  );
  const [values, lastPageOfItem, firstPageOfItem, currentPage, totalPage,
          handlePrevPage, handleNextPage] = usePagination(agentdata, 5)
  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = agentdata.filter((item) => item.id !== deleteId);
        setagentdata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

    const handleDelete = (id) => {
    setDeleteId(id)
    DeleteAgent(id)
  }

  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List Agency</div>
            <ul className="breadcrumb">
              <li>
                <Link to="">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
              </li>
            </ul>
          </div>
          <div className="branch_add">
            {" "}
            <Link to="/add_agent">
              {" "}
              <i className="fa fa-plus" /> Add Agent{" "}
            </Link>
          </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input spacing">
            <div className="title">Agent Details</div>
            <div className="full_table">
              <table className="tabel_list bg">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Agency Name</th>
                    <th>Agency Type </th>
                    <th>Zipcode</th>
                    <th>Country</th>                 
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {values ? (
                    values.slice(firstPageOfItem, lastPageOfItem).map((item, ind) => {
                      return (
                        <>
                          <tr key={item.id}>
                            <td>{firstPageOfItem + ind + 1}</td>
                            <td>{item.Agency_Name}</td>
                            <td>{item.Agency_Type}</td>
                            <td>{item.Zipcode}</td>
                            <td>{item.Country}</td>
                            <td>{item.Email}</td>
                            <td>{item.Mobile_Number}</td>                            
                            <td>
                              <Link to={`/update_agent/${item.id}`}>
                                <i className="fa-regular fa-pen-to-square" />{" "}
                              </Link>{" "}
                              ||{" "}
                              <span
                                onClick={() => {
                                  handleDelete(item.id);
                                }}
                                className="trash_btn"
                              >
                                <i className="fa fa-trash" />{" "}
                              </span>{" "}
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <td>branch not found</td>
                  )}
                  <div className="pagi-btn">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>PrevPage</button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPage}>NextPage</button>
                  </div>
                </tbody>
              </table>
            </div>
          </div>
          {/* end .common-input-form */}
        </div>
      </section>
      {/* end .main-div */}
    </>
  );
}
