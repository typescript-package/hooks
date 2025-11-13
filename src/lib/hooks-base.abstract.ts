// Abstract.
import { HooksCore } from "./hooks-core.abstract";
// Type.
import { OnChangeCallback, OnDestroyCallback, OnSetCallback } from "@typedly/callback";
/**
 * @description Base abstraction class for hooks functionality.
 * @export
 * @abstract
 * @class HooksBase
 * @template T The type of the target.
 * @template [Payload=unknown] The type of the payload.
 * @extends {HooksCore<T, Payload>}
 */
export abstract class HooksBase<T, Payload = unknown> extends HooksCore<T, Payload> {
  protected get onChangeCallback(): OnChangeCallback<T, Payload> | undefined {
    return this.#onChange;
  }
  protected get onDestroyCallback(): OnDestroyCallback<Payload> | undefined {
    return this.#onDestroy;
  }
  protected get onSetCallback(): (OnSetCallback<T, Payload> | undefined) {
    return this.#onSet;
  }

  /**
   * @description Private `onChange` callback function.
   * @type {?OnChangeCallback<T, Payload>}
   */
  #onChange?: OnChangeCallback<T, Payload>;

  /**
   * @description Private `onDestroy` callback function.
   * @type {?OnDestroyCallback<Payload>}
   */
  #onDestroy?: OnDestroyCallback<Payload>;

  /**
   * @description Private `onSet` callback function.
   * @type {?OnSetCallback<T, Payload>}
   */
  #onSet?: OnSetCallback<T, Payload>;

  
  /**
   * Creates an instance of `HooksBase`.
   * @constructor
   * @param {{
   *     onChange?: OnChangeCallback<T, Payload>;
   *     onDestroy?: OnDestroyCallback<Payload>;
   *     onSet?: OnSetCallback<T, Payload>
   *   }} [param0={}] 
   * @param {OnChangeCallback<T, Payload>} param0.onChange Sets the `onChange` callback function.
   * @param {OnDestroyCallback<Payload>} param0.onDestroy Sets the `onDestroy` callback function.
   * @param {OnSetCallback<T, Payload>} param0.onSet Sets the `onSet` callback function.
   */
  constructor({
    onChange, onDestroy, onSet
  }: {
    onChange?: OnChangeCallback<T, Payload>;
    onDestroy?: OnDestroyCallback<Payload>;
    onSet?: OnSetCallback<T, Payload>
  } = {}) {
    super();
    this.#onChange = onChange;
    this.#onDestroy = onDestroy;
    this.#onSet = onSet;
  }
  public onChange(callbackfn?: OnChangeCallback<T, Payload>): this {
    return this.#onChange = callbackfn, this;
  }
  public onDestroy(callbackfn?: OnDestroyCallback<Payload>): this {
    return this.#onDestroy = callbackfn, this;
  }
  public onSet(callbackfn?: OnSetCallback<T, Payload>): this {
    return this.#onSet = callbackfn, this;
  }
  protected triggerOnChange(newValue: T, previousValue: T, payload?: Payload): void {
    this.onChangeCallback?.(newValue, previousValue, payload);
  }
  protected triggerOnDestroy(payload?: Payload): void {
    this.onDestroyCallback?.(payload);
  }
  protected triggerOnSet(value: T, previousValue?: T, payload?: Payload): T {
    return this.onSetCallback ? this.onSetCallback(value, previousValue, payload) : value;
  }
}
