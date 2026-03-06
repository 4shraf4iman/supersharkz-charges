import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { chargeSchema, type Charge } from '../types/charge';
import { X, User, Calendar, Receipt, Wallet, Sparkles } from 'lucide-react'; // Added premium icons

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Charge) => void;
  initialData?: Charge | null;
}

export function ChargeFormModal({ isOpen, onClose, onSubmit, initialData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Charge>({
    resolver: zodResolver(chargeSchema),
    defaultValues: initialData || {
      student_id: '',
      charge_amount: 0,
      paid_amount: 0,
      date_charged: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ student_id: '', charge_amount: 0, paid_amount: 0, date_charged: new Date().toISOString().split('T')[0] });
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl shadow-blue-900/20 border border-white overflow-hidden flex flex-col animate-slide-up">
        
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner border border-blue-200/50">
              <Sparkles size={20} strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {initialData ? 'Edit Charge' : 'New Charge'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 p-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-200 active:scale-95"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Student ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  {...register('student_id')}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 hover:border-blue-400 transition-all outline-none text-slate-900 font-medium placeholder:text-slate-400"
                  placeholder="e.g., stu_105"
                />
              </div>
              {errors.student_id && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1"><X size={12}/>{errors.student_id.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date Charged</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors z-10">
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  {...register('date_charged')}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 hover:border-blue-400 transition-all outline-none text-slate-900 font-medium relative"
                />
              </div>
              {errors.date_charged && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1"><X size={12}/>{errors.date_charged.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Charge Amount</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Receipt size={18} />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register('charge_amount', { valueAsNumber: true })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 hover:border-blue-400 transition-all outline-none text-slate-900 font-mono font-bold"
                  />

                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded">RM</span>
                  </div>
                </div>
                {errors.charge_amount && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1"><X size={12}/>{errors.charge_amount.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Paid Amount</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Wallet size={18} />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register('paid_amount', { valueAsNumber: true })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 hover:border-blue-400 transition-all outline-none text-slate-900 font-mono font-bold"
                  />

                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded">RM</span>
                  </div>
                </div>
                {errors.paid_amount && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1"><X size={12}/>{errors.paid_amount.message}</p>}
              </div>
            </div>

            <div className="mt-2 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
              >
                {initialData ? 'Save Changes' : 'Create Charge'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}