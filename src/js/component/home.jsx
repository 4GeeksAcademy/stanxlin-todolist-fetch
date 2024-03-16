import React, { useState, useEffect } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todo, setTodo] = useState([]);

    const apiURL = "https://playground.4geeks.com/apis/fake/todos/user/stanxlin";
    const getData = () => {
        fetch(apiURL)
        .then(response => response.json())
        .then(data => setTodo(data)) 
        .catch(error => console.log(error))
    };

    const updateData = async (newTodolist) => {
        let opts = {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodolist)
        }
        let response = await fetch(apiURL, opts)
        if (!response.ok){
            console.log("An error occured while trying to update")
            return false;
        }   else {
            console.log("Success")
            return true;
        }
    } 
    
    const addTodo = async () => {
        let newTodolist = todo.concat({
            label: inputValue, 
            done: false
        })
        // let newTodolist = [...todo, { 
        //     label: inputValue, 
        //     done: false
        // }]
        let result = await updateData(newTodolist)
        if (result){
            getData()
            setInputValue("")
        }
    }

    const deleteTodo = async (id) => {
        let newTodolist = todo.filter(item => item.id != id)
        if (newTodolist.length == 0){
            let result = await updateData([{
                label: "Example",
                done: false
            }])
            if (result){
                getData()
                setInputValue("")
        }
        }
        else{
            let result = await updateData(newTodolist)
        if (result){
            getData()
            setInputValue("")
        }
        }
    }


    useEffect(() => {
        getData()
    }, [])



    return (
        <div className="container">
            <h1>Very Random To Do List</h1>
            <ul>
                <li>
                    <input
                        type="text"
                        onChange={(event) => setInputValue(event.target.value)}
                        value={inputValue}
                        placeholder="What do you need to do?"
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                addTodo()
                            }
                        }}
                    />
                </li>

                {todo.map((task, index) => (
                    <li key={index}>
                        {task.label}
                        <i
                            className="fas fa-trash"
                            onClick={() =>
                                deleteTodo(task.id)
                            }
                        ></i>
                    </li>
                ))}
            </ul>
            <div>{todo.length} items left</div>
        </div>
    );
};

export default Home;