import React from "react";
import IconBase, { IconBaseProps } from "components/icons/IconBase";

const ContractsIcon: React.FC<IconBaseProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M16.451 10.21c.114.08.212.181.29.297l.904 1.336 1.572.1c.634.04 1.116.6 1.076 1.25a1.2 1.2 0 0 1-.124.464L19.495 15l.674 1.343c.29.579.067 1.289-.498 1.586a1.13 1.13 0 0 1-.454.128l-1.572.1-.903 1.336a1.133 1.133 0 0 1-1.891 0l-.904-1.336-1.572-.1c-.634-.04-1.116-.6-1.076-1.249a1.2 1.2 0 0 1 .125-.465L12.097 15l-.674-1.344a1.192 1.192 0 0 1 .498-1.586 1.13 1.13 0 0 1 .454-.127l1.572-.101.904-1.335a1.133 1.133 0 0 1 1.6-.297ZM17 0a1 1 0 0 1 1 1l.001 7.909a3.156 3.156 0 0 0-2-.903L16 2H4v14h5.42a3.204 3.204 0 0 0-.118.687l-.006.179c-.002.397.07.78.202 1.135L3 18a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14Zm-6 8a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h4Zm2-4a1 1 0 0 1 0 2H7a1 1 0 1 1 0-2h6Z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </IconBase>
);

export default ContractsIcon;
