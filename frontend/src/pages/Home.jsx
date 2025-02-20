import React from "react";
import logo from "../assets/logo.svg";
import clrPatlette from "../assets/clrPalette.png";
import Frame from "../assets/Frame.png";
import Group from "../assets/Group.png";
import analytics from "../assets/analytics.png";
import { IoMenu } from "react-icons/io5";
import div from "../assets/div.png";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Home.module.css";
const Home = () => {
  const navigate = useNavigate();
  const testimonials = [
    {
      bgColor: "#ffffff",
    },
    {
      bgColor: "#DEDEDE",
    },
    {
      bgColor: "#ffffff",
    },
    {
      bgColor: "#DEDEDE",
    },
  ];
  return (
    <div className={styles.main}>
      {/* NavBar Starts */}
      <div className={styles.navbar}>
        <div className={styles.icon}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.adminBtns}>
          <button className={styles.adminBtn} disabled>
            Admin
          </button>
          <button className={styles.signupBtn} onClick={()=>navigate('/signup')}>Sign up free</button>
        </div>
        <div className={styles.hamburger}>
          <IoMenu size={25} color="#252525" />
        </div>
      </div>
      {/* NavBar Ends */}
      <div className={styles.content}>
        <div className={styles.blk1}>
          <h1>The easiest place to update and share your Connection</h1>
          <h3>
            Help your followers discover everything you’re sharing all over the
            internet, in one simple place. They’ll thank you for it!
          </h3>
          <button className={styles.getStarted} disabled>
            Get your free Spark
          </button>
        </div>
        <div className={styles.analyticsImg}>
          <img src={analytics} alt="analytics logo" />
        </div>
        <div className={styles.blk2}>
          <h1>The best in the class product for you today!</h1>
          <h3>
            This is a placeholder for your testimonials and what your client has
            to say, put them here and make sure its 100% true and meaningful.
          </h3>
        </div>
        <div className={styles.blk3}>
          <img src={clrPatlette} alt="color patlette" />
          <p>
            Sell products and collect payments. It’s monetization made simple.
          </p>
        </div>
        <div className={styles.blk4}>
          <h1>Analyze your audience and keep your followers engaged</h1>
          <h3>
            Track your engagement over time, monitor revenue and learn what’s
            converting your audience. Make informed updates on the fly to keep
            them coming back.
          </h3>
        </div>
        <div className={styles.pic1}>
          <img src={div} alt="div" />
        </div>
        <div className={styles.blk5}>
          <h1>Share limitless content in limitless ways</h1>
          <h3>
            Connect your content in all its forms and help followers find more
            of what they’re looking for. Your TikToks, Tweets, YouTube videos,
            music, articles, recipes, podcasts and more… It all comes together
            in one powerful place
          </h3>
        </div>
        <div className={styles.blk6}>
          <h1>Here's what our </h1>
          <span> customer</span>
          <h1>has to says</h1>
        </div>
        <div className={styles.stories}>
          <button className={styles.storyBtn} disabled>
            Read customer stories
          </button>
        </div>
        <div className={styles.carousel}>
          {testimonials.map((testimonial, index) => (
            <span
              key={index}
              className={styles.tile}
              style={{ backgroundColor: testimonial.bgColor }}
            >
              <h1>Amazing tool! Saved me months</h1>
              <h3>
                This is a placeholder for your testimonials and what your client
                has to say, put them here and make sure it's 100% true and
                meaningful.
              </h3>
              <span>
                <div className={styles.greenball}></div>
                <div>
                  <h5>John Master</h5>
                  <h4>Director, Spark.com</h4>
                </div>
              </span>
            </span>
          ))}
        </div>
        <div className={styles.tit}>All Link Apps and Integrations</div>
        <div className={styles.frame}>
          <img src={Frame} alt="frame" />
        </div>
        <div className={styles.group}>
          <img src={Group} alt="group" />
        </div>
      </div>
    </div>
  );
};

export default Home;
