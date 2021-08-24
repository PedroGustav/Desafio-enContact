import React from 'react';
import { useTodo } from '../../hooks/useToDo';
import { Container, FilterButton } from './styles';

export default function Footer(){

    const { totalCompleted, activeFilter, updateActiveFilter, totalActive, clearAllCompleted } = useTodo();
    

    return(

        <Container>

            <p>{activeFilter === 'completed' ? totalCompleted : totalActive} itens left</p>

            <div>


                <FilterButton  
                onClick={() => updateActiveFilter('all')} 
                isActive={activeFilter === 'all'}
                >
                All
                </FilterButton>
                

                <FilterButton   
                onClick={() => updateActiveFilter('active')} 
                isActive={activeFilter === 'active'} 
                >
                Active
                </FilterButton>
                

                <FilterButton  
                onClick={ () =>updateActiveFilter('completed')} 
                isActive={activeFilter === 'completed'}
                >
                Completed
                </FilterButton>


            </div>

            {/* Se tiver alguma task completa, o botão aparece */}
            { totalCompleted  !==  0  ?  <button onClick={clearAllCompleted}>Clear completed</button> : <></> }
            

        </Container>
    );
}