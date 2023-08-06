import TerserPlugin = require("terser-webpack-plugin");
import CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
export const mode: string;
export const entry: string;
export namespace output {
    const path: string;
    const filename: string;
    const library: string;
    const libraryTarget: string;
}
export namespace module {
    const rules: ({
        test: RegExp;
        use: string;
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
    })[];
}
export namespace resolve {
    const extensions: string[];
}
export namespace optimization {
    const minimize: boolean;
    const usedExports: boolean;
    const minimizer: (TerserPlugin<import("terser").MinifyOptions> | CssMinimizerPlugin<CssMinimizerPlugin.CssNanoOptionsExtended>)[];
}
