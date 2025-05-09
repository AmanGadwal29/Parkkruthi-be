const Sub2CategoryItem = ({ item }) => {
    return (
      <li className="list-item parent-menu-third">
        <div className="toggle_item">
          <a className="link_item" href={`/browse/${item.alias}`}>
            <span className="link_item_name">{item.name}</span>
          </a>
        </div>
      </li>
    );
  };
  export default Sub2CategoryItem;
  