import React from "react";

const Photo = ({
  alt_description,
  likes,
  urls: { regular },
  user: {
    first_name,
    portfolio_url,
    profile_image: { medium },
  },
  links: { portfolio },
}) => {
  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h5>{first_name}</h5>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} className="user-img" alt="" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
