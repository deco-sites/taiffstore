import { useId } from "../../sdk/useId.ts";

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */

}

function Alert({ alerts = []}: Props) {
  const id = useId();

  return (
    <div id={id}>

      <div class="relative w-full overflow-hidden h-8 bg-black alertas-cy">
        <div class="animate-alerts absolute top-0 left-0 flex flex-nowrap h-8 justify-center items-center">
          {alerts.map((alert, index) => (
            <span
              class={`flex item justify-center text-center text-small text-white alertas-cy-item alertas-cy-item-${index}`}
              dangerouslySetInnerHTML={{ __html: alert }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alert;
