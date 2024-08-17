import React from "react";
import style from "./Dashboard.module.scss";
import bearGif from "../../img/gif/bear.gif";
import CustomButton from "../../custom/CustomButton";
import spaceIcon from "../../img/logo/space.png";
import { Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
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
        <div className={style.quickStartUpAnyl}>
          <div className={style.header}>
            <h6>Quick Access</h6>
          </div>
          <div className={style.body}>
            <div className={style.centerImg}>
              <img src={spaceIcon} alt="menu" />
            </div>
            <div className={style.descr}>
              <h6>Explore All Available Datasets</h6>
              <p>
                Quickly access all the authorized datasets for data analysis and
                training. Check daily for updates and new dataset availability.
                Start analyzing by clicking the button below.
              </p>
            </div>
            <div className="mt-2">
              <CustomButton
                buttonClass={"PRIMARY"}
                text={"Qucik Start"}
                type={"button"}
                onClick={() => navigate("/data-exploration")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
