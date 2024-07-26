import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";

export interface CardProps {
  label?: string;
  description?: string;
  image?: ImageWidget;
  link?: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  /**
 * @title Ícone de play p/ link do youtube?
  */
  linkVideo?: boolean;
  /**
   * @maxItems 4
  */
  cards?: CardProps[];
  linkCta?: string;
  textCta?: string;
  interval?: number;
}

export default function Cards({
  title = "Crie novos estilos",
  subtitle = "Descubra o potencial máximo da inovação Taiff! Explore novas possibilidades com nossas ferramentas de estilo, mergulhando na tecnologia de ponta que redefine a beleza do seu cabelo.",
  cards = [
    {
      label: "Coque baixo cacheado  | Tutorial",
      description:
        "O embaixador Taiff, @ojoaquim, ensina um penteado perfeito para noivas de cabelos cacheados, usando o modelador Curves de 19mm",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3290/488e5dc5-9a24-48c9-9795-09b97394fb5f",
      link: "/"
    }
  ],
  linkVideo,
  linkCta = "/",
  textCta = "Veja todos os estilos",
  interval
}: Props) {

  const id = useId();

  const _deskAndTablet = (
    <div class="full-phone:hidden full-tablet:block full-desktop:block lg-tablet:px-24 sm-tablet:px-8 my-5">
      <div class="flex justify-center gap-[30px]">
        {cards?.map((card, index) => (
          <div class={`flex flex-col max-w-[340px]  cy-textWithImage-desktop-item-${index}`}>
            <a href={card.link} class="relative">
              {
                linkVideo && (
                  <div class="yt-play"></div>
                )
              }
              <img src={card.image} alt="" srcset="" />
            </a>
            <div class="flex flex-col">
              <div class="text-large font-medium leading-[25px] text-left px-[0] py-[10px]  full-tablet:text-[15px] full-tablet:leading-[18.75px]">
                {card.label}
              </div>
              <div class="text-base font-normal leading-[17.5px] text-left ">
                {card.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

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
          {cards?.map((card, index) => (
            <Slider.Item index={index} class={`carousel-item w-full justify-center flex-col px-4 max-w-fit full-phone:items-center cy-textWithImage-item cy-textWithImage-item-${index}`}>
              <a href={card.href}>
                <img src={card.image} alt={card.label} />
              </a>
              <div class="flex flex-col">
                <div class="text-large font-medium leading-[25px] text-left px-[0] py-[10px]  full-tablet:text-[15px] full-tablet:leading-[18.75px]">
                  {card.label}
                </div>
                <div class="text-base font-normal leading-[17.5px] text-left ">
                  {card.description}
                </div>
              </div>
            </Slider.Item>
          ))}
        </Slider>
        <ul
          class={clx(
            "col-span-full row-start-5 z-10 mt-2 w-full",
            "carousel justify-center ",
            "full-phone:mt-6 full-phone:mb-5"
          )}
        >
          {cards.map((_, index) => (
            <li class="carousel-item">
              <Slider.Dot
                index={index}
                class={clx(
                  "bg-white-1 h-1 w-[60px] no-animation rounded-full",
                  "[60px] disabled:bg-gray-2 disabled:opacity-100 transition-[width]",
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
  return (
    <div class="cy-textWithImage">
      <div class=" max-w-[720px] mx-auto my-0 flex flex-col full-tablet:gap-2.5 full-phone:gap-2.5 full-phone:mb-4 full-phone:px-4">
        <div class="text-[23px] font-bold leading-[28.75px] text-center">
          {title}
        </div>
        <div class="text-14px font-normal leading-[17.5px] text-center">
          {subtitle}
        </div>
      </div>
      {_deskAndTablet}
      {_mobileSlider}
      <div class="flex justify-center">
        <div class="mt-5">
          <a href={linkCta} class="text-[18px] font-medium leading-[22.5px] text-center bg-black text-white py-4 px-10 rounded-[5px]" >
            {textCta}
          </a>
        </div>
      </div>
    </div>
  )
}
