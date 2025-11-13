// Abstract.
import { HooksBase } from "./hooks-base.abstract";
// Type.
import { OnChangeCallback, OnDestroyCallback, OnPropertyChangeCallback, OnSetCallback, OnSetPropertyCallback } from "@typedly/callback";
/**
 * @description The base abstraction class for object hooks functionality.
 * @export
 * @abstract
 * @class ObjectHooksBase
 * @template {object} T The object type.
 * @template [Payload=unknown] The payload type.
 * @extends {HooksBase<T, Payload>}
 */
export abstract class ObjectHooksBase<T extends object, Payload = unknown>
  extends HooksBase<T, Payload> {
  /**
   * @description Returns the `onPropertyChange` callback function.
   * @protected
   * @readonly
   * @type {OnPropertyChangeCallback<T, Payload>}
   */
  protected get onPropertyChangeCallback() {
    return this.#onPropertyChange;
  }

  /**
   * @description Returns the `onSetProperty` callback function.
   * @protected
   * @readonly
   * @type {OnSetPropertyCallback<T, Payload>}
   */
  protected get onSetPropertyCallback() {
    return this.#onSetProperty;
  }

  /**
   * @description The callback function to be invoked on property change.
   * @type {?OnPropertyChangeCallback<T, Payload>}
   */
  #onPropertyChange?: OnPropertyChangeCallback<T, Payload>;

  /**
   * @description The callback function to be invoked on set property.
   * @type {?OnSetPropertyCallback<T, Payload>}
   */
  #onSetProperty?: OnSetPropertyCallback<T, Payload>;

  /**
   * Creates an instance of `ObjectHooksBase`.
   * @constructor
   * @param {{
   *     onChange?: OnChangeCallback<T, Payload>;
   *     onDestroy?: OnDestroyCallback<Payload>;
   *     onPropertyChange?: OnPropertyChangeCallback<T, Payload>;
   *     onSet?: OnSetCallback<T, Payload>;
   *     onSetProperty?: OnSetPropertyCallback<T, Payload>;
   *   }} param0 
   * @param {OnChangeCallback<T, Payload>} param0.onChange The callback function to be invoked on change.
   * @param {OnDestroyCallback<Payload>} param0.onDestroy The callback function to be invoked on destroy.
   * @param {OnPropertyChangeCallback<T, Payload>} param0.onPropertyChange The callback function to be invoked on property change.
   * @param {OnSetCallback<T, Payload>} param0.onSet The callback function to be invoked on set.
   * @param {OnSetPropertyCallback<T, Payload>} param0.onSetProperty The callback function to be invoked on set property.
   */
  constructor({
    onChange,
    onDestroy,
    onPropertyChange,
    onSet,
    onSetProperty
  }: {
    onChange?: OnChangeCallback<T, Payload>;
    onDestroy?: OnDestroyCallback<Payload>;
    onPropertyChange?: OnPropertyChangeCallback<T, Payload>;
    onSet?: OnSetCallback<T, Payload>;
    onSetProperty?: OnSetPropertyCallback<T, Payload>;
  }) {
    super({ onChange, onDestroy, onSet });
    this.#onPropertyChange = onPropertyChange;
    this.#onSetProperty = onSetProperty;
  }

  /**
   * @description Sets the `onPropertyChange` callback function.
   * @public
   * @param {?OnPropertyChangeCallback<T, Payload>} [callbackfn] The callback function to be invoked on property change.
   * @returns {this} The `this` instance for chaining.
   */
  public onPropertyChange(callbackfn?: OnPropertyChangeCallback<T, Payload>): this {
    return this.#onPropertyChange = callbackfn, this;
  }

  /**
   * @description  Sets the `onSetProperty` callback function.
   * @public
   * @param {?OnSetPropertyCallback<T, Payload>} [callbackfn] The callback function to be invoked on set property.
   * @returns {this} The `this` instance for chaining.
   */
  public onSetProperty(callbackfn?: OnSetPropertyCallback<T, Payload>): this {
    return this.#onSetProperty = callbackfn, this;
  }

  /**
   * @description Triggers the `onPropertyChange` callback if set.
   * @protected
   * @param {K} key The property key.
   * @param {T[K]} value The new value.
   * @param {T[K]} previousValue The previous value.
   * @param {Payload} [payload] Optional payload.
   */
  protected triggerOnPropertyChange<K extends keyof T>(key: K, value: T[K], previousValue: T[K], payload?: Payload): void {
    this.onPropertyChangeCallback?.(key, value, previousValue, payload);
  }

  /**
   * @description Triggers the `onSetProperty` callback if set.
   * @protected
   * @param {K} key The property key.
   * @param {T[K]} value The new value.
   * @param {T[K]} previousValue The previous value.
   * @param {Payload} [payload] Optional payload.
   * @returns {T[K]} The potentially modified value from the callback.
   */
  protected triggerOnSetProperty<K extends keyof T>(key: K, value: T[K], previousValue: T[K], payload?: Payload): T[K] {
    return this.onSetPropertyCallback ? this.onSetPropertyCallback(key, value, previousValue, payload) : value;
  }
}
