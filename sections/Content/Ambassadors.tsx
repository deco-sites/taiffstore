import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";

export interface CardProps {
    label?: string;
    description?: string;
    image?: ImageWidget;
    ctaText?: string;
    link?: string;
}

export interface Props {
    title?: string;
    subtitle?: string;
    link?: string;
    /**
     * @maxItems 4
    */
    cards?: CardProps[];
    interval?: number;
}

export default function Cards({
    title = "Embaixadores",
    subtitle = "Nossos embaixadores são experts em cabelos e produzem conteúdos especialmente para você.",
    cards = [
        {
            label: "Douglas Moura",
            description: "Formado pela escola argentina Mercedes Klar, ele se especializou em corte nas academias Llongueras e Pivot Point em Buenos Aires, Tony&Guy na Itália, e aperfeiçoou suas técnicas de penteados com os Russos Shamuratov Farrukh e Tonya Pushkareva.",
            image:
                "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/3290/488e5dc5-9a24-48c9-9795-09b97394fb5f",
            link: "/",
            ctaText: "Saiba mais"
        }
    ],
    interval
}: Props) {

    const id = useId();

    const _desktop = (
        <div class="all-mobile:hidden block lg-tablet:px-24 sm-tablet:px-8 my-5 cy-ambassadors">
            <div class="flex justify-center gap-[20px]">
                {cards?.map((card, index) => (
                    <div class={`infocard-item cy-ambassadors-item-${index}-cy flex flex-col max-w-[300px]`}>
                        <img src={card.image} alt="" srcset="" />
                        <div class="flex flex-col mt-5 flex-1 justify-between gap-4">
                            <div class="flex flex-col gap-6">
                                <div class="text-[20px] font-normal leading-[23.7px] text-left">
                                    {card.label}
                                </div>
                                <div class="text-[13px] font-normal leading-[15.41px] text-left min-h-[90px]">
                                    {card.description}
                                </div>
                            </div>
                            <div class="flex">
                                <a href={card.link} class=" cy-ambassadors-item-link text-big font-normal leading-[18.96px] text-center text-white bg-black py-[14px] px-[37px]">
                                    {card.ctaText}
                                </a>
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
                "all-mobile:grid hidden",
                "grid-rows-[1fr_32px_1fr_64px]",
                "grid-cols-[32px_1fr_32px]",
                "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
                "w-full",
            )}
        >
            <div class="col-span-full row-span-full max-w-[815px] mx-auto full-phone:max-w-full full-phone:px-[18px]">
                <Slider class="carousel carousel-center w-full full-tablet:gap-5 sm-tablet:px-5">
                    {cards?.map((card, index) => (
                        <Slider.Item index={index} class="carousel-item w-full justify-center flex-col max-w-fit full-phone:items-center full-phone:px-2.5">
                            <div class={`cy-ambassadors-mobile-item-${index} flex flex-col max-w-[300px]`}>
                                <img src={card.image} alt="" srcset="" />
                                <div class="flex flex-col mt-5 flex-1 justify-between gap-4">
                                    <div class="flex flex-col gap-6">
                                        <div class="text-[20px] font-normal leading-[23.7px] text-left">
                                            {card.label}
                                        </div>
                                        <div class="text-[13px] font-normal leading-[15.41px] text-left min-h-[90px]">
                                            {card.description}
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <a href={card.link} class=" cy-ambassadors-item-link-mobile text-big font-normal leading-[18.96px] text-center text-white bg-black py-[14px] px-[37px]">
                                            {card.ctaText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Slider.Item>
                    ))}
                </Slider>
                <ul
                    class={clx(
                        "col-span-full row-start-5 z-10 mt-2 w-full",
                        "carousel justify-center ",
                        "full-phone:mt-6 full-phone:mb-5",
                        "full-tablet:hidden"
                    )}
                >
                    {cards.map((_, index) => (
                        <li class="carousel-item full-phone:flex-1">
                            <Slider.Dot
                                index={index}
                                class={clx(
                                    "bg-white-1 h-1 full-phone:w-full w-[60px] no-animation ml-[-1px]",
                                    "disabled:bg-gray-2 disabled:opacity-100 transition-[width]",
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
        <div class="cy-ambassadors">
            <div class=" max-w-[400px] mx-auto my-0 flex flex-col gap-2.5 full-phone:mb-4 full-phone:px-4 full-tablet:mb-6">
                <div class="text-bigger font-bold leading-[22.5px] text-center">
                    {title}
                </div>
                <div class=" text-[15px] font-normal leading-[18.75px] text-center">
                    {subtitle}
                </div>
            </div>
            {_desktop}
            {_mobileSlider}
        </div>
    )
}
