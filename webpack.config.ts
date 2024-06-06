import path from "path";

import { buildWebpack } from "./config/build/buildWebpack";
import type { BuildOptions, EnvVariables } from "./config/build/types/types";

export default ({ mode, port, analyze = false }: EnvVariables) => {
    const paths = {
        src: path.resolve(__dirname, "src"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: path.resolve(__dirname, "build"),
        html: path.resolve(__dirname, "public", "index.html"),
    };

    const isDev = mode === "development";
    const isProd = mode === "production";

    const options: BuildOptions = {
        mode: mode ?? "development",
        port: port ?? 3000,
        paths,
        analyze,
        isDev,
        isProd,
    };

    return buildWebpack(options);
};
