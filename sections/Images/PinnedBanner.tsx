import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";


export interface Pinos {
	/** @description Posição horizontal do pin, não ultrapassar o valor de 100*/
	/** @maximum 100 */
	/** @minimum 0 */
	X: number;
	/** @description Posição vertical do pin, não ultrapassar o valor de 100*/
	/** @maximum 100 */
	/** @minimum 0 */
	Y: number;
	/** @title Característica */
	caracteristica: string;
}
/**
 * @titleBy alt
 */
export interface Banner {
	/** @description Ícone da linha do produto */
	icone: ImageWidget;
	conteudo?: {
		/** @description Texto informativo */
		textoInfo: string;
		/** @description Link do botão */
		ctaLink: string;
		/** @description Texto do botão */
		ctaLabel: string;
	};
	/** @description Imagem do produto */
	imgProd: ImageWidget;
	/** @description Alt da imagem do produto*/
	alt: string;

	pins: Pinos[]
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
) {


	return (
		<div class="pl-[122px] pr-[80px] py-[0] flex bg-[black] justify-center items-center w-full gap-[50px] full-phone:flex-col full-phone:px-[18px] full-phone:pb-16 full-phone:gap-0 full-phone:relative lg-tablet:pl-[100px] lg-tablet:pr-[70px] sm-tablet:gap-[30px] sm-tablet:px-[20px] sm-desktop:px-5 ">
			<div class="sm-tablet:flex sm-tablet:justify-center">
				<img class="h-auto max-w-[197px] full-tablet:max-w-[150px]" src={image.icone} alt="" />
			</div>
			<div class="flex-[1] flex flex-col gap-5 sm-tablet:max-w-[224px] cy-pinnedBanner-ctaLink ">

				<div class=" text-white text-large font-normal leading-[25px] full-phone:text-big full-phone:leading-[19.36px] full-phone:text-center full-tablet:text-big">
					{image.conteudo?.textoInfo}
				</div>
				<a href={image.conteudo?.ctaLink}>

					<div class="bg-white text-[17px] font-bold leading-[21.25px] text-center py-2.5 px-11 rounded-[5px] max-w-[225px] full-phone:absolute full-phone:bottom-[30px] full-phone:left-0 full-phone:right-0 full-phone:mx-auto full-phone:z-10">
						{image.conteudo?.ctaLabel}
					</div>
				</a>
			</div>
			<div class="flex relative full-tablet:flex-1">
				<img src={image.imgProd} alt={image.alt} />
				{image.pins.map((pin, index) => (
					<div class={`absolute bg-white p-3 text-large font-thin rounded-full py-0 px-2.5 flex justify-center gap-0  cy-pinnedBanner-pin  cy-pinnedBanner-pin-${index}`} style={{ top: pin.Y + "%", left: pin.X + "%" }}>
						<input id="see-more-toggle" type="checkbox" class="peer absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer z-20" />
						<div class="z-10 cursor-pointer peer-checked:after:content-['x'] after:content-['+'] "></div>
						<p class="hidden font-light text-tiny leading-[10px] p-[5px] text-black peer-checked:flex items-center min-w-[155px] sm-laptop:line-clamp-none justify-center absolute bg-[white] -left-[140px] h-[30px] px-[10px] py-[5px] rounded-bl-[15px] rounded-tl-[15px]">
							{pin.caracteristica}
						</p>
					</div>

				))}
			</div>

		</div>
	);
}

function PinnedBanner({ images = [], preload, interval }: Props) {
	const id = useId();

	return (
		<div
			id={id}
			class={clx(
				"grid",
				"grid-rows-[1fr_32px_1fr_64px]",
				"grid-cols-[32px_1fr_32px]",
				"sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
				"w-full max-w-[1366px] mx-auto mb-10 mt-16",
				"cy-pinnedBanner"
			)}
		>
			<div class="col-span-full row-span-full">
				<Slider class="carousel carousel-center w-full gap-6">
					{images.map((image, index) => (
						<Slider.Item index={index} class={`carousel-item w-full cy-pinnedBanner-item cy-pinnedBanner-item-${index}`}>
							<BannerItem image={image} lcp={index === 0 && preload} />
						</Slider.Item>
					))}
				</Slider>
			</div>


			<div class={`flex items-center justify-center z-10 col-start-1 row-start-2 ml-[18px] ${images.length > 1 ? '' : 'hidden'}`}>
				<Slider.PrevButton
					class="btn bg-transparent border-none btn-sm hover:bg-transparent"
					disabled={false}
				>
					<Icon id="chevronLeftWhite" width={15} height={33} />
				</Slider.PrevButton>
			</div>

			<div class={`flex items-center justify-center z-10 col-start-3 row-start-2 mr-[18px] ${images.length > 1 ? '' : 'hidden'}`}>
				<Slider.NextButton
					class="btn bg-transparent border-none btn-sm hover:bg-transparent"
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

export default PinnedBanner;
