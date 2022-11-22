import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../actions/postAction";

function PostForm() {
  const dispatch = useDispatch();
  const [createPost, setCreatePost] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ ...createPost }));
    setCreatePost({ title: "", post: "" });
  };
  const onChangeForm = (key, value) => {
    setCreatePost((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your post title"
          required
          onChange={({ target: { value } }) => {
            onChangeForm("title", value);
          }}
        />
        <br></br>
        <textarea
          cols="30"
          rows="5"
          placeholder="Enter your post"
          required
          onChange={({ target: { value } }) => {
            onChangeForm("post", value);
          }}
        />
        <br></br>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
export default PostForm;
