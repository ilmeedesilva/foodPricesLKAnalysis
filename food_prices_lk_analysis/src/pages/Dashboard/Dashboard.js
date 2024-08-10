import React from "react";
import style from "./Dashboard.module.scss";
import bearGif from "../../img/gif/bear.gif";
import CustomButton from "../../custom/CustomButton";

const Dashboard = () => {
  return (
    <div className="content-wrap">
      <div className={style.wrpDsbrd}>
        <div className={style.desContWrp}>
          <h2>Analyzing What Matters</h2>
          <p>
            Care Bear is a powerful food data analysis tool that utilizes
            advanced machine learning techniques to analyze and predict food
            trends. The platform provides precise insights and forecasts,
            enabling informed decisions about food-related data.
          </p>
          <CustomButton
            buttonClass={"PRIMARY"}
            text={"Learn More"}
            type={"button"}
          />
        </div>
        <div className={style.mainBearGifWrp}>
          <img src={bearGif} alt="Bear GIF" className={style.bearGif} />
        </div>
        <div className={style.otherAnyz}>
          <div className={style.cardItem}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
