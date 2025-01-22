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

export interface FormData2 {
  agreementDay: string;
  agreementMonth: string;
  receivingPartyName: string;
  receivingPartyAddress: string;
  receivingPartyRegisteredOffice: string;
  receivingPartyPosition: string;
  disclosingPartyCompanyName: string;
  disclosingPartyRepName: string;
  disclosingPartyPosition: string;
  disclosingPartyRegisteredOffice: string;
}

export interface FieldGroup {
  step: number;
  fields: (keyof FormData)[];
}

export interface FieldGroup2 {
  step: number;
  fields: (keyof FormData2)[];
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
