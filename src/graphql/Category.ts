import { list, nonNull, objectType, queryField } from "nexus";

import { CATEGORIES } from "./data";
import { Fund } from "./Fund";

export const Category = objectType({
    name: "Category",
    definition(t) {
        t.nonNull.string("name");
        t.nonNull.list.nonNull.field("funds", {
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
