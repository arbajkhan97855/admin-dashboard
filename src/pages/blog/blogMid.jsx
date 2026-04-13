import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFetch } from "../../customhook/useFetch";
import { useDelete } from "../../customhook/useDelete";
import { usePagination } from "../../customhook/usePagination";

export function BlogMid() {
  const [deleteId, setDeleteId] = useState(null);

  const [blogdata, fetchblog, setblogdata] = useFetch(
    `${import.meta.env.VITE_API_URL}/blog/getAllBlog`
  );

  const [success, errormsg, DeleteBlog] = useDelete(
    `${import.meta.env.VITE_API_URL}/blog/deleteBlog`
  );
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(blogdata, 5);

  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = blogdata.filter((item) => item.id !== deleteId);
        setblogdata(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteBlog(id);
  };

  return (
    <>
      <Toaster />
      {/* start .main-div */}
      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">List Blog</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/add_blog">
                  {" "}
                  <i className="fa fa-plus" /> Add Blog{" "}
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
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {values ? (
                    values
                      .slice(firstPageOfItem, lastPageOfItem)
                      .map((blogitem, ind) => {
                        return (
                          <tr key={blogitem.id}>
                            <td>{firstPageOfItem + ind + 1}</td>
                            <td>{blogitem.Title}</td>
                            <td>{blogitem.Subtitle}</td>
                            <td>{blogitem.Status}</td>
                            <td>
                              <Link to={`/update_blog/${blogitem.id}`}>
                                <i className="fa-regular fa-pen-to-square" />{" "}
                              </Link>{" "}
                              ||{" "}
                              <span
                                className="trash_btn"
                                onClick={() => {
                                  handleDelete(blogitem.id);
                                }}
                              >
                                <i className="fa fa-trash" />{" "}
                              </span>{" "}
                            </td>
                          </tr>
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
