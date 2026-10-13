"use client";
import DefaultButton from "@/components/ui/Button/DefaultButton";
import { useRef } from "react";

type ModalProps = {
  action: () => Promise<void>;
  trigger: React.ReactNode;
  message?: string;
  confirmLabel?: string;
};

export function Modal({
  action,
  trigger,
  message = "Czy na pewno chcesz wykonać akcję?",
  confirmLabel = "Potwierdź",
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <DefaultButton onClick={() => dialog.current?.showModal()}>
        {trigger}
      </DefaultButton>

      <dialog
        ref={dialog}
        className="bg-background text-foreground m-auto rounded-sm border p-6 backdrop:bg-black/50"
      >
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <DefaultButton autoFocus onClick={() => dialog.current?.close()}>
            Anuluj
          </DefaultButton>
          <form action={action} onSubmit={() => dialog.current?.close()}>
            <DefaultButton type="submit" colorInvert>
              {confirmLabel}
            </DefaultButton>
          </form>
        </div>
      </dialog>
    </>
  );
}
