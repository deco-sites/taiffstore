import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
  index: number
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class={`relative block overflow-y-hidden w-full cy-carousel-banner-item cy-carousel-banner-item-${index}`}
    >

      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={412}
          height={660}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1920}
          height={500}
        />
        <img
          class="w-full h-full max-h-[500px]"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Carousel({ images = [], preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-full",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6 cy-carousel-banner">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem image={image} index={index} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <div class="flex items-center justify-center z-10 col-start-1 row-start-2 ml-[18px]">
        <Slider.PrevButton
          class="btn bg-transparent border-none btn-sm"
          disabled={false}
        >
          <Icon id="chevronLeftWhite" width={15} height={33} />
        </Slider.PrevButton>
      </div>

      <div class="flex items-center justify-center z-10 col-start-3 row-start-2 mr-[18px]">
        <Slider.NextButton
          class="btn bg-transparent border-none btn-sm"
          disabled={false}
        >
          <Icon id="chevronRightWhite" width={15} height={33} />
        </Slider.NextButton>
      </div>

      <ul
        class={clx(
          "col-span-full row-start-5 z-10 mt-2",
          "carousel justify-center",
        )}
      >
        {images.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot
              index={index}
              class={clx(
                "bg-gray-2 h-1 w-[60px] no-animation rounded-full",
                "disabled:w-[60px] disabled:bg-base-100 disabled:opacity-100 transition-[width]",
              )}
            >
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default Carousel;
