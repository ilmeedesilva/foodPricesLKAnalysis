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
            Care Bear is a powerful data analysis tool that utilizes advanced
            machine learning techniques to analyze and predict trends. The
            platform provides precise insights and forecasts, enabling informed
            data-driven decisions.
          </p>
          <div className="mt-5">
            <CustomButton
              buttonClass={"PRIMARY"}
              text={"Learn More"}
              type={"button"}
            />
          </div>
        </div>
        <div className={style.mainBearGifWrp}>
          <img src={bearGif} alt="Bear GIF" className={style.bearGif} />
        </div>
        <div className={style.otherAnyz}>
          {/* <h3>Popular analysis</h3>
          <div className={style.cardItem}>
            <h5>Sri Lanka Fodd analysis</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
