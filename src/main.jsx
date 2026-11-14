import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import 'lenis/dist/lenis.css'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
