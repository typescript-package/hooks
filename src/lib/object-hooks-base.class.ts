import { OnChangeCallback, OnDestroyCallback, OnPropertyChangeCallback, OnSetCallback, OnSetPropertyCallback } from "@typedly/callback";
import { HooksBase } from "./hooks-base.class";



export abstract class ObjectHooksBase<T extends object, Payload = unknown> extends HooksBase<T, Payload> {
  protected get onPropertyChangeCallback() {
    return this.#onPropertyChange;
  }

  protected get onSetPropertyCallback() {
    return this.#onSetProperty;
  }

  #onPropertyChange?: OnPropertyChangeCallback<T, Payload>;
  #onSetProperty?: OnSetPropertyCallback<T, Payload>;

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

  public onPropertyChange(callbackfn?: OnPropertyChangeCallback<T, Payload>): this {
    this.#onPropertyChange = callbackfn;
    return this;
  }

  public onSetProperty(callbackfn?: OnSetPropertyCallback<T, Payload>): this {
    this.#onSetProperty = callbackfn;
    return this;
  }
}
