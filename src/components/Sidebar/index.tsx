import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "phosphor-react";

const categories = [
  { title: "Social media", quantity: 3 },
  { title: "Streaming", quantity: 3 },
  { title: "Money", quantity: 2 },
  { title: "Games", quantity: 2 },
];

export function Sidebar() {
  return (
    <aside className="w-72 p-8">
      <Accordion.Root collapsible type="single" defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Header className="flex items-center justify-between w-full">
            <Accordion.Trigger className="accordion-trigger">
              categories
            </Accordion.Trigger>
            <button
              className="w-5 h-5 flex items-center justify-center transition-colors rounded-md hover:bg-zinc-700"
              type="button"
            >
              <Plus size={14} weight="bold" />
            </button>
          </Accordion.Header>
          <Accordion.Content>
            <ul className="pl-4 mt-8 flex flex-col gap-4 transition-all">
              {categories.map((category) => {
                return (
                  <li
                    className="flex justify-between items-center"
                    key={category.title}
                  >
                    <span>{category.title}</span>
                    <div className="bg-zinc-700 w-5 h-5 flex items-center justify-center rounded-md text-sm">
                      {category.quantity}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </aside>
  );
}
