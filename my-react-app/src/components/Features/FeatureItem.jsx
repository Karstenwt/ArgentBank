import React from "react";
import "./FeatureItem.css";

const FeatureItem = ({ imgSrc, imgAlt, title, description }) => {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;