import React from 'react';
import { useLogin } from '~/hooks';

const Home = () => {
  useLogin();

  return (
    <div>
      Hello world
    </div>
  );
};

export default Home;
