import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const WalletConnectIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M4.685 7.15c2.935-2.866 7.695-2.866 10.63 0l.353.344a.36.36 0 0 1 0 .519l-1.208 1.18a.191.191 0 0 1-.266 0l-.486-.475c-2.048-1.999-5.368-1.999-7.416 0l-.52.508a.191.191 0 0 1-.266 0l-1.209-1.18a.36.36 0 0 1 0-.518l.388-.379Zm13.13 2.44 1.075 1.05a.36.36 0 0 1 0 .518l-4.85 4.735a.382.382 0 0 1-.531 0l-3.443-3.36a.096.096 0 0 0-.132 0l-3.442 3.36a.382.382 0 0 1-.532 0l-4.85-4.735a.36.36 0 0 1 0-.519l1.076-1.05a.382.382 0 0 1 .531 0l3.442 3.36a.096.096 0 0 0 .133 0l3.442-3.36a.382.382 0 0 1 .532 0l3.442 3.36a.096.096 0 0 0 .133 0l3.442-3.36a.382.382 0 0 1 .531 0Z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </IconBase>
);

export default WalletConnectIcon;
