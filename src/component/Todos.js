import React, { useState, useEffect } from "react";
import * as axios from "axios";
import { config, TodosUrl } from "./config";
import TodosItem from "./TodoItems";
import Items from "./Items";

export default function Todos() {
  const [dataItems, setDataItems] = useState([]);
  const callData = async () => {
    try {
      const resDataGroup = await axios.get(TodosUrl, config);
      const results = await Promise.all(
        resDataGroup.data.map(async (val) => {
          const resDataItem = await axios.get(
            `${TodosUrl}${val.id}/items`,
            config
          );
          return { ...val, items: resDataItem.data };
        })
      );

      setDataItems(results);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    callData();
  }, []);

  return (
    <div>
      <div>
        <div className="Todos">
          {dataItems.map((data) => (
            <div key={data.id} className="ContainerCard">
              <div className="Cards">
                <div className="Title">
                  <div>
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                  </div>
                </div>
                <div>
                  {data.items.map((item) => (
                    <Items
                      callData={callData}
                      key={item.id}
                      // data={data}
                      data={item}
                    />
                  ))}

                  <TodosItem
                    callData={callData}
                    key={data.id}
                    data={data}
                    dataItems={dataItems}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
