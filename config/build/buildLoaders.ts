import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { ModuleOptions } from "webpack";
import type { BuildOptions } from "./types/types";

export function buildLoaders({
    isDev,
    isProd,
}: BuildOptions): ModuleOptions["rules"] {
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev
                    ? "[path][name]__[local]"
                    : "[hash:base64:8]",
            },
        },
    };

    const scssLoader = {
        test: /.scss$/,
        use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            cssLoaderWithModules,
            "sass-loader",
        ].filter(Boolean),
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    return [scssLoader, tsLoader];
}
