import React, { useState, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { getStudyMaterials } from "../../actions/studyMaterial";
import { getAllStudyMaterialProgress } from "../../actions/studyProgress";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import firebase from "firebase";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "./StudyMaterialList.css";

function StudyMaterialList() {
  //states
  const [studyMaterialList, setStudyMaterialList] = useState([]);
  const dispatch = useDispatch();
  const store = useStore();
  const history = useHistory();

  //useEffect
  useEffect(() => {
    getStudyMaterialList();
  }, []);

  //functions
  const getStudyMaterialList = () => {
    dispatch(getStudyMaterials()).then(() => {
      if (store.getState().studyMaterial) {
        var studyMaterialList =
          store.getState().studyMaterial.studyMaterialList;
        if (studyMaterialList) {
          getUserStudyProgress(studyMaterialList);
        }
      }
    });
  };

  const openStudyMaterial = (studyMaterial) => {
    history.push(`studyMaterial/${studyMaterial._id}`);
  };

  const getUserStudyProgress = (studyMaterialList) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userEmail = user.email;
        dispatch(getAllStudyMaterialProgress(userEmail)).then(() => {
          if (store.getState().studyProgress) {
            let allStudyProgress =
              store.getState().studyProgress.allStudyProgress;
            if (allStudyProgress && allStudyProgress.length > 0) {
              for (let i = 0; i < studyMaterialList.length; i++) {
                for (let j = 0; j < allStudyProgress.length; j++) {
                  if (
                    studyMaterialList[i]._id.toString() ===
                      allStudyProgress[j].studyMaterialId &&
                    allStudyProgress[j].timeForCompletion === 0
                  ) {
                    studyMaterialList[i].testCompleted = true;
                    break;
                  }
                }
              }
              setStudyMaterialList(studyMaterialList);
            } else {
              setStudyMaterialList(studyMaterialList);
            }
          } else {
            setStudyMaterialList(studyMaterialList);
          }
        });
      }
    });
  };

  return (
    <div>
      {studyMaterialList.length > 0 ? (
        <List>
          {studyMaterialList.map((studyMaterial) => (
            <div className="studyMaterialList_list-item">
              <ListItem
                onClick={(e) => {
                  e.preventDefault();
                  openStudyMaterial(studyMaterial);
                }}
                button
              >
                <ListItemText primary={studyMaterial.name} />
                {studyMaterial?.testCompleted ? (
                  <ListItemIcon>
                    <CheckCircleOutlineIcon />
                  </ListItemIcon>
                ) : (
                  <></>
                )}
              </ListItem>
            </div>
          ))}
        </List>
      ) : (
        <></>
      )}
    </div>
  );
}

export default StudyMaterialList;
