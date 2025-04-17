import CategoryItem from "./CategoryItem";

const CategorySide = ({ categories, currentAlias }) => {
  return (
    <div className="category-sidebox">
      <div className="sidebar-header cursor collapsed">
        <span className="filter_heading uppercase">Categories</span>
      </div>
      <div className="collapse-panel">
        <div className="sidebar-nonscroller">
          <ul className="nav category-nav">
            {categories.map((category, idx) => (
              <CategoryItem
                key={idx}
                category={category}
                currentAlias={currentAlias}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategorySide;
