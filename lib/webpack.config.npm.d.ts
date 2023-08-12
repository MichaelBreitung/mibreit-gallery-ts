export const mode: string;
export const entry: string;
export namespace output {
    const path: string;
    const filename: string;
    const libraryTarget: string;
}
export namespace module {
    const rules: ({
        test: RegExp;
        use: string;
        exclude: RegExp;
    } | {
        test: RegExp;
        use: ({
            loader: string;
            options: {
                injectType: string;
                modules?: undefined;
            };
        } | {
            loader: string;
            options: {
                modules: {
                    localIdentName: string;
                };
                injectType?: undefined;
            };
        })[];
        exclude?: undefined;
    } | {
        test: RegExp;
        use: string;
        exclude?: undefined;
    })[];
}
export namespace resolve {
    const extensions: string[];
}
export namespace optimization {
    const minimize: boolean;
}
