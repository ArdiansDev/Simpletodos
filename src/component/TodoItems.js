import React from 'react';
import axios from "axios";
export default function Todos(props) {
    const ItemsUrl= `https://todos-project-api.herokuapp.com/todos/${props.id}/items`

    const authTodos = axios.create({
        baseURL:ItemsUrl
        headers :{
            Authorization=`Bearer ${accessToken}`
        }
    })

  return(
    
    <div className="Todos">

    </div>;
  )
}


