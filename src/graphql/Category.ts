import { extendType, objectType } from "nexus";

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

export const CategoryQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("categories", {
            type: "Category",
            resolve() {
                return CATEGORIES;
            }
        });
    }
});
