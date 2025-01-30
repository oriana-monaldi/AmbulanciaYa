import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import Loader from './Loader';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('https://ambulanciaya.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }

            sessionStorage.setItem('auth-token', data.token);
            sessionStorage.setItem('is-admin', data.isAdmin);
            console.log('Account type:', data.isAdmin); // hay que sacarlo cuando se termine la auth
            navigate('/tabla/accidente');
        } catch (error) {
            console.error('Login error:', error);
            setError('Credenciales incorrectas.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <Loader />}
            <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-neutral-200 px-4">
                <div className="w-full max-w-md">
                    <div className="rounded-lg bg-white px-8 py-6 shadow-md">
                        <h2 className="mb-6 text-center text-3xl font-bold text-red-500">Iniciar sesión como empleado</h2>
                        {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700 text-center">{error}</div>}
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
                                    placeholder="ejemplo@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    placeholder="*********"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[65%] -translate-y-1/2 transform text-gray-500">
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                            <button type="submit" className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
