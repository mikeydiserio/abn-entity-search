import "styled-components";

import { ThemeType } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {
    colors: {
      dark: string;
      primary: string;
      gray: string;
      [key: string]: string;
    };
    [key: string]: any;
  }
}
