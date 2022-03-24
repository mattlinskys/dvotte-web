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
          tabSize: 4,
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
      Modal: {
        sizes: {
          full: {
            dialog: {
              margin: "4",
            },
          },
        },
      },
    } as Record<string, ComponentSingleStyleConfig>,
  }
  // withDefaultColorScheme({ colorScheme: "brand" })
);
