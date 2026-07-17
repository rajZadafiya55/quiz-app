import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/admin/Dashboard";
import AddQuestion from "./pages/admin/AddQuestion";
import ManageQuestion from "./pages/admin/ManageQuestion";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Result from "./pages/Result";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-question" element={<AddQuestion />} />
          <Route path="edit-question/:id" element={<AddQuestion />} />
          <Route path="manage-questions" element={<ManageQuestion />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;