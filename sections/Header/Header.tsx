import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
  alerts?: HTMLWidget[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo: Logo;

  /** @hide true */
  variant?: "initial" | "menu";
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = (
  { navItems, logo, searchbar }: Props,
) => (
  <>
    <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container max-w-[854px] mt-6 rounded-bl-[10px] rounded-br-[10px] cy-header"
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>

    <div class="flex flex-col  pt-5 container border-b border-gray-300">
      <div class="flex justify-center w-full items-center">
        <div class="place-self-start mr-[120px]">
          <a href="/" aria-label="Store logo" class="cy-header-logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={174}
              height={53}
            />
          </a>
        </div>

        <label
          for={SEARCHBAR_POPUP_ID}
          class="input input-bordered flex items-center gap-2 w-full max-w-[600px] max-h-[30px] cy-searchbar-popup"
          aria-label="search icon button"
        >
          <Icon id="searchLensNew" width={16} height={17} strokeWidth={1} />
          <span class="text-base-300 truncate">
            O que você procura?
          </span>
        </label>

        <div class="flex gap-[50px] ml-[60px] items-center">
          <div>
            <a href="/account/whishlist cy-icon-favoritos">
              <Icon id="heartWhite" width={34} height={30} />
            </a>
          </div>
          <SignIn variant="desktop" />
          <Bag />
        </div>
      </div>

      <div class="flex justify-center items-center text-white">
        <ul class="flex cy-navbar">
          {navItems?.map((item, index) => <NavItem item={item} index={index} />)}
        </ul>
        <div>
          {/* ship to */}
        </div>
      </div>
    </div>
  </>
);



const Mobile = ({ logo, searchbar }: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-full overflow-y-auto">
            <Searchbar {...searchbar} />
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Área do cliente" drawer={SIDEMENU_DRAWER_ID}>
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
            style={{ minWidth: "100vw" }}
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />

    <div
      class="flex justify-between items-center w-full bg-black rounded-br-[10px] rounded-bl-[10px] shadow-blg sm-tablet:px-[10%] lg-tablet:px-40 full-phone:px-5 full-phone:gap-5"
      style={{
        height: NAVBAR_HEIGHT_MOBILE
      }}
    >
      <div class="flex gap-[50px] full-phone:gap-8">
        <div>
          <label
            for={SIDEMENU_DRAWER_ID}
            class="btn btn-square btn-sm btn-ghost"
            aria-label="open menu"
            hx-target={`#${SIDEMENU_CONTAINER_ID}`}
            hx-swap="outerHTML"
            hx-trigger="click once"
            hx-get={useSection({ props: { variant: "menu" } })}
          >
            <Icon
              width={30}
              heigth={20}
              id="hamburguerMenu" />
          </label>
        </div>
        <div>
          <label
            for={SEARCHBAR_DRAWER_ID}
            class="btn btn-square btn-sm btn-ghost"
            aria-label="search icon button"
          >
            <Icon id="searchLens" />
          </label>
        </div>
      </div>

      <div>
        {logo && (
          <a
            href="/"
            class="flex items-center justify-center full-phone:w-[108px] cy-header-logo"
            style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
      </div>
      <div class="flex gap-[50px] full-phone:gap-8">
        <div>
          <SignIn variant="mobile" />
        </div>
        <div>
          <Bag />
        </div>
      </div>
    </div>
  </>
);

function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <header
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
      // Refetch the header in two situations
      // 1. When the window is resized so we have a gracefull Developer Experience
      // 2. When the user changes tab, so we can update the minicart badge when the user comes back
      hx-trigger="resize from:window, visibilitychange[document.visibilityState === 'visible'] from:document"
      hx-get={useSection()}
      hx-target="closest section"
      hx-swap="outerHTML"
    >
      <div class="bg-black fixed w-full z-40">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        <div class="full-phone:hidden full-tablet:hidden full-desktop:block shadow-blg">
          <Desktop logo={logo} {...props} />
        </div>
        <div class="all-mobile:block full-desktop:hidden">
          <Mobile logo={logo} {...props} />
        </div>

      </div>
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}
