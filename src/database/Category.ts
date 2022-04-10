import { model, Schema } from "mongoose";

import { Fund, FUND_SCHEMA } from "./Fund";

interface Category {
    _id: string;
    name: string;
    funds: Fund[];
}

const CATEGORY_SCHEMA = new Schema<Category>({
    name: String,
    funds: [FUND_SCHEMA]
});

export const CATEGORY_MODEL = model<Category>("Category", CATEGORY_SCHEMA);
