import { floatArg, list, mutationField, nonNull, objectType, queryField, stringArg } from "nexus";

import { EXPENSES } from "./data";

export const Expense = objectType({
    name: "Expense",
    definition(t) {
        t.nonNull.float("cost");
        t.nonNull.string("date");
        t.nonNull.string("name");
    }
});

export const ExpenseQuery = queryField("expenses", {
    type: nonNull(list(nonNull("Expense"))),
    resolve() {
        return EXPENSES;
    }
});

export const ExpenseMutation = mutationField("createExpense", {
    type: "Expense",
    args: {
        cost: nonNull(floatArg()),
        date: nonNull(stringArg()),
        name: nonNull(stringArg())
    },
    resolve(_parent, args) {
        const { cost, date, name } = args;
        const expense = {
            cost,
            date,
            name
        };

        // Send the data to the DB here eventually
        console.log(expense);

        // If DB operation is successful
        const createdExpense = {
            cost,
            date,
            name
        };
        return createdExpense;
    }
});
