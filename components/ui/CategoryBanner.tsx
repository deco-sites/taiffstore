import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import Icon from "./Icon.tsx";

interface Subcategory {
  /**
   * @title Título da subcategoria */
  label: string;

  /**
   * @title Link da subcategoria */
  link: string;

  /**
   * @title Imagem da subcategoria
   */
  image: ImageWidget;
}

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
  content?: {
    title: string;
    text?: string;
  }
  subcategories?: Array<Subcategory>;

}

const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      content: {
        title: "Secadores",
        text: "Nossos secadores são sinônimo de inovação e qualidade. A Taiff sempre esteve em sintonia com as tendências mundiais, alinhando design, ergonomia, potência e alto padrão de qualidade em seus produtos."
      },
      title: "Woman",
      matcher: "/*",
      subtitle: "As",
    },
  ],
};

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { image, content, matcher, subcategories } = banner;
  console.log('subcategories -------------', subcategories)
  return (
    <div class="grid grid-cols-1 grid-rows-1 relative">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={375}
          height={375}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1920}
          height={300}
          media="(min-width: 767px)"
        />
        <img class="w-full max-h-[300px] min-h-[300px] full-phone:max-h-[375px] full-phone:min-h-[375px]" src={image.desktop} alt={image.alt} />
      </Picture>
      <div class="brand-breadcrumb max-w-fit mx-auto my-0 w-full absolute top-[255px] left-[22%] ml-5 full-phone:left-0 full-phone:top-[325px]">
        <div class="flex max-w-fit gap-[10px] px-[10px] py-[6px] bg-[#00000099] shadow-[0_4px_30px_0px_rgba(0,0,0,0.1)] backdrop-filter backdrop-blur-[0px] rounded-[5px] justify-center items-center">
          <div class="flex">
            <a class="text-white text-base font-normal leading-[18px]" href="/">
              Início
            </a>
          </div>
          <div class="flex">
            <Icon id="chevronRighttWhiteBC" width={5} height={10} />
          </div>
          {content.title ? (
            <div class="flex">
              <a class="text-white text-base font-normal leading-[18px]" href={matcher}>
                {content.title}
              </a>
            </div>
          ) : null}
        </div>
      </div>
      <div class="flex flex-col items-center my-5 gap-5 full-phone:mb-[30px]">

        <input id="see-more-toggle" type="checkbox" class="peer hidden" />

        <div class="text-sm truncate line-clamp-3 whitespace-normal peer-checked:line-clamp-none max-w-[831px] px-5 collapse-text">
          <h1>{content?.title}</h1>
          <p>{content?.text}</p>
        </div>

        <label for="see-more-toggle" class={`${content ? "" : "hidden"} join after:join-item after:content-['mais'] peer-checked:after:content-['menos'] rounded-none after:pl-1 after:cursor-pointer cursor-pointer text-bigger font-bold leading-[25px] text-black full-phone:leading-5 full-phone:text-big full-phone:lowercase`} >
          Ver
        </label>
        {subcategories && (
          <div class="flex gap-5 w-full justify-center full-phone:gap-2.5">
            {subcategories.map((sub, index) => {
              return (
                <div class="relative">
                  <Picture preload>
                    <Source
                      src={sub.image}
                      width={280}
                      height={160}
                      media="(min-width: 767px)"
                    />
                    <Source
                      src={sub.image}
                      width={160}
                      height={100}
                      media="(max-width: 767px)"
                    />
                    <img class="w-full brightness-[0.7] max-h-[160px] min-h-[160px] full-phone:max-h-[100px] full-phone:min-h-[100px]" src={sub.image} alt={sub.label} />
                  </Picture>
                  <div class="cy-subcategory-item absolute top-[0] bottom-[0] left-[0] right-[0] w-full flex items-center max-h-[160px] justify-center text-[20px] font-bold leading-[25px] text-center text-white">
                    {sub.label}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };

  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
