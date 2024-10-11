import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "./constant";
import { AddFoodPage, HomePage, NotFoundPage, SignInPage, SignUpPage } from "pages";
import { PrivateRoute } from "components";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PATH.DASHBOARD}
          element={<PrivateRoute Page={HomePage} />}
        />
        <Route
          path={PATH.ADD_FOOD}
          element={<PrivateRoute Page={AddFoodPage} />}
        />
        <Route path={PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
        <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
        <Route
          path={PATH.INVALID_URL}
          element={<Navigate to={PATH.NOT_FOUND} />}
        />
      </Routes>
      <ToastContainer autoClose={1500} position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
