// App.tsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DescriptionComponent from "./components/Description";
import { DataItem } from "./types";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [firstData, setFirstData] = useState<DataItem>({
    title: "",
    bodyText: "",
  });

  const getData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data.Pages);
    console.log(data);
    setFirstData(data.Pages[0]);
  };
  useEffect(() => {
    getData(
      "https://gist.githubusercontent.com/thehappybug/65a466dcdb0908767057b80f0cb7ea5d/raw/6f10747c5feb7ce91b83392f2cee23ae06b20fe6/doc.json"
    );
  }, []);
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div className="navbar">
          <Navbar list={data} />
        </div>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={`/${firstData.title.split(" ").join("")}`}
                  replace
                />
              }
            />
            {data.map((item, index) => (
              <Route
                path={
                  index === 0
                    ? `/${firstData.title.split(" ").join("")}`
                    : `/${item.title.split(" ").join("")}`
                }
                element={
                  <DescriptionComponent
                    title={item.title}
                    bodyText={item.bodyText}
                  />
                }
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
