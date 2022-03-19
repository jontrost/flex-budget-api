import { list, mutationField, nonNull, objectType, queryField, stringArg } from "nexus";

import { CATEGORIES } from "./data";
import { Fund } from "./Fund";

export const Category = objectType({
    name: "Category",
    definition(t) {
        t.nonNull.string("name");
        t.list.nonNull.field("funds", {
            type: Fund
        });
    }
});

export const CategoryQuery = queryField("categories", {
    type: nonNull(list(nonNull("Category"))),
    resolve() {
        return CATEGORIES;
    }
});

export const CategoryMutation = mutationField("createCategory", {
    type: "Category",
    args: {
        name: nonNull(stringArg())
    },
    resolve(_parent, args) {
        const { name } = args;
        const category = {
            name
        };

        // Send the data to the DB here eventually
        console.log(category);

        // If DB operation is successful
        const createdCategory = {
            name
        };
        return createdCategory;
    }
});
