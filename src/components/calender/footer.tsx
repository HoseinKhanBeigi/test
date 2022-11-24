// import classNames from "classnames";

import React from "react";

interface IFooterProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}
const Footer = ({ onCancel, onConfirm }: IFooterProps) => {
  return (
    <div>
      <button onClick={onConfirm} className="ml-6">
        تایید
      </button>
      <button onClick={onCancel}>انصراف</button>
    </div>
  );
};

export default Footer;
