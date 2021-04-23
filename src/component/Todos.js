import React, { useState, useEffect } from "react";
import * as axios from "axios";
import { config, TodosUrl } from "./config";
import TodosItem from "./TodoItems";

export default function Todos() {
  const [data, setData] = useState([]);
  // const [percentage, setPercentage] = useState("0%");
  const callData = () => {
    axios.get(TodosUrl, config).then((result) => {
      setData(result.data);
    });
  };
  useEffect(() => {
    callData();
  }, []);

  return (
    <div>
      <div>
        <div key={data.id} className="Todos">
          {data.map((data) => (
            <div>
              <div className="Cards">
                <div className="Title">
                  <div>
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                  </div>
                </div>
                <div>
                  <TodosItem callData={callData} key={data.id} data={data} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
