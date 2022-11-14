import "./index.css";
import logo from "./Vector11.png";
import logo2 from "./Vector12.png";

export const Home = () => {
  return (
    <div>
      <div>
        <img className="backgroudimg1" src={logo} />
      </div>
      <div className="back">
        <img className="backgroudimg2" src={logo2} />
      </div>
    </div>
  );
};
