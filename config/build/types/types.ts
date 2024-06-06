interface BuildPaths {
    src: string;
    entry: string;
    html: string;
    output: string;
}

type BuildMode = "production" | "development";

export interface EnvVariables {
    mode: BuildMode;
    port: number;
    analyze?: boolean;
}

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    isDev: boolean;
    isProd: boolean;
    analyze?: boolean;
}
