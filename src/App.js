import { Routes, Route } from "react-router-dom";

import Write from "./components/WritePage/Write";
import Entries from "./components/EntriesPage/Entries";
import DiaryList from "./components/EntriesPage/DiaryList";
import DiaryGraph from "./components/EntriesPage/DiaryGraph";
import DiaryDetail from "./components/DetailPage/DiaryDetail";
import GettingStarted from "./components/GettingStartedPage/GettingStarted";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";

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
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
