import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";

const Userlist = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const handleDelete = (id) => {
    axiosPublic.delete(`/user/${id}`).then((res) => alert("Delete sucessfull"));
  };
  useEffect(() => {
    axiosPublic.get("/user").then((res) => setuser(res.data));
  }, [handleDelete]);

  return (
    <>
      <div style={{ padding: "40px 20px" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Photo</th>

              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((el, idx) => {
              return (
                <tr key={el._id}>
                  <th scope="row">{idx + 1}</th>
                  <td>
                    <img
                      style={{ height: "60px", width: "50px" }}
                      src={`${el?.photo}`}
                      alt=""
                    />
                  </td>
                  <td>{el.name || "unknwon"}</td>

                  <td>{el.email}</td>
                  <td>{el.password}</td>

                  <td>
                    <NavLink to={`userupdate`}>
                      <button
                        style={{ marginRight: "5px" }}
                        className="btn btn-success"
                      >
                        Update
                      </button>
                    </NavLink>

                    <button
                      onClick={() => handleDelete(el._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Userlist;
