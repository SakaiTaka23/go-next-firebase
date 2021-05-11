import { useEffect, useState } from 'react';

type Response = {
  message: string;
};

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:5000/', {});
    const content: Response = await response.json();
    console.log(content);
    setMessage(content.message);
  };

  return <h1>{message}</h1>;
};

export default Home;
