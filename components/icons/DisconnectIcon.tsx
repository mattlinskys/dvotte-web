import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const DisconnectIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <g fill="currentColor" fillRule="nonzero">
      <path d="M10 1a8 8 0 0 1 7.157 11.579l-1.79-.895a6 6 0 1 0-10.735.001l-1.789.894A8 8 0 0 1 10 1Z" />
      <path d="m5.25 14.754 1.427-1.426 2.313 2.311L8.991 9h2.018v6.64l2.314-2.312 1.427 1.426-3.741 3.738v.01h-.01L10 19.5l-.999-.998h-.01l-.001-.011z" />
    </g>
  </IconBase>
);

export default DisconnectIcon;
