// Mock data for development purposes

import { NexusGenObjects } from "../../nexus-typegen";

export const FUNDS: NexusGenObjects["Fund"][] = [
    {
        budgetedAmount: 150,
        name: "Fund 1",
        spentAmount: 50
    },
    {
        budgetedAmount: 100,
        name: "Fund 2",
        spentAmount: 150
    }
];

export const CATEGORIES: NexusGenObjects["Category"][] = [
    {
        name: "Category 1",
        funds: FUNDS
    },
    {
        name: "Category 2",
        funds: FUNDS
    }
];
