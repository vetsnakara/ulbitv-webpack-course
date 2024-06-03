import type { Configuration } from "webpack";
import type { BuildOptions } from "./types/types";

export function buildResolve(options: BuildOptions): Configuration["resolve"] {
    return {
        extensions: [".tsx", ".ts", ".js"],
    };
}
