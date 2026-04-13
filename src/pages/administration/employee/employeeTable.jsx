import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../customhook/useFetch";
import { useDelete } from "../../../customhook/useDelete";
import toast, { Toaster } from "react-hot-toast";
import { usePagination } from "../../../customhook/usePagination";

export function EmployeeTable() {
  const [deleteId, setDeleteId] = useState(null);
  const [employedata, femployee, setemployedata] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/employee/getAllEmployee`
  );
  const [success, errormsg, DeleteEmployee] = useDelete(
    `${import.meta.env.VITE_API_URL}/api/admin/employee/deleteEmployee`
  );
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(employedata, 5);
  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = employedata.filter((item) => item.id !== deleteId);
        setemployedata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteEmployee(id);
  };
  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List Employee</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/add_employee">
                  {" "}
                  <i className="fa fa-plus" /> Add Employee{" "}
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
                    <th>name</th>
                    <th>dob</th>
                    <th>Company</th>
                    <th>Branch</th>
                    <th>Department</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Mobile</th>
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
                              <td>{item.name}</td>
                              <td>{item.dob}</td>
                              <td>{item.Company}</td>
                              <td>{item.Branch}</td>
                              <td>{item.Department}</td>
                              <td>{item.City}</td>
                              <td>{item.Country}</td>
                              <td>{item.Mobile}</td>
                              <td>
                                <Link to={`/update_employee/${item.id}`}>
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
                    <td>employee not found</td>
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
