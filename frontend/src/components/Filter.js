import React from "react";

function Filter(props) {
  const handleFilter = (e) => {
    props.filterValue(e.target.value);
  };

  return (
    <select onChange={handleFilter}>
      <option value={1}>Latest - Oldest</option>
      <option value={2}>Oldest - Latest</option>
      <option value={3}>Most Likes</option>
    </select>
  );
}

export default Filter;
