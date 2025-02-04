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
