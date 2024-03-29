import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Nav from "./components/navbar/navbar.component";
import Shop from "./routes/shop/shop.component";
import Authentic from "./routes/authentication/auth.component";
import Checkout from "./routes/checkout/checkout.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.actions";
import Proceed from "./routes/proceed/proceed";
import Success from "./routes/success/success";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/login" element={<Authentic />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/proceed" element={<Proceed />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  );
};

export default App;
