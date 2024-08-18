import React, { useEffect, useState } from "react";
import style from "./Modal.module.scss";
import LinearIcon from "../../img/svg/Linear.icon";
import RandomForestIcon from "../../img/svg/RandomForest.icon";
import SVMIcon from "../../img/svg/SVM.icon";
import KmeanIcon from "../../img/svg/Kmean.icon";
import { MODAL_TYPES } from "../../enums";

const Modal = ({ getSelectedModal }) => {
  const [selectedModal, setSelectedModal] = useState("");

  useEffect(() => {
    getSelectedModal(selectedModal);
  }, [selectedModal]);

  return (
    <div className={style.dataExploration}>
      <p className="text-sm">
        To move on to the next step, "Data Analysis," you need to choose at
        least one of the following models. Each model helps analyze your data in
        a different way. Here's a brief description of each model to help you
        decide:
      </p>
      <ul className={style.modalDescriptionUI}>
        <li>
          <p className={style.head}>Linear Model</p>
          <p>
            The Linear Model is a straightforward approach that assumes a direct
            relationship between your data points. It’s like drawing a straight
            line through your data to see how they relate.
          </p>
        </li>
        <li>
          <p className={style.head}>Random Forest</p>
          <p>
            Random Forest is like a team of decision-makers. It combines the
            decisions of many smaller models to give you a more accurate and
            balanced result.
          </p>
        </li>
        <li>
          <p className={style.head}>Support Vector Machine (SVM)</p>
          <p>
            SVM helps classify your data by drawing a boundary that best
            separates different groups. Think of it as a way to categorize your
            data into distinct sections.
          </p>
        </li>
        <li>
          <p className={style.head}>K-Means Clustering</p>
          <p>
            K-Means groups your data into clusters that are similar to each
            other. It helps you see patterns or groupings in your data that you
            might not notice at first glance.
          </p>
        </li>
      </ul>

      <div>
        <div class={style.modalContainer}>
          <label
            className={
              selectedModal === MODAL_TYPES.LINEAR_REGRESSION
                ? [style.modalItem, style.modalItemActive].join(" ")
                : style.modalItem
            }
          >
            <input
              type="checkbox"
              class="card-checkbox"
              id="card1"
              onChange={(e) => setSelectedModal(MODAL_TYPES.LINEAR_REGRESSION)}
            />
            <div className={style.modalCenter}>
              <div className={style.modalIcon}>
                <LinearIcon
                  size={40}
                  color={
                    selectedModal === MODAL_TYPES.LINEAR_REGRESSION
                      ? "#105CD1"
                      : "#000000"
                  }
                />
              </div>
              <p>{MODAL_TYPES.LINEAR_REGRESSION}</p>
            </div>
          </label>

          <label
            className={
              selectedModal === MODAL_TYPES.RANDOM_FOREST
                ? [style.modalItem, style.modalItemActive].join(" ")
                : style.modalItem
            }
          >
            <input
              type="checkbox"
              class="card-checkbox"
              id="card2"
              onChange={(e) => setSelectedModal(MODAL_TYPES.RANDOM_FOREST)}
            />
            <div className={style.modalCenter}>
              <div className={style.modalIcon}>
                <RandomForestIcon
                  size={40}
                  color={
                    selectedModal === MODAL_TYPES.RANDOM_FOREST
                      ? "#105CD1"
                      : "#000000"
                  }
                />
              </div>
              <p>{MODAL_TYPES.RANDOM_FOREST}</p>
            </div>
          </label>

          <label
            className={
              selectedModal === MODAL_TYPES.SUPPORT_VECTOR_MACHINE
                ? [style.modalItem, style.modalItemActive].join(" ")
                : style.modalItem
            }
          >
            <input
              type="checkbox"
              class="card-checkbox"
              id="card3"
              onChange={(e) =>
                setSelectedModal(MODAL_TYPES.SUPPORT_VECTOR_MACHINE)
              }
            />
            <div className={style.modalCenter}>
              <div className={style.modalIcon}>
                <SVMIcon
                  size={40}
                  color={
                    selectedModal === MODAL_TYPES.SUPPORT_VECTOR_MACHINE
                      ? "#105CD1"
                      : "#000000"
                  }
                />
              </div>
              <p>{MODAL_TYPES.SUPPORT_VECTOR_MACHINE}</p>
            </div>
          </label>

          <label
            className={
              selectedModal === MODAL_TYPES.KMEAN_CLUSTERING
                ? [style.modalItem, style.modalItemActive].join(" ")
                : style.modalItem
            }
          >
            <input
              type="checkbox"
              class="card-checkbox"
              id="card4"
              onChange={(e) => setSelectedModal(MODAL_TYPES.KMEAN_CLUSTERING)}
            />
            <div className={style.modalCenter}>
              <div className={style.modalIcon}>
                <KmeanIcon
                  size={40}
                  color={
                    selectedModal === MODAL_TYPES.KMEAN_CLUSTERING
                      ? "#105CD1"
                      : "#000000"
                  }
                />
              </div>
              <p>{MODAL_TYPES.KMEAN_CLUSTERING}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
