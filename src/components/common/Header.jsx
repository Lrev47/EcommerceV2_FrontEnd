import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  // Now this will NOT be undefined, because you have store.cart set up
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header>
      <nav>
        {/* Some nav items */}
        <Link to="/cart">Cart ({cartQuantity})</Link>
      </nav>
    </header>
  );
};

export default Header;
