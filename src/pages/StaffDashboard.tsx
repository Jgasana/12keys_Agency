import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { LogOut, Filter, Search, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  in_progress: { label: 'In Progress', icon: AlertCircle, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' },
};

export function StaffDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [staffEmail, setStaffEmail] = useState('');

  useEffect(() => {
    checkAuth();
    loadRequests();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate('/staff/login');
      return;
    }

    const { data: staffData } = await supabase
      .from('staff_users')
      .select('email')
      .eq('id', user.id)
      .maybeSingle();

    if (!staffData) {
      await supabase.auth.signOut();
      navigate('/staff/login');
      return;
    }

    setStaffEmail(staffData.email);
  };

  const loadRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('service_requests')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (error) throw error;

      setRequests(requests.map(req =>
        req.id === requestId ? { ...req, status: newStatus } : req
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/staff/login');
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch = searchTerm === '' ||
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-widest uppercase text-[#8e6d46]">
              12Keys Agency
            </h1>
            <p className="text-sm text-gray-600 font-light mt-1">Staff Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-light">{staffEmail}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#8e6d46] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-light uppercase tracking-wider">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-light tracking-wider uppercase text-gray-800 mb-2">
            Service Requests
          </h2>
          <p className="text-gray-600 font-light">
            Manage and track customer service inquiries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 shadow border-l-4 border-gray-400">
            <div className="text-sm font-light uppercase tracking-wider text-gray-600 mb-1">
              Total Requests
            </div>
            <div className="text-3xl font-light text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-white p-6 shadow border-l-4 border-yellow-400">
            <div className="text-sm font-light uppercase tracking-wider text-gray-600 mb-1">
              Pending
            </div>
            <div className="text-3xl font-light text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white p-6 shadow border-l-4 border-blue-400">
            <div className="text-sm font-light uppercase tracking-wider text-gray-600 mb-1">
              In Progress
            </div>
            <div className="text-3xl font-light text-blue-600">{stats.in_progress}</div>
          </div>
          <div className="bg-white p-6 shadow border-l-4 border-green-400">
            <div className="text-sm font-light uppercase tracking-wider text-gray-600 mb-1">
              Completed
            </div>
            <div className="text-3xl font-light text-green-600">{stats.completed}</div>
          </div>
        </div>

        <div className="bg-white shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 focus:border-[#8e6d46] focus:outline-none transition-colors bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-600 font-light">
              Loading requests...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-12 text-center text-gray-600 font-light">
              No requests found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-light uppercase tracking-wider text-gray-600">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-light uppercase tracking-wider text-gray-600">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-light uppercase tracking-wider text-gray-600">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-light uppercase tracking-wider text-gray-600">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-light uppercase tracking-wider text-gray-600">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-light uppercase tracking-wider text-gray-600">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => {
                    const StatusIcon = statusConfig[request.status as keyof typeof statusConfig].icon;
                    return (
                      <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-light text-gray-900">{request.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 font-light">
                            <div>{request.email}</div>
                            <div>{request.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 text-xs font-light uppercase tracking-wider bg-[#8e6d46]/10 text-[#8e6d46]">
                            {request.service_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="text-sm text-gray-600 font-light truncate">
                            {request.message || 'No message'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={request.status}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            className={`px-3 py-1 text-xs font-light uppercase tracking-wider border ${statusConfig[request.status as keyof typeof statusConfig].color} focus:outline-none transition-colors`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-light whitespace-nowrap">
                          {new Date(request.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
