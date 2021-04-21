import React, { Component } from "react";
import * as axios from "axios";
import { accessToken } from "./config";

const TodosUrl = "https://todos-project-api.herokuapp.com/todos/";
export default class Todos extends Component {
  componentDidMount() {
    this._fetchData();
    const authTodos = axios.create({
      baseURL: TodosUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "*/*",
      },
    });

    const config = {
      headers: {
        // "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${accessToken}`,
        Host: "todos-project-api.herokuapp.com",
      },
    };
    axios.get(TodosUrl, config).then((result) => {
      console.log(result);
    });
  }

  _fetchData = async () => {
    try {
      const res = await axios.get(TodosUrl, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log({ res });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return <div className="Todos">tes </div>;
  }
}
