import type { JSX } from "preact"
import { useSignal } from '@preact/signals'
import { isNewsletterFormValid } from '../../utils/validation.tsx'
import { invoke } from "../../runtime.ts";
import Icon from "../../components/ui/Icon.tsx";

export interface Form {
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

interface InputProps {
  id: string
  placeholder: string
  type?: "text" | "email"
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  iconWidth?: number
  iconHeight?: number
}

function InputGroup({ id, type = "text", placeholder, onChange, value, iconHeight, iconWidth }: InputProps) {
  return (
    <fieldset
      class="grow pb-1 transition-all mb-2.5 relative full-tablet:mb-0 full-phone:w-full full-phone:max-w-full"
    >
      <input
        id={id}
        class={`cy-newsletter-form-input-${type} bg-white w-full text-xs outline-none px-2 pb-1 pt-2 placeholder:text-black rounded text-base font-light leading-[17.5px] placeholder:text-[14px] placeholder:font-light placeholder:leading-[17.5px] h-[38px] pl-[93px]`}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required
      />
      <Icon id={id} class="absolute left-[33px] top-[11px]" width={iconWidth} height={iconHeight} />

    </fieldset>
  )
}

function Form({ buttonText, helpText }: Form) {
  const loading = useSignal(false)
  const formErrorMessage = useSignal("")
  const formSuccessMessage = useSignal("")
  const name = useSignal("")
  const email = useSignal("")
  const consent = useSignal(false)

  function formReset() {
    formErrorMessage.value = ""
    formSuccessMessage.value = ""
    name.value = ""
    email.value = ""
    consent.value = false
  }

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    loading.value = true

    const { isFormValid, errorMessage } = isNewsletterFormValid(email.value.trim(), name.value, consent.value)

    if (!isFormValid) {
      formErrorMessage.value = errorMessage
      loading.value = false

      return
    }

    try {
      await invoke.vtex.actions.masterdata.createDocument({
        data: {
          nome: name.value,
          email: email.value.trim(),
          aceite: consent.value
        },
        acronym: "NL"
      });

      formErrorMessage.value = ""
      formSuccessMessage.value = "Inscrito com sucesso!"
    } catch (error) {
      formErrorMessage.value = "Ocorreu um erro. Tente novamente mais tarde."
      console.error({ error })
    } finally {
      (document.getElementById("form-newsletter") as HTMLFormElement).reset();

      setTimeout(() => {
        loading.value = false;
        formReset()
      }, 3000);
    }

    loading.value = false
  }

  return (
    <form onSubmit={handleSubmit} id="form-newsletter" class="flex flex-col gap-4 flex-1 full-phone:relative full-phone:gap-0 full-phone:w-full full-phone:max-w-[325px] full-tablet: relative sm-desktop:p-8 full-phone:mx-auto full-phone:my-0">

      <div class="flex flex-col max-w-[338px] full-phone:max-w-full full-phone:px-0 full-tablet:w-full full-tablet:my-0 full-tablet:mx-auto full-tablet:gap-2.5">
        <InputGroup
          id="nwUser"
          placeholder="Digite seu nome aqui"
          type="text"
          value={name.value}
          onChange={(e) => name.value = e.currentTarget.value}
          iconWidth={14}
          iconHeight={18}
        />

        <InputGroup
          id="nwEmail"
          placeholder="Digite seu e-mail aqui"
          type="email"
          value={email.value}
          onChange={(e) => email.value = e.currentTarget.value}
          iconWidth={23}
          iconHeight={19}
        />

        <button
          class="btn grow hidden lg:inline-block  bg-white text-big font-bold leading-[20px] text-center rounded min-h-9 h-9 mb-5"
          type="submit"
          disabled={loading.value}
        >
          {buttonText}
        </button>
        {helpText && (
          <div class="flex gap-cm-10 items-center all-mobile:absolute bottom-[18px] full-tablet:bottom-[-55px]">
            <div class="flex flex-col gap-1 text-white">
              {formErrorMessage.value && (
                <p class="text-red-500 text-xs">
                  {formErrorMessage.value}
                </p>
              )}

              {formSuccessMessage.value && (
                <p class="text-green-500 text-xs">
                  {formSuccessMessage.value}
                </p>
              )}

              <div class="flex gap-2 items-center full-phone:items-start relative">
                <input
                  class="cy-newsletter-form-input-consent peer block absolute w-[20px] h-[20px] opacity-0 cursor-pointer"
                  type="checkbox"
                  id="cbConsent"
                  checked={consent}
                  onClick={() => consent.value = !consent.value}
                />
                <label
                  for="cbConsent"
                  class={`w-5 min-w-5 h-5 cursor-pointer bg-white peer-checked:bg-bgCbNewsletter bg-no-repeat bg-[4px_4px] outline outline-1  transition-all [box-shadow:inset_0px_0px_0px_2px_black] full-phone:mt-[3px]`}
                />

                <div
                  class="text-small font-light leading-4 text-left text-white"
                  dangerouslySetInnerHTML={{ __html: helpText }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        class="cy-newsletter-form-submit btn  lg:hidden bg-white text-big font-bold leading-[20px] text-center rounded full-phone:mb-[65px] full-tablet:max-w-[338px] full-tablet:mx-auto full-tablet:my-0 full-tablet:w-full "
        type="submit"
        disabled={loading.value}
      >
        {buttonText}
      </button>
    </form>
  )
}

export default Form
