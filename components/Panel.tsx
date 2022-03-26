import React from "react";
import { Box, BoxProps, Text, useStyleConfig } from "@chakra-ui/react";

export interface PanelProps extends BoxProps {
  label?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ label, children, ...rest }) => {
  const styles = useStyleConfig("Panel");

  return (
    <Box sx={styles} {...rest}>
      {label && (
        <Text
          mb="2"
          fontSize="sm"
          fontWeight="semibold"
          opacity="0.75"
          lineHeight="1.25"
        >
          {label}
        </Text>
      )}
      {children}
    </Box>
  );
};

export default Panel;
