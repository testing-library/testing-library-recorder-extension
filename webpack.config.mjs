import CopyPlugin from "copy-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"

export default {
  devtool: false,
  plugins: [
    new CopyPlugin({
      patterns: ["manifest.json"],
    }),
    new HtmlPlugin(),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(j|t)s$/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
}
