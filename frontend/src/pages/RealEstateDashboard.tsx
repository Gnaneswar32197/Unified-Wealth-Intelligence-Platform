import DashboardCard from '../components/DashboardCard';
import { Home, Key, MapPin } from 'lucide-react';

export default function RealEstateDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Real Estate Asset Ledger</h2>
        <p className="text-sm text-gray-400">Direct physical and tokenized commercial real estate asset holdings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Gross Appraised Value" value="$12,272,000" change="8.9%" isPositive={true} icon={Home} />
        <DashboardCard title="Net Monthly Yield" value="$48,500" change="1.2%" isPositive={true} icon={Key} />
        <DashboardCard title="Occupancy Metric" value="96.4%" change="0.0%" isPositive={true} icon={MapPin} />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Real Estate Property Ledger</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { location: 'Manhattan Highrise Suite B', value: '$7,200,000', yield: '4.8% Cap Rate', type: 'Commercial' },
            { location: 'Austin Tech Corridor Complex', value: '$5,072,000', yield: '6.2% Cap Rate', type: 'Multi-Family' },
          ].map((prop, idx) => (
            <div key={idx} className="p-5 bg-gray-950 border border-gray-800 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold">{prop.type}</span>
                <h4 className="font-bold text-gray-200 mt-3 text-base">{prop.location}</h4>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-900">
                <span className="text-xs text-gray-500 font-mono">{prop.yield}</span>
                <span className="font-mono text-gray-200 font-bold">{prop.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}