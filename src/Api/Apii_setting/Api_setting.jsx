import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../../customhook/useFetch";
import { usePagination } from "../../customhook/usePagination";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";

export function ApiSettingPage() {
  const [Servicedata, fService, setServicedata] = useFetch(
    `${import.meta.env.VITE_API_URL}/Service_api/getAllService`
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
    fService();
  }, []);

  return (
    <>
      <Toaster />
      <Navbar />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">Api Setting</div>
            <ul className="breadcrumb">
              <li>
                <Link to="">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
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
                              </td>
                              <td>{item.api_type}</td>
                              <td>
                                {item.isactive == 1 ? "Active" : "inActive"}
                              </td>
                              <td>
                                <Link to={`/api_setting/${item.id}`}>
                                  <i className="fa fa-eye" />{" "}
                                </Link>{" "}
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
      <Footer />
    </>
  );
}
