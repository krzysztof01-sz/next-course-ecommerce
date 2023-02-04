import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla31zii22kel01upgirz7sb8/master",
  documents: "./graphql/operations/**/*.graphql",
  generates: {
    "./graphql/generated/": {
      preset: "client",
      plugins: [],
      config: {
        mergeFragmentTypes: true,
        flattenGeneratedTypes: true,
        flattenGeneratedTypesIncludeFragments: true,
        withComponent: true,
        withResultType: true,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
