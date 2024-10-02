import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = ({ loading }) => {
  return (
    <div className="">
      <ScaleLoader
        loading={loading}
        height="25px"
        width="5px"
        radius="0px"
        color="#1c1c1c"
        speedMultiplier="2"
      />
    </div>
  );
};

export default Loading;
