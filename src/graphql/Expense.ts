import {
    floatArg,
    idArg,
    inputObjectType,
    list,
    mutationField,
    nonNull,
    objectType,
    queryField,
    stringArg
} from "nexus";

import { CATEGORY_MODEL } from "../database/Category";
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

export const EXPENSE_INPUT = inputObjectType({
    name: "ExpenseInput",
    definition(t) {
        t.nonNull.float("cost");
        t.nonNull.string("date");
        t.nonNull.string("name");
    }
});

export const GET_EXPENSES_FOR_FUND_QUERY = queryField("expensesForFund", {
    type: nonNull(list(nonNull("Expense"))),
    args: {
        categoryId: nonNull(idArg()),
        fundId: nonNull(idArg())
    },
    async resolve(_parent, args) {
        const { categoryId, fundId } = args;

        const categoryDoc = await CATEGORY_MODEL.findById(categoryId);

        if (categoryDoc == null) {
            throw new Error("Unable to find category with id: " + categoryId);
        }

        const fundIndex = categoryDoc.funds.findIndex((fund) => fund._id.toString() === fundId);

        if (fundIndex === -1) {
            throw new Error("Unable to find fund with id: " + fundId);
        }

        return categoryDoc.funds[fundIndex].expenses;
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
    type: "Category",
    args: {
        categoryId: nonNull(idArg()),
        fundId: nonNull(idArg()),
        cost: nonNull(floatArg()),
        date: nonNull(stringArg()),
        name: nonNull(stringArg())
    },
    async resolve(_parent, args) {
        const { categoryId, fundId, cost, date, name } = args;
        const categoryDoc = await CATEGORY_MODEL.findById(categoryId);

        if (categoryDoc == null) {
            throw new Error("Unable to find category with id: " + categoryId);
        }

        const fundIndex = categoryDoc?.funds.findIndex((fund) => fund._id.toString() === fundId);

        if (fundIndex === -1) {
            throw new Error("Unable to find fund with id: " + fundId);
        }

        categoryDoc?.funds[fundIndex].expenses.push(
            new EXPENSE_MODEL({
                cost,
                date,
                name
            })
        );

        return await categoryDoc.save();
    }
});

export const UPDATE_EXPENSE_MUTATION = mutationField("updateExpense", {
    type: "Category",
    args: {
        _id: nonNull(idArg()),
        categoryId: nonNull(idArg()),
        fundId: nonNull(idArg()),
        cost: nonNull(floatArg()),
        date: nonNull(stringArg()),
        name: nonNull(stringArg())
    },
    async resolve(_parent, args) {
        const { _id, categoryId, fundId, cost, date, name } = args;

        const categoryDoc = await CATEGORY_MODEL.findById(categoryId);

        if (categoryDoc == null) {
            throw new Error("Unable to find category with id: " + categoryId);
        }

        const fundIndex = categoryDoc.funds.findIndex((fund) => fund._id.toString() === fundId);

        if (fundIndex === -1) {
            throw new Error("Unable to find fund with id: " + fundId);
        }

        const expenseIndex = categoryDoc.funds[fundIndex].expenses.findIndex(
            (expense) => expense._id.toString() === _id
        );

        if (expenseIndex === -1) {
            throw new Error("Unable to find expense with id: " + _id);
        }

        categoryDoc.funds[fundIndex].expenses[expenseIndex].cost = cost;
        categoryDoc.funds[fundIndex].expenses[expenseIndex].date = date;
        categoryDoc.funds[fundIndex].expenses[expenseIndex].name = name;

        return await categoryDoc.save();
    }
});
