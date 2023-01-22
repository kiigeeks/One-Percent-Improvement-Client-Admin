import MainLayouts from "./layouts/mainLayouts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import { getMe } from "./utilities/fetchApi";
import { ToastContainer } from 'react-toastify';

function App() {
  const { user, dispatch } = useContext(AuthContext)

  useEffect(() => {
    dispatch(getMe(dispatch))
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={user ? <MainLayouts /> : <Login />}/>
          <Route path="/login" element={user ? < Navigate to={"/"} /> : <Login />}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
