import { useState } from "react";
import CategoryList from "../components/CategoryList";
import { loginActionCreator } from "../states/auth/action";
import Wrapper from "./utils/Wrapper";

export default {
  title: "Category",
  component: CategoryList,
};

function List() {
  const [category, setCategory] = useState("kategori-1");
  const categoryList = ["kategori-1", "kategori-2", "kategori-3"];

  const pickCategory = (newCategory) => {
    setCategory(newCategory);
  };
  return (
    <Wrapper actions={[loginActionCreator(null)]}>
      <CategoryList category={category} categoryList={categoryList} pickCategory={pickCategory} />
    </Wrapper>
  );
}

export { List };
