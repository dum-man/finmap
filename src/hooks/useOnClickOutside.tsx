import { RefObject } from "react";

import { useEventListener } from "usehooks-ts";

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  parentRef: RefObject<T> | null,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;
    const parentEl = parentRef?.current;

    if (
      !el ||
      !parentEl ||
      el.contains(event.target as Node) ||
      parentEl.contains(event.target as Node)
    ) {
      return;
    }

    handler(event);
  });
}

export default useOnClickOutside;
