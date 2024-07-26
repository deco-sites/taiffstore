import { useScript } from "apps/utils/useScript.ts";
import { type ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";

export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}

const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }

    const input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) {
      return;
    }

    input.checked = false;
  };

  addEventListener("keydown", handler);
};

function Drawer({
  children,
  aside,
  open,
  class: _class = "",
  id = useId(),
}: Props) {
  return (
    <>
      <div class={clx("drawer", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />

        <div class="drawer-content">
          {children}
        </div>

        <aside
          data-aside
          class={clx(
            "drawer-side h-full z-40 overflow-hidden",
            "[[data-aside]&_section]:contents", // lazy-loading via useSection
          )}
        >
          <label for={id} class="drawer-overlay" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}

function Aside(
  { title, drawer, children }: {
    title: string;
    drawer: string;
    children: ComponentChildren;
  },
) {
  return (
    <div
      data-aside
      class="bg-base-100 grid grid-rows-[auto_1fr] h-full full-tablet:max-w-[100vw] full-tablet:w-full full-tablet:max-h-[600px] full-tablet:rounded-bl-[10px] full-tablet:rounded-br-[10px] full-tablet:mx-[auto] full-tablet:my-[0] full-phone:w-full"
      style={{ maxWidth: "100vw" }}
    >
      <div class="flex justify-between items-center">
        <h1 class={drawer === "searchbar-drawer" ? 'hidden' : 'px-5 pb-3 pt-8'}>
          <span class={drawer === "minicart-drawer" ? `text-[28px]  font-bold leading-[35px] text-black` : `text-large font-normal leading-[25px] text-black`}>{title}</span>
        </h1>
        <label for={drawer} aria-label="X" class={`btn btn-ghost absolute right-8 top-5 ${drawer === "searchbar-drawer" ? 'top-[26px] !right-0 full-tablet:!right-[5px]' : ''} ${drawer === "minicart-drawer" ? "top-[26px]" : ""}`}>
          <Icon id="closeBtn" width={25} height={24} />
        </label>
      </div>
      {children}
    </div>
  );
}

Drawer.Aside = Aside;

export default Drawer;
