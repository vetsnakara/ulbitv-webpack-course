import type { Configuration } from "webpack";
import type { BuildOptions } from "./types/types";

export function buildResolve({
    paths,
}: BuildOptions): Configuration["resolve"] {
    return {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": paths.src,
        },
    };
}
