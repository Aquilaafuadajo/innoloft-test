import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Link to="product/6781">
      <p className="underline underline-offset-1 text-blue-400 font-semibold">
        Product
      </p>
    </Link>
  );
};

export default Home;
