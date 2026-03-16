import React, { useState } from 'react';

interface AuthGatewayProps {
    children: React.ReactNode;
}

export const AuthGateway: React.FC<AuthGatewayProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Hardcoded credentials requested by the user
        if (username.trim() === 'paracel' && password === '123') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Credenciales incorrectas. Verifique e intente nuevamente.');
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-200 overflow-hidden font-sans relative">
            {/* Background Orbs to match the dashboard Premium UI */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-lg p-10 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center">

                {/* Logo */}
                <div className="mb-8 w-48 h-auto">
                    <img
                        src={`${import.meta.env.BASE_URL}LOGO_PARACEL_SINFONDO.png`}
                        alt="Paracel Logo"
                        className="w-full h-auto drop-shadow-lg"
                    />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Portal de Monitoreo</h1>
                    <p className="text-sm text-slate-400 mt-2 font-medium tracking-wide">Tablero de Doble Materialidad 2026</p>
                </div>

                <form onSubmit={handleLogin} className="w-full space-y-5">
                    {error && (
                        <div className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium shadow-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold tracking-wide uppercase ml-1">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3.5 bg-slate-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white transition-all placeholder:text-slate-600"
                            placeholder="Ingrese su usuario..."
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-slate-400 font-semibold tracking-wide uppercase ml-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3.5 bg-slate-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-white transition-all placeholder:text-slate-600"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all active:scale-[0.98]"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-8 text-xs text-slate-500 text-center tracking-widest font-bold">
                    PARACEL S.A.
                </div>
            </div>
        </div>
    );
};
