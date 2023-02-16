import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

function App() {
  const url = "https://course-api.com/react-tours-project";
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const fetchTour = async () => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      setTours(data);

      setLoading(false);
    } catch (console) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTour();
  }, []);
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTour()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App;
