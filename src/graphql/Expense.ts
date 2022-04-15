import {
    floatArg,
    idArg,
    list,
    mutationField,
    nonNull,
    objectType,
    queryField,
    stringArg
} from "nexus";

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

export const GET_EXPENSES_QUERY = queryField("expenses", {
    type: nonNull(list(nonNull("Expense"))),
    async resolve() {
        const response = await EXPENSE_MODEL.find().lean();
        return response;
    }
});

export const GET_EXPENSE_BY_ID_QUERY = queryField("expense", {
    type: "Expense",
    args: {
        _id: nonNull(idArg())
    },
    async resolve(_parent, args) {
        const response = await EXPENSE_MODEL.findById(args._id).lean();
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

export const UPDATE_EXPENSE_MUTATION = mutationField("updateExpense", {
    type: "Expense",
    args: {
        _id: nonNull(idArg()),
        cost: floatArg(),
        date: stringArg(),
        name: stringArg()
    },
    async resolve(_parent, args) {
        const { _id, cost, date, name } = args;
        const doc = await EXPENSE_MODEL.findById(_id);
        if (doc == null) {
            throw new Error("Unable to find expense with id: " + _id);
        } else {
            doc.cost = cost ?? doc.cost;
            doc.date = date ?? doc.date;
            doc.name = name ?? doc.name;
            return await doc.save();
        }
    }
});
