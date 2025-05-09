import { useState } from "react";
import SubcategoryItem from "./SubcategoryItem";

const CategoryItem = ({ category, currentAlias }) => {
  const [show, setShow] = useState(true);

  const filteredSubcategories = category.children.filter(
    (sub) => sub.alias === currentAlias
  );

  return (
    <li className="list-item parent-menu-first active">
      <div className="toggle_item">
        <a className="link_item" href="/browse/plants">
          <span className="link_item_name">{category.name}</span>
        </a>
        {category.children?.length > 0 && (
          <span className="toggler-icon" onClick={() => setShow(!show)}>
            <i className={`icons8-${show ? "minus" : "plus"}-2`} />
          </span>
        )}
      </div>

      {show && (
        <ul className="second_level-menu child-menu">
          {filteredSubcategories.map((subcat, i) => (
            <SubcategoryItem key={i} subcategory={subcat} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;
