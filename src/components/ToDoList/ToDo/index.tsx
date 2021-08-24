import React, { useCallback, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTodo } from '../../../hooks/useToDo';
import { Container, EditInput, Title } from './styles';

interface ToDoProps{
    title: string;
    id: string;
    isDone: boolean;
}

export default function ToDo({ title, id, isDone}: ToDoProps){

    const [toDoEdit, setToDoEdit] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const [Done, setDone] = useState(isDone);
    
    const editInput = useRef<HTMLInputElement>(null);


    const { deleteToDo, updateToDoTitle, updateToDoIsDone } = useTodo();

    

    const  handleEditTitle = useCallback(() => {
        setIsEditing(false);
        editInput.current?.focus();
        setIsEditing(true);

    }, []);

    const handleUpdateToDo = useCallback((id, title) => {
        if(title.length === 0){
            deleteToDo(id);
        }else{
            updateToDoTitle({id, title});
            setIsEditing(false);
        }
    }, [deleteToDo, updateToDoTitle]);


    const handleUpdateIsDone = useCallback(() => {
        setDone(!Done);
        updateToDoIsDone(id, Done);
    }, [Done, id, updateToDoIsDone]);

    
    return(
        <Container>
            <input type='checkbox' id="isChecked"  checked={isDone} onClick={handleUpdateIsDone}/>
            <Title onDoubleClick={handleEditTitle} isEditing={isEditing}>
                {title}
            </Title>
            <EditInput 
                type="text" 
                ref={editInput}  
                isEditing={isEditing} 
                onBlur={() => handleUpdateToDo(id, toDoEdit)}
                value={toDoEdit}
                onChange={e => setToDoEdit(e.target.value)}
                />
            <button onClick={() => deleteToDo(id)}>
                <FiX size={22}/>
            </button>
        </Container>
    );
}