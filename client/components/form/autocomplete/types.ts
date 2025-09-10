export type Option = string;
// export type OptionItem<TObj extends { value: string } = { value: string }> = TObj;

export type RenderOptionFn = (option: Option) => React.ReactNode;
