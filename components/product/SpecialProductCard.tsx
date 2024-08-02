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

const WIDTH = 415;
const HEIGHT = 400;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function SpecialProductCard({
	product,
	preload,
	itemListName,
	index,
	class: _class,
}: Props) {
	const id = useId();

	const { url, image: images, offers, isVariantOf, description } = product;
	const hasVariant = isVariantOf?.hasVariant ?? [];
	const title = isVariantOf?.name ?? product.name;
	const [front] = images ?? [];
	const { listPrice, price, seller = "1", availability } = useOffer(offers);
	const inStock = availability === "https://schema.org/InStock";
	const possibilities = useVariantPossibilities(hasVariant, product);
	const firstSkuVariations = Object.entries(possibilities)[0];
	const variants = Object.entries(firstSkuVariations[1] ?? {});
	const relativeUrl = relative(url);
	const percent = listPrice && price
		? Math.round(((listPrice - price) / listPrice) * 100)
		: 0;
	const item = mapProductToAnalyticsItem({ product, price, listPrice, index });
	const descShelf = product.isVariantOf.additionalProperty.find(item => item.name === "Descrição Shelf")?.value


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
					"relative w-full max-w-[415px]"
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
			</figure>
			<div class="w-full max-w-[371px] flex flex-col gap-5 full-phone:relative">
				<a href={relativeUrl} class="flex flex-col gap-5 full-phone:px-[18px]">
					<span class="text-[20px] font-semibold leading-[25px] text-black-4 full-phone:text-[20px] full-phone:font-medium full-phone:leading-[25px] full-phone:text-left
">
						{title}
					</span>
					<div class="text-[26px] font-semibold leading-[32.5px] text-left text-black-4 full-phone:text-base full-phone:font-semibold full-phone:leading-[17.5px]">
						{descShelf}
					</div>
					<div class="description-special-shelf text-black-4 full-phone:text-base full-phone:font-normal full-phone:leading-[17.5px]">
						{description}
					</div>
					<div class="flex flex-col gap-1">
						{/* {listPrice < price && ( */}
						{listPrice && (
							<div>
								<span class="line-through text-base font-normal leading-[17.5px] text-left text-gray-13">
									{formatPrice(listPrice, offers?.priceCurrency)}
								</span>
							</div>
						)}
						<div class="flex gap-1.5 items-baseline">
							<span class="text-[24px] font-bold leading-[30px] text-left text-black">
								{formatPrice(price, offers?.priceCurrency)}
							</span>
							<span class=" bg-black px-[6px] py-[3px] rounded-[5px] text-small font-medium leading-[14.52px] text-center text-white">
								{listPrice && price
									? `- ${Math.round(((listPrice - price) / listPrice) * 100)}% `
									: ""
								}
							</span>
						</div>
					</div>
				</a>
				<div class="max-w-fit full-phone:absolute full-phone:bottom-0 full-phone:right-[18px]">
					<a
						href={relativeUrl}
						class={clx(
							"text-[16px] font-normal leading-[20px] text-center text-black-4",
							"m-0  flex justify-center px-5 py-2.5 border border-solid border-black-4",
							"full-phone:bg-black full-phone:text-white full-phone:py-[14px] full-phone:px-[44px] full-phone:rounded-[5px] full-phone:border-none"
						)}
					>
						{
							inStock ? (<span>Comprar </span>) : (<span>Indisponível</span>)
						}
					</a>
				</div>
			</div>
		</div>
	);
}

export default SpecialProductCard;
