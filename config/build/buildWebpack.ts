import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolve } from "./buildResolve";

import type { Configuration } from "webpack";
import type { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): Configuration {
    const { mode, paths, isDev } = options;

    const config: Configuration = {
        mode: mode ?? "production",

        entry: paths.entry,

        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true,
        },

        plugins: buildPlugins(options),

        module: {
            rules: buildLoaders(options),
        },

        resolve: buildResolve(options),

        devServer: isDev ? buildDevServer(options) : undefined,

        devtool: isDev && "inline-source-map",
    };

    return config;
}
