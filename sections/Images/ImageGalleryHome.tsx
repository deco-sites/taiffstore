import { type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";


import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";

/**
 * @titleBy alt
 */
interface BannerMobile {
  mobile: ImageWidget;
  /** @description Image alt texts */
  alt: string;

  /** @description Adicione um link */
  href: string;
}

interface Props extends SectionHeaderProps {
  /**
   * @maxItems 4
   * @minItems 4
  */
  images?: BannerMobile[];

  desktopBanner1: ImageWidget;
  hrefBanner1: string;

  desktopBanner2: ImageWidget;
  hrefBanner2: string;

  desktopBanner3: ImageWidget;
  hrefBanner3: string;

  desktopBanner4: ImageWidget;
  hrefBanner4: string;

  interval?: number;
}



export default function Gallery({
  title,
  desktopBanner1 = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
  hrefBanner1 = "/",
  desktopBanner2 = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
  hrefBanner2 = "/",
  desktopBanner3 = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
  hrefBanner3 = "/",
  desktopBanner4 = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/b531631b-8523-4feb-ac37-5112873abad2",
  hrefBanner4 = "/",
  interval,
  images
}: Props) {
  const id = useId();

  const _mobileSlider = (
    <div
      id={id}
      class={clx(
        "full-phone:grid hidden",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-full",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6">
          {images?.map((image, index) => (
            <Slider.Item index={index} class={`carousel-item w-full justify-center cy-categories-home-item-${index}`}>
              <a href={image.href}>
                <img src={image.mobile} alt={image.alt} />
              </a>
            </Slider.Item>
          ))}
        </Slider>
        <ul
          class={clx(
            "col-span-full row-start-5 z-10 mt-2 w-full",
            "carousel justify-center",
          )}
        >
          {images.map((_, index) => (
            <li class={`carousel-item cy-categories-home-item-${index}`}>
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-white-1 h-1 w-[60px] no-animation rounded-full",
                  "disabled:w-[60px] disabled:bg-gray-2 disabled:opacity-100 transition-[width]",
                )}
              >
              </Slider.Dot>
            </li>
          ))}
        </ul>
        <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </div>
  );
  const _deskMosaic = (
    <div class="full-phone:hidden flex gap-[14px] justify-center full-tablet:gap-2 ">
      <div class="flex flex-col gap-[14px] flex-1 max-w-[675px] full-tablet:gap-2">
        <div>
          <a href={hrefBanner1} class="overflow-hidden">
            <Picture>

              <Source
                width={675}
                height={250}
                media="(min-width: 768px)"
                src={desktopBanner1}
              />
              <img
                width={675}
                height={250}
                class="w-full h-[250px] object-fill full-tablet:h-auto"
                src={desktopBanner1}
                alt={' '}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        </div>
        <div>
          <a href={hrefBanner3} class="overflow-hidden">
            <Picture>

              <Source
                width={675}
                height={280}
                media="(min-width: 768px)"
                src={desktopBanner3}
              />
              <img
                width={675}
                height={280}
                class="w-full h-[280px] object-fill full-tablet:h-auto"
                src={desktopBanner3}
                alt={' '}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        </div>
      </div>
      <div class="flex flex-col gap-[14px] flex-1 max-w-[675px] full-tablet:gap-2">
        <div>
          <a href={hrefBanner2} class="overflow-hidden">
            <Picture>

              <Source
                width={675}
                height={280}
                media="(min-width: 768px)"
                src={desktopBanner2}
              />
              <img
                width={675}
                height={280}
                class="w-full h-[280px] object-fill full-tablet:h-auto"
                src={desktopBanner2}
                alt={' '}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        </div>
        <div>
          <a href={hrefBanner4} class="overflow-hidden">
            <Picture>

              <Source
                width={675}
                height={250}
                media="(min-width: 768px)"
                src={desktopBanner4}
              />
              <img
                width={675}
                height={250}
                class="w-full h-[250px] object-fill  full-tablet:h-auto"
                src={desktopBanner4}
                alt={' '}
                decoding="async"
                loading="lazy"
              />
            </Picture>
          </a>
        </div>
      </div>
    </div>
  )


  return (
    <Section.Container class="cy-categories-home">
      <Section.Header title={title} />
      {_mobileSlider}
      {_deskMosaic}
    </Section.Container>
  );
}
