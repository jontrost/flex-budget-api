import { model, Schema } from "mongoose";

export interface Fund {
    _id: string;
    budgetedAmount: number;
    name: string;
}

export const FUND_SCHEMA = new Schema<Fund>({
    budgetedAmount: Number,
    name: String
});

export const FUND_MODEL = model<Fund>("Fund", FUND_SCHEMA);
