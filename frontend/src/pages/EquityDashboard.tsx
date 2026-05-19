import DashboardCard from '../components/DashboardCard';
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function EquityDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Equity Trading & Market Allocation</h2>
        <p className="text-sm text-gray-400">Direct equity allocations, options exposure matrix, and capital pools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Equity Net Asset Value" value="$8,419,200" change="18.2%" isPositive={true} icon={DollarSign} />
        <DashboardCard title="Beta Risk Coefficient" value="1.14" change="Unchanged" isPositive={true} icon={TrendingUp} />
        <DashboardCard title="Daily Capital Flow" value="+$42,190" change="4.1%" isPositive={true} icon={Activity} />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Core Single-Name Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase text-gray-500 font-mono bg-gray-950 border-b border-gray-800">
              <tr>
                <th className="p-4">Ticker Asset</th>
                <th className="p-4">Allocation Mass</th>
                <th className="p-4">Cost Basis</th>
                <th className="p-4">Current Value</th>
                <th className="p-4">PnL Realization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {[
                { ticker: 'AAPL', mass: '12.4%', cost: '$165.20', value: '$182.30', status: true, pnl: '+10.3%' },
                { ticker: 'NVDA', mass: '18.1%', cost: '$420.10', value: '$875.12', status: true, pnl: '+108.3%' },
                { ticker: 'MSFT', mass: '10.5%', cost: '$310.00', value: '$415.50', status: true, pnl: '+34.0%' },
                { ticker: 'TSLA', mass: '4.2%', cost: '$210.50', value: '$174.20', status: false, pnl: '-17.2%' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-950/40">
                  <td className="p-4 font-bold text-gray-200">{row.ticker}</td>
                  <td className="p-4">{row.mass}</td>
                  <td className="p-4 font-mono">{row.cost}</td>
                  <td className="p-4 font-mono text-gray-200">{row.value}</td>
                  <td className={`p-4 font-mono font-bold flex items-center gap-1 ${row.status ? 'text-emerald-400' : 'text-red-400'}`}>
                    {row.status ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {row.pnl}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}