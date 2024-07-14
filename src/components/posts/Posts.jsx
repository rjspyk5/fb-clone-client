import Post from "../post/Post";
import "./posts.scss";
import { usePosts } from "../../Hooks/usePosts";

const Posts = () => {
  const { data, refetch } = usePosts();
  return (
    <div className="posts">
      {data?.map((post) => (
        <Post post={post} refetch={refetch} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
