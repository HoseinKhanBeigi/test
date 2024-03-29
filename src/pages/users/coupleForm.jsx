import React, { useRef, useEffect } from "react";
import { Grid, Stack, Box } from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Notifier from "../../components/notify";
import { dragAndDropMess } from "../../features/messageLog";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { HeaderPage } from "../../components/headerPage";
import { useTranslation } from "react-i18next";
import { userCreateGroup, userSampleFile } from "../../actions/users";
import { Typography } from "@mui/material";

import "./groupForm.css";

export const CreateUserCouple = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const file = useRef();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [textContent, setTextContent] = useState(t("exelFile"));
  const [fileUpload, setFileUpload] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleonDragOver = (event) => {
    event.preventDefault();
    setTextContent(t("Release to Upload File"));
  };

  const handleonDragLeave = (event) => {
    event.preventDefault();
    setTextContent(t("exelFile"));
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    file.current = event.dataTransfer.files[0];
    const fileExt = file.current.name.substring(
      file.current.name.lastIndexOf(".")
    );
    let validExtensions = [".xlsx", ".xls", ".sheet"];
    if (validExtensions.includes(fileExt)) {
      setTextContent(t("file uploaded"));
      setFileUpload(false);
      inputRef.current.value = `${event.dataTransfer.files[0]}`;
    } else {
      setFileUpload(true);
      inputRef.current.value = null;
      dispatch(dragAndDropMess());
      setTextContent(t("exelFile"));
    }
  };
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleClickInput = (e) => {
    file.current = e.target.files[0];
    const fileExt = file.current.name.substring(
      file.current.name.lastIndexOf(".")
    );
    let validExtensions = [".xlsx", ".xls"];
    if (validExtensions.includes(fileExt)) {
      setTextContent(t("file uploaded"));
      setFileUpload(false);
    } else {
      setFileUpload(true);
      inputRef.current.value = null;
      dispatch(dragAndDropMess());
      setTextContent(t("exelFile"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const result = {
      file: file.current,
    };

    // let fd = new FormData();
    // fd.append("file", file.current);
    dispatch(userCreateGroup(result)).then((res) => {
      if (res.payload.status === 200) {
        navigate("/users");
      } else {
      }
      setLoading(false);
    });
  };

  const handleRemove = () => {
    setFileUpload(true);
    file.current = null;
    inputRef.current.value = null;
    setTextContent(t("exelFile"));
  };

  useEffect(() => {
    dispatch(userSampleFile({ params: "" }));
  }, []);

  const { status, entities, error } = useSelector(
    (state) => state.sampleFileusr
  );

  return (
    <>
      <HeaderPage title={t("insertUser")} page="form" tab={false} />
      <Grid container justifyContent={"center"}>
        <Grid item xl={12}>
          <form onSubmit={handleSubmit}>
            <Grid container dir="rtl" justifyContent={"center"}>
              <Grid
                onDragOver={handleonDragOver}
                onDragLeave={handleonDragLeave}
                onDrop={handleOnDrop}
                onClick={handleClick}
                container
                className="drag-area"
                justifyContent={"center"}
                alignItems="center"
                sx={{ height: "265px", width: "283px" }}
                p={1}
                mb={4}
              >
                <Typography align="center">{textContent}</Typography>
                <Button ></Button>
                <input
                  name="name"
                  ref={inputRef}
                  type="file"
                  hidden
                  onChange={handleClickInput}
                />
              </Grid>
              <Grid container justifyContent={"center"}>
                <a
                  href={`http://10.154.65.29:9000/${entities.data}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
              {t("Downloadsampleexcel")}
                </a>
              </Grid>

              <Grid container justifyContent={"center"} item mt={4}>
                <LoadingButton
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={{ width: "200px" }}
                  loading={loading}
                  disabled={fileUpload}
                >
                  {t("insert")}
                </LoadingButton>
                <Button sx={{ color: "#FF2020" }} onClick={handleRemove}>
                  {t("remove")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Notifier />
    </>
  );
};
