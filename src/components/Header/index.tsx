import React, { useCallback, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useTodo } from '../../hooks/useToDo';
import { Container } from './styles';


export const Header: React.FC = () => {

    //Para o controle do botão do updateAll
    const [ isDone, setIsDone ] = useState(true);
    
    const[ newToDoTitle, setNewToDoTitle ] = useState('');
    

    const { createToDo, updateAll } = useTodo();
    

    const handleCreateNewToDo = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if(newToDoTitle.length === 0){
      return;
    }

    createToDo(newToDoTitle);
    setNewToDoTitle('');
    
    }, [createToDo, newToDoTitle]);



    const handleUpdateAllToDo = useCallback(() => {
        updateAll(isDone);
        setIsDone(!isDone);
    }, [isDone, updateAll]);
    
    
    return(
        <Container>
            <button onClick={() => handleUpdateAllToDo()}>
                <FaChevronDown  
                    size={22}
                    color={isDone ? '#E6E6E6' : '#6E6E6E'}
                />
            </button>

            <form onSubmit={handleCreateNewToDo}>

            <input 
                type="text"
                placeholder="What needs to be done?"
                value={newToDoTitle}
                onChange={ e => setNewToDoTitle(e.target.value)} 
                />

            </form>
        </Container>

    );
};