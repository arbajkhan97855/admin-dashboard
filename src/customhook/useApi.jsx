import React, { useState } from "react";

export function useApi(initiaLValues = {}) {
  const [values, setvalues] = useState(initiaLValues);

  const handleChange = (e) => {
    try {
      const { name, value, files } = e.target;
      setvalues((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  return [values, handleChange, setvalues];
}
