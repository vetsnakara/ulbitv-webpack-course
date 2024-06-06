import { Configuration, ProgressPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import type { BuildOptions } from "./types/types";

type BuildPlugins = Configuration["plugins"];

export function buildPlugins({
    paths,
    isDev,
    isProd,
    analyze,
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

        if (analyze) {
            const bundleAnalyzer = new BundleAnalyzerPlugin();
            plugins.push(bundleAnalyzer);
        }
    }

    return plugins;
}
