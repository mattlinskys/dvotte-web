import React from "react";
import Panel from "components/Panel";
import { Button, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface ErrorLayoutProps {
  message?: React.ReactNode;
}

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ message }) => {
  return (
    <Panel maxW="lg" w="full" mx="auto" my="8">
      <Text>{message}</Text>
      <Link href="/" passHref>
        <Button
          as="a"
          mt="4"
          variant="outline"
          leftIcon={<Icon as={ArrowBackIcon} />}
          isFullWidth
        >
          Go Home
        </Button>
      </Link>
    </Panel>
  );
};

export default ErrorLayout;
