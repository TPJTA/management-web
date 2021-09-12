const CracoLessPlugin = require("craco-less");
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve("src"),
    },
    resolve: {
      extensions: [".tsx", ".jsx", ".ts", ".js"],
    },
    configure: {
      output: {
        publicPath: "/management/",
      },    
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
