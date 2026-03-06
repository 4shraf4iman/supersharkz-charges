import { z } from 'zod';

export const chargeSchema = z.object({
  charge_id: z.string().optional(),
  student_id: z.string().min(1, "Student ID is required"),
  charge_amount: z.number({ invalid_type_error: "Must be a number" })
    .positive("Charge amount must be greater than 0"),
  paid_amount: z.number({ invalid_type_error: "Must be a number" })
    .min(0, "Paid amount cannot be negative"),
  date_charged: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format"),
}).refine((data) => data.paid_amount <= data.charge_amount, {
  message: "Paid amount cannot exceed the charge amount",
  path: ["paid_amount"],
});

export type Charge = z.infer<typeof chargeSchema>;