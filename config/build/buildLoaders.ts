import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { ModuleOptions } from "webpack";

import type { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
    const { isDev, isProd } = options;

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

    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: [
    //         {
    //             loader: "ts-loader",
    //             options: {
    //                 // hmr
    //                 getCustomTransformers: () => ({
    //                     before: [isDev && ReactRefreshTypeScript()].filter(
    //                         Boolean
    //                     ),
    //                 }),
    //                 // в DEV-режиме делать только сборку (без проверки типов)
    //                 transpileOnly: isDev,
    //             },
    //         },
    //     ],
    // };

    const babelLoader = buildBabelLoader(options);

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

    return [
        assetLoader,
        svgrLoader,
        scssLoader,
        //ts-loader,
        babelLoader,
    ];
}
