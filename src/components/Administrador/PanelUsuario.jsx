import React, { useState } from "react"

const AdminPanel = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [emailForm, setEmailForm] = useState({
    currentEmail: "tu@email.com",
    newEmail: "",
    confirmPassword: "",
  })

  const handlePasswordChange = (e) => {
    e.preventDefault()
  }

  const handleEmailChange = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">Configuracion de usuario</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de Contraseña */}
          <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-red-600 border-b pb-2">Cambiar Contraseña</h2>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña Actual</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full p-3 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Nueva Contraseña</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full p-3 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full p-3 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 font-semibold text-lg"
              >
                Cambiar Contraseña
              </button>
            </form>
          </div>

          {/* Formulario de Email */}
          <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-red-600 border-b pb-2">Modificar Correo Electrónico</h2>
            <form onSubmit={handleEmailChange} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico Actual</label>
                <input
                  type="email"
                  value={emailForm.currentEmail}
                  disabled
                  className="w-full p-3 border border-red-200 rounded-md bg-gray-100 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Nuevo Correo Electrónico</label>
                <input
                  type="email"
                  value={emailForm.newEmail}
                  onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                  className="w-full p-3 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  placeholder="nuevo@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar contraseña</label>
                <input
                  type="password"
                  value={emailForm.confirmPassword}
                  onChange={(e) => setEmailForm({ ...emailForm, confirmPassword: e.target.value })}
                  className="w-full p-3 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 font-semibold text-lg"
              >
                Cambiar Correo Electrónico
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel

