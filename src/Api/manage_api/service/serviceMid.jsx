import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../../../customhook/useFetch";
import { useDelete } from "../../../customhook/useDelete";
import { usePagination } from "../../../customhook/usePagination";

export function ServiceMid() {
  const [deleteId, setDeleteId] = useState(null);
  const [Servicedata, fService, setServicedata] = useFetch(
    `${import.meta.env.VITE_API_URL}/Service_api/getAllService`
  );
  const [success, errormsg, DeleteService] = useDelete(
    `${import.meta.env.VITE_API_URL}/Service_api/deleteService`
  );

  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(Servicedata, 5);

  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = Servicedata.filter((item) => item.id !== deleteId);
        setServicedata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteService(id);
  };

  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
  
          <div className="dashboard-sm">
                      <div className="title">List All Api</div>
                      <ul className="breadcrumb">
                        <li>
                          <Link to="/add_service_api">
                            {" "}
                            <i className="fa fa-plus" /> Add Api{" "}
                          </Link>
                        </li>
                      </ul>
                    </div>
          {/* start .common-input-form */}
          <div className="common-input-form common-input spacing">
            <div className="full_table">
              <table className="tabel_list bg">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>API_Name</th>
                    <th>API_Type</th>
                    <th>isActive</th>
                    <th>Action</th>
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
                                <p>{item.api_name}</p>
                                <Link to={`/detail_api/${item.id}`}>
                                  {" "}
                                  Manage Fields
                                </Link>
                              </td>
                              <td>{item.api_type}</td>
                              <td>
                                {item.isactive == 1 ? "Active" : "inActive"}
                              </td>
                              <td>
                                <Link to={`/update_service_api/${item.id}`}>
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
                    <td>service not found</td>
                  )}

                  <div className="pagi-btn">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      PrevPage
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPage}
                    >
                      NextPage
                    </button>
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
