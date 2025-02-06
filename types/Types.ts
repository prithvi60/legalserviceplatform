import { CalendarDate } from "@internationalized/date";
import { Prisma } from "@prisma/client";


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

export interface NDAFormData {
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

export interface EmployeeFormData {
  employee_name: string;
  employee_address: string;
  designation: string;
  department: string;
  joining_date: string;
  ctc: number;
  ctc_breakup: string;
  bank_account_details: string;
  work_location: string;
  office_hours: string;
  severance_package: string;
  public_holidays: string[];
  paid_leave: number;
  casual_sick_leave: number;
  joining_bonus: number;
  non_compete_duration: string;
  // radio button
  employment_type: "Full-time" | "Part-time" | "Contract" | "Temporary";
  remote_work_policy: "Yes" | "No";
  weekend_work: "Yes" | "No";
  leave_accrual_policy: "Yes" | "No";
  termination_cause: "Yes" | "No";
  non_compete_clause: "Yes" | "No";
  confidentiality_agreement: "Yes" | "No";
  intellectual_property_rights: "Yes" | "No";
  code_of_conduct_agreement: "Yes" | "No";
  background_check: "Yes" | "No";
  // dropdown or select options
  probation_period: "3 months" | "6 months" | "1 year" | "No probation";
  termination_notice_period: "15 days" | "1 month" | "2 months" | "3 months";
  reimbursement_policy:
    | "Company covers all expenses"
    | "Partial reimbursement"
    | "No reimbursement";
  dispute_resolution_clause: "Arbitration" | "Litigation" | "Mediation";
  working_days: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  benefits_provided: (
    | "Health Insurance"
    | "Stock Options"
    | "Paid Leave"
    | "Retirement Plan"
    | "Company Laptop"
    | "Travel Allowance"
  )[];
  required_documents: (
    | "Passport"
    | "Aadhar Card"
    | "PAN Card"
    | "Educational Certificates"
    | "Previous Employer References"
  )[];
}

export interface Context {
  userId?: number;
}

export interface NDAPreviewProps {
  RoleBased: GetUserResponse | undefined;
  loading: boolean;
}

export interface User {
  address: string;
  company_name: string;
  email: string;
  id: number;
  phone_number: string;
  username: string;
  BusinessForms: CreateBusinessFormInput[];
}

export interface GetUserResponse {
  getUser: User;
}

export interface GetBFResponse {
  getBusinessForms: GetBusinessFormInput[];
}

export interface GetOBFResponse {
  getBusinessForm: GetBusinessFormInput;
}

export interface GetBusinessFormInput {
  id: number;
  userId: number;
  DocType: string;
  DocNumber: number;
  formData: DocumentData;
  status: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

type DocumentData = {
  step: number;
  formData: FormData2;
  progress: number;
};

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

export interface CreateBusinessFormInput {
  id: number;
  userId: number;
  DocType: string;
  DocNumber: number;
  formData: Prisma.InputJsonValue;
  status: string;
  url: string;
}

export interface UpdateBusinessFormInput {
  id: number;
  userId: number;
  DocType: string;
  DocNumber: number;
  formData: Prisma.InputJsonValue;
  status: string;
}

export interface DeleteBusinessFormInput {
  userId: number;
  DocType: string;
  DocNumber: number;
}
