import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../components/CategoryList";
import ThreadList from "../components/Threads/ThreadList";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { setCategoryActionCreator } from "../states/threadsCategory/action";
import { createCategoryList } from "../utils";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { category = "", threads = [], users = [], authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categoryList = createCategoryList(threads);

  const pickCategory = (newCategory) => {
    dispatch(setCategoryActionCreator(newCategory));
  };

  const threadsFiltered = threads.filter(
    (thread) => thread.category === category || category === ""
  );

  const threadList = threadsFiltered.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  return (
    <section className="home-page">
      <header>
        <p>Kategori popular</p>
        <CategoryList category={category} categoryList={categoryList} pickCategory={pickCategory} />
      </header>

      <div className="home-page__content">
        <h4 className="card-title">Diskusi Tersedia</h4>
        <ThreadList threadList={threadList} />

        {authUser !== null && (
          <Link to="/new-thread" className="new-thread-button">
            <AiFillPlusCircle />
          </Link>
        )}
      </div>
    </section>
  );
}
