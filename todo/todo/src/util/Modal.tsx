import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const overlayStyles = tv({
  base: "absolute top-0 left-0 w-full h-full isolate z-20 bg-dark-grey/50 text-center ",
  variants: {
    isEntering: {
      true: "animate-in fade-in duration-200 ease-out",
    },
    isExiting: {
      true: "animate-out fade-out duration-200 ease-in",
    },
  },
});

const modalStyles = tv({
  base: "w-full max-w-[min(90vw,550px)] max-h-full align-middle overflow-y-auto scrollbar-none",
  variants: {
    isEntering: {
      true: "animate-in zoom-in-105 ease-out duration-200",
    },
    isExiting: {
      true: "animate-out zoom-out-95 ease-in duration-200",
    },
  },
});

function Modal({...props}: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles} >
      <div className="top-0 left-0 w-full h-full flex items-center justify-center">
        <RACModal children={props.children} className={modalStyles} />
      </div>
    </ModalOverlay>
  );
}

export { Modal };
