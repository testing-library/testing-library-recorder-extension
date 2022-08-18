import CopyPlugin from "copy-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"

export default {
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  devtool: false,
  plugins: [
    new CopyPlugin({
      patterns: ["manifest.json"],
    }),
    new HtmlPlugin(),
  ],
}
