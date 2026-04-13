import React from "react";
import { useFetch } from "../../../customhook/useFetch";

export function MidViewTravelPolicy() {
  const [data] = useFetch(
    `${import.meta.env.VITE_API_URL}/api/admin/travelPolicy/getAllTravelPolicy`
  );

  return (
    <>
      <div className="policy-wrapper">
        <h2>Travel Policies</h2>
        <table className="policy-table">
          <thead>
            <tr>
              <th>Policy Name</th>
              <th>Policy Code</th>
              <th>Status</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((item, ind) => {
                return (
                  <>
                    <tr>
                      <td>{item.Policy_Name}</td>
                      <td>{item.Policy_Code}</td>
                      <td>
                        <span className={`status ${item.Status}`}>{item.Status}</span>
                      </td>
                      <td>{item.Department}</td>
                    </tr>
                  </>
                );
              })
            ) : (
              <tr>
                {" "}
                <td>Not Travel Policy</td>{" "}
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </>
  );
}
