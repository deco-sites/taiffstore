import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";
import { useId } from "../../sdk/useId.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 270;
const HEIGHT = 200;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const id = useId();

  const { url, image: images, offers, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const [front] = images ?? [];
  const { listPrice, price, seller = "1", availability, installments } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  const firstSkuVariations = Object.entries(possibilities)[0];
  const variants = Object.entries(firstSkuVariations[1] ?? {});
  const relativeUrl = relative(url);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;
  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });
  const potencia = product.isVariantOf.additionalProperty.find(item => item.name === "Potência")?.value

  {/* Add click event to dataLayer */ }
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });
  return (
    <div
      {...event}
      class={clx("card card-compact group text-sm", _class)}
    >
      <figure
        class={clx(
          "relative"
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0 bg-white",
            "grid grid-cols-1 grid-rows-1",
            "w-full",
            !inStock && "opacity-70",
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-contain",
              "rounded w-full",
              "col-span-full row-span-full",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />

        </a>

        {/* Wishlist button */}
        <div class="absolute top-0 left-0 w-full flex items-center justify-between">

          {/* Discounts */}
          <span
            class={clx(
              "text-sm/4 font-normal text-black bg-primary bg-opacity-15 text-center rounded-badge px-2 py-1",
              (percent < 1 || !inStock) && "opacity-0",
            )}
          >
            {percent} % off
          </span>
        </div>

        <div class="absolute -top-2.5 right-[5px]">
          <WishlistButton item={item} variant="icon" />
        </div>
      </figure>
      <div class="specifications-cy px-[5px]">
        {
          potencia && (

            <div class={clx(
              "border border-gray-14 border-solid rounded-[3px] px-3 py-[5px]",
              "text-[13px] font-medium leading-[16.25px] text-center text-black"
            )}>
              {potencia}
            </div>

          )
        }
      </div>
      <a href={relativeUrl} class="px-[5px]">
        <div class="text-[15px] font-medium leading-[18.75px] text-left h-[45px]">
          {title}
        </div>

        <div class="flex flex-col pt-3 gap-1 min-h-[78px]">
          {/* {listPrice < price && ( */}
          {listPrice && (
            <span class="line-through text-[13px] font-normal leading-[13px] text-left text-gray-13">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="text-[24px] font-bold leading-[30px] text-left text-black-3">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {installments && (
            <span class="text-small font-medium leading-[15px] text-left text-gray-13">
              ou em {installments}
            </span>
          )
          }
        </div>
      </a>

      {/* SKU Selector, comentado para possível uso futuro*/}
      {/* {variants.length > 1 && (
        <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1">
          {variants.map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link} class="cursor-pointer">
                  <input
                    class="hidden peer"
                    type="radio"
                    name={`${id}-${firstSkuVariations[0]}`}
                    checked={link === relativeUrl}
                  />
                  <Ring value={value} checked={link === relativeUrl} />
                </a>
              </li>
            ))}
        </ul>
      )} */}

      <div class="px-[5px]">
        <a
          href={relativeUrl}
          class={clx(
            "text-big font-medium leading-[20px] text-center text-white",
            "bg-blue-1 m-0 w-full flex justify-center rounded-[5px] mt-2.5 py-2.5"
          )}
        >
          {
            inStock ? (<span>Comprar </span>) : (<span>Indisponível</span>)
          }
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
