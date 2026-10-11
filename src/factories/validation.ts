export function assertSelector(value: unknown, factoryName: string, parameterName: string): string {
  if (typeof value !== 'string') {
    throw new Error(`${factoryName} - ${parameterName} must be a selector string`);
  }
  return value;
}

export function assertSelectorPair(
  values: [unknown, unknown],
  factoryName: string,
  parameterNames: [string, string]
): [string, string] {
  return [
    assertSelector(values[0], factoryName, parameterNames[0]),
    assertSelector(values[1], factoryName, parameterNames[1]),
  ];
}

export function assertCallback<T extends (...args: never[]) => unknown>(value: unknown, factoryName: string, parameterName: string): T {
  if (typeof value !== 'function') {
    throw new Error(`${factoryName} - ${parameterName} must be a function`);
  }
  return value as T;
}
