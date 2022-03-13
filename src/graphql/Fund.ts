import { floatArg, list, mutationField, nonNull, objectType, queryField, stringArg } from "nexus";

import { FUNDS } from "./data";

export const Fund = objectType({
    name: "Fund",
    definition(t) {
        t.nonNull.float("budgetedAmount");
        t.nonNull.string("name");
        t.nonNull.float("spentAmount");
    }
});

export const FundQuery = queryField("funds", {
    type: nonNull(list(nonNull("Fund"))),
    resolve() {
        return FUNDS;
    }
});

export const FundMutation = mutationField("createFund", {
    type: "Fund",
    args: {
        budgetedAmount: nonNull(floatArg()),
        categoryName: nonNull(stringArg()),
        name: nonNull(stringArg())
    },
    resolve(_parent, args) {
        const { budgetedAmount, categoryName, name } = args;
        const fund = {
            budgetedAmount,
            categoryName,
            name
        };

        // Send the data to the DB here eventually
        console.log(fund);

        // If DB operation is successful
        const createdFund = {
            budgetedAmount,
            name,
            spentAmount: 0
        };
        return createdFund;
    }
});
