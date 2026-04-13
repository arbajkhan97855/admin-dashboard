import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../customhook/useFetch";
import { Toaster, toast } from "react-hot-toast";
import { useDelete } from "../../../customhook/useDelete";
import { usePagination } from "../../../customhook/usePagination";

export function DepartmentTable() {
  const [deleteId, setDeleteId] = useState(null);
  const [department, fetchdata, setdepartment] = useFetch(
    `${import.meta.env.VITE_API_URL}/department/getAllDepartment`
  );

  const [success, errormsg, DeleteDepartment] = useDelete(
    `${import.meta.env.VITE_API_URL}/department/deleteDepartment`
  );
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(department, 5);
  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = department.filter((item) => item.id !== deleteId);
        setdepartment(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteDepartment(id);
  };

  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List Department</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/add_department">
                  {" "}
                  <i className="fa fa-plus" /> Add Department{" "}
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
                    <th>Department_Name</th>
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
                              <td>{item.department_name}</td>
                              <td>
                                <Link to={`/update_department/${item.id}`}>
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
                    <td>department not found </td>
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
