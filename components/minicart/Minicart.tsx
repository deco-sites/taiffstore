import { useScript } from "apps/utils/useScript.ts";
import { AppContext } from "../../apps/site.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import CartItem, { Item } from "./Item.tsx";

export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    locale: string;
    currency: string;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}

const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;

  window.STOREFRONT.CART.dispatch(form);

  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }

  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send",
    // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }

      // Disable addToCart button interactivity
      document.querySelectorAll("div[data-cart-item]").forEach((container) => {
        container?.querySelectorAll("button")
          .forEach((node) => node.disabled = true);
        container?.querySelectorAll("input")
          .forEach((node) => node.disabled = true);
      });
    },
  );
};

const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};

export const action = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });

export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Error while updating cart
        </span>
        <span class="text-sm text-center">
          Click in the button below to retry or refresh the page
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button>
    </div>
  );
}

export default function Cart({
  cart: {
    platformCart,
    storefront: {
      items,
      total,
      subtotal,
      coupon,
      discounts,
      locale,
      currency,
      freeShippingTarget,
      checkoutHref,
    },
  },
}: { cart: Minicart }) {
  const count = items.length;

  return (
    <>
      <form
        class="contents"
        id={MINICART_FORM_ID}
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url)}
        hx-swap="outerHTML"
      >
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button hidden name="action" value="add-to-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(
            JSON.stringify({ coupon, currency, value: total, items }),
          )}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />

        <div
          class={clx(
            "flex flex-col flex-grow justify-center items-center overflow-hidden w-full",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
          )}
        >
          {count === 0
            ? (
              <div class="flex flex-col gap-10 max-w-[300px] mx-auto my-0">
                <span class="text-[25px] font-bold leading-[31.25px] text-center text-black">
                  Seu carrinho está vazio!
                </span>
                <span class="text-[15px] font-normal leading-[18.75px] text-center text-black">
                  Continue sua jornada de compras, explore categorias e encontre produtos incríveis para adicionar ao seu carrinho.
                </span>
                <label
                  for={MINICART_DRAWER_ID}
                  class="text-big font-medium leading-5 text-center text-white rounded-[4px] bg-black px-5 py-2.5 max-w-[176px] mx-auto my-0"
                >
                  Escolher produtos
                </label>
              </div>
            )
            : (
              <>
                {/* Free Shipping Bar */}
                <div class="px-5 py-4 w-full">
                  <FreeShippingProgressBar
                    total={total}
                    locale={locale}
                    currency={currency}
                    target={freeShippingTarget}
                  />
                </div>

                {/* Cart Items */}
                <ul
                  role="list"
                  class="mt-6 px-3 flex-grow overflow-y-auto overflow-x-hidden flex flex-col gap-6 w-full "
                >
                  {items.map((item, index) => (
                    <li class="border-t border-gray-6 border-solid last:border-b">
                      <CartItem
                        item={item}
                        index={index}
                        locale={locale}
                        currency={currency}
                      />
                    </li>
                  ))}
                </ul>

                {/* Cart Footer */}
                <footer class="w-full">
                  <div class="mb-8 ml-5 text-big font-normal leading-[25px] text-black">
                    Resumo do pedido
                  </div>
                  {/* Subtotal */}
                  <div class="border-t border-gray-7 border-solid py-2.5 flex flex-col mx-5">
                    {discounts > 0 && (
                      <div class="flex justify-between items-center px-4">
                        <span class="text-sm">Descontos</span>
                        <span class="text-sm">
                          {formatPrice(discounts, currency, locale)}
                        </span>
                      </div>
                    )}
                    <div class="w-full flex justify-between text-sm">
                      <span class="text-[14px] font-normal leading-[21px] text-left">Subtotal</span>
                      <output form={MINICART_FORM_ID} >
                        {formatPrice(subtotal, currency, locale)}
                      </output>
                    </div>
                  </div>

                  {/* Total */}
                  <div class="flex flex-col justify-end items-end gap-2 mx-5 border-t border-gray-7 border-solid">
                    <div class="flex justify-between items-center w-full py-2.5">
                      <span class="text-large text-gray-8 font-normal leading-[21px] text-left">Total</span>
                      <output
                        form={MINICART_FORM_ID}
                        class="text-[24px] font-semibold leading-[30px] text-black"
                      >
                        {formatPrice(total, currency, locale)}
                      </output>
                    </div>
                   
                  </div>

                  <div class="p-4 text-center">
                    <a
                      class="btn  w-full no-animation bg-blue-1 rounded-[4px] text-center max-w-[330px] "
                      href={checkoutHref}
                      hx-on:click={useScript(sendBeginCheckoutEvent)}
                    >
                      <span class="[.htmx-request_&]:hidden text-[18px] font-bold leading-[22.5px] text-white">
                        Finalizar compra
                      </span>
                      <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                    </a>
                  </div>  
                  <div class="px-4 pt-0 pb-5 text-center ">
                    <a
                      class="btn  w-full no-animation bg-transparent border border-solid border-gray-9 rounded-[4px] text-center max-w-[330px] "
                      href={"/"}
                      hx-on:click={useScript(sendBeginCheckoutEvent)}
                    >
                      <span class="[.htmx-request_&]:hidden text-[18px] font-bold leading-[22.5px] text-gray-9">
                        Continuar comprando
                      </span>
                      <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                    </a>
                  </div>
                  <div class="max-w-[255px] mx-auto my-0 flex flex-col gap-2 mb-10">
                    <span class="text-small font-normal leading-[15px] text-center">
                      *Taxas e frete calculados no carrinho
                    </span>
                    <span class="text-small font-normal leading-[15px] text-center">
                      *O preço exibido no checkout é o valor válido para a compra do produto.
                    </span>
                  </div>  
                </footer>
              </>
            )}
        </div>
      </form>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </>
  );
}
