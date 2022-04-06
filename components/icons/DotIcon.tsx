import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const DotIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <circle cx="10" cy="10" r="10" fill="currentColor" />
  </IconBase>
);

export default DotIcon;
