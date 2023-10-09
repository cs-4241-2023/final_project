import "../../App.css";

function Header() {
  return (
    <>
      <div className="header">
        <div className="greeting-card">
          <div className="greeting-text">Hello, User!</div>
          <div className="greeting-info">
            {"time"} | {"date"}
          </div>
        </div>
        <div className="weather-card">
          <span class="material-symbols-outlined">sunny</span>
          <div className="weather-info">
            <div className="degrees">78°F</div>
            <div className="weather-description">Sunny</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
