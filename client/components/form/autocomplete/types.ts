export type Option = string;
type OptionItem = { label: string; value: any };

export type RenderOptionFn = (option: Option) => React.ReactNode;
