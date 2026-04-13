import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDelete } from "../../customhook/useDelete";
import toast, { Toaster } from "react-hot-toast";
import { usePagination } from "../../customhook/usePagination";
import { useFetch } from "../../customhook/useFetch";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";

export function InvoicePage2() {
  const [deleteId, setDeleteId] = useState(null);
  const [invoice, finvoice, setinvoice] = useFetch(
    `${import.meta.env.VITE_API_URL}/invoice/getAllInvoice`
  );
  const [success, errormsg, DeleteInvoice] = useDelete(
    `${import.meta.env.VITE_API_URL}/invoice/deleteInvoice`
  );
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(invoice, 5);

  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = invoice.filter((item) => item.id !== deleteId);
        setinvoice(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteInvoice(id);
  };
  return (
    <>
      <Toaster />
      <Navbar />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List Invoice</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/add_invoice">
                  {" "}
                  <i className="fa fa-plus" /> Add Invoice{" "}
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
                    <th>Invoice Number</th>
                    <th>Client Name</th>
                    <th>Phone</th>
                    <th>Email</th>
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
                              <td>{item.Invoice_Number}</td>
                              <td>{item.Client_Name}</td>
                              <td>{item.Phone}</td>
                              <td>{item.Email}</td>
                              <td>
                                <Link to={`/update_invoice2/${item.id}`}>
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
                                ||{" "}
                                <Link to={`/view_invoice2/${item.id}`}>
                                <i className="fa-regular fa-eye" />{" "}
                                </Link>{" "}
                                ||{" "}
                                <Link to={`/send_invoice2/${item.id}`}>
                                <i class="fa-solid fa-envelope" />{" "}
                                </Link>{" "}
                              </td>
                            </tr>
                          </>
                        );
                      })
                  ) : (
                    <td>Invoice not found</td>
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
