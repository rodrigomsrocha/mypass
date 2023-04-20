import { ReactNode, createContext, useContext, useState } from "react";

export interface Password {
  platform: string;
  email: string;
  password: string;
  website: string;
  platform_img: string;
}

export interface Category {
  title: string;
  userId: string;
  passwords: Password[];
}

interface CategoriesContextProps {
  categories: Category[];
  currentCategory: Category | null;
  getInitialCategories: (categories: Category[]) => void;
  updateCurrentCategory: (currentCategoryTitle: string) => void;
}

interface CategoriesContextProviderProps {
  children: ReactNode;
}

const CategoriesContext = createContext({} as CategoriesContextProps);

export function CategoriesContextProvider({
  children,
}: CategoriesContextProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  const getInitialCategories = (categories: Category[]) => {
    setCategories(categories);
  };

  const updateCurrentCategory = (currentCategoryTitle: string) => {
    setCurrentCategory(
      categories.find((category) => category.title === currentCategoryTitle) ??
        null
    );
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        getInitialCategories,
        currentCategory,
        updateCurrentCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategoriesContext() {
  return useContext(CategoriesContext);
}
