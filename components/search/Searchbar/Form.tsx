/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import { Suggestion } from "apps/commerce/types.ts";
import { useScript } from "apps/utils/useScript.ts";
import { asResolved, Resolved } from "deco/mod.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";

// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";

export interface SearchbarProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default O que está procurando?
   */
  placeholder?: string;

  /** @description Loader to run when suggesting new elements */
  loader: Resolved<Suggestion | null>;
}

const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });

  // Keyboard event listeners
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

    // Open Searchbar on meta+k
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as
        | HTMLInputElement
        | null;

      if (input) {
        input.checked = true;

        document.getElementById(formId)?.focus();
      }
    }
  });
};

const Suggestions = import.meta.resolve("./Suggestions.tsx");

export default function Searchbar(
  { placeholder = "O que está procurando?", loader }: SearchbarProps,
) {
  const slot = useId();

  return (
    <div
      class="w-full grid gap-8 pt-[28px] px-[66px] py-[36px] full-phone:px-0 "
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form id={SEARCHBAR_INPUT_FORM_ID} action={ACTION} class="join max-w-[677px] border border-black border-solid rounded-[50px] mx-auto w-full full-tablet:max-w-full full-phone:rounded-none full-phone:border-none full-phone:px-2.5">
        <button
          type="submit"
          class="btn join-item btn-square no-animation min-h-[40px] h-[40px] !bg-white full-phone:border-t full-phone:border-t-black full-phone:border-solid full-phone:border-b full-phone:border-b-black full-phone:border-l full-phone:border-l-black"
          aria-label="Search"
          for={SEARCHBAR_INPUT_FORM_ID}
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          <Icon id="searchLensNew" width={15} heigth={15} class="inline [.htmx-request_&]:hidden" />
        </button>
        <input
          autoFocus
          tabIndex={0}
          class="!rounded-[50px] focus:!border-none  focus:!border-transparent border-none input join-item flex-grow h-[40px] text-base font-normal leading-[17.5px] text-gray input-searchbar full-phone:max-w-[270px] full-phone:border-r full-phone:border-solid full-phone:border-black full-phone:!rounded-none full-phone:border-l-0 full-phone:px-0 full-phone:w-[270px] full-phone:border-t full-phone:border-t-black full-phone:border-b full-phone:border-b-black"
          name={NAME}
          placeholder={placeholder}
          autocomplete="off"
          hx-target={`#${slot}`}
          hx-post={loader && useComponent<SuggestionProps>(Suggestions, {
            loader: asResolved(loader),
          })}
          hx-trigger={`input changed delay:300ms, ${NAME}`}
          hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
          hx-swap="innerHTML"
        />
        <label
          type="button"
          class="join-item btn btn-ghost btn-square no-animation hidden"
          for={SEARCHBAR_POPUP_ID}
          aria-label="Toggle searchbar"
        >
          <Icon id="close" />
        </label>
      </form>

      {/* Suggestions slot */}
      <div id={slot} />

      {/* Send search events as the user types */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            SEARCHBAR_INPUT_FORM_ID,
            NAME,
            SEARCHBAR_POPUP_ID,
          ),
        }}
      />
    </div>
  );
}
