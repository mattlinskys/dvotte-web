import { generate } from "@ant-design/colors";

export const generatePalette = (color: string): Record<number, string> =>
  generate(color).reduce(
    (acc, color, i) => ({
      ...acc,
      [i * 100 + (i === 0 ? 50 : 0)]: color,
    }),
    {}
  );
