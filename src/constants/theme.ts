import 'styled-components/native';

declare module 'styled-components/native' {
  type ThemeType = typeof lightTheme;

  export interface DefaultTheme extends ThemeType {}
}

const darkTheme = {
  colors: {
    PRIMARY_COLOR: '#00A770',
    SECONDARY_COLOR: '#242832',
    TEXT_PRIMARY_COLOR: '#fff',
    TEXT_SECONDARY_COLOR: '#fff',
    BACKGROUND_COLOR: '#1C1C1C',
    BORDER_COLOR: '#AAA',
    RED: '#B0261D',
    YELLOW: '#E0B829',
    WHITE: '#F3EFF5',
  },
};

const lightTheme = {
  colors: {
    PRIMARY_COLOR: '#2c3e50',
    SECONDARY_COLOR: '#34495e',
    NEUTRAL_COLOR: '#ecf0f1',
    ACCENT_COLOR: '#f1c40f',
    TEXT_PRIMARY_COLOR: '#000000',
    TEXT_SECONDARY_COLOR: '#c2c2c2',
    BACKGROUND_COLOR: '#ffffff',
    DANGER_COLOR: '#e74c3c',
  },
};

export {lightTheme, darkTheme};
