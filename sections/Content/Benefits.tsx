import Header from "../../components/ui/Section.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Benefit {
  /**
   * @title Título benefício - Desktop
   */
  label: string;

  /**
   * @title Subtítulo benefício - Desktop
   */
  subtitle: string;

  /**
   * @format icon-select
   * @options deco-sites/storefront/loaders/availableIcons.ts
   */
  icon: ImageWidget;
  description: string;
}

export interface Props {
  /**
   * @default Benefits
   */
  title?: string;
  /**
   * @default Check out the benefits
   */
  description?: string;
  benefits?: Array<Benefit>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(
  props: Props,
) {
  const {
    title = "Benefits",
    description = "Check out the benefits",
    benefits = [{
      icon: "Truck",
      label: "FRETE GRÁTIS",
      subtitle: "para compras acima de R$ 150,00",
      description: " ",
    }, {
      icon: "Discount",
      label: "PARCELE SUAS COMPRAS",
      subtitle: "Parcele em até 5 vezes sem juros",
      description: " ",
    }, {
      icon: "ArrowsPointingOut",
      label: "MAIS ECONOMIA",
      subtitle: "Compre os nossos Kits",
      description: " ",
    }, {
      icon: "Discount",
      label: "COMPRA SEGURA",
      subtitle: "Loja com SSL e proteção de dados",
      description: " ",
    }],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${reverse ? "bg-primary text-primary-content p-4 lg:px-8 lg:py-4" : ""
          } flex gap-2.5  justify-center items-center rounded-[3px] py-2.5 px-1.5 cs-all-tablet:px-5 cs-all-tablet:py-3 bg-gray-10  full-tablet:items-start full-phone:items-center full-phone:justify-start full-phone:px-3 lg-tablet:justify-between lg-tablet:items-center full-tablet:flex-1  full-tablet:justify-between ${benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
          } ${showDivider && benefitLayout !== "piledup" ? "" : ""} ${showDivider ? "" : ""
          } ${showDivider && !reverse ? "" : ""}  Benefits-item-${index + 1}-cy`}
      >
        <div class={`w-8 Benefits-item-${index + 1}-Icon-cy`}>
          <img src={benefit.icon} alt={benefit.label} srcset="" />
        </div>
        <div
          class={` flex flex-col gap-0 justify-center full-tablet:min-w-[140px]  full-phone:min-w-[160px]`}
        >
          <div
            class={` text-small font-bold leading-[14px] text-left Benefits-item-${index + 1
              }-labelDesk-cy`}
          >
            {benefit.label}
          </div>
          <div
            class={`text-small font-normal leading-[14px] text-left  Benefits-item-${index + 1
              }-SubtitleDesk-cy`}
          >
            {benefit.subtitle}
          </div>

        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="full-phone:flex full-phone:flex-col">
            <div class=" text-bigger font-light leading-[22.5px] pt-[50px] text-center full-phone:pt-[35px] full-phone:pb-3 full-phone:max-w-[210px] full-phone:mx-auto full-phone:my-0">
              {title}
            </div>
            <div class="benefits w-full max-w-full px-4  pb-8 pt-2.5 flex flex-col gap-8  Benefits-cy  full-tablet:container full-phone:m-0  full-phone:max-w-full full-phone:!px-3 lg-tablet:max-w-[811px] ">
              <div class="w-full flex justify-center ">
                <div class="listOfBenefits flex justify-center gap-[30px] full-phone:gap-2.5 w-full full-tablet:flex-row full-phone:overflow-x-scroll  full-phone:justify-start full-phone:pb-2  sm-tablet:overflow-x-scroll full-tablet:justify-start">
                  {listOfBenefits}
                </div>
              </div>
            </div>
          </div>
        )
        : ""}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class=" gap-4 w-full py-6 px-4 border border-base-300 lg:gap-8 lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="gap-4 w-full lg:gap-8">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
