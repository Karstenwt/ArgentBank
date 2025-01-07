import React from "react";
import FeatureItem from "./FeatureItem";
import "./Features.css";

const Features = () => {
  const featureData = [
    {
      imgSrc: "./img/icon-chat.png",
      imgAlt: "Chat Icon",
      title: "You are our #1 priority",
      description:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      imgSrc: "./img/icon-money.png",
      imgAlt: "Money Icon",
      title: "More savings means higher rates",
      description:
        "The more you save with us, the higher your interest rate will be!",
    },
    {
      imgSrc: "./img/icon-security.png",
      imgAlt: "Security Icon",
      title: "Security you can trust",
      description:
        "We use top-of-the-line encryption to make sure your data and money are always safe.",
    },
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featureData.map((feature, index) => (
        <FeatureItem
          key={index}
          imgSrc={feature.imgSrc}
          imgAlt={feature.imgAlt}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </section>
  );
};

export default Features;