import React from "react";
import Loader from "../components/common/Loader";
// Adjust path as needed

const SomePage = () => {
  const [loading, setLoading] = React.useState(false);

  // Simulate an async operation
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>Welcome to Some Page</h1>
      {loading && <Loader />}
      {!loading && <p>Content loaded!</p>}
    </div>
  );
};

export default SomePage;
