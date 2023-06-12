import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import ToatalCase from "./components/ToatalCase";
import TodayCase from "./components/TodayCase";
import AllCasesDetailPage from "./components/recordDetailpage/AllCasesDetailPage";
import ResponsiveSideBar from "./components/Navbar/ResponsiveSideBar";
import TodayCasesDetailPage from "./components/recordDetailpage/TodayCasesDetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveSideBar />
        <Routes>
          <Route path="/" element={<ToatalCase />} />
          <Route path="/allCases" element={<ToatalCase />} />
          <Route path="/new-allCasesDetailPage" element={<AllCasesDetailPage />} />
          <Route path='/allCasesDetailPage/:id' element={<AllCasesDetailPage/>}/>

          <Route path="/todayCases" element={<TodayCase />} />
          <Route path="/new-todayCasesDetailPage" element={<TodayCasesDetailPage />} />
          <Route path='/todayCasesDetailPage/:id' element={<TodayCasesDetailPage/>}/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
