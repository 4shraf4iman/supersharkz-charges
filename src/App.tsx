import { useState } from 'react';
import { useCharges } from './hooks/useCharges';
import { ChargeTable } from './components/ChargeTable';
import { ChargeFormModal } from './components/ChargeFormModal';
import { DeleteModal } from './components/DeleteModal';
import type { Charge } from './types/charge';
import { Waves, Plus, Wallet, X, Trash2 } from 'lucide-react';

export default function App() {
  const { charges, addCharge, updateCharge, deleteCharge, bulkDeleteCharges } = useCharges();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCharge, setEditingCharge] = useState<Charge | null>(null);
  const [chargeToDelete, setChargeToDelete] = useState<string | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const totalOutstanding = charges.reduce((sum, charge) => sum + (charge.charge_amount - charge.paid_amount), 0);
  const selectedOutstanding = charges
    .filter(c => selectedIds.includes(c.charge_id!))
    .reduce((sum, charge) => sum + (charge.charge_amount - charge.paid_amount), 0);

  const handleOpenAdd = () => {
    setEditingCharge(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (charge: Charge) => {
    setEditingCharge(charge);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (chargeId: string) => {
    setChargeToDelete(chargeId);
    setIsDeleteOpen(true);
  };
  

  const handleFormSubmit = (data: Charge) => {
    if (editingCharge) {
      updateCharge({ ...data, charge_id: editingCharge.charge_id });
    } else {
      addCharge(data);
    }
    setIsFormOpen(false);
  };

  const handleQuickSettle = (charge: Charge) => {
    updateCharge({
      ...charge,
      paid_amount: charge.charge_amount
    });
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === charges.length) setSelectedIds([]);
    else setSelectedIds(charges.map(c => c.charge_id!));
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} charges?`)) {
      bulkDeleteCharges(selectedIds);
      setSelectedIds([]);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-100 font-sans selection:bg-blue-200 selection:text-blue-900">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Waves className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                Supersharkz Ledger
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 opacity-0 animate-slide-up">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Charge Management</h2>
              <p className="text-slate-500 mt-2 text-sm max-w-md leading-relaxed">
                Record and track student financial transactions. Manage outstanding balances and payments.
              </p>
            </div>

            {selectedIds.length > 0 && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
                <div className="bg-slate-900/90 backdrop-blur-xl text-white px-6 py-4 rounded-full shadow-2xl border border-slate-700/50 flex items-center gap-6">
                  
                  <div className="flex items-center gap-3 border-r border-slate-700 pr-6">
                    <button onClick={() => setSelectedIds([])} className="p-1 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                      <X size={18} />
                    </button>
                    <span className="font-semibold text-sm">
                      <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md mr-2">{selectedIds.length}</span>
                      Selected
                    </span>
                  </div>

                  <div className="flex flex-col text-sm pr-4">
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Selected Outstanding</span>
                    <span className="font-mono font-bold text-amber-400">RM {selectedOutstanding.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={handleBulkDelete}
                    className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors shadow-lg shadow-rose-500/20"
                  >
                    <Trash2 size={16} />
                    Delete All
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/40 flex items-center gap-4">
                <div className="p-2.5 bg-rose-50 rounded-xl">
                  <Wallet className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Total Outstanding</p>
                  <p className="text-xl font-black text-slate-900">
                    <span className="text-slate-400 font-medium text-lg mr-1">RM</span> 
                    {totalOutstanding.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleOpenAdd}
                className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Add Charge
              </button>
            </div>
          </div>

          <div className="opacity-0 animate-slide-up animation-delay-100 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/40 border border-white overflow-hidden ring-1 ring-slate-200/50">
            <ChargeTable 
              charges={charges} 
              onEdit={handleOpenEdit} 
              onDelete={handleOpenDelete} 
              onQuickSettle={handleQuickSettle}
              selectedIds={selectedIds}       
              onSelect={handleSelect}        
              onSelectAll={handleSelectAll}
            />
          </div>

        </div>
      </main>

      <ChargeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCharge}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => chargeToDelete && deleteCharge(chargeToDelete)}
        chargeId={chargeToDelete || undefined}
      />
    </div>
  );
}