import { floatArg, idArg, inputObjectType, mutationField, nonNull, objectType, queryField, stringArg } from "nexus";

import { CATEGORY_MODEL } from "../database/Category";
import { FUND_MODEL } from "../database/Fund";

export const FUND = objectType({
    name: "Fund",
    definition(t) {
        t.nonNull.id("_id");
        t.nonNull.float("budgetedAmount");
        t.nonNull.string("name");
    }
});

export const FUND_INPUT = inputObjectType({
    name: "FundInput",
    definition(t) {
        t.nonNull.float("budgetedAmount");
        t.nonNull.string("name");
    }
});

export const GET_FUND_BY_ID_QUERY = queryField("fund", {
    type: "Fund",
    args: {
        _id: nonNull(idArg()),
        categoryId: nonNull(idArg())
    },
    async resolve(_parent, args) {
        const { _id, categoryId } = args;
        const response = await CATEGORY_MODEL.findById(categoryId).lean();
        return response?.funds.find((fund) => fund._id.toString() === _id) ?? null;
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
                name
            });
            doc.funds.push(fund);
            return await doc.save();
        }
    }
});

export const UPDATE_FUND_MUTATION = mutationField("updateFund", {
    type: "Category",
    args: {
        _id: nonNull(idArg()),
        currentCategoryId: nonNull(idArg()),
        newCategoryId: nonNull(idArg()),
        budgetedAmount: nonNull(floatArg()),
        name: nonNull(stringArg())
    },
    async resolve(_parent, args) {
        const { _id, currentCategoryId, newCategoryId, budgetedAmount, name } = args;
        const currentDoc = await CATEGORY_MODEL.findById(currentCategoryId);

        if (currentDoc == null) {
            throw new Error("Unable to find current category with id: " + currentCategoryId);
        }

        const fundIndex = currentDoc?.funds.findIndex((fund) => fund._id.toString() === _id);

        if (fundIndex === -1) {
            throw new Error("Unable to find fund with id: " + _id);
        }

        if (currentCategoryId === newCategoryId) {
            currentDoc.funds[fundIndex].budgetedAmount = budgetedAmount;
            currentDoc.funds[fundIndex].name = name;
            return await currentDoc.save();
        } else {
            const newDoc = await CATEGORY_MODEL.findById(newCategoryId);

            if (newDoc == null) {
                throw new Error("Unable to find new category with id: " + newCategoryId);
            }

            const fund = new FUND_MODEL({
                budgetedAmount,
                name
            });

            newDoc.funds.push(fund);
            currentDoc?.funds.splice(fundIndex, 1);
            await currentDoc.save();
            return await newDoc.save();
        }
    }
});
