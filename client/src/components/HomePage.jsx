const HomePage = () => {
  return (
    <main className=" container row">
      <div className="col col-md-5 col-lg-4 m-auto">

      <h1>Home Page</h1>
      <p>This page is under development.</p>
      <a href="/login" className="m-3">
        <button className="btn btn-primary">Login</button>
      </a>
      <a href="/register">
        <button className="btn btn-primary">Register</button>
      </a>
      </div>
    </main>
  );
};

export default HomePage;
