import {
    idArg,
    inputObjectType,
    list,
    mutationField,
    nonNull,
    objectType,
    queryField,
    stringArg
} from "nexus";

import { CATEGORY_MODEL, FUND_MODEL } from "../database/Category";

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

export const CATEGORY = objectType({
    name: "Category",
    definition(t) {
        t.nonNull.id("_id");
        t.nonNull.string("name");
        t.list.nonNull.field("funds", {
            type: FUND
        });
    }
});

export const CATEGORY_QUERY = queryField("categories", {
    type: nonNull(list(nonNull("Category"))),
    async resolve() {
        const response = await CATEGORY_MODEL.find().lean();
        return response;
    }
});

export const CREATE_CATEGORY_MUTATION = mutationField("createCategory", {
    type: "Category",
    args: {
        name: nonNull(stringArg())
    },
    async resolve(_parent, args) {
        const response = await CATEGORY_MODEL.create(args);
        return response;
    }
});

export const UPDATE_CATEGORY_MUTATION = mutationField("updateCategory", {
    type: "Category",
    args: {
        id: nonNull(idArg()),
        name: stringArg(),
        funds: list(nonNull("FundInput"))
    },
    async resolve(_parent, args) {
        const { id, name, funds } = args;
        const fundModels = funds?.map((fund) => {
            return new FUND_MODEL({
                budgetedAmount: fund.budgetedAmount,
                spentAmount: fund.spentAmount,
                name: fund.name
            });
        });

        const doc = await CATEGORY_MODEL.findById(id);
        if (doc == null) {
            throw new Error("Unable to find category with id: " + args.id);
        } else {
            doc.name = name ?? doc.name;
            doc.funds = fundModels ?? doc.funds;
            return await doc.save();
        }
    }
});
