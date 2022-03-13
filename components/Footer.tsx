import React from "react";
import { Box, useStyleConfig } from "@chakra-ui/react";

const Footer: React.FC = () => {
  const styles = useStyleConfig("Footer");

  return (
    <Box as="footer" sx={styles}>
      Footer
    </Box>
  );
};

export default Footer;
