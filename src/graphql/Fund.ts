import { extendType, objectType } from "nexus";

import { NexusGenObjects } from "../../nexus-typegen";

export const Fund = objectType({
    name: "Fund",
    definition(t) {
        t.nonNull.float("budgetedAmount");
        t.nonNull.string("name");
        t.nonNull.float("spentAmount");
    }
});

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("funds", {
            type: "Fund",
            resolve() {
                return funds;
            }
        });
    }
});

// Mock data, remove later
const funds: NexusGenObjects["Fund"][] = [
    {
        budgetedAmount: 150,
        name: "name",
        spentAmount: 50
    },
    {
        budgetedAmount: 100,
        name: "name",
        spentAmount: 50
    }
];
