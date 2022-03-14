import React from "react";
import useAutoConnect from "hooks/useAutoConnect";
import useWeb3ErrorToast from "hooks/useWeb3ErrorToast";

const AutoConnect: React.FC = () => {
  useAutoConnect();
  useWeb3ErrorToast();
  return null;
};

export default AutoConnect;
