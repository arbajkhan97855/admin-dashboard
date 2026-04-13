import React, { useEffect, useState } from "react";
import "./TicketDetail2.css";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { usePagination } from "../../customhook/usePagination";
import { useDelete } from "../../customhook/useDelete";

export function TicketDetail2() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [chats, setChats] = useState([]);
  const [Ipaddress, setIpaddress] = useState("");
  const [rootPassword, setRootpassword] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("IP_Address", Ipaddress);
      formData.append("Root_Password", rootPassword);

      const apiurl = await fetch(
        `${import.meta.env.VITE_API_URL}/Ticket/editTicket/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const res = await apiurl.json();
      if (apiurl.ok) {
        toast.success(res.message || "Ticket Update Done");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Show chat
  async function fetchTicketWithChats() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/Ticket/getTicketChat/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setTicket(data.ticket);
        setChats(data.chats);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTicketWithChats();
  }, [id]);

  useEffect(() => {
    if (ticket) {
      setIpaddress(ticket.IP_Address || "");
      setRootpassword(ticket.Root_Password || "");
    }
  }, [ticket]);

  // chat Sending
  const handleChatSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("ticket_id", id);
      formData.append("description", message);
      formData.append("sender", "user"); 
      formData.append("sender_name", "Shubham Saini");

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/Ticket/addChat`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Successfull send msg");
        setMessage("");
        setImage(null);
        fetchTicketWithChats();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // pagination
  const [
    values,
    lastPageOfItem,
    firstPageOfItem,
    currentPage,
    totalPage,
    handlePrevPage,
    handleNextPage,
  ] = usePagination(chats, 2);

  // delete chat
  const [success, errormsg, DeleteChat] = useDelete(
    `${import.meta.env.VITE_API_URL}/Ticket/deleteChat`
  );

  useEffect(() => {
    if (success && deleteId) {
      toast.success(success);
      setTimeout(() => {
        const refetch = chats.filter((item) => item.id !== deleteId);
        setChats(refetch);
        setDeleteId(null);
      }, 800);
    }
    if (errormsg) {
      toast.error(errormsg);
    }
  }, [success, errormsg]);

  const handleDelete = (id) => {
    setDeleteId(id);
    DeleteChat(id);
  };
  return (
    <>
      <Toaster />
      <Navbar />
      <main className="main">
        <h1> Ticket : {ticket?.Subject}</h1>

        <div className="card update-card">
          <div className="msg-updated">
            <div className="msg-updated-one">
              <h1>Your IP Address</h1>
              <input
                type="text"
                placeholder="2406:b400:75:b6f"
                value={Ipaddress}
                onChange={(e) => setIpaddress(e.target.value)}
                name="IP_Address"
              />
              <p>
                If connection is coming from different ip address. kindly chnge
                it.
              </p>
            </div>
            <div className="msg-updated-two">
              <h1>Root Password</h1>
              <input
                type="text"
                placeholder="VPS. Dedicated"
                value={rootPassword}
                onChange={(e) => setRootpassword(e.target.value)}
                name="Root_Password"
              />
              <p>Passwords are stored in a separate encrypted database.</p>
            </div>
            <div className="msg-updated-three">
              <input type="checkbox" />
              <span>is SSH Root Restricted?</span>
            </div>

            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>

        <div className="card">
          <b>Subject:</b> 403 Forbidden Error While Downloading PDF
        </div>

        {/* REPLY FORM */}
        <div className="card">
          <div className="reply-tabs">
            <button className="btn primary">Post Reply</button>
            <button className="btn danger">Close Ticket</button>
          </div>

          <textarea
            placeholder="Detailed post about the issue"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="reply-footer">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button className="btn primary" onClick={handleChatSubmit}>
              Send
            </button>
          </div>
        </div>

        {/* STAFF REPLY */}
        {values && values.length > 0 ? (
          values.slice(firstPageOfItem, lastPageOfItem).map((item, ind) => {
            return (
              <div className={`reply ${item.sender}`} key={item.id}>
                <div className="reply-left">
                  <b>{item.sender_name}</b>
                  <span className={`badge ${item.sender}`}>{item.sender}</span>
                </div>
                <div className="reply-right">
                  <div className="msg-meta">
                    <small>Posted on: {item.created_on}</small>
                   {item.sender === "user" && <span>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </span>} 
                  </div>
                  <p>
                    Hi Sir/Mam,
                    <br />
                    <br />
                    {item.description}
                    <br />
                    {item.image && <img src={`http://localhost:4000/upload/${item.image}`} />}
                    <br />
                    Regards,
                    <br />
                    Support Team
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Messages...</p>
        )}

       

        <div className="pagi-btn">
          <button onClick={handlePrevPage}>{currentPage}</button>
          <span>To</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPage}>
            {currentPage + 1}
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
