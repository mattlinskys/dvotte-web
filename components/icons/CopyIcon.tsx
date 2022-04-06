import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const CopyIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M10 1a3 3 0 0 1 2.995 2.824L13 4h1.081a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6.014a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3H7a3 3 0 0 1 3-3Zm3.081 6H7.014a1 1 0 1 0 0 2h6.067a1 1 0 1 0 0-2ZM10 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </IconBase>
);

export default CopyIcon;
