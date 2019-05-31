import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  [index: string]: string;
}

export const styledTheme = {
  primaryColor: '#2196f3',
  secondaryColor: '#f06292',
  darkPrimaryColor: '#1565c0',
  dark: '#424242',
  highRed: '#e91e63',
  shallowGray: '#eeeeee',
  redLinearGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  spacing: '10px',
};

export default styled;
export {css, createGlobalStyle, keyframes, ThemeProvider};
