import { extendType, objectType } from "nexus";

import { FUNDS } from "./data";

export const Fund = objectType({
    name: "Fund",
    definition(t) {
        t.nonNull.float("budgetedAmount");
        t.nonNull.string("name");
        t.nonNull.float("spentAmount");
    }
});

export const FundQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("funds", {
            type: "Fund",
            resolve() {
                return FUNDS;
            }
        });
    }
});
