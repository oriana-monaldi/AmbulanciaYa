import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            document.body.classList.add('no-navbar');
        } else {
            document.body.classList.remove('no-navbar');
        }
    }, [isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://ambulanciaya.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }

            sessionStorage.setItem('auth-token', data.token);
            navigate('/tabla/accidente');

        } catch (error) {
            console.error('Login error:', error);
            setError('Error en el inicio de sesión. Por favor, intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`relative flex min-h-screen items-center justify-center bg-neutral-200 px-4 py-12 sm:px-6 lg:px-8 ${isLoading ? 'bg-white' : ''}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <span className="loader"></span>
                </div>
            )}
            {!isLoading && (
                <div className="w-full max-w-md space-y-8">
                    <div className="rounded-lg bg-white px-8 pb-8 pt-6 shadow-md">
                        <h2 className="mb-6 text-center text-3xl font-bold text-red-500">
                            Iniciar sesión como empleado
                        </h2>
                        {error && (
                            <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogIn;