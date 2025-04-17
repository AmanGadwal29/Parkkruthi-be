import { useState } from "react";
import Sub2CategoryItem from "./Sub2CategoryItem";

const SubcategoryItem = ({ subcategory }) => {
  const [show, setShow] = useState(true);
  const [limit, setLimit] = useState(6);

  return (
    <li className={`list-item parent-menu-second ${show ? "active" : ""}`}>
      <div className="toggle_item">
        <a className="link_item" href={`/browse/${subcategory.alias}`}>
          <i className="fa fa-angle-right"></i>
          <span className="link_item_name">{subcategory.name}</span>
        </a>
        {subcategory.children?.length > 0 && (
          <span className="toggler-icon" onClick={() => setShow(!show)}>
            <i className={`icons8-${show ? "minus" : "plus"}-2`} />
          </span>
        )}
      </div>

      {show && (
        <ul className="third_level-menu child-menu">
          {subcategory.children.slice(0, limit).map((sub2, index) => (
            <Sub2CategoryItem key={index} item={sub2} />
          ))}
          {subcategory.children.length > 6 && limit === 6 && (
            <div className="show_option">
              <span onClick={() => setLimit(subcategory.children.length)} className="show_btn more primary">
                <i className="icons8-plus-2"></i> Show More
              </span>
            </div>
          )}
        </ul>
      )}
    </li>
  );
};
export default SubcategoryItem;
