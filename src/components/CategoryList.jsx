import PropTypes from "prop-types";

export default function CategoryList({ category, categoryList, pickCategory }) {
  return (
    <div className="categories-list">
      {categoryList ? (
        categoryList.map((item) => (
          <button
            key={`cat-${item}`}
            type="button"
            onClick={() => pickCategory(item)}
            className={`category-item ${category === item ? "selected" : ""}`}
          >
            {`#${item}`}
          </button>
        ))
      ) : (
        <>There is no category</>
      )}
    </div>
  );
}

CategoryList.propTypes = {
  category: PropTypes.string.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
  pickCategory: PropTypes.func.isRequired,
};
