import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export function useFetch(url) {
  const [data, setdata] = useState();

  async function fetchdata() {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //token ke liye
      });

      const json = await res.json();
      setdata(json);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchdata();
  }, [url]);
  return [data, fetchdata, setdata];
}
