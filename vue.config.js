const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "./src/assets/css/_global.scss";
        `,
      },
    },
  },
  // chainWebpack: (config) => {
  //   config.module
  //     .rule("fonts")
  //     .test(/\.(ttf|otf|eot|woff|woff2)$/)
  //     .use("file-loader")
  //     .loader("file-loader")
  //     .tap((options) => {
  //       options = {
  //         // limit: 10000,
  //         name: "/assets/fonts/[name].[ext]",
  //       };
  //       return options;
  //     })
  //     .end();
  // },
});
