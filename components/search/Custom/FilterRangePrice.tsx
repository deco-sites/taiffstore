import { useEffect, useId, useRef } from "preact/hooks";
import { RefObject } from "preact";
import { useSignal } from "@preact/signals";
import type { FilterRangeValue } from "apps/commerce/types.ts";
import { formatPrice } from "../../../sdk/format.ts";

const thumbsize = 14;

export interface FilterRangeProps extends FilterRangeValue {
  currentUrlFilterPrice?: string;
  currentMaxFacet?: number;
  currentMinFacet?: number;
}

function applyFilterPrice(
  { min, max, currentUrlFilterPrice }: FilterRangeProps,
) {
  const searchParams = new URLSearchParams(currentUrlFilterPrice);
  searchParams.set("filter.price", `${min}:${max}`);
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

  globalThis.location.href = newUrl;
}

function FilterRange(
  {
    min: minValue,
    max: maxValue,
    currentUrlFilterPrice = "",
    currentMinFacet,
    currentMaxFacet,
  }: FilterRangeProps,
) {
  const id = useId();
  const urlBrowser = globalThis.location.search;
  const slider: RefObject<HTMLDivElement> = useRef(null);
  const min: RefObject<HTMLInputElement> = useRef(null);
  const max: RefObject<HTMLInputElement> = useRef(null);
  const rangemin = useSignal(
    Number(!urlBrowser?.includes("filter.price") ? minValue : currentMinFacet),
  );
  const rangemax = useSignal(
    Number(!urlBrowser?.includes("filter.price") ? maxValue : currentMaxFacet),
  );
  const avgvalueprimary = (rangemin.value + rangemax.value) / 2;
  const dataValue = useSignal({
    min: minValue,
    max: maxValue,
    rangewitdh: 0,
  });

  function draw(splitvalue: number) {
    if (
      min.current &&
      max.current &&
      slider.current &&
      !!dataValue.value.rangewitdh
    ) {
      min.current.setAttribute("max", `${splitvalue}`);
      max.current.setAttribute("min", `${splitvalue}`);

      // Sets CSS. Ugly but works.
      min.current.style.width = `${
        Math.floor(
          thumbsize +
            ((splitvalue - minValue) /
                (maxValue - minValue)) *
              (dataValue.value.rangewitdh - 2 * thumbsize),
        )
      }px`;
      max.current.style.width = `${
        Math.floor(
          thumbsize +
            ((maxValue - splitvalue) /
                (maxValue - minValue)) *
              (dataValue.value.rangewitdh - 2 * thumbsize),
        )
      }px`;

      min.current.style.left = "0px";
      max.current.style.left = min.current.style.width;

      slider.current.style.height = `${min.current.offsetHeight}px`;

      if (Number(max.current.value) > maxValue) {
        max.current.setAttribute("data-value", `${dataValue.value.max}`);
      }

      rangemin.value = Number(min.current.getAttribute("data-value"));
      rangemax.value = Number(max.current.getAttribute("data-value"));
    }
  }

  function update(props: FilterRangeValue): void {
    if (min.current && max.current) {
      const minvalue = props.min;
      const maxvalue = props.max;

      min.current.setAttribute("data-value", `${minvalue}`);
      max.current.setAttribute("data-value", `${maxvalue}`);

      const avgvalue = (minvalue + maxvalue) / 2;
      draw(Math.round(avgvalue));
    }
  }

  function handleInput(props: FilterRangeValue) {
    update(props);
    applyFilterPrice({
      min: rangemin.value,
      max: rangemax.value,
      currentUrlFilterPrice,
    });
  }

  useEffect(() => {
    if (slider.current) {
      dataValue.value.rangewitdh = slider.current.offsetWidth;
      draw(Math.round(avgvalueprimary));
    }
  }, []);

  return (
    <div class="hidden first:flex first:flex-col-reverse">
      <div ref={slider} class="relative w-full text-center inline-block">
        <label for="min" class="hidden">
          Preço minimo
        </label>
        <input
          ref={min}
          id={`min-${id}`}
          class="cursor-pointer absolute filter-range top-0 left-0 Cy-price-initSlider"
          name="min"
          type="range"
          step="1"
          min={minValue}
          max={Math.round(maxValue)}
          data-value={rangemin.value}
          onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
            handleInput({
              min: Math.round(Number(ev.currentTarget.value)),
              max: rangemax.value,
            });
          }}
          value={rangemin.value}
        />
        <label for="max" class="hidden">
          Preço máximo
        </label>
        <input
          ref={max}
          id={`max-${id}`}
          class="cursor-pointer absolute filter-range top-0 right-0 Cy-price-lastSlider"
          name="max"
          type="range"
          step="1"
          min={minValue}
          max={Math.round(maxValue)}
          data-value={Math.round(rangemax.value)}
          onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
            handleInput({
              max: Math.round(Number(ev.currentTarget.value)),
              min: rangemin.value,
            });
          }}
          value={Math.round(rangemax.value)}
        />
      </div>
      <div class="flex justify-start items-center">
        <output class="text-[13px] font-normal leading-[16.25px] text-left text-black">
          {formatPrice(rangemin.value, "BRL")}
        </output>
        <span class="mx-1"> e </span>
        <output class="text-[13px] font-normal leading-[16.25px] text-left text-black">
          {formatPrice(rangemax.value, "BRL")}
        </output>
      </div>
    </div>
  );
}

export default FilterRange;
