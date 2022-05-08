import { model, Schema } from "mongoose";

import { Expense, EXPENSE_SCHEMA } from "./Expense";

export interface Fund {
    _id: string;
    budgetedAmount: number;
    name: string;
    expenses: Expense[];
}

export const FUND_SCHEMA = new Schema<Fund>({
    budgetedAmount: Number,
    name: String,
    expenses: [EXPENSE_SCHEMA]
});

export const FUND_MODEL = model<Fund>("Fund", FUND_SCHEMA);
