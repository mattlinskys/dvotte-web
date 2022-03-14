import React from "react";
import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";

const Panel: React.FC<BoxProps> = (props) => {
  const styles = useStyleConfig("Panel");

  return <Box sx={styles} {...props} />;
};

export default Panel;
