import {useState} from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import Swal from 'sweetalert2';

const PanelUsuario = () => {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [emailForm, setEmailForm] = useState({
        currentPassword: '',
        newEmail: '',
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = (e) => {
        e.preventDefault();

        fetch('https://ambulanciaya.onrender.com/paramedicos/me/password', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordForm),
        }).then((res) => {
            if (res.ok) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Contraseña actualizada',
                    icon: 'success',
                    confirmButtonColor: '#FF0000',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Intente de nuevo',
                    icon: 'error',
                    confirmButtonColor: '#FF0000',
                });
            }
        });
    };

    const handleEmailChange = (e) => {
        e.preventDefault();

        fetch('https://ambulanciaya.onrender.com/paramedicos/me/email', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailForm),
        }).then((res) => {
            if (res.ok) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Contraseña actualizada',
                    icon: 'success',
                    confirmButtonColor: '#FF0000',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Intente de nuevo',
                    icon: 'error',
                    confirmButtonColor: '#FF0000',
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-center text-3xl font-bold text-red-600">Configuración de usuario</h1>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Cambio de contraseña */}
                    <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <h2 className="mb-6 border-b pb-2 text-2xl font-semibold text-red-600">Cambiar Contraseña</h2>
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Contraseña Actual</label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                        className="w-full rounded-md border border-red-200 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                                        {showCurrentPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Nueva Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                        className="w-full rounded-md border border-red-200 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                                        {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700">
                                Cambiar Contraseña
                            </button>
                        </form>
                    </div>

                    {/* Cambio de email */}
                    <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                        <h2 className="mb-6 border-b pb-2 text-2xl font-semibold text-red-600">Modificar Correo Electrónico</h2>
                        <form onSubmit={handleEmailChange} className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Nuevo correo electrónico</label>
                                <input
                                    type="email"
                                    value={emailForm.newEmail}
                                    onChange={(e) => setEmailForm({...emailForm, newEmail: e.target.value})}
                                    className="w-full rounded-md border border-red-200 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Confirmar contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={emailForm.currentPassword}
                                        onChange={(e) => setEmailForm({...emailForm, currentPassword: e.target.value})}
                                        className="w-full rounded-md border border-red-200 p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                                        {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700">
                                Cambiar Correo
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelUsuario;
