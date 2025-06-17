import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState(false);
  const [load, setload] = useState(true);
  const [newname, setnewname] = useState("");
  const [newcolor, setnewcolor] = useState("");
  const [delname, setdelname] = useState("");
  const[updatename,setupdatename] = useState("");
  const [updatecolor,setupdatecolor] = useState("");
  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/fruits/")
      .then(res => res.json())
      .then(response => {
        setdata(response);
        setload(false);
      })
      .catch(err => {
        seterror(true);
        setload(false);
      });
  }, []);

  function adduser() {
    const name = newname;
    const color = newcolor;
    if (name && color) {
      fetch("http://127.0.0.1:8000/api/fruits/", {
        method: "POST",
        body: JSON.stringify({ name, color }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
        .then((res) => res.json())
        .then(one => {
          setdata([...data, one]);
          setnewname("");
          setnewcolor("");
        });
    }
  }

  function deleteitem() {
    const item = data.find(obj => obj.name === delname);
    if (!item) return;

    const id = item.id;

    fetch(`http://127.0.0.1:8000/api/fruits/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setdata(data.filter(obj => obj.id !== id));
        setdelname("");
      })
      .catch(()=>{
        alert("delete failed")
      });
  }

  function handleupdatecolor() {
    const item = data.find(obj => obj.name === updatename);
    if (!item || !updatecolor) return;
  
    fetch(`http://127.0.0.1:8000/api/fruits/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify({ color: updatecolor }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(updated => {
        setdata(data.map(obj => obj.id === item.id ? updated : obj));
        setupdatename("");
        setupdatecolor("");
      });
  }
  
  if (load) return <h2>Loading...</h2>;
  if (error) return <h2>Error fetching data.</h2>;

  return (
    <>
      <h1>Fruit Table</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Id</th>
            <th>Fruit Name</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, index) => (
            <tr key={index}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.color}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <h3>Add Fruit</h3>
      <input
        value={newname}
        onChange={(e) => setnewname(e.target.value)}
        placeholder="Enter the fruit name"
      />
      <input
        value={newcolor}
        onChange={(e) => setnewcolor(e.target.value)}
        placeholder="Enter the fruit color"
      />
      <button onClick={adduser}>Add Fruit</button>

      <br />
      <h3>Delete Fruit</h3>
      <input
        value={delname}
        onChange={(e) => setdelname(e.target.value)}
        placeholder="Enter fruit name to delete"
      />
      <button onClick={deleteitem}>Delete Fruit</button>

      <br/>
      <h3>Update the Existing data</h3>
      <input
        value={updatename}
        onChange={(e) => setupdatename(e.target.value)}
        placeholder="Enter fruit name to update"
      />
      <input
        value={updatecolor}
        onChange={(e) => setupdatecolor(e.target.value)}
        placeholder="Enter fruit name to update"
      />
      <button onClick={handleupdatecolor}>Update Fruit</button>
    </>
  );
}

export { App };


