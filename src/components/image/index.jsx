import { useEffect, useState } from "react";
const Image = ({ url, src, className }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    import("../../img/" + src + ".png").then((res) => {
      setImage(res.default);
    });
  }, [src]);

  return image && <img src={image} className={className} />;
};

export default Image;
