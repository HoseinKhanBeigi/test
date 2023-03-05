import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

export default function LinearDeterminate({ children }) {
  const [progress, setProgress] = React.useState(0);

  const { loading } = useSelector((state) => state.loadingSlice);

  React.useEffect(() => {
    console.log(loading);
    if (loading === "succeeded" || loading === "failed") {
      setProgress(100);
    } else {
      console.log(loading);
      // setProgress(0);
    }
  }, [loading]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (
          oldProgress === 100 &&
          (loading === "succeeded" || loading === "failed")
        ) {
          return 0;
        } else {
          const diff = Math.random() * 30;
          return Math.min(oldProgress + diff, 100);
        }
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {(loading === "pending" || loading === "idle") &&
        loading !== false && (
          <Box sx={{ width: "100%", position: "absolute" }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}

      {children}
    </>
  );
}
