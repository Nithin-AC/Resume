import React, { useEffect, useState } from "react";

function Reset(){
    const [data,setdata]  = useState([]);
    const [newpassword,setnewpassword] = useState("");
    const [oldpassword,setoldpassword] = useState("");
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/fruits/")
        .then((res)=>res.json())
        .then((response)=>{
            setdata(response)
        })
    } ,[])

    function resetpassword(){
        const item= data.find((obj)=>obj.password===oldpassword);
        if (!item) {
            alert("Old password not found!");
            return;
          }

        fetch("http://127.0.0.1:8000/api/fruits/",{
            method: "PATCH",
            body: JSON.stringify({ password:newpassword}),
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(updated => {
        setdata(data.map(obj => obj.password === oldpassword ? updated : obj));
        setoldpassword("")
        setnewpassword("")
        alert("Password updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating password:", err);
        alert("Something went wrong");
      });
    }

    return(
        <>
        <input value={oldpassword} onChange={(e)=>{setoldpassword(e.target.value)}} placeholder="Enter old passowrd" />
        <input value={newpassword} onChange={(e)=>{setnewpassword(e.target.value)}} placeholder="Enter new password"/>
        <button onClick={resetpassword} >Set new password</button>
        </>
    )
}

export {Reset}