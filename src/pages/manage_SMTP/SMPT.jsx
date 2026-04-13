import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Navbar } from '../../component/navbar'
import { Footer } from '../../component/footer'
import { useFetch } from '../../customhook/useFetch'
import { useDelete } from '../../customhook/useDelete'
import { usePagination } from '../../customhook/usePagination'

export function SMPT_Page() {
  const [deleteId, setDeleteId] = useState(null);
  const [smtpValue, fsmtp, setsmtpValue] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/SMTP/getsmtp`
  );
  const [success, errormsg, DeleteSMTP] = useDelete(
    `${import.meta.env.VITE_API_URL}/api/admin/SMTP/deletesmtp`
  );
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(smtpValue, 5);

  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = smtpValue.filter((item) => item.id !== deleteId);
        setsmtpValue(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteSMTP(id);
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
                <Link to="/add_SMTP">
                  {" "}
                  <i className="fa fa-plus" /> Add SMPT{" "}
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
                            <th>TItle</th>
                            <th>SMTP Host</th>
                            <th>SMTP Username</th>
                            
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
                                      <td>{item.Title}</td>
                                      <td>{item.SMTP_Host}</td>
                                      <td>{item.SMTP_Username}</td>
                                      
                                      <td>
                                        <Link to={`/update_SMTP/${item.id}`}>
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
