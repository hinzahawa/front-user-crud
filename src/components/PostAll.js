import { useSelector } from "react-redux";

export default function PostAll() {
  const posts = useSelector((state) => state.posts);;
  const ShowPosts = () => {
    if (posts.length > 0) {
      return (
        <>
          {posts.map((posts, index) => {
            return (
              <div key={index}>
                <h3>{posts.title}</h3>
                <h3>{posts.post}</h3>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <div>
          <h3>no post</h3>
        </div>
      );
    }
  };
  return (
    <div>
      <h1>Post All</h1>
      <ShowPosts />
    </div>
  );
}
