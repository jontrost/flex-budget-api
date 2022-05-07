import { idArg, list, mutationField, nonNull, objectType, queryField, stringArg } from "nexus";

import { CATEGORY_MODEL } from "../database/Category";
import { FUND_MODEL } from "../database/Fund";
import { FUND } from "./Fund";

export const CATEGORY = objectType({
    name: "Category",
    definition(t) {
        t.nonNull.id("_id");
        t.nonNull.string("name");
        t.nonNull.list.field("funds", {
            type: FUND
        });
    }
});

export const GET_CATEGORIES_QUERY = queryField("categories", {
    type: nonNull(list(nonNull("Category"))),
    async resolve() {
        const response = await CATEGORY_MODEL.find().lean();
        return response;
    }
});

export const GET_CATEGORY_BY_ID_QUERY = queryField("category", {
    type: "Category",
    args: {
        _id: nonNull(idArg())
    },
    async resolve(_parent, args) {
        const response = await CATEGORY_MODEL.findById(args._id).lean();
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
        _id: nonNull(idArg()),
        name: stringArg(),
        funds: list(nonNull("FundInput"))
    },
    async resolve(_parent, args) {
        const { _id, name, funds } = args;
        const fundModels = funds?.map((fund) => {
            return new FUND_MODEL({
                budgetedAmount: fund.budgetedAmount,
                name: fund.name
            });
        });

        const doc = await CATEGORY_MODEL.findById(_id);
        if (doc == null) {
            throw new Error("Unable to find category with id: " + _id);
        } else {
            doc.name = name ?? doc.name;
            doc.funds = fundModels ?? doc.funds;
            return await doc.save();
        }
    }
});
