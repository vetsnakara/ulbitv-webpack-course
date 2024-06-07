import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({ isDev, isProd }: BuildOptions) {
    const plugins = [];

    if (isDev) {
        plugins.push(require.resolve("react-refresh/babel"));
    }

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ["data-testid"],
            },
        ]);
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-react",
                        {
                            runtime: "automatic",
                        },
                    ],
                ],
                plugins,
            },
        },
    };
}
