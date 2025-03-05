import Link from 'next/link';
import { auth } from "@/auth";
import { logout } from '@/lib/actions';
import { Home, User, Shield, Utensils, Truck, Info, LogIn, LogOut } from 'lucide-react';

async function Header() {
    const session = await auth();
    
    return (
        <header className="bg-gradient-to-r from-red-700 to-orange-600 text-white shadow-xl rounded-b-xl px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <nav className="flex items-center flex-wrap gap-4 justify-center">
                    <Link href="/" className="flex items-center gap-2 group hover:scale-105 transition-transform">
                        <Home className="h-7 w-7 text-orange-200 group-hover:text-white transition-colors" />
                        <span className="font-bold text-xl hidden sm:block">La Bella Pizza</span>
                    </Link>
                    
                    <div className="flex items-center gap-4 border-l-2 border-orange-200/30 pl-4 ml-4">
                        {session?.user?.role === 'ADMIN' && (
                            <Link href="/admin" className="flex items-center gap-1 hover:bg-white/10 px-3 py-1 rounded-lg transition-all">
                                <Shield className="h-5 w-5" />
                                <span className="font-semibold">Admin</span>
                            </Link>
                        )}
                        {session?.user?.role === 'USER' && (
                            <Link href="/dashboard" className="flex items-center gap-1 hover:bg-white/10 px-3 py-1 rounded-lg transition-all">
                                <User className="h-5 w-5" />
                                <span className="font-semibold">Dashboard</span>
                            </Link>
                        )}
                        <Link href="/pizzas" className="flex items-center gap-1 hover:bg-white/10 px-3 py-1 rounded-lg transition-all">
                            <Utensils className="h-5 w-5" />
                            <span className="font-semibold">Pizzas</span>
                        </Link>
                        <Link href="/repartidores" className="flex items-center gap-1 hover:bg-white/10 px-3 py-1 rounded-lg transition-all">
                            <Truck className="h-5 w-5" />
                            <span className="font-semibold">Repartidores</span>
                        </Link>
                        {session?.user?.role === 'ADMIN' && (
                            <Link href="/pedidos" className="flex items-center gap-1 hover:bg-white/10 px-3 py-1 rounded-lg transition-all">
                                <LogOut className="h-5 w-5 rotate-180" />
                                <span className="font-semibold">Pedidos</span>
                            </Link>
                        )}
                        <Link href="/about" className="flex items-center gap-1 hover:bg-white/10 px-3 py-1 rounded-lg transition-all">
                            <Info className="h-5 w-5" />
                            <span className="font-semibold">About</span>
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center gap-4">
                    {session ? (
                        <form>
                            <button 
                                formAction={logout} 
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl font-semibold transition-all group"
                            >
                                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span>Logout</span>
                            </button>
                        </form>
                    ) : (
                        <Link 
                            href="/auth/login" 
                            className="flex items-center gap-2 bg-orange-200 hover:bg-orange-300 text-red-900 px-6 py-2 rounded-xl font-semibold transition-all group"
                        >
                            <LogIn className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;