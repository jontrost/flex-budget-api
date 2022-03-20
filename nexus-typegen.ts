/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Category: { // root type
    funds?: NexusGenRootTypes['Fund'][] | null; // [Fund!]
    name: string; // String!
  }
  Expense: { // root type
    cost: number; // Float!
    date: string; // String!
    name: string; // String!
  }
  Fund: { // root type
    budgetedAmount: number; // Float!
    name: string; // String!
    spentAmount: number; // Float!
  }
  Mutation: {};
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Category: { // field return type
    funds: NexusGenRootTypes['Fund'][] | null; // [Fund!]
    name: string; // String!
  }
  Expense: { // field return type
    cost: number; // Float!
    date: string; // String!
    name: string; // String!
  }
  Fund: { // field return type
    budgetedAmount: number; // Float!
    name: string; // String!
    spentAmount: number; // Float!
  }
  Mutation: { // field return type
    createCategory: NexusGenRootTypes['Category'] | null; // Category
    createExpense: NexusGenRootTypes['Expense'] | null; // Expense
    createFund: NexusGenRootTypes['Fund'] | null; // Fund
  }
  Query: { // field return type
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    expenses: NexusGenRootTypes['Expense'][]; // [Expense!]!
    funds: NexusGenRootTypes['Fund'][]; // [Fund!]!
  }
}

export interface NexusGenFieldTypeNames {
  Category: { // field return type name
    funds: 'Fund'
    name: 'String'
  }
  Expense: { // field return type name
    cost: 'Float'
    date: 'String'
    name: 'String'
  }
  Fund: { // field return type name
    budgetedAmount: 'Float'
    name: 'String'
    spentAmount: 'Float'
  }
  Mutation: { // field return type name
    createCategory: 'Category'
    createExpense: 'Expense'
    createFund: 'Fund'
  }
  Query: { // field return type name
    categories: 'Category'
    expenses: 'Expense'
    funds: 'Fund'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createCategory: { // args
      name: string; // String!
    }
    createExpense: { // args
      cost: number; // Float!
      date: string; // String!
      name: string; // String!
    }
    createFund: { // args
      budgetedAmount: number; // Float!
      categoryName: string; // String!
      name: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}