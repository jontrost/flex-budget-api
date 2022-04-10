import {
    floatArg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    objectType,
    stringArg
} from "nexus";

import { CATEGORY_MODEL } from "../database/Category";
import { FUND_MODEL } from "../database/Fund";

export const FUND = objectType({
    name: "Fund",
    definition(t) {
        t.nonNull.id("_id");
        t.nonNull.float("budgetedAmount");
        t.nonNull.string("name");
        t.nonNull.float("spentAmount");
    }
});

export const FUND_INPUT = inputObjectType({
    name: "FundInput",
    definition(t) {
        t.nonNull.float("budgetedAmount");
        t.nonNull.string("name");
        t.nonNull.float("spentAmount");
    }
});

export const CREATE_FUND_MUTATION = mutationField("createFund", {
    type: "Category",
    args: {
        categoryId: nonNull(idArg()),
        budgetedAmount: nonNull(floatArg()),
        name: nonNull(stringArg())
    },
    async resolve(_parent, args) {
        const { categoryId, budgetedAmount, name } = args;

        const doc = await CATEGORY_MODEL.findById(categoryId);
        if (doc == null) {
            throw new Error("Unable to find category with id: " + categoryId);
        } else {
            const fund = new FUND_MODEL({
                budgetedAmount,
                name,
                spentAmount: 0
            });
            doc.funds.push(fund);
            return await doc.save();
        }
    }
});
