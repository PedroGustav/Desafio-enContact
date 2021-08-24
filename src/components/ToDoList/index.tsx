import React, { useEffect, useState } from 'react';
import { Container } from './styles';
import ToDo from './ToDo';
import { useTodo } from '../../hooks/useToDo';


export interface handleEditProps{
    id: string;
    title: string;
}
export default function ToDoList(){

    const { toDoList } = useTodo();
    const [ list, setList ] = useState<JSX.Element>(<></>);



     useEffect( () => {

         setList
            (
                <Container>
                    {toDoList.map( toDo => (
                        <ToDo 
                        title={toDo.title} 
                        id={toDo.id} 
                        key={toDo.id} 
                        isDone={toDo.isDone}/>
                    ))}
                </Container>
            )
     }, [toDoList]);


    return  list;   
}