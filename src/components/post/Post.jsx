import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useAxiosPublic } from "../../Hooks/useAxiosPublic";

const Post = ({ post, refetch }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [likes, setLikes] = useState(post?.Likes || []);
  const [like, setLike] = useState(likes.includes(user?.email));
  const [comments, setcomments] = useState(post?.comments || []);
  const handleLikeUnlike = async (postId) => {
    try {
      const response = await axiosPublic.post(
        `/likeunlike/${postId}?like=${!like}`,
        {
          email: user?.email,
        }
      );
      if (response.data.modifiedCount > 0) {
        setLike(!like);
        if (!like) {
          setLikes([...likes, user?.email]);
        } else {
          setLikes(likes.filter((email) => email !== user?.email));
        }
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const text = e.target.text.value;
      const newComment = {
        text,
        name: user.displayName,
        photo: user.photoURL,
      };
      const result = await axiosPublic.post(`/comment/${post._id}`, newComment);
      if (result.data.modifiedCount > 0) {
        setcomments([...comments, newComment]);
      }
    } catch (error) {
      console.error("Error updating comments:", error);
    }
  };

  const handleDelete = () => {
    axiosPublic
      .delete(`/post/${post._id}`)

      .then(() => refetch());
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post?.img} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post?.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post?.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <div className="dot" onClick={() => setShow(!show)}>
            {show && post?.email === user?.email ? (
              <button onClick={handleDelete} className="delete">
                Delete
              </button>
            ) : null}
            <MoreHorizIcon />
          </div>
        </div>
        <div className="content">
          <p>{post.text}</p>
          <img src={post?.postPhoto} alt="" />
        </div>
        <div className="info">
          <div onClick={() => handleLikeUnlike(post?._id)} className="item">
            {like ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {likes.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {comments.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && (
          <Comments comments={comments} handleComment={handleComment} />
        )}
      </div>
    </div>
  );
};

export default Post;
