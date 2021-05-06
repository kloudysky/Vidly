import React from "react";

const Liked = (props) => {
  console.log(props);
  return (
    <>
      <p style={{ cursor: "pointer" }} onClick={props.onClick}>
        {props.liked ? "heart" : "unheart"}
      </p>
    </>
  );
};

export default Liked;
