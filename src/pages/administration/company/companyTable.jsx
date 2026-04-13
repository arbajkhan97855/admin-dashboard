import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../customhook/useFetch";
import { useDelete } from "../../../customhook/useDelete";
import toast, { Toaster } from "react-hot-toast";
import { usePagination } from "../../../customhook/usePagination";

export function CompanyTable() {
  const [deleteId, setDeleteId] = useState(null);
  const [compantdata, fcompany, setcompantdata] = useFetch(
    `${import.meta.env.VITE_API_URL}/company/getAllCompany`
  );
  const [success, errormsg, DeleteCompany] = useDelete(
    `${import.meta.env.VITE_API_URL}/company/deleteCompany`
  );
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(compantdata, 5);
  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = compantdata.filter((item) => item.id !== deleteId);
        setcompantdata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteCompany(id);
  };

  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List Company</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/add_company">
                  {" "}
                  <i className="fa fa-plus" /> Add Company{" "}
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
                    <th>Company_Name</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Mobile</th>
                    <th>Fax</th>
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
                              <td>{item.Company_Name}</td>
                              <td>{item.Country}</td>
                              <td>{item.State}</td>
                              <td>{item.Email}</td>
                              <td>{item.City}</td>
                              <td>{item.Mobile}</td>
                              <td>{item.Fax}</td>
                              <td>
                                <Link to={`/update_company/${item.id}`}>
                                  <i className="fa-regular fa-pen-to-square" />{" "}
                                </Link>{" "}
                                ||{" "}
                                <span
                                  onClick={() => handleDelete(item.id)}
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
                    <td>company not found</td>
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
