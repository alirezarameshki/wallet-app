import { useState } from "react";
import { motion } from "framer-motion"; // وارد کردن Framer Motion
import Icons from "./icons.js";

function LoginComponent({ onDetails, Login, setPage }) {

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassAlert, setShowPassAlert] = useState(false);

  // تعریف انیمیشن‌ها
  const pageVariants = {
    initial: { x: "100%", opacity: 0 }, // صفحه از راست وارد می‌شود
    animate: { x: 0, opacity: 1 }, // صفحه در حالت عادی
    exit: { x: "-100%", opacity: 0 }, // صفحه به چپ خارج می‌شود
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Login) {
        alert("مشخصات درسته")
      setPage("Home");
      setShowPassAlert(false);
    } else {
      setShowPassAlert(true);
    }
  };

  return (
    <motion.div
      className="sign-in"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <div className="sign-in_backBtn">
        <div onClick={() => setPage("welcome")} className="back-btn">
          <img src="../img/Backbtnsvg.svg" alt="Back" />
        </div>
      </div>

      <div className="sign-in-head">
        <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
      </div>

      <form onSubmit={onSubmit} className="sign-in-form">
        {Icons.slice(isLogin ? 2 : 0).map((item, i) => (
          <div key={i} className="sign-in-input_div">
            <p className="sign-in_placeholder">{item.PlaceHolder}</p>
            <img
              className="sign-in_placeholder-img"
              src={item.Image}
              alt={`${item.PlaceHolder} icon`}
            />
            <input
              onChange={onDetails}
              type={item.type === "password" ? (showPassword ? "text" : "password") : item.type}
              placeholder={item.example}
              className="sign-in-input-field"
              name={item.name}
              required
            />
            {item.type === "password" && item.Show && (
              <img
                className="sign-in_show-password"
                src={showPassword ? "../img/showActive.svg" : item.Show}
                alt="Show password"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
        ))}

        <div className={`wrongPassword ${showPassAlert ? "" : "display"}`}>
          <div className="wrongP">
            <img src="../img/X-icon.svg" alt="Error icon" />
          </div>
          <div className="wrongPass_title">
            <p>The email or password is incorrect</p>
          </div>
        </div>

        <button type="submit" className="sign-in-button">
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        <div className="signup_div">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <big onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Sign In"}
            </big>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

export default LoginComponent;