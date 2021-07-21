const { resolve } = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/mryj": {
        target: "https://api.ixiaowai.cn/api/ylapi.php",
      },
      "/best-seller": {
        target: "http://bl.talelin.com/v1",
        pathRewrite: {
          "^/best-seller": "/",
        },
      },
      "/jikan": {
        target: "https://api.jikan.moe/v3",
        pathRewrite: {
          "^/jikan": "/",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: resolve(__dirname, "src/components"),
      },
    },
  },
};
