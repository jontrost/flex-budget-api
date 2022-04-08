import { floatArg, list, mutationField, nonNull, objectType, queryField, stringArg } from "nexus";

import { EXPENSE_MODEL } from "../database/Expense";

export const EXPENSE = objectType({
    name: "Expense",
    definition(t) {
        t.nonNull.id("_id");
        t.nonNull.float("cost");
        t.nonNull.string("date");
        t.nonNull.string("name");
    }
});

export const EXPENSE_QUERY = queryField("expenses", {
    type: nonNull(list(nonNull("Expense"))),
    async resolve() {
        const response = await EXPENSE_MODEL.find().lean();
        return response;
    }
});

export const CREATE_EXPENSE_MUTATION = mutationField("createExpense", {
    type: "Expense",
    args: {
        cost: nonNull(floatArg()),
        date: nonNull(stringArg()),
        name: nonNull(stringArg())
    },
    async resolve(_parent, args) {
        const response = await EXPENSE_MODEL.create(args);
        return response;
    }
});
