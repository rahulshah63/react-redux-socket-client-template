import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import tsLogo from './assets/ts.svg'
import sassLogo from './assets/sass.svg'
import ThemePicker, { ThemeDefinition, getTheme } from './components/ThemePicker';
import './App.scss'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState(getTheme());
  const onThemeChanged = (theme: ThemeDefinition) => {
    setTheme(theme);
  }
  return (
    <ThemePicker onThemeChanged={onThemeChanged}>
      <div className={`app-${theme.name}`}>
        <div className={`app-logos-${theme.name}`}>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className={`vite-logo-${theme.name}`} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className={`react-logo-${theme.name}`} alt="React logo" />
          </a>
          <a href="https://www.typescriptlang.org/" target="_blank">
            <img src={tsLogo} className={`ts-logo-${theme.name}`} alt="Typescript logo" />
          </a>
          <a href="https://sass-lang.com/" target="_blank">
            <img src={sassLogo} className={`sass-logo-${theme.name}`} alt="Sass logo" />
          </a>
        </div>
        <div className={`app-description-${theme.name}`}>
          Vite + React + Typescript + Sass
        </div>
        <div className={`app-card-${theme.name}`}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className={`app-instructions-${theme.name}`}>
          Click on the Vite, React, Typescript,and Sass logos to learn more
        </p>
      </div>
    </ThemePicker>
  )
}

export default App
