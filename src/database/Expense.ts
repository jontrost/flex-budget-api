import { model, Schema } from "mongoose";

interface Expense {
    _id: string;
    cost: number;
    date: string;
    name: string;
}

export const EXPENSE_SCHEMA = new Schema<Expense>({
    cost: Number,
    date: String,
    name: String
});

export const EXPENSE_MODEL = model<Expense>("Expense", EXPENSE_SCHEMA);
