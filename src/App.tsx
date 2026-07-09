// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RequireAdmin } from './components/admin/require-admin'
import { AdminAccueilPage } from './pages/admin/admin-accueil-page'
import { AdminArticlesPage } from './pages/admin/admin-articles-page'
import { AdminBesoinsPage } from './pages/admin/admin-besoins-page'
import { AdminCagnottePage } from './pages/admin/admin-cagnotte-page'
import { AdminComprendrePage } from './pages/admin/admin-comprendre-page'
import { AdminEvenementsPage } from './pages/admin/admin-evenements-page'
import { AdminGaleriePage } from './pages/admin/admin-galerie-page'
import { AdminHistoirePage } from './pages/admin/admin-histoire-page'
import { AdminIndexPage } from './pages/admin/admin-index-page'
import { AdminLayout } from './pages/admin/admin-layout'
import { AdminLoginPage } from './pages/admin/admin-login-page'
import { AdminParametresPage } from './pages/admin/admin-parametres-page'
import { AdminQuiPage } from './pages/admin/admin-qui-page'
import { AdminSectionsPage } from './pages/admin/admin-sections-page'
import { AdminTemoignagePage } from './pages/admin/admin-temoignage-page'
import { SitePage } from './pages/site-page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminIndexPage />} />
          <Route path="sections" element={<AdminSectionsPage />} />
          <Route path="accueil" element={<AdminAccueilPage />} />
          <Route path="qui" element={<AdminQuiPage />} />
          <Route path="histoire" element={<AdminHistoirePage />} />
          <Route path="comprendre" element={<AdminComprendrePage />} />
          <Route path="besoins" element={<AdminBesoinsPage />} />
          <Route path="cagnotte" element={<AdminCagnottePage />} />
          <Route path="evenements" element={<AdminEvenementsPage />} />
          <Route path="articles" element={<AdminArticlesPage />} />
          <Route path="temoignage" element={<AdminTemoignagePage />} />
          <Route path="galerie" element={<AdminGaleriePage />} />
          <Route path="parametres" element={<AdminParametresPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
        <Route path="/" element={<SitePage />} />
        <Route path="*" element={<SitePage />} />
      </Routes>
    </BrowserRouter>
  )
}
