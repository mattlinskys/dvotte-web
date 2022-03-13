import {
  extendTheme,
  // withDefaultColorScheme,
  ComponentSingleStyleConfig,
} from "@chakra-ui/react";

export const theme = extendTheme(
  {
    fonts: {
      heading: "Lato",
      body: "Lato",
    },
    styles: {
      global: {
        "html, body, #__next": {
          height: "full",
        },
        body: {
          overflowX: "hidden",
        },
      },
    },
    components: {
      Header: {
        baseStyle: ({ colorMode }) => ({
          height: "60px",
          px: "4",
          boxShadow: "md",
          bg: colorMode === "dark" ? "gray.800" : "white",
        }),
      },
      Footer: {
        baseStyle: ({ colorMode }) => ({
          mt: "auto",
          p: "4",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: colorMode === "dark" ? "gray.600" : "gray.300",
          bg: colorMode === "dark" ? "gray.700" : "white",
        }),
      },
    } as Record<string, ComponentSingleStyleConfig>,
  }
  // withDefaultColorScheme({ colorScheme: "brand" })
);
