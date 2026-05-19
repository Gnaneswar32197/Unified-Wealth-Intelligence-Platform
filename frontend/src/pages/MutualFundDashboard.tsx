import DashboardCard from '../components/DashboardCard';
import { Landmark, Layers, Percent } from 'lucide-react';

export default function MutualFundDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Mutual Funds & Pooled Vehicles</h2>
        <p className="text-sm text-gray-400">Systematic investment pipelines and pooled asset accounting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Fund Assets" value="$4,129,500" change="4.1%" isPositive={true} icon={Landmark} />
        <DashboardCard title="Active SIP Engines" value="14 Strategies" change="Steady" isPositive={true} icon={Layers} />
        <DashboardCard title="Weighted Expense Ratio" value="0.42%" change="-0.02%" isPositive={true} icon={Percent} />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Fund Portfolio Distribution</h3>
        <div className="space-y-4">
          {[
            { name: 'Vanguard Alpha Growth Fund', allocation: '45%', value: '$1,858,275' },
            { name: 'Fidelity Blue Chip Institutional', allocation: '30%', value: '$1,238,850' },
            { name: 'BlackRock Global Infrastructure Bond Pool', allocation: '25%', value: '$1,032,375' },
          ].map((fund, idx) => (
            <div key={idx} className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-200">{fund.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Allocation Ratio: {fund.allocation}</p>
              </div>
              <p className="font-mono text-emerald-400 font-bold">{fund.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}