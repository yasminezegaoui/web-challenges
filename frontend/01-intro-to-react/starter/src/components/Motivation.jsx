import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import "../styles/Motivation.css";

function Motivation() {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false)
   
  function handleLikes(){
    if(!liked){
      setLikesCount(likesCount + 1)
      setLiked(true)
      
      setTimeout(() => {
        setLiked(false);
      }, 500);
    }
  }

  return (
    <> 
      <div className="motivation">
        <button className={`like-bttn ${liked ? "animate" : ""}`} onClick={handleLikes}>
          <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
        </button>
        <div className="like-counter">{likesCount}</div>
      </div>
    </>
  )
}

export default Motivation;
