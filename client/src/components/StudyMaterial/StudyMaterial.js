import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { getStudyMaterialById } from "../../actions/studyMaterial";
import {
  getStudyMaterialProgress,
  setStudyMaterialProgress,
  updateStudyProgress,
} from "../../actions/studyProgress";
import { Document, Page, pdfjs } from "react-pdf";
import firebase from "firebase";
import useCountDown from "react-countdown-hook";
import Navbar from "../Navbar/Navbar";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button";
import "./StudyMaterial.css";
var timer = null;
var studyProgressLoc = null;

function StudyMaterial() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const corsPrefixUrl = "https://cors-anywhere.herokuapp.com/";
  const { materialId } = useParams();
  const store = useStore();
  const dispatch = useDispatch();
  const history = useHistory();
  //states
  const [numPages, setNumPages] = useState(null);
  const [timeLeft, { start, pause }] = useCountDown(60 * 60 * 1000, 1000);
  const [pageNumber, setPageNumber] = useState(1);
  const [studyMaterial, setStudyMaterial] = useState(null);
  const [studyProgress, setStudyProgress] = useState(null);

  useEffect(() => {
    if (store.getState().studyMaterial) {
      if (store.getState().studyMaterial.studyMaterialList) {
        let list = store.getState().studyMaterial.studyMaterialList;
        let studyMaterial = list.find(
          (material) => material._id.toString() === materialId
        );
        if (studyMaterial) {
          setStudyMaterial(studyMaterial);
          getStudyProgress(studyMaterial);
        }
      }
    } else {
      dispatch(getStudyMaterialById(materialId)).then(() => {
        if (store.getState().studyMaterial.selectedStudyMaterial) {
          let studyMaterial =
            store.getState().studyMaterial.selectedStudyMaterial;
          if (studyMaterial) {
            setStudyMaterial(studyMaterial);
            getStudyProgress(studyMaterial);
          }
        }
      });
    }

    return () => {
      updateStudyMaterialProgress();
    };
  }, []);

  useEffect(() => {
    timer = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    studyProgressLoc = studyProgress;
  }, [studyProgress]);

  //   functions

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const setPreviousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const setNextPage = () => {
    if (pageNumber !== numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const getStudyProgress = (studyMaterial) => {
    let studyMaterialId = studyMaterial._id;
    let userEmail = "";

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userEmail = user.email;
        dispatch(getStudyMaterialProgress(studyMaterialId, userEmail)).then(
          () => {
            if (store.getState().studyProgress) {
              let studyProgress = store.getState().studyProgress.studyProgress;
              if (studyProgress) {
                if (
                  studyProgress.message &&
                  studyProgress.message === "study progress not found"
                ) {
                  let studyProgress = {
                    studyMaterialId: studyMaterial._id,
                    userEmailId: userEmail,
                  };
                  start(3600 * 1000);
                  dispatch(setStudyMaterialProgress(studyProgress)).then(() => {
                    if (store.getState().studyProgress) {
                      let setStudyProgressLoc =
                        store.getState().studyProgress.setStudyProgress;
                      if (setStudyProgressLoc) {
                        setStudyProgress(setStudyProgressLoc);
                      }
                    }
                  });
                } else {
                  let timeForCompletion = studyProgress.timeForCompletion;
                  setStudyProgress(studyProgress);
                  start(timeForCompletion * 1000);
                }
              }
            }
          }
        );
      }
    });
  };

  const updateStudyMaterialProgress = () => {
    pause();
    if (studyProgressLoc) {
      studyProgressLoc.timeForCompletion = timer / 1000;
      dispatch(updateStudyProgress(studyProgressLoc)).then(() => {});
    }
  };

  const markAsComplete = () => {
    history.push("/dashboard");
  };

  return (
    <div>
      <div className="studyMaterial_navbar">
        <Navbar pageName="studyMaterial" />
      </div>
      <div className="studyMaterial_top-section">
        <div className="studyMaterial_file-name">{studyMaterial?.name}</div>
        <div className="studyMaterial_time-remaining">
          <p className="studyMaterial_time-remaining-text">
            Time Remaining: {parseInt((timeLeft / (1000 * 60 * 60)) % 24)} :{" "}
            {Math.floor(timeLeft / 60000)} :{" "}
            {((timeLeft % 60000) / 1000).toFixed(0)}
          </p>
        </div>
      </div>
      <div className="studyMaterial_pdf-frame">
        <Document
          file={`${corsPrefixUrl}${studyMaterial?.pdfUrl}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="studyMaterial_bottom-section">
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div className="studyMaterial_pdf-navigation">
          <div
            onClick={(e) => {
              e.preventDefault();
              setPreviousPage();
            }}
            style={{ cursor: "pointer" }}
          >
            <KeyboardArrowLeftIcon />
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setNextPage();
            }}
            style={{ cursor: "pointer" }}
          >
            <KeyboardArrowRightIcon />
          </div>
        </div>
        <div className="studyMaterial_finish-btn">
          {timer === 0 ? (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  markAsComplete();
                }}
                variant="contained"
              >
                Finish
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" disabled>
                Finish
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyMaterial;
