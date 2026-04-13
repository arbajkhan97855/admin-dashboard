import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../../../customhook/useFetch";
import { useDelete } from "../../../customhook/useDelete";
import { usePagination } from "../../../customhook/usePagination";
import { Navbar } from "../../../component/navbar";
import { Footer } from "../../../component/footer";

export function DetailPage() {
  const { service_id } = useParams();
  const [deleteId, setDeleteId] = useState(null);
  
  const [Apidata, fapi, setApidata] = useFetch(
    `${import.meta.env.VITE_API_URL}/Service_api/getService/${service_id}`
  );
  const [Detailsdata, fDetail, setDetailsdata] = useFetch(
    `${import.meta.env.VITE_API_URL}/Details_api/getDetails/${service_id}`
  );
   const [success, errormsg, DeleteDetail] = useDelete(
     `${import.meta.env.VITE_API_URL}/Details_api/deleteDetail`
   );

  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(Detailsdata, 5);

  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = Detailsdata.filter((item) => item.id !== deleteId);
        setDetailsdata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteDetail(id);
  };

  return (
    <>
      <Toaster />
      <Navbar />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
            <div className="dashboard-sm">
                                <div className="title">Details List Api Name = {Apidata && Apidata[0]?.api_name ? Apidata[0].api_name : ""}</div>
                                <ul className="breadcrumb">
                                  <li>
                                    <Link to="/add_Details/${service_id}">
                                      {" "}
                                      <i className="fa fa-plus" /> Add Details{" "}
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
                    <th>Text Name</th>
                    <th>Text Value</th>
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
                              <td>{item.txt_name}</td>
                              <td>{item.txt_value}</td>
                              <td>{item.isActive == 1 ? "Active" : "inActive"}</td>
                              <td>
                                <Link to={`/update_Details/${service_id}/${item.id}`}>
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
                    <td>Details not found</td>
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
      <Footer />
      {/* end .main-div */}
    </>
  );
}
