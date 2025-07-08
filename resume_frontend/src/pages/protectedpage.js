// import React from "react";

// function Protectedpage() {
//   return <h1>This is protected page..!!</h1>;
// }

// export { Protectedpage };



// import React, { useEffect, useState } from "react";
// import "../index.css";

// function Protectedpage() {
//   const name = localStorage.getItem("username");
//   const [profile, setProfile] = useState({
//     username: name,
//     first_name: "",
//     last_name: "",
//     email: "",
//     phn: "",
//     dateofbirth: "",
//     photo: null,
//   });

//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [saving, setSaving] = useState(false);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");

//   //   fetch("http://127.0.0.1:8000/api/profile/", {
//   //     method: "GET",
//   //     headers: {
//   //       Authorization: `Bearer ${token}`
//   //     }
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       setProfile((prev) => ({
//   //         ...prev,
//   //         ...data,
//   //         photo: null
//   //       }));
//   //       if (data.photo) {
//   //         setPhotoPreview(data.photo);
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.error("Profile fetch error:", err);
//   //     });
//   // }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
  
//     fetch("http://127.0.0.1:8000/api/profile/", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch profile");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setProfile((prev) => ({
//           ...prev,
//           ...data,
//           photo: null // prevent resending photo unless user uploads again
//         }));
  
//         // ✅ Fix: ensure full image URL is set
//         if (data.photo) {
//           const fullPhotoUrl = data.photo.startsWith("http")
//             ? data.photo
//             : `http://127.0.0.1:8000${data.photo}`; // or your Render domain
//           setPhotoPreview(fullPhotoUrl);
//         }
             
//       })
//       .catch((err) => {
//         console.error("Profile fetch error:", err);
//       });
//   }, []);
  
  
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       setProfile((prev) => ({ ...prev, photo: files[0] }));
//       setPhotoPreview(URL.createObjectURL(files[0]));
//     } else {
//       setProfile((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSave = () => {
//     setSaving(true);
//     const token = localStorage.getItem("token");
//     const formData = new FormData();

//     Object.entries(profile).forEach(([key, value]) => {
//       if (value !== null) {
//         formData.append(key, value);
//       }
//     });

//     fetch("http://127.0.0.1:8000/api/profile/", {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       body: formData
//     })
//       .then((res) => res.json())
//       .then(() => {
//         alert("Profile updated successfully");
//       })
//       .catch((err) => {
//         alert("Update failed");
//         console.error(err);
//       })
//       .finally(() => setSaving(false));
//   };

//   return (
//     <div className="profile-container">
//       <h2>Profile</h2>
//       <div className="profile-field">
//         <label>Username (readonly)</label>
//         <input type="text" value={profile.username} disabled />
//       </div>

//       <div className="profile-field">
//         <label>First Name</label>
//         <input name="first_name" value={profile.first_name} onChange={handleChange} />
//       </div>

//       <div className="profile-field">
//         <label>Last Name</label>
//         <input name="last_name" value={profile.last_name} onChange={handleChange} />
//       </div>

//       <div className="profile-field">
//         <label>Email</label>
//         <input name="email" value={profile.email} onChange={handleChange} />
//       </div>

//       <div className="profile-field">
//         <label>Phone</label>
//         <input name="phn" value={profile.phn} onChange={handleChange} />
//       </div>

//       <div className="profile-field">
//         <label>Date of Birth</label>
//         <input name="dateofbirth" type="date" value={profile.dateofbirth} onChange={handleChange} />
//       </div>

//       <div className="profile-field">
//         <label>Photo</label>
//         <input name="photo" type="file" accept="image/*" onChange={handleChange} />
//         {photoPreview && <img className="preview-img" src={photoPreview} alt="preview" />}
//       </div>

//       <button className="save-button" onClick={handleSave} disabled={saving}>
//         {saving ? "Saving..." : "Save"}
//       </button>
//     </div>
//   );
// }

// export { Protectedpage };


// import React, { useEffect, useState } from "react";
// import "../index.css";

// function Protectedpage() {
//   const name = localStorage.getItem("username");
//   const [profile, setProfile] = useState({
//     username: name,
//     first_name: "",
//     last_name: "",
//     email: "",
//     phn: "",
//     dateofbirth: "",
//     photo: null,
//   });

//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     fetch("http://127.0.0.1:8000/api/profile/", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch profile");
//         return res.json();
//       })
//       .then((data) => {
//         setProfile((prev) => ({
//           ...prev,
//           ...data,
//         }));
//         if (data.photo) {
//           const fullPhotoUrl = data.photo.startsWith("http")
//             ? data.photo
//             : `http://127.0.0.1:8000/media/${data.photo}` ;  // ✅ FIXED
//           setPhotoPreview(fullPhotoUrl);
//         }
        
        
//       })
//       .catch((err) => {
//         console.error("Profile fetch error:", err);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "photo") {
//       const file = files[0];
//       setProfile((prev) => ({ ...prev, photo: file }));
//       setPhotoPreview(URL.createObjectURL(file));
//     } else {
//       setProfile((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSave = () => {
//     setSaving(true);
//     const token = localStorage.getItem("token");
//     const formData = new FormData();

//     Object.entries(profile).forEach(([key, value]) => {
//       if (value !== null) {
//         formData.append(key, value);
//       }
//     });
    

//     fetch("http://127.0.0.1:8000/api/profile/", {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Update failed");
//         return res.json();
//       })
//       .then((data) => {
//         alert("Profile updated successfully");
//         if (data.photo) {
//           const fullPhotoUrl = data.photo.startsWith("http")
//             ? data.photo
//             : `http://127.0.0.1:8000/media/${data.photo}`
//       ;  // ✅ FIXED
//           setPhotoPreview(fullPhotoUrl);
//         }
//         console.log("Photo path:", data.photo);
        
        
//       })
//       .catch((err) => {
//         alert("Update failed");
//         console.error(err);
//       })
//       .finally(() => setSaving(false));
  
//   };

//   return (
//     <div className="profile-container">
//       <h2>Profile</h2>

//       <div className="profile-field">
//         <label>Username (readonly)</label>
//         <input type="text" value={profile.username} disabled />
//       </div>

//       <div className="profile-field">
//         <label>First Name</label>
//         <input
//           name="first_name"
//           value={profile.first_name}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="profile-field">
//         <label>Last Name</label>
//         <input
//           name="last_name"
//           value={profile.last_name}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="profile-field">
//         <label>Email</label>
//         <input name="email" value={profile.email} onChange={handleChange} />
//       </div>

//       <div className="profile-field">
//         <label>Phone</label>
//         <input name="phn" value={profile.phn} onChange={handleChange} />
//       </div>

//       <div className="profile-field">
//         <label>Date of Birth</label>
//         <input
//           name="dateofbirth"
//           type="date"
//           value={profile.dateofbirth}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="profile-field">
//         <label>Photo</label>
//         <input
//           name="photo"
//           type="file"
//           accept="image/*"
//           onChange={handleChange}
//         />
//         {photoPreview && (
//           <img
//             className="preview-img"
//             src={photoPreview}
//             alt="preview"
//             style={{ maxWidth: "150px", marginTop: "10px" }}
//           />
//         )}
//       </div>

//       <button className="save-button" onClick={handleSave} disabled={saving}>
//         {saving ? "Saving..." : "Save"}
//       </button>
//     </div>
//   );
// }

// export { Protectedpage };



import React, { useEffect, useState } from "react";
import "../index.css";

function Protectedpage() {
  const name = localStorage.getItem("username");
  const [profile, setProfile] = useState({
    username: name,
    first_name: "",
    last_name: "",
    email: "",
    phn: "",
    dateofbirth: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/profile/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile((prev) => ({
          ...prev,
          ...data,
        }));

        if (data.photo) {
          const fullPhotoUrl = data.photo.startsWith("http")
            ? data.photo
            : `http://127.0.0.1:8000/media/${data.photo}`;
          setPhotoPreview(fullPhotoUrl);
        }
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setProfile((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();

    Object.entries(profile).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    fetch("http://127.0.0.1:8000/api/profile/", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((data) => {
        alert("Profile updated successfully");
        if (data.photo) {
          const fullPhotoUrl = data.photo.startsWith("http")
            ? data.photo
            : `http://127.0.0.1:8000/media/${data.photo}`;
          setPhotoPreview(fullPhotoUrl);
        }
      })
      .catch((err) => {
        alert("Update failed");
        console.error(err);
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div className="profile-field">
        <label>Username (readonly)</label>
        <input type="text" value={profile.username} disabled />
      </div>

      <div className="profile-field">
        <label>First Name</label>
        <input
          name="first_name"
          value={profile.first_name}
          onChange={handleChange}
        />
      </div>

      <div className="profile-field">
        <label>Last Name</label>
        <input
          name="last_name"
          value={profile.last_name}
          onChange={handleChange}
        />
      </div>

      <div className="profile-field">
        <label>Email</label>
        <input name="email" value={profile.email} onChange={handleChange} />
      </div>

      <div className="profile-field">
        <label>Phone</label>
        <input name="phn" value={profile.phn} onChange={handleChange} />
      </div>

      <div className="profile-field">
        <label>Date of Birth</label>
        <input
          name="dateofbirth"
          type="date"
          value={profile.dateofbirth}
          onChange={handleChange}
        />
      </div>

      <div className="profile-field">
        <label>Photo</label>
        <input
          name="photo"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {photoPreview && (
          <img
            className="preview-img"
            src={photoPreview}
            alt="Profile"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            style={{ maxWidth: "150px", marginTop: "10px" }}
          />
        )}
      </div>

      <button className="save-button" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export { Protectedpage };
