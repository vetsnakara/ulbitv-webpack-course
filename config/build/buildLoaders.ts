import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

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
        use: [
            {
                loader: "ts-loader",
                options: {
                    // hmr
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(
                            Boolean
                        ),
                    }),
                    // в DEV-режиме делать только сборку (без проверки типов)
                    transpileOnly: isDev,
                },
            },
        ],
        exclude: /node_modules/,
    };

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    };

    const svgrLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: "@svgr/webpack",
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: "convertColors",
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };

    return [assetLoader, svgrLoader, scssLoader, tsLoader];
}
