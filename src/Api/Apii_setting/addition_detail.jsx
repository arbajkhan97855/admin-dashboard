import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../component/navbar";
import { Footer } from "../../component/footer";
import { Link } from "react-router-dom";

export function ApiSettingPageDetail() {
  const { service_id } = useParams();

  const [detail, setDetail] = useState([]);
  const [mode, setMode] = useState("");
  const [type, settype] = useState("");
  const [currency, setcurrency] = useState("");
  const [status, setStatus] = useState(false);

  const fetchExtraDetail = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/Addition_detail_api/getExtraDetails/${service_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const json = await res.json();

      const mergedDetail = json.detail.map((item) => {
        const saved = json.ExtraDetail?.find((ex) => ex.field_id === item.id);

        return {
          ...item,
          txt_value: saved ? saved.value : "",
        };
      });
      setDetail(mergedDetail);

      if (json.Memberdata && json.Memberdata[0]) {
        setMode(json.Memberdata[0].mode ?? "");
        setcurrency(json.Memberdata[0].currency ?? "");
        settype(json.Memberdata[0].type ?? "");
        setStatus(json.Memberdata[0].isActive == 1);
      } else {
        setMode("");
        setcurrency("");
        settype("");
        setStatus(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchExtraDetail();
  }, [service_id]);

  const handleValueChange = (index, value) => {
    const updated = [...detail];
    updated[index].txt_value = value;
    setDetail(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      details: detail.map((item) => ({
        field_id: item.id,
        Name: item.txt_name,
        value: item.txt_value || "",
      })),
      mode: mode,
      currency: currency,
      type: type,
      isActive: status ? "Active" : "Inactive",
    };

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/Addition_detail_api/addExtraDetails/${service_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "saved sucessfully");
        fetchExtraDetail();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />

      <section className="min-div">
        <div className="container">
          <div className="dashboard-sm">
            <div className="title">Member Table</div>
            <ul className="breadcrumb">
              <li>
                <Link to="/dashboard">
                  {" "}
                  <i className="fa fa-home" /> Home{" "}
                </Link>
                <Link to="/api_setting"> Api setting </Link>
              </li>
            </ul>
          </div>
          <div className="common-input-form common-input">
            <form className="input-field" onSubmit={handleSubmit}>
              {detail.length > 0 ? (
                detail.map((item, index) => (
                  <div className="input-group" key={item.id}>
                    <label>{item.txt_name}</label>
                    <input
                      type="text"
                      placeholder={`Enter ${item.txt_name}`}
                      value={item.txt_value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                    />
                  </div>
                ))
              ) : (
                <p>No fields found for this Api</p>
              )}

              <div className="input-group">
                <label>Mode</label>
                <select
                  value={mode}
                  name="mode"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="">Select Mode</option>
                  <option value="TEST">Test</option>
                  <option value="LIVE">Live</option>
                </select>
              </div>

              <div className="input-group">
                <label>Currency</label>
                <select
                  value={currency}
                  name="currency"
                  onChange={(e) => setcurrency(e.target.value)}
                >
                  <option value="">Select Currency</option>
                  <option value="Rupees">Rupees</option>
                  <option value="Dollar">Dollar</option>
                </select>
              </div>

              <div className="input-group">
                <label>Type</label>
                <select
                  value={type}
                  name="type"
                  onChange={(e) => settype(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="flight">flight</option>
                  <option value="hotel">hotel</option>
                </select>
              </div>

              <div className="remember">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
                <label>Active</label>
              </div>

              <div className="input-group">
                <button className="button">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
