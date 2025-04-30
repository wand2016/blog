"use strict";

module.exports = {
  configs: {
    recommended: {
      plugins: ["wandfuldays"],
      rules: {
        "wandfuldays/enforce-foo-bar": "error",
      },
    },
  },
  rules: {
    "enforce-foo-bar": require("./rules/enforce-foo-bar"),
  },
};
