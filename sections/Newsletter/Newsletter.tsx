import Form, { Form as FormType } from "../../islands/Newsletter/Form.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  image?: ImageWidget;
  form?: FormType;
}

const DEFAULT_PROPS: Props = {
  title: "Assine nossa newsletter!",
  description: "Desbrave sabores exclusivos e seja o primeiro a receber dicas e ofertas irresistíveis!",
  form: {
    buttonText: "Cadastrar",
    helpText:
      'Concordo que a <strong>Cia Muller</strong> pode usar meus dados de contato e interações. <u><a href="/">Política de privacidade</a></u>.',
  },
  image: ""
};

export default function Newsletter(props: Props) {
  const { form } = { ...DEFAULT_PROPS, ...props };

  return (
    <div
      class={`flex flex-col full-phone:pt-0 pt-4 full-phone:pb-0 transition-all cy-newsletter`}
    >
      <div class="flex items-center bg-black gap-0 w-full mx-auto full-phone:flex-col lg-tablet:gap-[64px] full-tablet:align-start full-tablet:gap-0 full-tablet:items-start">

        <div class="flex flex-1 xl:min-w-[800px] xl:max-w-[800px] w-full h-full full-tablet:max-w-[420px]  full-phone:min-w-full full-phone:min-h-[180px] ">
          <img src={props.image} alt="" class="full-phone:object-cover full-tablet:h-[360px] full-tablet:object-cover sm-desktop:h-[260px] sm-desktop:object-cover" />
        </div>
        <div class="flex flex-col gap-1 text-center lg:text-left flex-1 text-white full-tablet:py-[32px] full-tablet:pl-[32px] lg-tablet:pr-0 lg-tablet:pr-0 sm-tablet:pr-[32px] full-tablet:max-w-[405px] full-tablet:gap-2.5 full-phone:mt-[25px] full-phone:mb-[18px] full-phone:gap-2.5 full-phone:max-w-full full-phone:w-full ">
          {props.title && (
            <h2 class="text-bigger font-bold leading-[22.5px] max-w-[250px] text-center mx-[auto] my-[0] full-tablet:max-w-full full-phone:text-larger  sm-tablet:text-[17px]  full-phone:max-w-full full-phone:px-[42px] ">
              {props.title}
            </h2>
          )}
          {props.description && (
            <p class="text-small font-normal leading-[15px] max-w-[250px] text-center mx-[auto] my-[0] full-tablet:max-w-[360px] full-tablet:m-0 full-tablet:py-0 full-tablet:px-[32px] full-tablet:mb-2.5 full-phone:text-base full-phone:leading-[17.5px] full-phone:max-w-full full-phone:px-[30px] lg-tablet:p-0 lg-tablet:max-w-[340px] lg-tablet:mx-auto lg-tablet:my-0">
              {props.description}
            </p>
          )}
          {form && (
            <div class="full-tablet:block hidden full-tablet:px-0 full-tablet:py-0 cy-newsletter-form">
              <Form buttonText={form.buttonText} helpText={form.helpText} />
            </div>
          )}
        </div>
        {form && (
          <div class="full-tablet:hidden xl:flex-1 full-phone:w-full">
            <Form buttonText={form.buttonText} helpText={form.helpText} />
          </div>
        )}
      </div>
    </div>
  );
}
