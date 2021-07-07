import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Like = (props) => {
  const liked = props.liked ? faHeart : farHeart;
  return (
    <div style={{ cursor: "pointer" }} onClick={props.onClick}>
      <FontAwesomeIcon icon={liked} />
    </div>
  );
};

export default Like;
