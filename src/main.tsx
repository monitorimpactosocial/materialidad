import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthGateway } from './AuthGateway.tsx'
import { DataProvider } from './lib/DataContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthGateway>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthGateway>
  </StrictMode>,
)
