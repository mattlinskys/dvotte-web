import {
  extendTheme,
  withDefaultColorScheme,
  ComponentSingleStyleConfig,
} from "@chakra-ui/react";
import { generatePalette } from "utils/themeUtils";

export const theme = extendTheme(
  {
    config: {
      // initialColorMode: "dark",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    styles: {
      global: {
        "html, body, #__next": {
          minH: "100vh",
        },
        body: {
          overflowX: "hidden",
          tabSize: 4,
          backgroundColor: "#F4F6FA",
        },
        "a.chakra-button:hover": {
          textDecoration: "inherit",
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
        ".ql-container": {
          fontFamily: "Lato",
          fontSize: "inherit",
        },
        ".ql-editor": {
          lineHeight: "inherit",
          padding: "4",
          tabSize: "inherit",
        },
        ".ql-toolbar.ql-snow, .ql-container.ql-snow": {
          borderColor: "gray.300",
        },
        ".ql-toolbar.ql-snow": {
          borderTopRadius: "md",
        },
        ".ql-container.ql-snow": {
          borderBottomRadius: "md",
        },
      },
    },
    colors: {
      brand: {
        50: "#f0faff",
        100: "#cfedff",
        200: "#a6dbff",
        300: "#7dc7ff",
        400: "#54afff",
        500: "#2a90f3",
        600: "#186ccc",
        700: "#0c4ea6",
        800: "#033580",
        900: "#012159",
      },
      discord: generatePalette("#5865F2"),
      medium: {
        50: "#EEE",
        100: "#DDD",
        500: "#000",
        600: "#000",
      },
      metamask: generatePalette("#F6851B"),
      walletConnect: generatePalette("#3B99FC"),
    },
    components: {
      Container: {
        baseStyle: {
          maxW: "6xl",
        },
      },
      Header: {
        baseStyle: ({ colorMode }) => ({
          position: "sticky",
          zIndex: 50,
          top: "0",
          flexShrink: "0",
          height: "60px",
          px: "4",
          boxShadow: "sm",
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
          bg: "white",
          borderColor: colorMode === "dark" ? "gray.600" : "gray.300",
          rounded: "xl",
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
        defaultProps: {
          focusBorderColor: "brand.500",
        },
      },
      Textarea: {
        defaultProps: {
          focusBorderColor: "brand.500",
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
        defaultProps: {
          focusBorderColor: "brand.500",
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
      Modal: {
        sizes: {
          full: {
            dialog: {
              margin: "4",
            },
          },
        },
      },
      Menu: {
        baseStyle: {
          list: {
            borderRadius: "xl",
            boxShadow: "lg",
          },
        },
      },
      FormLabel: {
        baseStyle: {
          lineHeight: "1.375",
          fontWeight: "normal",
          fontSize: "sm",
          mb: "1.5",
        },
      },
    } as Record<string, ComponentSingleStyleConfig>,
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);
