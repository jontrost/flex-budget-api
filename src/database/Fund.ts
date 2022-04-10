import { model, Schema } from "mongoose";

export interface Fund {
    _id: string;
    budgetedAmount: number;
    spentAmount: number;
    name: string;
}

export const FUND_SCHEMA = new Schema<Fund>({
    budgetedAmount: Number,
    spentAmount: Number, // { type: Number, required: true } could also be used here for any of these
    name: String
});

export const FUND_MODEL = model<Fund>("Fund", FUND_SCHEMA);
