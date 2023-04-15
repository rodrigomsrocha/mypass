import { PagesLayout } from "@/components/Layouts/pagesLayout";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";

const Generate: NextPageWithLayout = () => {
  return <h1 className="text-3xl font-bold underline">Generate</h1>;
};

Generate.getLayout = function getLayout(page: ReactElement) {
  return <PagesLayout>{page}</PagesLayout>;
};

export default Generate;
