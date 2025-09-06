import { Audit } from "../../../../models/audit";

export interface DebtDto extends Audit {
    fromUserId?: string;
    toUserId?: string;
    toUserName?: string;
    title?: string;
    description?: string;
    transactionType?: string;
    totalAmount?: number;
    settledAmount?: number;
    settlementDate?: Date;
    transactionDate?: Date;
    isSettled?: boolean;
    expectedDate?: Date;
}