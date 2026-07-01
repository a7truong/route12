import logo from "./assets/logo.png";
import VendingSchedule from "./sections/VendingSchedule";
import "./App.scss";

function App() {
  return (
    <>
      <section className="section" id="top">
        <div>
          <img src={logo} className="base" width="300" alt="" />
        </div>
        <div>
          <h1>Route 12 Cards & Collectibles</h1>
        </div>
      </section>
      <section className="section" id="vending-schedule">
        <VendingSchedule />
      </section>
    </>
  );
}

export default App;
