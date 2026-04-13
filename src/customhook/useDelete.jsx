import React from "react";
import { useState } from "react";

export function useDelete(url) {
  const [success, setsuccess] = useState(null);
  const [errormsg, seterrormsg] = useState(null);

  const Delete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete this?");
    if (!isConfirm) return;
    try {
      const apiurl = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });
      const res = await apiurl.json();
      if (apiurl.ok) {

        setsuccess(res.message || "Deleted Successfully");
        seterrormsg(null);
      } else {
        seterrormsg(res.message);
        setsuccess(null);
      }

      setTimeout(() => {
        setsuccess(null);
        seterrormsg(null);
      }, 300);
    } catch (error) {
       console.log(error.message);
    }
  };

  return [success, errormsg, Delete];
}
