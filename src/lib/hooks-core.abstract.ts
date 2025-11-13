// Type.
import { OnChangeCallback, OnDestroyCallback, OnSetCallback } from "@typedly/callback";
// Interface.
import { Hooks } from "@typedly/hooks";
/**
 * @description The core abstraction class for hooks functionality.
 * @export
 * @abstract
 * @class HooksCore
 * @template T The type of the target.
 * @template [Payload=unknown] 
 * @implements {Hooks<T, Payload>}
 */
export abstract class HooksCore<T, Payload = unknown> implements Hooks<T, Payload> {
  /**
   * @description Returns the `onChange` callback function.
   * @protected
   * @abstract
   * @readonly
   * @type {(OnChangeCallback<T, Payload> | undefined)}
   */
  protected abstract get onChangeCallback(): OnChangeCallback<T, Payload> | undefined;
  
  /**
   * @description Returns the `onDestroy` callback function.
   * @protected
   * @abstract
   * @readonly
   * @type {(OnDestroyCallback<Payload> | undefined)}
   */
  protected abstract get onDestroyCallback(): OnDestroyCallback<Payload> | undefined;

  /**
   * @description Returns the `onSet` callback function.
   * @protected
   * @abstract
   * @readonly
   * @type {(OnSetCallback<T, Payload> | undefined)}
   */
  protected abstract get onSetCallback(): OnSetCallback<T, Payload> | undefined;

  /**
   * @description Sets the `onChange` callback function.
   * @public
   * @abstract
   * @param {?OnChangeCallback<T, Payload>} [callbackfn] The callback `onChange` function to set.
   * @returns {this} The `this` current instance for chaining.
   */
  public abstract onChange(callbackfn?: OnChangeCallback<T, Payload>): this;

  /**
   * @description Sets the `onDestroy` callback function.
   * @public
   * @abstract
   * @param {?OnDestroyCallback<Payload>} [callbackfn] The callback `onDestroy` function to set.
   * @returns {this} The `this` current instance for chaining.
   */
  public abstract onDestroy(callbackfn?: OnDestroyCallback<Payload>): this;

  /**
   * @description Sets the `onSet` callback function.
   * @public
   * @abstract
   * @param {?OnSetCallback<T, Payload>} [callbackfn] The callback `onSet` function to set.
   * @returns {this} The `this` current instance for chaining.
   */
  public abstract onSet(callbackfn?: OnSetCallback<T, Payload>): this;

  /**
   * @description Triggers the `onChange` callback.
   * @protected
   * @abstract
   * @param {T} newValue The new value.
   * @param {T} previousValue The previous value.
   * @param {Payload} [payload] Optional payload.
   */
  protected abstract triggerOnChange(newValue: T, previousValue: T, payload?: Payload): void;

  /**
   * @description Triggers the `onDestroy` callback.
   * @protected
   * @abstract
   * @param {Payload} [payload] Optional payload.
   */
  protected abstract triggerOnDestroy(payload?: Payload): void;

  /**
   * @description Triggers the `onSet` callback.
   * @protected
   * @abstract
   * @param {T} value The new value.
   * @param {T} [previousValue] Optional previous value.
   * @param {Payload} [payload] Optional payload.
   * @returns {T} The potentially modified value.
   */
  protected abstract triggerOnSet(value: T, previousValue?: T, payload?: Payload): T;
}
