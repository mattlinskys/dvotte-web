import {
  extendTheme,
  // withDefaultColorScheme,
  ComponentSingleStyleConfig,
} from "@chakra-ui/react";

export const theme = extendTheme(
  {
    config: {
      initialColorMode: "dark",
    },
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
        "input::-webkit-color-swatch": {
          border: "blue",
        },
        "input::-webkit-color-swatch-wrapper, input[type=color]": {
          padding: "0",
        },
        "input[type=color]": {
          overflow: "hidden",
        },
        ".quill": {
          height: "full",
          display: "flex",
          flexDirection: "column",
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
          flexShrink: "0",
          height: "60px",
          px: "4",
          boxShadow: "md",
          bg: colorMode === "dark" ? "gray.700" : "white",
        }),
      },
      Footer: {
        baseStyle: ({ colorMode }) => ({
          flexShrink: "0",
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
      Input: {
        sizes: {
          md: {
            field: {
              borderRadius: "full",
            },
            addon: {
              borderRadius: "full",
            },
          },
        },
      },
      Select: {
        sizes: {
          md: {
            field: {
              borderRadius: "full",
            },
            addon: {
              borderRadius: "full",
            },
          },
        },
      },
      Button: {
        baseStyle: {
          borderRadius: "full",
        },
        defaultProps: {
          colorScheme: "brand",
        },
      },
    } as Record<string, ComponentSingleStyleConfig>,
  }
  // withDefaultColorScheme({ colorScheme: "brand" })
);
