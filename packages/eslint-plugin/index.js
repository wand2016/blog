"use strict";

module.exports = {
  configs: {
    recommended: {
      plugins: ["wandfuldays"],
      rules: {
        "wandfuldays/app-router-params-prop-promise": "error",
        "wandfuldays/no-redundant-template-literal": "error",
      },
    },
  },
  rules: {
    "app-router-params-prop-promise": require("./rules/app-router-params-prop-promise"),
    "no-redundant-template-literal": require("./rules/no-redundant-template-literal"),
  },
};
