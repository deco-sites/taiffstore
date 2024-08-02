import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  navItems: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-plus border-t border-solid border-black-2 rounded-none">
      <input type="checkbox" />
      <div class="collapse-title px-9 py-6 text-big font-bold leading-[20px] text-black">{item.name}</div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class="underline text-sm" href={item.url}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li >
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ navItems }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "100vw" }}
    >
      <ul class="flex py-2 flex-row justify-evenly">
        <li class="flex justify-center w-20 items-start">
          <a
            class="flex gap-[5px] py-2 flex-col justify-center items-center text-center"
            href="https://www.deco.cx"
          >
            <div class="flex items-center py-2 px-3 border border-solid border-black rounded-lg h-[44px]">
              <Icon id="userMenu" width={23} height={26} />
            </div>
            <div>
              <span class="text-base font-medium leading-[18px] text-center text-black">Entrar ou Cadastrar</span>
            </div>
          </a>
        </li>
        <li class="flex justify-center w-20 items-start">
          <a
            class="flex gap-[5px]  py-2 flex-col justify-center items-center text-center"
            href="https://www.deco.cx"
          >
            <div class="flex items-center py-2 px-3 border border-solid border-black rounded-lg h-[44px]">
              <Icon id="cartMenu" width={25} height={22} />
            </div>
            <div>
              <span class="text-base font-medium leading-[18px] text-center text-black">Meus pedidos</span>
            </div>
          </a>
        </li>
        <li class="flex justify-center w-20 items-start h-full">
          <a
            class="flex gap-[5px] py-2 flex-col justify-center items-center text-center h-full justify-start"
            href="/wishlist"
          >
            <div class="flex items-center py-2 px-3 border border-solid border-black rounded-lg h-full max-h-[44px]">
              <Icon id="heartMenu" width={20} height={18} />
            </div>
            <div class="flex h-full items-center">
              <span class="text-base font-medium leading-[18px] text-center text-black">Favoritos</span>
            </div>
          </a>
        </li>
      </ul>
      <ul class="flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {navItems.map((item) => (
          <li class={item.identifier === "highlight" ? 'highlight' : ''}>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
