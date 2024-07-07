import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/contexts/FirebaseAuth";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FinishSignIn from "./pages/FinishSignIn";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="finishSignIn" element={<FinishSignIn />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
