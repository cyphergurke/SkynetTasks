import React, { useEffect, useState } from 'react'
import { Todo } from '../../model';
import { SkynetClient } from 'skynet-js'
//import { ContentRecordDAC } from "@skynetlabs/content-record-library"; 



const client = new SkynetClient("https://siasky.net");


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


export const MySkyLogin: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    const hostApp = "host-app.hns";

    const [isLoggedin, setLoggedin] = useState<boolean>()
    const [myskytodos, setMySkyTodos] = useState<Todo[]>([])
    const [myskyCompletedtodos, setMySkyCompletedTodos] = useState<Todo[]>([])
    const [todosSaved, setTodosSaved] = useState<boolean>(false)



    //MySky Login popup
    async function requestLogin() {
        const mySky = await client.loadMySky(hostApp);
        let loggedIn = await mySky.checkLogin();
        try {
            if (!loggedIn) {
                mySky.requestLoginAccess();
            }
        } catch (error) {
            console.log(error);
        }
    }
    //MySky Logout
    async function logout() {
        const mySky = await client.loadMySky(hostApp);
        try {
            await mySky.logout();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function handleLogin() {
            const mySky = await client.loadMySky(hostApp);
            const loggedIn = await mySky.checkLogin();
            if (loggedIn === true) {
                setLoggedin(true)
            } else {
                setLoggedin(false)
            }
        }
        const intervalfunc = setInterval(() => {
            handleLogin()

        }, 1000);
        return () => clearTimeout(intervalfunc);
    }, [requestLogin, logout])

    //Load Todos from Skynet

    async function getMyTodos() {
        try {
            const mySky = await client.loadMySky(hostApp);
            const { data, dataLink } = await mySky.getJSON(hostApp + "/todos.json");
            setMySkyTodos(data?.todos as Todo[])
            setMySkyCompletedTodos(data?.completedTodos as Todo[])
            setTodos(myskytodos)
            setCompletedTodos(myskyCompletedtodos)
        } catch (error) {
            console.log(error)
            requestLogin()
        }
    }
    async function saveMyTodos() {
        try {
            const mySky = await client.loadMySky(hostApp);
            // Set discoverable JSON data at the given path. The return type is the same as getJSON.
            const { data, dataLink } = await mySky.setJSON(hostApp + "/todos.json", { todos: todos, completedTodos: completedTodos });
        } catch (error) {
            console.log(error)
            requestLogin()
        }
    }


    const load = () => {
        console.log(myskytodos)
        getMyTodos()

    }
    const save = () => {
        saveMyTodos()
        if (myskytodos !== todos || completedTodos !== myskyCompletedtodos) {
            saveMyTodos()
            setTodosSaved(true)
        }
    }

    //encrypted Data

    /* 
        //MySky init 
        async function initMySky() {
            try {
    
                // Initialize MySky.
                const mySky = await client.loadMySky(hostApp);
            } catch (error) {
                console.log(error)
            }
        }
        initMySky()
        //Adding DACs
        async function loadDacsExample() {
            try {
                const mySky = await client.loadMySky(hostApp);
    
                // Initialize DAC, auto-adding permissions.
                const dac = new ContentRecordDAC()
                await mySky.loadDacs(dac);
            } catch (error) {
                console.log(error)
            }
        }
     */
    //



    return (
        <>

            {isLoggedin == undefined || !isLoggedin && (
                < button className='mysky__button login' onClick={() => requestLogin()}>Login</button>
            )}
            {isLoggedin && (
                < button className='mysky__button logout' onClick={() => logout()}>Logout</button>
            )
            }

            <button className='mysky__button load' onClick={() => load()}>Load</button>
            <button className='mysky__button save' onClick={() => save()}>Save</button>

        </>
    )
}

