import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";

const Userupdate = () => {
  const [formvalue, setFormvalue] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    photo: "",
  });

  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };
  const { user, signUp, logOut, updateUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: formvalue.username,
      email: formvalue.email,
      password: formvalue.password,
      name: formvalue.name,
      photo: formvalue.photo,
    };
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form style={{ marginTop: "30px", marginBottom: "30px" }}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formvalue.username}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Profile URL
              </label>
              <input
                type="text"
                name="photo"
                className="form-control"
                id="photo"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Userupdate;
