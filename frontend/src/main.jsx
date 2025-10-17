import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SearchContextProvider } from './context/SearchContext.js'
import { AuthContextProvider } from './context/AuthContext.js'


createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <SearchContextProvider>
    <App />
    </SearchContextProvider>
 </AuthContextProvider>
)
