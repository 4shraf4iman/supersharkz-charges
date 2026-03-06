import { useState } from 'react';
import type { Charge } from '../types/charge';

const initialData: Charge[] = [
    {
        "charge_id": "chg_001",
        "charge_amount": 120.00,
        "paid_amount": 0.00,
        "student_id": "stu_101",
        "date_charged": "2025-01-05"
    },
    {
        "charge_id": "chg_002",
        "charge_amount": 80.50,
        "paid_amount": 80.50,
        "student_id": "stu_102",
        "date_charged": "2025-01-07"
    },
    {
        "charge_id": "chg_003",
        "charge_amount": 150.00,
        "paid_amount": 50.00,
        "student_id": "stu_101",
        "date_charged": "2025-01-12"
    },
    {
        "charge_id": "chg_004",
        "charge_amount": 95.00,
        "paid_amount": 0.00,
        "student_id": "stu_103",

        "date_charged": "2025-01-15"
    },
    {
        "charge_id": "chg_005",
        "charge_amount": 200.00,
        "paid_amount": 200.00,
        "student_id": "stu_104",
        "date_charged": "2025-01-20"
    }
];

export function useCharges() {
  const [charges, setCharges] = useState<Charge[]>(initialData);

  const addCharge = (newCharge: Omit<Charge, 'charge_id'>) => {
    const charge = {
      ...newCharge,
      charge_id: `chg_${Date.now()}`,
    };
    setCharges((prev) => [...prev, charge]);
  };

  const updateCharge = (updatedCharge: Charge) => {
    setCharges((prev) =>
      prev.map((c) => (c.charge_id === updatedCharge.charge_id ? updatedCharge : c))
    );
  };

  const deleteCharge = (id: string) => {
    setCharges((prev) => prev.filter((c) => c.charge_id !== id));
  };

  const bulkDeleteCharges = (ids: string[]) => {
    setCharges((prev) => prev.filter((c) => !ids.includes(c.charge_id!)));
  };

  return { charges, addCharge, updateCharge, deleteCharge, bulkDeleteCharges };
}