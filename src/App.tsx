import { Route, Routes } from "react-router-dom";

import All from "./views/All";
import Dashboard from "./views/Dashboard";
import Detail from "./views/Detail";
import Create from "./views/Create";
import Category from "./views/Category";
import BarChart from "./views/BarChart";
import Edit from "./views/Edit";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="all" element={<All />} />
        <Route path="create" element={<Create />} />
        <Route path="category" element={<Category />} />
        <Route path="chart" element={<BarChart />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
