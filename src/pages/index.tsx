import { MagnifyingGlass, Plus } from "phosphor-react";
import { PasswordItem } from "@/components/PasswordItem";
import { Sidebar } from "@/components/Sidebar";
import * as Accordion from "@radix-ui/react-accordion";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import { PagesLayout } from "@/components/Layouts/pagesLayout";

const Index: NextPageWithLayout = () => {
  return (
    <div className="py-8">
      <div className="flex border border-zinc-800 rounded-lg">
        <Sidebar />
        <div className="w-full border-l border-zinc-800 p-8">
          <div className="max-w-3xl mx-auto">
            <header className="flex justify-between mb-8">
              <label
                className="border border-zinc-800 rounded-md flex items-center text-gray-200 py-2 px-4 gap-2"
                htmlFor="search"
              >
                <input
                  className="bg-transparent outline-none placeholder:text-zinc-800"
                  placeholder="Search"
                  type="text"
                  id="search"
                  name="search"
                />
                <MagnifyingGlass size={18} className="text-zinc-800" />
              </label>
              <button
                type="button"
                className="bg-violet-600 px-4 rounded-md flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Plus size={18} weight="bold" />
                Add new
              </button>
            </header>
            <Accordion.Root
              className="flex flex-col gap-4"
              collapsible
              type="single"
              defaultValue="item-1"
            >
              <PasswordItem item="item-1" />
              <PasswordItem item="item-2" />
              <PasswordItem item="item-3" />
            </Accordion.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <PagesLayout>{page}</PagesLayout>;
};

export default Index;
