"use strict";

module.exports = {
  configs: {
    recommended: {
      plugins: ["wandfuldays"],
      rules: {
        "wandfuldays/app-router-params-prop-promise": "error",
      },
    },
  },
  rules: {
    "app-router-params-prop-promise": require("./rules/app-router-params-prop-promise"),
  },
};
