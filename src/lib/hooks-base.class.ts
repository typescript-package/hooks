// Abstract.
import { HooksCore } from "./hooks-core.abstract";
// Type.
import { OnChangeCallback, OnDestroyCallback, OnSetCallback } from "@typedly/callback";

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

  #onChange?: OnChangeCallback<T, Payload>;
  #onDestroy?: OnDestroyCallback<Payload>;
  #onSet?: OnSetCallback<T, Payload>;

  constructor({
    onChange, onDestroy, onSet
  }: {
    onChange?: (value: T, oldValue: T) => void;
    onDestroy?: () => void;
    onSet?: (value: T) => T
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
}
