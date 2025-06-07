import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { AnimatePresence, number } from "framer-motion"; // وارد کردن AnimatePresence
import "./index.css";
import HomePage from "./HomePage.js";
import users from "./users.json";
import WelcomeComponent from "./welcomePage.js";
import LoginComponent from "./signinPage.js";
import { form } from "framer-motion/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
   
  const [page, setPage] = useState("Home");
  const [formData, setFormData] = useState({
    name: "", // lowercase for consistency
    number: "",
    email: "john.smith@example.com",
    password: "1234",
  });

  const [card, setCard] = useState({
    name: "",
    number: "",
    cvv: "",
    expiry: "",
    type: "",
    balance: 0,
  });
  const [login, setLogin] = useState(false);

  const onDetails = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const { email, password } = formData;
    if (email && password) { // Only check when email and password are non-empty
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
     
        setFormData({
          name: user.name || "",
          number: user.number || "",
          email: user.email,
          password: user.password,
        });
        setLogin(true);
        setPage("Home");

        if (user.cards && user.cards.length > 0) {
          setCard(user.cards);  
        }

      } else {
        setLogin(false);
      }
    }
  }, [formData.email, formData.password]); // Only depend on email and password

  return (
    <AnimatePresence mode="wait">
      {page === "welcome" && (
        <WelcomeComponent key="welcome" setPage={setPage} />
      )}
      {page === "signIn" && (
        <LoginComponent
          key="signIn"
          setPage={setPage}
          onDetails={onDetails}
          Login={login}
        />
      )}
      {page === "Home" && (
        <HomePage
          key="home"
          name={formData.name} // lowercase for consistency
          card={card}
        />
      )}

 
    </AnimatePresence>
  );
}

root.render(<App />);