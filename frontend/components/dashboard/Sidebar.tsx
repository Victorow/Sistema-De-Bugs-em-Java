// components/dashboard/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tasks', label: 'Tarefas', icon: CheckSquare },
  { href: '/dashboard/calendar', label: 'Calendário', icon: Calendar },
  { href: '/dashboard/stats', label: 'Estatísticas', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Configurações', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="bg-white w-64 min-h-screen border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-900">
          Task<span className="text-blue-600">Flow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center w-full text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </button>
      </div>
    </div>
  );
}
