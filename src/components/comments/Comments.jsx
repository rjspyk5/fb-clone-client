import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = ({ comments, handleComment }) => {
  console.log(comments);
  const { user } = useContext(AuthContext);

  return (
    <div className="comments">
      <form onSubmit={handleComment} action="">
        <div className="write">
          <img src={user?.photo} alt="" />
          <input
            required
            name="text"
            type="text"
            placeholder="write a comment"
          />
          <button type="submit">Send</button>
        </div>
      </form>
      {comments?.map((comment, idx) => (
        <div key={idx} className="comment">
          <img src={comment?.photo} alt="" />
          <div className="info">
            <span>{comment?.name}</span>
            <p>{comment?.text}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
