import React, { useState } from "react";

function Reset() {
  const [newpassword, setnewpassword] = useState("");
  const [oldpassword, setoldpassword] = useState("");

  async function resetpassword() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Not logged in");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/change-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`  // ✅ Fixed here
        },
        body: JSON.stringify({
          old_password: oldpassword,
          new_password: newpassword
        })
      });

      const data = await res.json();
      console.log("Status:", res.status);
      console.log("Response:", data);

      if (res.ok) {
        alert("Password updated successfully!");
        setoldpassword("");
        setnewpassword("");
      } else {
        alert("Failed to update password: " + (data.detail || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Error updating password:", err);
      alert("Something went wrong");
    }
  }

  return (
    <>
      <input
        type="password"
        value={oldpassword}
        onChange={(e) => setoldpassword(e.target.value)}
        placeholder="Enter old password"
      />
      <input
        type="password"
        value={newpassword}
        onChange={(e) => setnewpassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={resetpassword} disabled={!oldpassword || !newpassword}>
        Set new password
      </button>
    </>
  );
}

export { Reset };
