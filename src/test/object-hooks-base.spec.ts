/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectHooksBase } from '../lib';

class ReactiveObject<T extends object> extends ObjectHooksBase<T> {
  private data: T;

  constructor(initial: T, options?: ConstructorParameters<typeof ObjectHooksBase<T>>[0]) {
    super(options || {});
    this.data = new Proxy(initial, {
      set: (target, key, value) => {
        if (typeof key === 'string' || typeof key === 'symbol') {
          const oldValue = (target as any)[key];
          (target as any)[key] = this.triggerOnSetProperty(key as keyof T, value, oldValue);
          this.triggerOnPropertyChange(key as keyof T, value, oldValue);
          this.triggerOnChange(target as T, this.data);
        }
        return true;
      },
    });
  }

  get value(): T {
    return this.data;
  }
}

// Usage
const obj = new ReactiveObject({ count: 0 });
obj.onPropertyChange((key, value, oldValue) => {
  console.log(`${key} changed from ${oldValue} to ${value}`);
});

obj.value.count = 1; // Triggers onPropertyChange and onChange
