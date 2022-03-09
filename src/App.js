import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Write from "./components/Write";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Entries from "./components/Entries";
import DiaryList from "./components/DiaryList";
import DiaryGraph from "./components/DiaryGraph";
import DiaryDetail from "./components/DiaryDetail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/write" element={<Write />} />
            <Route path="/entries" element={<Entries />}>
              <Route path="/entries/list" element={<DiaryList />} />
              <Route path="/entries/graph" element={<DiaryGraph />} />
            </Route>
            <Route path="/entries/:diary_id" element={<DiaryDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
