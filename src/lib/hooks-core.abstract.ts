// Type.
import { OnChangeCallback, OnDestroyCallback, OnSetCallback } from "@typedly/callback";
// Interface.
import { Hooks } from "@typedly/hooks";
/**
 * @description
 * @export
 * @abstract
 * @class HooksCore
 * @template T 
 * @template [Payload=unknown] 
 * @implements {Hooks<T, Payload>}
 */
export abstract class HooksCore<T, Payload = unknown> implements Hooks<T, Payload> {
  protected abstract get onChangeCallback(): OnChangeCallback<T, Payload> | undefined;
  protected abstract get onDestroyCallback(): OnDestroyCallback<Payload> | undefined;
  protected abstract get onSetCallback(): OnSetCallback<T, Payload> | undefined;
  public abstract onChange(callbackfn?: OnChangeCallback<T, Payload>): this;
  public abstract onDestroy(callbackfn?: OnDestroyCallback<Payload>): this;
  public abstract onSet(callbackfn?: OnSetCallback<T, Payload>): this;
}
