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
import Input from "./components/Input";

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [dataState, setDataState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstData, setFirstData] = useState<DataItem>({
    title: "",
    bodyText: "",
  });

  const [clicked, setClicked] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const getData = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.Pages);
      if (data.Pages.length > 0) {
        setFirstData(data.Pages[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDataState(true);
      setLoading(false);
    }
  };

  const onClick = () => {
    setClicked(true);
    getData(input);
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}

      {!loading && !clicked && !dataState && (
        <Input onClick={onClick} input={input} setInput={setInput} />
      )}

      {!loading && clicked && dataState && data.length === 0 && (
        <h1>NO RESULTS FOUND</h1>
      )}

      {!loading && clicked && data.length > 0 && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default App;
