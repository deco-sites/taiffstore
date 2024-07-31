import { ProductListingPage } from "apps/commerce/types.ts";
import { useScript } from "apps/utils/useScript.ts";
import Icon from "../ui/Icon.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

export type Props = Pick<ProductListingPage, "sortOptions"> & { url: string };

const getUrl = (href: string, value: string) => {
  const url = new URL(href);

  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);

  return url.href;
};

const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions, url }: Props) {
  const device = useDevice();

  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  return (
    <div class="relative flex items-center gap-3 all-mobile:h-[40px]">
      <Icon id="upDownArrows" width={17} height={12} class="all-mobile:hidden" />
      <label for="sort" class=" text-[13px] font-bold leading-[16.25px] text-center text-black all-mobile:hidden">Ordenar por:</label>
      <select
        name="sort"
        class="select w-full max-w-sm rounded-lg select-sort relative all-mobile:h-[40px] all-mobile:max-h-[40px]"
        hx-on:change={useScript(() => {
          const select = event!.currentTarget as HTMLSelectElement;
          window.location.href = select.value;
        })}
      >
        {device === "mobile" && (
          <option value="" disabled selected hidden class="text-black">Ordenar por</option>

        )}
        {sortOptions.map(({ value, label }) => ({
          value,
          label: labels[label as keyof typeof labels] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }, index) => (
          <option key={value} value={value} selected={(value === current) && index !== 0}>
            <span class="text-sm">{label}</span>
          </option>
        ))}
      </select>
      <div class="absolute top-[10px] right-[14px] w-3 h-3 bg-white"></div>
    </div>
  );
}

export default Sort;
