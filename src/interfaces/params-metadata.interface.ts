export interface ParamMetadata {
    index: number | string;
    field: string;
    value?: any;
}

export declare type ParamsMetadata = Record<string, ParamMetadata>;
