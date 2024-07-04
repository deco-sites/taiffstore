import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useScript } from "apps/utils/useScript.ts";
import Icon from "../ui/Icon.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};

export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}

const QUANTITY_MAX_VALUE = 100;

const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)
    ?.closest("fieldset")
    ?.getAttribute("data-item-id");

  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};

function CartItem({ item, index, locale, currency }: Props) {
  const { image, listPrice, price = Infinity, quantity } = item;
  const isGift = price < 0.01;

  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;

  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class=""
    >
      <div class="flex px-4 py-5 gap-5">
        <div class="flex items-center w-[70px]">
          <Image
            alt={name}
            src={image}
            style={{ aspectRatio: "70 / 70" }}
            width={71}
            height={70}
            class="h-[70px] w-[70px] object-cover "
          />
        </div>
        <div class="flex flex-col">
          <div class="text-[13px] font-normal leading-[16.25px] text-black">
            <legend>{name}</legend>
          </div>
          <div class="flex flex-row items-center gap-10">
            <div>
              <QuantitySelector
                min={0}
                max={QUANTITY_MAX_VALUE}
                value={quantity}
                name={`item::${index}`}
              />
            </div>
            <div class="flex flex-col">
              <div>
                <span class="line-through text-small font-normal leading-[15px] text-gray-5">
                  {formatPrice(listPrice, currency, locale)}
                </span>
              </div>
              <div>
                <span class="text-big font-bold leading-5 text-black">
                  {isGift ? "Grátis" : formatPrice(price, currency, locale)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center w-5">
          <button
            class={clx(
              isGift && "hidden",
            "btn btn-ghost btn-square no-animation w-5",
            )}
            hx-on:click={useScript(removeItemHandler)}
            >
            <Icon id="trash" size={24} />
          </button>
        </div>
      </div>
    </fieldset>
  );
}

export default CartItem;
