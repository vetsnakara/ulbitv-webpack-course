import { ProgressPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { Configuration } from "webpack";
import type { BuildOptions } from "./types/types";

type BuildPlugins = Configuration["plugins"];

export function buildPlugins({
    paths,
    isDev,
    isProd,
}: BuildOptions): BuildPlugins {
    const htmlPlugin = new HtmlWebpackPlugin({
        template: paths.html,
    });

    const plugins: BuildPlugins = [htmlPlugin];

    if (isDev) {
        const progressPlugin = new ProgressPlugin();

        plugins.push(progressPlugin);
    }

    if (isProd) {
        const miniCssExtractPlugin = new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        });

        plugins.push(miniCssExtractPlugin);
    }

    return plugins;
}
