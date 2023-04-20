import { PasswordItem } from "@/components/PasswordItem";
import { Sidebar } from "@/components/Sidebar";
import { Category, useCategoriesContext } from "@/context/categoriesContext";
import { db } from "@/lib/firebase";
import { adminSDK } from "@/lib/firebaseAdmin";
import * as Accordion from "@radix-ui/react-accordion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { ArrowLeft, MagnifyingGlass, Plus } from "phosphor-react";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/sign-up",
        permanent: false,
      },
    };
  }

  try {
    const token = await adminSDK.auth().verifyIdToken(cookies.token);
    if (!token) {
      return {
        redirect: {
          destination: "/sign-up",
          permanent: false,
        },
      };
    }

    const categoriesQuery = query(
      collection(db, "categories"),
      where("userId", "==", token.uid)
    );
    const categoriesSnap = await getDocs(categoriesQuery);

    const categories: Category[] = [];

    categoriesSnap.forEach((category) => {
      categories.push(category.data() as Category);
    });

    return {
      props: {
        initalCategories: categories,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/sign-up",
        permanent: false,
      },
    };
  }
};

export default function Index({
  initalCategories,
}: {
  initalCategories: Category[];
}) {
  const {
    categories,
    getInitialCategories,
    currentCategory,
    updateCurrentCategory,
  } = useCategoriesContext();

  useEffect(() => {
    getInitialCategories(initalCategories);
    updateCurrentCategory(initalCategories[0].title);
  }, [
    categories,
    getInitialCategories,
    initalCategories,
    updateCurrentCategory,
  ]);

  const sidebarCategories = categories.map((category) => {
    return {
      title: category.title,
      quantity: category.passwords.length,
    };
  });

  return (
    <div className="py-8">
      <div className="flex border border-zinc-800 rounded-lg">
        <Sidebar categories={sidebarCategories} />
        <div className="w-full border-l border-zinc-800 p-8">
          {categories.length === 0 ? (
            <div className="flex justify-center items-center gap-2">
              <ArrowLeft className="text-violet-600" size={18} />
              <span>Create a new categorie and get started</span>
            </div>
          ) : (
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
              {currentCategory?.passwords.length === 0 ? (
                <div>
                  <span>add a new password to your category</span>
                </div>
              ) : (
                <Accordion.Root
                  className="flex flex-col gap-4"
                  collapsible
                  type="single"
                  defaultValue="item-1"
                >
                  {currentCategory?.passwords.map((password) => {
                    return (
                      <PasswordItem
                        key={password.platform}
                        item={password.platform}
                        password={password}
                      />
                    );
                  })}
                </Accordion.Root>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
