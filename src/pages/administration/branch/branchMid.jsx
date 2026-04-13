import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../../../customhook/useFetch";
import { useDelete } from "../../../customhook/useDelete";
import { usePagination } from "../../../customhook/usePagination";

export function BranchMid() {
  const [deleteId, setDeleteId] = useState(null);
  const [branchdata, fbranch, setbranchdata] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/branch/getAllBranch`
  );
  const [success, errormsg, DeleteBranch] = useDelete(
    `${import.meta.env.VITE_API_URL}/api/admin/branch/deleteBranch`
  );

  const [values, lastPageOfItem, firstPageOfItem, currentPage, 
          totalPage, handlePrevPage, handleNextPage] = usePagination(branchdata, 5)
  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = branchdata.filter((item) => item.id !== deleteId);
        setbranchdata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

    const handleDelete = (id) => {
    setDeleteId(id)
    DeleteBranch(id)
  }

  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">   
          <div className="dashboard-sm">
                      <div className="title">List Branches</div>
                      <ul className="breadcrumb">
                        <li>
                        <Link to="/add_branch">
              {" "}
              <i className="fa fa-plus" /> Add Branch{" "}
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
                    <th>Company_name</th>
                    <th>Branch_name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Mobile</th>
                    <th>Status</th>
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
                            <td>{item.Company_name}</td>
                            <td>{item.Branch_name}</td>
                            <td>{item.Address}</td>
                            <td>{item.City}</td>
                            <td>{item.Country}</td>
                            <td>{item.Mobile}</td>
                            <td>{item.Status}</td>
                            <td>
                              <Link to={`/update_branch/${item.id}`}>
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
