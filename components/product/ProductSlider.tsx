import { Product } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";
import { useId } from "../../sdk/useId.ts";

interface Props {
  products: Product[];
  itemListName?: string;
}


function ProductSlider({ products, itemListName }: Props) {

  const id = useId();

  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1 relative"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-4 row-start-1 row-span-1">
          <Slider class="carousel carousel-center sm:carousel-end w-full gap-3 slider-shelf-home full-phone:px-[18px]">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item max-w-[290px] border border-gray-12 border-solid ",
                  "first:pl-5 first:sm:pl-0",
                  "last:pr-5 last:sm:pr-0",
                  `cy-product-shelf-item-${index}`
                )}
              >
                <ProductCard
                  index={index}
                  product={product}
                  itemListName={itemListName}
                  class="w-[290px] p-2.5"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center absolute left-[-45px] hidden full-desktop:block">
          <Slider.PrevButton class="hidden sm:flex disabled:hidden">
            <Icon id="leftArrowShelf" width={20} height={42} />
          </Slider.PrevButton>
        </div>

        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center absolute right-[-45px] hidden full-desktop:block">
          <Slider.NextButton class="hidden sm:flex disabled:hidden">
            <Icon id="rightArrowShelf" width={20} height={42} />
          </Slider.NextButton>
        </div>
        <ul
          class={clx(
            "col-span-full row-start-5 z-10 mt-5 w-full",
            "carousel justify-center ",
            "full-phone:mt-6 full-phone:mb-0"
          )}
        >

          {products.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-[#E6E6E6] h-1 w-[30px] -mr-[2px] no-animation rounded-none",
                  "disabled:w-[30px] disabled:bg-[#515151] disabled:opacity-100 transition-[width] disabled:rounded full-phone:w-[15px]",
                )}
              >
              </Slider.Dot>
            </li>
          ))}
        </ul>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}

export default ProductSlider;
