import { useScript } from "apps/utils/useScript.ts";
import { type JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";

const onClick = (delta: number) => {
  // doidera!
  event!.stopPropagation();
  const button = event!.currentTarget as HTMLButtonElement;
  const input = button.parentElement
    ?.querySelector<HTMLInputElement>('input[type="number"]')!;
  const min = Number(input.min) || -Infinity;
  const max = Number(input.max) || Infinity;
  input.value = `${Math.min(Math.max(input.valueAsNumber + delta, min), max)}`;
  input.dispatchEvent(new Event("change", { bubbles: true }));
};

function QuantitySelector(
  { id = useId(), disabled, ...props }: JSX.IntrinsicElements["input"],
) {
  return (
    <div class="join w-full gap-5">
      <button
        type="button"
        class="p-0 text-big font-bold"
        hx-on:click={useScript(onClick, -1)}
        disabled={disabled}
      >
        <Icon id="minusSign" width={15} height={3} />
      </button>
      <div data-tip={`Quantity must be between ${props.min} and ${props.max}`} class="join-item flex justify-center items-center has-[:invalid]:tooltip has-[:invalid]:tooltip-error has-[:invalid]:tooltip-open has-[:invalid]:tooltip-bottom w-5" >
        <input
          id={id}
          class="input text-center [appearance:textfield] invalid:input-error grow-0 p-0 h-auto w-5  text-big font-bold leading-[18.96px]"
          disabled={disabled}
          inputMode="numeric"
          type="number"
          {...props}
        />
      </div>
      <button
        type="button"
        class="p-0"
        hx-on:click={useScript(onClick, 1)}
        disabled={disabled}
      >
        <Icon id="plusSign" width={15} height={15} />
      </button>
    </div>
  );
}

export default QuantitySelector;
