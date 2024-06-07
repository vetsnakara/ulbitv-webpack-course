interface BuildPaths {
    src: string;
    entry: string;
    html: string;
    output: string;
}

type BuildMode = "production" | "development";

export type BuildPlatform = "modile" | "desktop";

export interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    analyze?: boolean;
    platform?: BuildPlatform;
}

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    isDev: boolean;
    isProd: boolean;
    analyze: boolean;
    platform: BuildPlatform;
}
