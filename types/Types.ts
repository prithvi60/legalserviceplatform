import { CalendarDate } from "@internationalized/date";

export interface FormData {
  entityType: "company" | "organization";
  employeeName: string;
  designation: string;
  department: string;
  currentStartTime: string;
  currentEndTime: string;
  proposedStartTime: string;
  proposedEndTime: string;
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  trialPeriod: string;
  reason: string;
}

export interface FieldGroup {
  step: number;
  fields: (keyof FormData)[];
}

export interface PaymentStatus {
  status: "pending" | "success" | "failed";
  timestamp: number;
}

export interface PaymentSession {
  id: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  status: PaymentStatus;
}
