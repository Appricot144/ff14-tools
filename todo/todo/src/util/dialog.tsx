import { type ReactNode, useRef, useEffect, useCallback } from "react";
import { RemoveScroll } from "react-remove-scroll";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

function Dialog({ isOpen, onClose, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogEle = dialogRef.current;

    if (!dialogEle) return;

    if (isOpen) {
      if (dialogEle.hasAttribute("open")) return;
      dialogEle.showModal();
    } else {
      if (!dialogEle.hasAttribute("open")) return;
      dialogEle.close();
    }
  }, [isOpen]);

  const handleClickBackDrop = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleClickContent = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    [],
  );

  return (
    <RemoveScroll removeScrollBar enabled={isOpen}>
      <dialog
        ref={dialogRef}
        className="bg-transparent m-auto focus:ouline-none"
        onClick={handleClickBackDrop}
      >
        <div onClick={handleClickContent}>{children}</div>
      </dialog>
    </RemoveScroll>
  );
}

export { Dialog };
