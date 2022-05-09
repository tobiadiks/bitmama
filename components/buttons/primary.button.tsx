
import * as React from "react";

const PrimaryButton = (props: {
  title?: string;
  onclick?: any;
  type?: any;
}) => {
  return (
    <button
      onClick={props.onclick}
      type={props.type ? props.type : "button"}
      className="bg-green-500  border  border-black    text-sm focus:outline-none text-white py-2 px-4 z-50 font-medium text-center rounded-sm w-full flex"
    >
      <div className="mx-auto flex font-bold">{props.title}</div>
    </button>
  );
};

export default PrimaryButton;