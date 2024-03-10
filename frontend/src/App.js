import React, { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

function App() {
  // State variable to track login status
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    // Set loggedIn to true when user successfully logs in
    setLoggedIn(true);
  };

  // JSX for rendering either Dashboard or Login component based on login status
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Render Dashboard component if loggedIn is true, otherwise render Login component */}
      {loggedIn ? <Dashboard /> : <Login onLogin={handleLogin} setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
