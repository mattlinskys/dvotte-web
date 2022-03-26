import { useMemo } from "react";
import { theme } from "config/theme";
import { IProject } from "types/project";
import { extendTheme } from "@chakra-ui/react";
import { generatePalette } from "utils/themeUtils";

const useProjectTheme = (project: Pick<IProject, "color">) =>
  useMemo(
    () =>
      extendTheme(theme, {
        colors: {
          brand: generatePalette(project.color),
        },
      }),
    [project.color]
  );

export default useProjectTheme;
