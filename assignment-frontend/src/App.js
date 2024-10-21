import "./App.css";
import Sidebar from "./components/Sidebar";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="lg:flex lg:gap-5 md:flex min-h-screen lg:m-6">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Menu />} />
          </Routes>
        </main>
      </div>
    </RecoilRoot>
  );
}

export default App;
