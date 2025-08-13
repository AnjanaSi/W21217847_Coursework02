import React from 'react'
import { useLocation } from 'react-router-dom';
import MainHeader from '../layout/MainHeader';

const Home = () => {
  const location = useLocation();

  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userName");
  return (
    <section>
      {message && <p className="text-warning px-5">{message}</p>}
      {currentUser && (
        <h6 className="text-success text-center">
          {" "}
          You are logged-In as {currentUser}
        </h6>
      )}
      <MainHeader />
    </section>
  )
}

export default Home