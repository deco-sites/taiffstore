import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  logo?: ImageWidget;
  trademark?: string;
  platform?: ImageWidget;
  managed?: ImageWidget;
  copyright?: string;
}

function Footer({
  links = [],
  social = [],
  paymentMethods = [],
  logo,
  platform,
  managed,
  copyright
}: Props) {
  return (
    <footer
      class="px-5 sm:px-0 mt-0" >
      <div class="cy-footer container flex flex-col gap-5 sm:gap-10 py-6 full-tablet:gap-[30px] full-tablet:py-[50px] full-desktop:pt-[42px] ">
        <div class="all-mobile:flex hidden full-tablet:justify-center">
          <img loading="lazy" src={logo} />
        </div>
        {/* mobile view */}
        <ul class="full-phone:grid grid-flow-row sm:grid-flow-col gap-5 hidden footer-mobile-taiff">
          {links.map(({ title, children }) => (
            <div class="collapse collapse-arrow full-phone:rounded-none">
              <input id={title} type="checkbox" class="min-h-[0]" />
              <label
                htmlFor={title}
                class={`collapse-title min-h-[0] !p-0 text-big font-normal leading-[17.78px] text-gray-11 cy-footer-item-mobile-title cy-footer-item-mobile-title-${title}`}
              >
                <span>{title}</span>
              </label>
              <div class="collapse-content full-tablet:!p-0 ">
                <ul
                  class={`flex flex-col gap-1 pl-0 pt-2`}
                >
                  {children.map(({ title, href }) => (
                    <li>
                      <a
                        href={href}
                        class={`cy-footer-item-mobile-children cy-footer-item-mobile-children-${title} block py-1 text-base font-normal leading-4 text-gray-11`}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </ul>
        {/* desktop view */}
        <ul class="grid grid-flow-row sm:grid-flow-col gap-6 full-phone:hidden full-tablet:max-w-[659px] full-tablet:my-0 full-tablet:mx-auto full-tablet:w-full full-tablet:gap-10 ">
          <div class="all-mobile:hidden block">
            <img loading="lazy" src={logo} />
          </div>
          {links.map(({ title, href, children }) => (
            <li class="flex flex-col gap-4">
              <a class={`cy-footer-item-desktop-title cy-footer-item-desktop-title-${title} sm:text-large sm:font-bold sm:leading-[25px] sm:text-left`} href={href}>
                {title}
              </a>
              <ul class="flex flex-col gap-2">
                {children.map(({ title, href }) => (
                  <li>
                    <a class={`cy-footer-item-desktop-children-${title} cy-footer-item-desktop-children text-sm font-medium text-gray-9 sm:text-big sm:font-normal sm:leading-[20px] sm:text-left`} href={href}>
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <hr class="w-full text-base-300 sm:hidden " />
        <div class="hidden flex-col full-phone:gap-2.5 sm:gap-[20px] full-tablet:flex full-desktop:hidden full-tablet:max-w-[492px] full-tablet:mx-[auto] full-tablet:my-[0] full-tablet:w-full full-tablet:items-center">
          <div class="text-[15px] font-medium leading-[18.75px] text-center  full-tablet:text-[18px] full-tablet:font-medium full-tablet:leading-[22.5px] ">
            Pagamento:
          </div>
          <ul class="flex flex-wrap gap-2 full-phone:gap-[13px] full-tablet:w-full full-tablet:justify-center full-tablet:gap-[35px] sm:items-center sm:justify-center">
            {paymentMethods.map(({ image, alt }) => (
              <li class="border border-base-100 rounded flex justify-center items-center max-h-[22px] h-full">
                <Image
                  src={image}
                  alt={alt}
                  class="full-phone:max-h-4 full-phone:w-full "

                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
        <div class="flex flex-col  gap-12 justify-between items-start sm:items-center full-phone:gap-10 full-phone:items-center   sm:flex-row full-tablet:justify-center full-tablet:gap-[100px] full-desktop:justify-center full-desktop:items-start">
          <div class="flex flex-col full-phone:gap-2.5 sm:gap-5 cy-social-items">
            <div class="text-[15px] font-medium leading-[18.75px] text-center  full-tablet:text-[18px] full-tablet:font-medium full-tablet:leading-[22.5px]">
              Redes Sociais:
            </div>
            <ul class="flex gap-4">
              {social.map(({ image, href, alt }, index) => (
                <li>
                  <a href={href}>
                    <Image
                      src={image}
                      alt={alt}
                      class={`h-[21px] w-auto cy-social-item ct-social-item-${index}`}
                      loading="lazy"
                      width={24}
                      height={21}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col full-phone:gap-2.5 full-tablet:hidden sm:gap-5">
            <div class="text-[15px] font-medium leading-[18.75px] text-center  full-tablet:text-[18px] full-tablet:font-medium full-tablet:leading-[22.5px] ">
              Pagamento:
            </div>
            <ul class="flex flex-wrap gap-2 full-phone:gap-[13px]">
              {paymentMethods.map(({ image, alt }) => (
                <li class="border border-base-100 rounded flex justify-center items-center">
                  <Image
                    src={image}
                    alt={alt}
                    class="full-phone:max-h-4 full-phone:w-full "
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col gap-[14px] full-phone:hidden">
            <div class="text-[15px] font-medium leading-[18.75px] text-center  full-tablet:text-[18px] full-tablet:font-medium full-tablet:leading-[22.5px]">
              Plataforma:
            </div>
            <img loading="lazy" src={platform} />
          </div>
          <div class="flex flex-col gap-[14px] full-phone:hidden">
            <div class="text-[15px] font-medium leading-[18.75px] text-center  full-tablet:text-[18px] full-tablet:font-medium full-tablet:leading-[22.5px]">
              Managed by:
            </div>
            <a href="https://socialsa.com" target="_blank" rel="noopener noreferrer" class="cy-managed-by">
              <img loading="lazy" src={managed} />
            </a>
          </div>
        </div>
        <hr class="w-full text-base-300 sm:hidden " />
        <div class="flex justify-between full-phone:px-4 full-phone:mb-5 sm:hidden">
          <div class="flex flex-col gap-[14px]">
            <div class="text-[15px] font-medium leading-[18.75px] text-center  full-tablet:text-[18px] full-tablet:font-medium full-tablet:leading-[22.5px]">
              Plataforma:
            </div>
            <img loading="lazy" src={platform} />
          </div>
          <div class="flex flex-col gap-[14px]">
            <div class="text-[15px] font-medium leading-[18.75px] text-center  full-tablet:text-[18px] full-tablet:font-medium full-tablet:leading-[22.5px]">
              Managed by:
            </div>
            <a href="https://socialsa.com" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" src={managed} />
            </a>
          </div>
        </div>
        <div class="text-tiny font-medium leading-[12.5px] text-center text-gray-11 full-tablet:text-[15px] full-tablet:leading-[18.75px] full-tablet:max-w-[773px] full-tablet:mx-auto full-tablet:my-0">
          {copyright}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
