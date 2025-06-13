import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState(false);
  const [load, setload] = useState(true);

  useEffect(() => {
    // Using .then() to fetch from your own API
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

  if (load) return <h2>Loading...</h2>;
  if (error) return <h2>Error fetching data.</h2>;

  return (
    <>
      <h1>API</h1>
      {data.map((val, index) => (
        <div key={index}>
          <h1 className="heading">{val.name}</h1>
          <h1>{val.color}</h1>
        </div>
      ))}
    </>
  );
}

export { App };