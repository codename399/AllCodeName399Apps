import { Audit } from "../../../models/audit";

export interface Debt extends Audit {
    fromUserId?: string;
    fromUserName?: string;
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
    expectedSettlementDate?: Date;
}