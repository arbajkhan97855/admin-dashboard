import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../../customhook/useFetch";
import { useDelete } from "../../customhook/useDelete";
import { usePagination } from "../../customhook/usePagination";

export function FAQMid() {
  const [deleteId, setDeleteId] = useState(null);

  const [Faqdata, fetchfaq, setFaqdata] = useFetch(
    `${import.meta.env.VITE_API_URL}/FAQ/getAllFAQ`
  );

  const [success, errormsg, Deletefaq] = useDelete(
    `${import.meta.env.VITE_API_URL}/FAQ/deleteFAQ`
  );

  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(Faqdata, 5);
  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = Faqdata.filter((item) => item.id !== deleteId);
        setFaqdata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    Deletefaq(id);
  };

  const ExtraText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List FAQ</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/add_FAQ">
                  {" "}
                  <i className="fa fa-plus" /> Add FAQ{" "}
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
                    <th>FAQ Question</th>
                    <th>FAQ Answer</th>
                    <th>Status</th>
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
                              <td>{ExtraText(item.faq_question, 10)}</td>
                              <td>{ExtraText(item.faq_answer, 10)}</td>
                              <td>{item.status}</td>
                              <td>
                                <Link to={`/update_FAQ/${item.id}`}>
                                  <i className="fa-regular fa-pen-to-square" />{" "}
                                </Link>{" "}
                                ||{" "}
                                <span
                                  className="trash_btn"
                                  onClick={() => {
                                    handleDelete(item.id);
                                  }}
                                >
                                  <i className="fa fa-trash" />{" "}
                                </span>{" "}
                              </td>
                            </tr>
                          </>
                        );
                      })
                  ) : (
                    <tr>
                      <td>blog not found</td>
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
          {/* end .common-input-form */}
        </div>
      </section>
      {/* end .main-div */}
    </>
  );
}
