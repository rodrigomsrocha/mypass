import { useCategoriesContext } from "@/context/categoriesContext";
import * as Accordion from "@radix-ui/react-accordion";
import { CreateNewCategoryModal } from "../CreateNewCategoryModal";

interface SidebarProps {
  categories: {
    title: string;
    quantity: number;
  }[];
}

export function Sidebar({ categories }: SidebarProps) {
  const { updateCurrentCategory } = useCategoriesContext();

  return (
    <aside className="w-72 p-8">
      <Accordion.Root collapsible type="single" defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Header className="flex items-center justify-between w-full">
            <Accordion.Trigger className="accordion-trigger">
              categories
            </Accordion.Trigger>
            <CreateNewCategoryModal />
          </Accordion.Header>
          <Accordion.Content>
            {categories.length !== 0 && (
              <ul className="pl-4 mt-8 flex flex-col gap-4 transition-all">
                {categories.map((category) => {
                  return (
                    <li
                      onClick={() => updateCurrentCategory(category.title)}
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
            )}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </aside>
  );
}
