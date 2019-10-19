import React from "react";
import ProductRow from "./ProductRow";
import ProductCategoryRow from "./ProductCategoryRow";

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        // -1  means the item does not exisit as there is no -1 in array
        //console.log will only show the item does not exisits
        //and return nothing for the items that does not exisits
        return;
      }
      // if you console.log here it will show the product not -1 when searching for it
      // so the product that exisits in your search
      // console.log("product.name", product.name);
      if (inStockOnly && !product.stocked) {
        //this will check which product is not in stocked
        //and return nothing for the product not in stock
        return;
      }

      if (product.category !== lastCategory) {
        //when there is a change in product (search or filter)
        //the lastCategory is reset to null
        //the component will accept the product category available
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }

      //here will return all products except..
      //if the condition of product is not in stocked and product is not in search
      //it will return nothing and only products not met by the conditions
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;

      //lastCategory will always assign the last value
      //   console.log("lastCategory", lastCategory);
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default ProductTable;
