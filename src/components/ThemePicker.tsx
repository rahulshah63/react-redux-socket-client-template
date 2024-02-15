import { FC, useState, createContext, useContext, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export const DEFAULT_THEME_NAME: string = "dark";

export type ThemeColorPair = {
  foreground: string
  background: string,
}

export type ThemeDefinition = {
  name: string,
  primary: ThemeColorPair;
  secondary: ThemeColorPair;
}

const LightTheme: ThemeDefinition = {
  name: "light",
  primary: {
    foreground: "#333333",
    background: "white"
  },
  secondary: {
    foreground: "#555555",
    background: "#f1f1f1"
  }
}

const DarkTheme: ThemeDefinition = {
  name: "dark",
  primary: {
    foreground: "white",
    background: "#333333"
  },
  secondary: {
    foreground: "#f1f1f1",
    background: "#555555"
  }
}

export const ThemeContext = createContext<ThemeDefinition>(LightTheme);

const saveTheme = (theme: ThemeDefinition) => {
  if (localStorage) {
    localStorage.setItem('lh-theme-name', JSON.stringify(theme));
  }
}

export const getTheme = (): ThemeDefinition => {
  if (localStorage) {
    const themeConfig = localStorage.getItem('lh-theme-name');
    if (themeConfig) {
      const theme = JSON.parse(themeConfig);
      if (theme.name === 'light') {
        return LightTheme;
      } else if (theme.name === 'dark') {
        return DarkTheme;
      }
    }
  }
  return LightTheme;
}

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
}

interface ThemePickerProps {
  onThemeChanged?: (theme: ThemeDefinition) => void;
  children: ReactNode | ReactNode[],
}


const ThemePicker: FC<ThemePickerProps> = (props) => {
  const [theme, setTheme] = useState(getTheme());
  const onSetTheme = (theme: ThemeDefinition) => {
    setTheme(theme)
    saveTheme(theme);
    if (props.onThemeChanged) {
      props.onThemeChanged(theme);
    }
  }
  return (
    <ThemeContext.Provider value={theme}>
      <div className={`theme-picker-${theme.name}`} onClick={() => onSetTheme(theme.name === 'light' ? DarkTheme : LightTheme)}>
        <FontAwesomeIcon className={`theme-picker-icon-${theme.name}`} icon={theme.name === 'light' ? faSun : faMoon} />
      </div>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemePicker;