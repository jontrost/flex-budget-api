import { list, nonNull, objectType, queryField } from "nexus";

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
