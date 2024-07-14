import React, { useEffect } from "react";
import "./Body.scss";
import axios from "axios";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";
import { useState } from "react";

const Body = () => {
  const [data, setdata] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/total").then((res) => setdata(res.data));
  }, []);

  return (
    <div className="container" style={{ marginTop: "40px", display: "flex" }}>
      <div
        className="box"
        style={{
          width: "300px",
          height: "150px",
          backgroundColor: "#e74c3c",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold" }}>
          Total Users :{data?.totalUser}
        </span>
      </div>

      <div
        className="box"
        style={{
          width: "300px",
          height: "150px",
          backgroundColor: "#27ae60",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold" }}>
          Total Posts :{data?.totalPost}
        </span>
      </div>

      <div
        className="box"
        style={{
          width: "300px",
          height: "150px",
          backgroundColor: "#70a1ff",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold" }}>
          Total Comments : {data.totalComments}
        </span>
      </div>
    </div>
  );
};

export default Body;
