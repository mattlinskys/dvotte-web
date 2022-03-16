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
        "a:hover": {
          textDecoration: "underline",
        },
      },
    },
    colors: {
      // TODO:
      brand: {
        100: "var(--chakra-colors-blue-100)",
        200: "var(--chakra-colors-blue-200)",
        300: "var(--chakra-colors-blue-300)",
        400: "var(--chakra-colors-blue-400)",
        500: "var(--chakra-colors-blue-500)",
        600: "var(--chakra-colors-blue-600)",
        700: "var(--chakra-colors-blue-700)",
        800: "var(--chakra-colors-blue-800)",
        900: "var(--chakra-colors-blue-900)",
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
      Panel: {
        baseStyle: ({ colorMode }) => ({
          p: "4",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: colorMode === "dark" ? "gray.600" : "gray.300",
          rounded: "md",
        }),
      },
      Button: {
        defaultProps: {
          colorScheme: "brand",
        },
      },
    } as Record<string, ComponentSingleStyleConfig>,
  }
  // withDefaultColorScheme({ colorScheme: "brand" })
);
