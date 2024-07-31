import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "./ProductImageZoom.tsx";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 540;
const HEIGHT = 380;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const zoomId = `${id}-zoom`;

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
  } = props;

  return (
    <div class="justify-center flex max-w-[660px] flex-[1]">
      <div
        id={id}
        class="flex flex-row-reverse relative gap-[10px]"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-4 row-start-1 row-span-1 w-[580px]">
          <Slider class="carousel carousel-center sm:carousel-end  gap-3 slider-shelf-home full-phone:px-0 full-phone:gap-[18px] w-[580px]  ">
            {images?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item max-w-[580px] w-full full-phone:max-w-full",
                  "first:pl-5 first:sm:pl-0 full-phone:first:pl-0",
                  "last:pr-5 last:sm:pr-0 full-phone:last:pr-0",
                  `cy-special-product-shelf-item-${index}`
                )}
              >
                <Image
                  class="w-full px-5"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={product.url!}
                  alt={product.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>
        <div class="z-10 self-center left-[80px] hidden full-desktop:block absolute">
          <Slider.PrevButton class="hidden sm:flex disabled:hidden">
            <Icon id="leftArrowShelf" width={20} height={42} />
          </Slider.PrevButton>
        </div>

        <div class="z-10 self-center right-[0px] hidden full-desktop:block absolute">
          <Slider.NextButton class="hidden sm:flex disabled:hidden">
            <Icon id="rightArrowShelf" width={20} height={42} />
          </Slider.NextButton>
        </div>
        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <label class="btn btn-ghost hidden sm:inline-flex" for={zoomId}>
            <Icon id="pan_zoom" />
          </label>
        </div>
        {/* Dots */}
        <ul
          class={clx(
            "carousel carousel-center",
            "sm:carousel-vertical",
            "gap-1 px-4",
            "sm:gap-2 sm:px-0",
            "!max-h-[600px] w-[70px]"
          )}
          style={{ maxHeight: "600px" }}
        >
          {images.map((img, index) => (
            <li class="carousel-item">
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio: "71 / 62" }}
                  class="group-disabled:border-base-300 border rounded object-cover"
                  width={71}
                  height={62}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <Slider.JS rootId={id} />
      </div>
      <ProductImageZoom
        id={zoomId}
        images={images}
        width={700}
        height={Math.trunc(700 * HEIGHT / WIDTH)}
      />
    </div>
  );
}
