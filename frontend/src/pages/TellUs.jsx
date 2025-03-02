import React, { useState } from "react";
import { toast } from "react-toastify";
import Spark from "../assets/Spark.png";
import styles from "./styles/TellUs.module.css";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import useIsMobile from "../components/hooks/useIsMobile";
import { setUserDetails } from "../services/profile.services";
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
  const isMobile = useIsMobile();
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !category.trim()) {
      return;
    }
    try {
      const userData = {
        username: username,
        category: category,
      };
      const res = await setUserDetails(userData);
      const data = await res.json();
      if (res.status === 200) {
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.main}>
      <div className={!isMobile ? styles.container : ""}>
        <div className={styles.logo}>
          <img src={Spark} alt="spark" />
        </div>
        <div className={styles.title}>Tell us about yourself</div>
        <div className={styles.subtitle}>
          For a personalized Spark experience
        </div>
        <div className={styles.username}>
          <input
            type="text"
            placeholder="Tell us your username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
          />
        </div>
        <div className={styles.cards}>
          <span>Select one category that best describes your Linktree:</span>
          <div className={styles.categories}>
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() => setCategory(item.name)}
                className={`${
                  category === item.name ? styles.selected : styles.category
                }`}
              >
                {item.icon} {item.name}
              </button>
            ))}
          </div>
        </div>
      <div className={styles.continue}>
        <button onClick={handleSubmit}>Continue</button>
      </div>
      </div>
      {!isMobile && (
        <div className={styles.image}>
          <img src={image} />
        </div>
      )}
    </div>
  );
};

export default TellUs;
