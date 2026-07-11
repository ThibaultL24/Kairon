// src/pages/admin/admin-login-page.tsx
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/use-admin'

export function AdminLoginPage() {
  const { login, isAuthenticated } = useAdmin()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/admin" replace />

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (login(identifier, password)) {
      navigate('/admin', { replace: true })
    } else {
      setError('Identifiant ou mot de passe incorrect. Réessayez ou contactez la personne qui gère le site.')
    }
  }

  return (
    <div className="admin-shell">
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
        <div className="overflow-hidden rounded-2xl border border-sage/35 bg-paper shadow-lg">
          <div className="h-2 w-full bg-leaf" aria-hidden />
          <div className="px-6 pb-8 pt-7">
            <h1 className="font-display text-3xl text-ink">Espace famille</h1>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Ici vous modifiez le site pour <strong className="text-ink">tout le monde</strong>
              : les changements sont visibles sur tous les navigateurs, pas seulement le vôtre.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>✓ Enregistrement automatique en ligne</li>
              <li>✓ Même contenu sur mobile, tablette et ordinateur</li>
            </ul>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-base font-semibold text-ink">Votre identifiant</span>
                <input
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="admin-input mt-2 px-4 py-3.5 text-base"
                  placeholder="Exemple : kairon123"
                />
              </label>
              <label className="block">
                <span className="text-base font-semibold text-ink">Votre mot de passe</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input mt-2 px-4 py-3.5 text-base"
                />
              </label>
              {error ? (
                <p className="rounded-lg bg-orange/10 px-3 py-2 text-sm font-medium text-orange">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full rounded-full bg-leaf px-6 py-4 text-base font-bold text-paper shadow-sm transition hover:bg-forest"
              >
                Entrer dans l’espace de modification
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">
              <Link to="/" className="font-semibold text-leaf underline underline-offset-2">
                ← Retour au site public
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
