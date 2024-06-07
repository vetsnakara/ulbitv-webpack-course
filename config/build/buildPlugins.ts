import { Configuration, DefinePlugin, ProgressPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import type { BuildOptions } from "./types/types";

type BuildPlugins = Configuration["plugins"];

export function buildPlugins({
    paths,
    mode,
    isDev,
    isProd,
    analyze,
    platform,
}: BuildOptions): BuildPlugins {
    const htmlPlugin = new HtmlWebpackPlugin({
        template: paths.html,
    });

    const definePlugin = new DefinePlugin({
        __PLATFORM__: JSON.stringify(platform),
        __ENV__: JSON.stringify(mode),
    });

    const plugins: BuildPlugins = [htmlPlugin, definePlugin];

    if (isDev) {
        const progressPlugin = new ProgressPlugin();
        const tsCheckPlugin = new ForkTsCheckerWebpackPlugin();
        const refreshPlugin = new ReactRefreshWebpackPlugin();

        plugins.push(progressPlugin, tsCheckPlugin, refreshPlugin);
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
