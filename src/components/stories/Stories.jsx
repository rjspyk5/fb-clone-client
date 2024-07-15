import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Stories = () => {
  const { user } = useContext(AuthContext);
  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMG_API
  }`;

  const onSubmit = (data) => {
    const handleImageUpload = async () => {
      if (data.image.length > 0) {
        const imageFile = { image: data.image[0] };
        const im = await axios.post(url, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        data.image = im.data.data.display_url;
      } else {
        data.image = "https://iili.io/Jbv2kkF.jpg";
      }
    };
    handleImageUpload().then(() => {
      return axiosPublic.patch(`/${user?.email}`, {
        image: data.image,
      });
    });
  };

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <form action="">
          <img src={user?.photoURL} alt="" />
          <span>{user?.displayName}</span>
          <label htmlFor="file">
            <input id="file" type="file" />
            <span className="button">+</span>
          </label>
          <input type="submit" />
        </form>
      </div>

      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
