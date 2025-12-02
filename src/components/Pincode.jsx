import React, { useState, useEffect } from "react";
import fastdlvry from "/public/Products/fast-delivery.png"
import nocod from '/Products/nocod.png'
export default function Pincode({ onResult }) {
  const [pincode, setPincode] = useState(localStorage.getItem("lastPincode") || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // {type:'ok'|'error'|'info', text: ''}
  
  useEffect(() => {
    // optionally auto-check last saved pincode
    if (pincode && pincode.length === 6) {
      // don't auto-call to avoid unexpected requests; uncomment if desired:
      // handleCheck();
    }
  }, []);

  const validate = (pin) => /^\d{6}$/.test(pin);

  const handleCheck = async () => {
    setMessage(null);
    if (!validate(pincode)) {
      setMessage({ type: "error", text: "Please enter a valid 6-digit pincode." });
      return;
    }

    setLoading(true);
    try {
      // Public India Post API — returns array with info
const res = await fetch(`/api/pincode/check/${pincode}`);
const json = await res.json();
if (json.deliverable) {
  setMessage({ type: "ok", text: `Delivery available. ETA: ${json.etaDays} days ${json.cod ? "(COD Available)" : "(Prepaid only)"}` });
} else {
  setMessage({ type: "error", text: "Delivery not available to this pincode" });
}

// Auto hide after 3s
setTimeout(() => setMessage(null), 3000);

if (onResult) onResult(json);
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pincode-check">
      <label className="form-label">Delivery Related</label>
      <div className="d-flex gap-2">
        <input type="text" value={pincode} maxLength={6} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          className="form-control input_btnpin" style={{fontSize:'12px'}} placeholder="Enter/Detect Pincode"/>
        <button className="apy_451_id" onClick={handleCheck} disabled={loading}>
          {loading ? "Checking..." : "Apply"}
        </button>

      </div>
        <div className="mod_viaPin">
            <ul>
               <li><img src={fastdlvry} className="img img-fluid"/> FREE Delivery by tomorrow</li>
                <li><img src={nocod} className="img img-fluid"/> COD Not Available</li>
            </ul>
        </div>
      {message && (
        <div className={`mt-2 alert ${message.type === "ok" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}