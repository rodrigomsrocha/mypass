import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";

export function CreateNewCategoryModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="w-5 h-5 flex items-center justify-center transition-colors rounded-md hover:bg-zinc-700"
          type="button"
        >
          <Plus size={14} weight="bold" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-zinc-950/80" />
        <Dialog.Content className="bg-zinc-950 border border-zinc-800 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 max-w-md w-full">
          <Dialog.Title className="text-2xl">Create new category</Dialog.Title>
          <Dialog.Description className="text-zinc-600">
            The category is where your passwords will be saved
          </Dialog.Description>
          <form className="mt-6 flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="bg-transparent outline-none border border-zinc-800 rounded-md placeholder:text-zinc-800 py-2 px-4"
              id="name"
              placeholder="Streaming"
            />
            <button className="bg-violet-600 py-2 px-4 rounded-md flex justify-center items-center gap-2 transition-opacity hover:opacity-80 mt-4">
              <Plus size={18} weight="bold" />
              Create
            </button>
          </form>
          <Dialog.Close asChild>
            <button aria-label="Close" className="fixed top-6 right-6">
              <X size={18} weight="bold" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
