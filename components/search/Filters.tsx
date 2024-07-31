import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import FilterRange from "../../islands/FilterRangePrice.tsx";


interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function uniq(a: any) {
  return a.sort().filter(function (item: string, pos: any, ary: any) {
    return !pos || item != ary[pos - 1];
  });
}

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox hidden" />
      <span class=" text-[13px] font-normal leading-[16.25px] text-left">{label}</span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-2`, flexDirection)}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (avatars) {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const val: number = values.length;
          let x: string[];
          let arr: number[] = [];
          let min: number;
          let max: number;
      
          for (let i = 0; i < val; i++) {
            x = values[i].value.split(":");
            for (let j = 0; j < x.length; j++) {
              arr.push(Number(x[j]));
            }
          }
      
          arr = uniq(arr);
          min = Math.min(...arr);
          max = Math.max(...arr);
      
          const url: string | undefined = values[0]?.url?.split("&filter.price")[0];
          const urlChanged: string | undefined = values[0]?.url?.split(
            "&filter.price=",
          )[1];
          const minMax: string[] | undefined = urlChanged?.split("%3A");
          const minFacet: string | undefined = minMax[0];
          const maxFacet: string | undefined = minMax[1].includes("&")
            ? minMax[1]?.split("&")[0]
            : minMax[1];
      
          return values.length > 0
            ? (
              <>
                <FilterRange
                  min={min}
                  max={max}
                  currentUrlFilterPrice={url}
                  currentMinFacet={Number(minFacet)}
                  currentMaxFacet={Number(maxFacet)}
                />
              </>
            )
            : null;
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}


function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col all-mobile:p-4 ">
      {filters
        .filter(isToggle)
        .map((filter, i) => {
          if(filters.length - 1 == i){
            return(
              <div class="item-filters">
                <li class="flex flex-col gap-2">
                  <span class="text-[13px] font-bold leading-[16.25px] text-left">{filter.label === "Preço" ? filter.label = "Faixa de preço" : filter.label}</span>
                  <FilterValues {...filter} />
                </li>
              </div>
            )
          }else{
            return(
              <div class="item-filters">
                <li class="flex flex-col gap-2">
                  <span class="text-[13px] font-bold leading-[16.25px] text-left">{filter.label === "Preço" ? filter.label = "Faixa de preço" : filter.label}</span>
                  <FilterValues {...filter} />
                </li>
                <div class="divisor"></div>
              </div>
            )
          }
        })}
    </ul>
  );
}

export default Filters;
