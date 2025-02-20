import React, { useState } from "react";
import Spark from "../assets/Spark.png";
import styles from "./styles/TellUs.module.css";
import { useNavigate } from "react-router-dom";
const categories = [
  {
    icon: "🎨",
    name: "Creative",
  },
  {
    icon: "🏢",
    name: "Business",
  },
  {
    icon: "📚",
    name: "Education",
  },
  {
    icon: "🎶",
    name: "Entertainment",
  },
  {
    icon: "👗",
    name: "Fashion & Beauty",
  },
  {
    icon: "🍕",
    name: "Food & Beverage",
  },
  {
    icon: "⚖️",
    name: "Government & Politics",
  },
  {
    icon: "🍎",
    name: "Health & Wellness",
  },
  {
    icon: "💗",
    name: "Non-Profit",
  },
  {
    icon: "💗",
    name: "Other",
  },
  {
    icon: "🖥",
    name: "Tech",
  },
  {
    icon: "✈️",
    name: "Travel & Tourism",
  },
];
const TellUs = () => {
  const [username, setUsername] = useState("");
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  // console.log(username);
  // console.log(selected);
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <img src={Spark} alt="spark" />
      </div>
      <div className={styles.title}>Tell us about yourself</div>
      <div className={styles.subtitle}>For a personalized Spark experience</div>
      <div className={styles.username}>
        <input
          type="text"
          placeholder="Tell us your username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.cards}>
        <span>Select one category that best describes your Linktree:</span>
        <div className={styles.categories}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelected(category.name)}
              className={`${
                selected === category.name ? styles.selected : styles.category
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.continue}>
        <button onClick={() => navigate("/profile")}>Continue</button>
      </div>
    </div>
  );
};

export default TellUs;
