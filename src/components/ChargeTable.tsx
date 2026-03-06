import type { Charge } from '../types/charge';
import { Pencil, Trash2, Receipt, CheckCircle } from 'lucide-react';

  interface Props {
      charges: Charge[];
      onEdit: (charge: Charge) => void;
      onDelete: (chargeId: string) => void;
      onQuickSettle: (charge: Charge) => void;
      selectedIds: string[];
      onSelect: (id: string) => void;
      onSelectAll: () => void;
  }

  export function ChargeTable({ 
      charges, 
      onEdit, 
      onDelete, 
      onQuickSettle, 
      selectedIds, 
      onSelect, 
      onSelectAll 
  }: Props) {

  if (charges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-200 blur-2xl opacity-40 animate-pulse"></div>
          <div className="relative bg-gradient-to-b from-white to-slate-50 p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <Receipt className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No charges recorded</h3>
        <p className="text-slate-500 max-w-sm leading-relaxed">
          Your ledger is currently empty. Click the "Add Charge" button above to create your first financial entry.
        </p>
      </div>
    );
  }

  const allSelected = charges.length > 0 && selectedIds.length === charges.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < charges.length;
  return (
    <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
          <tr className="border-b border-slate-200/60 text-slate-500 uppercase text-[11px] font-extrabold tracking-widest">
            <th className="px-6 py-5 w-10">
                <input 
                    type="checkbox" 
                    checked={allSelected}
                    ref={input => { if (input) input.indeterminate = someSelected }}
                    onChange={onSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                />
                </th>
            <th className="px-6 py-5">Charge ID</th>
            <th className="px-6 py-5">Student ID</th>
            <th className="px-6 py-5 text-right">Charge (RM)</th>
            <th className="px-6 py-5 text-right">Paid (RM)</th>
            <th className="px-6 py-5">Date Charged</th>
            <th className="px-6 py-5 text-center">Status</th>
            <th className="px-6 py-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100/80 bg-white/40">
          {charges.map((charge, index) => {
            const outstanding = charge.charge_amount - charge.paid_amount;
            
            const isSettled = outstanding === 0;
            const isUnpaid = charge.paid_amount === 0;
            const isPartial = !isSettled && !isUnpaid; 
            const isSelected = selectedIds.includes(charge.charge_id!);

            return (
              <tr 
                key={charge.charge_id} 
                style={{ animationDelay: `${index * 60}ms` }}
                className={`opacity-0 animate-slide-up transition-all duration-300 group relative z-0 hover:z-10 hover:-translate-y-[1px] ${
                  isSelected 
                    ? 'bg-blue-50/50 hover:bg-blue-50 shadow-sm' 
                    : 'hover:bg-white hover:shadow-lg hover:shadow-slate-200/40'
                }`}
              >
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => onSelect(charge.charge_id!)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">{charge.charge_id}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <span className="bg-slate-100/80 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200/60 shadow-sm shadow-slate-200/20">
                    {charge.student_id}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 text-right tabular-nums font-semibold">
                  {charge.charge_amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 text-right tabular-nums font-semibold">
                  {charge.paid_amount.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-500">{charge.date_charged}</td>
                
                <td className="px-6 py-4 text-sm text-center tabular-nums">
                  {isSettled && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 ring-1 ring-emerald-500/20 shadow-sm shadow-emerald-100">
                      Settled
                    </span>
                  )}
                  {isPartial && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 ring-1 ring-amber-500/20 shadow-sm shadow-amber-100">
                      -RM{outstanding.toFixed(2)}
                    </span>
                  )}
                  {isUnpaid && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 ring-1 ring-rose-500/20 shadow-sm shadow-rose-100">
                      -RM{outstanding.toFixed(2)}
                    </span>
                  )}
                </td>
                
                <td className="px-6 py-4 text-sm text-center">
                  <div className="flex justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => onEdit(charge)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm hover:-translate-y-0.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Edit Charge"
                    >
                      <Pencil size={18} strokeWidth={2.5} />
                    </button>

                    <button
                        onClick={() => !isSettled && onQuickSettle(charge)}
                        disabled={isSettled}
                        className={`p-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500
                            ${isSettled 
                            ? "text-slate-300 cursor-not-allowed" 
                            : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 hover:shadow-sm hover:-translate-y-0.5"}
                        `}
                        title={isSettled ? "Already Settled" : "Quick Settle (Mark Fully Paid)"}
                        >
                    <CheckCircle size={18} strokeWidth={2.5} />
                    </button>

                    <button 
                      onClick={() => onDelete(charge.charge_id!)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:shadow-sm hover:-translate-y-0.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
                      title="Delete Charge"
                    >
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}