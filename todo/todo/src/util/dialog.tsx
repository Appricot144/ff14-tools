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

  const handleClickBackDrop = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      event.stopPropagation();
      event.preventDefault();
      onClose?.();
    },
    [onClose],
  );

  const handleClickContent = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    [],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDialogElement>) => {
      const k = event.key;
      if (k === "Escape") {
        event.preventDefault();
        onClose?.();
      }
      if (k.startsWith("Arrow")) {
        console.log(k);
        event.preventDefault();
      }
      event.stopPropagation();
    },
    [onClose],
  );

  const handleKeyDownCapture = useCallback(
    (event: React.KeyboardEvent<HTMLDialogElement>) => {
      const k = event.key;
      if (k.startsWith("Arrow")) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [],
  );

  return (
    <RemoveScroll removeScrollBar={false} enabled={isOpen}>
      <dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="false"
        className="bg-transparent m-auto focus:ouline-none"
        onClick={handleClickBackDrop}
        onKeyDown={handleKeyDown}
        onKeyDownCapture={handleKeyDownCapture}
        onCancel={(e) => {
          e.preventDefault();
          onClose?.();
        }}
      >
        <div
          className="flex justify-center items-center my-20"
          onClick={handleClickContent}
        >
          {children}
        </div>
      </dialog>
    </RemoveScroll>
  );
}

export { Dialog };
