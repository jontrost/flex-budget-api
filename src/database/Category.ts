import { model, Schema } from "mongoose";

interface Fund {
    _id: string;
    budgetedAmount: number;
    spentAmount: number;
    name: string;
}

interface Category {
    _id: string;
    name: string;
    funds?: Fund[];
}

const FUND_SCHEMA = new Schema<Fund>({
    budgetedAmount: Number,
    spentAmount: Number, // { type: Number, required: true } could also be used here for any of these
    name: String
});

const CATEGORY_SCHEMA = new Schema<Category>({
    name: String,
    funds: [FUND_SCHEMA]
});

export const CATEGORY_MODEL = model<Category>("Category", CATEGORY_SCHEMA);

export const FUND_MODEL = model<Fund>("Fund", FUND_SCHEMA);
