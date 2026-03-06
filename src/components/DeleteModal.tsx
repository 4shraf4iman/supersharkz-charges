import { AlertTriangle, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  chargeId?: string;
  bulkCount?: number;
}

export function DeleteModal({ isOpen, onClose, onConfirm, chargeId, bulkCount }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl shadow-rose-900/20 border border-white overflow-hidden relative animate-slide-up">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-200 active:scale-95 z-10"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className="p-8 pt-12 text-center flex flex-col items-center relative">
          
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-rose-200 blur-xl opacity-60 animate-pulse rounded-full"></div>
            <div className="relative bg-gradient-to-br from-rose-100 to-red-50 p-5 rounded-full border border-rose-200/50 shadow-inner">
              <AlertTriangle className="w-9 h-9 text-rose-600" strokeWidth={2.5} />
            </div>
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {bulkCount ? 'Delete Multiple?' : 'Delete Charge?'}
          </h2>
          
          <p className="text-slate-500 text-sm mb-8 px-2 leading-relaxed">
            {bulkCount ? (
              <>Are you sure you want to permanently delete <strong className="text-slate-700 font-mono bg-slate-100/80 px-2 py-1 rounded-lg border border-slate-200/60 shadow-sm inline-block mt-1">{bulkCount} selected charges</strong>? <br/>This action cannot be undone.</>
            ) : (
              <>Are you sure you want to permanently delete charge <strong className="text-slate-700 font-mono bg-slate-100/80 px-2 py-1 rounded-lg border border-slate-200/60 shadow-sm inline-block mt-1">{chargeId}</strong>? <br/>This action cannot be undone.</>
            )}
          </p>

          <div className="flex w-full gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-5 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-red-600 rounded-xl hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-rose-500/20 transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 active:scale-95"
            >
              Yes, delete
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}