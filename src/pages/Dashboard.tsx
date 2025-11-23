import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, Settings, User } from 'lucide-react';

export function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-light tracking-widest uppercase text-[#8e6d46]">
            12Keys Agency
          </h1>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#8e6d46] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-light uppercase tracking-wider">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-light tracking-wider uppercase text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 font-light">
            {user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#8e6d46]/10 group-hover:bg-[#8e6d46] flex items-center justify-center transition-colors">
                <Calendar className="w-6 h-6 text-[#8e6d46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-light tracking-wider uppercase text-gray-800">
                My Events
              </h3>
            </div>
            <p className="text-gray-600 font-light text-sm">
              View and manage your upcoming events and bookings
            </p>
          </div>

          <div className="bg-white p-6 shadow hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#8e6d46]/10 group-hover:bg-[#8e6d46] flex items-center justify-center transition-colors">
                <User className="w-6 h-6 text-[#8e6d46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-light tracking-wider uppercase text-gray-800">
                Profile
              </h3>
            </div>
            <p className="text-gray-600 font-light text-sm">
              Update your personal information and preferences
            </p>
          </div>

          <div className="bg-white p-6 shadow hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#8e6d46]/10 group-hover:bg-[#8e6d46] flex items-center justify-center transition-colors">
                <Settings className="w-6 h-6 text-[#8e6d46] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-light tracking-wider uppercase text-gray-800">
                Settings
              </h3>
            </div>
            <p className="text-gray-600 font-light text-sm">
              Configure your account settings and notifications
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 shadow">
          <h3 className="text-xl font-light tracking-wider uppercase text-gray-800 mb-4">
            Dashboard Preview
          </h3>
          <p className="text-gray-600 font-light leading-relaxed">
            This is a placeholder dashboard. Additional features and functionality will be implemented as the platform develops.
          </p>
        </div>
      </main>
    </div>
  );
}
