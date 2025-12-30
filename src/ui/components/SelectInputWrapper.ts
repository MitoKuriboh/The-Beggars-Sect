import SelectInput from "ink-select-input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ink-select-input has conflicting CJS/ESM exports
export const SelectInputComponent = (SelectInput as any).default || SelectInput;
