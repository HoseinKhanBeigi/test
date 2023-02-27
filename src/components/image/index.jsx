import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

export const Img = styled("img")(({ width, theme }) => ({
  objectFit: "contain",
  objectPosition:" top",
  position: !width && "absolute",
  left: "50%",
  transform: !width && "translate(-50%)",
  height: "100%",
  width,
}));

const Image = ({ url, src, width }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    import("../../img/" + src + ".png").then((res) => {
      setImage(res.default);
    });
  }, [src]);

  return image && <Img src={image} width={width} />;
};

export default Image;
