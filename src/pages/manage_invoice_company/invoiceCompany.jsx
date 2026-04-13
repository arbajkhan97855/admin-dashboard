import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Navbar } from '../../component/navbar'
import { Footer } from '../../component/footer'
import { useFetch } from '../../customhook/useFetch'
import { useDelete } from '../../customhook/useDelete'
import { usePagination } from '../../customhook/usePagination'

export function InvoiceCompany() {
  const [deleteId, setDeleteId] = useState(null);
  const [invoiceCompany, fsmtp, setinvoiceCompany] = useFetch(
    `${import.meta.env.VITE_API_URL}/Invoice_company/getInvoiceCompany`
  );
  const [success, errormsg, DeleteinvoiceCompany] = useDelete(
    `${import.meta.env.VITE_API_URL}/Invoice_company/deleteInvoiceCompany`
  );
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(invoiceCompany, 5);

  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = invoiceCompany.filter((item) => item.id !== deleteId);
        setinvoiceCompany(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteinvoiceCompany(id);
  };
  return (
    <>
    <Toaster />
    <Navbar />
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List SMPT</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/add_Invoice_Company">
                  {" "}
                  <i className="fa fa-plus" /> Add Invoice Company{" "}
                </Link>
              </li>
            </ul>
          </div>
        
         <div className="common-input-form common-input spacing">
                    <div className="full_table">
                      <table className="tabel_list bg">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
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
                                      <td>{item.Company_Email}</td>
                                      <td>{item.Company_Phone}</td>
                                      <td>
                                        <Link to={`/update_Invoice_Company/${item.id}`}>
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
                                        </span>
                                      
                                       
                                      </td>
                                    </tr>
                                  </>
                                );
                              })
                          ) : (
                            <tr>
                             <td>employee not found</td>
                            </tr>
                            
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

        </div>
      </section>
    <Footer />
    </>
  )
}
