import { User } from "../../user/models/user";

export interface Supplier {
    id?: number;
    supplierName?: string;
    uniqueIdentifer?: string;
    adress?: string;
    mainContact?: string;
    email?: string;  
    phoneNumber?: boolean;
    supplierType?: string;
    paymentMethods?: string;
    paymentTerms?: string;
    createdAt?: string;
    updatedAt?: string;  
    user?: User;
  }
  
  