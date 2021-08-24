import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { uuid } from 'uuidv4';

export type  filter = 'all' | 'completed' | 'active';


export interface ToDo{
    id: string;
    title: string;
    isDone: boolean;
}


interface toDoContextState{
    toDoList: ToDo[];
    totalCompleted: number;
    totalActive: number;
    activeFilter: filter;
    updateActiveFilter: (filter: filter) => void;
    createToDo: ( title : string) => void;
    deleteToDo: (id: string) => void;
    updateToDoTitle: (data: UpdateProps) => void;
    updateToDoIsDone: (id: string, state: boolean) => void;
    updateAll: (state: boolean) => void;
    clearAllCompleted: () => void;
}


interface UpdateProps{
    id: string;
    title: string;
}


const toDoContext = createContext<toDoContextState>({} as toDoContextState);

export const ToDoProvider: React.FC =({children}) => {

    const [ toDoList, setToDoList ] = useState<ToDo[]>([]);
    const [ totalCompleted, setTotalCompleted ] = useState(0);
    const [ totalActive, setTotalActive] = useState(0);
    const [ newToDoList, setNewToDoList ] = useState<ToDo[]>([]);
    const [ activeFilter, setActiveFilter ] = useState<filter>(
        
        //verifica se o localStorage já tem um filtro guardado(quando o user seleciona o filtro e atualiza a página.)
        localStorage.getItem('to.dos@filter')  
        ? 
        localStorage.getItem('to.dos@filter') as filter 
        : 
        // se não houver, o filtro por padão é 'all'
        'all' );
    




 
    // Buscando as tarefas da API:  
    useEffect(() => {

        api.get('/todos')
        .then(response => setToDoList(response.data));

    }, []);


    //Aplicando os filtros
    useEffect (() => {
        
        // aplicando o filtro nas tarefas resgatadas da API e salvando em um novo estado
        setNewToDoList(toDoList.filter( todo => {
            switch (activeFilter){
                case 'active':
                    return !todo.isDone;
                case 'completed':
                    return todo.isDone;
                default:
                    return true;
            }
        }))

        
        //contagem de tarefas completas
        const totalCompleted = toDoList.reduce((acc, item) => {

            if(item.isDone === true){
                return acc + 1;
            }
    
            return acc;
            }, 0);
    
            
            setTotalCompleted(totalCompleted);
            setTotalActive(toDoList.length - totalCompleted);

    }, [activeFilter, toDoList]);

    

    // criação de uma nova tarefa:
    const createToDo = useCallback((title: string) => {
        console.log('aqui')
        const toDo = {
            id: uuid(),
            title: title,
            isDone: false,
        }

        setToDoList([toDo, ...toDoList]);

    }, [toDoList]);


    // atualizando o filtro
    const updateActiveFilter = useCallback((filter: filter)  => {
        setActiveFilter(filter);
        localStorage.setItem('to.dos@filter', filter);
    }, []);
  

    //atualizando o título da tarefa
    const updateToDoTitle = useCallback(({ id, title }: UpdateProps) => {
        

        const IndexToDo = toDoList.findIndex(item => item.id === id);

        
        const newToDoList = [...toDoList];


        newToDoList[IndexToDo].title = title;


        setToDoList(newToDoList);
       
        
    }, [toDoList]);


    //apagrando a tarefa
    const deleteToDo = useCallback((id: string) => {

        const newToDoList = toDoList.filter( item => item.id !== id);
        console.log(newToDoList);

        setToDoList(newToDoList);

    }, [toDoList])


    //atualizando a 'conclusão' de uma tarefa
    const updateToDoIsDone = useCallback((id, state) => {

        const indexToDo = toDoList.findIndex(item => item.id === id);

        const newToDoList = [...toDoList];

        newToDoList[indexToDo].isDone = state;
        
        setToDoList(newToDoList);
            
    }, [toDoList]);


    //atualizando todas as tarefas
    const updateAll = useCallback((state) => {
       
        for(const toDo of toDoList ){
            updateToDoIsDone(toDo.id, state);
        }

    }, [ toDoList, updateToDoIsDone ]);

    //apagando todas as tarefas
    const clearAllCompleted = useCallback(() => {
        
        const newList = toDoList.filter( toDo => toDo.isDone === false);

        setToDoList(newList);
    }, [setToDoList]);

    
    return(
        <toDoContext.Provider 
            value={{ 
                toDoList: newToDoList,
                totalCompleted,
                totalActive,
                activeFilter,
                updateActiveFilter,
                createToDo,
                deleteToDo, 
                updateToDoTitle, 
                updateToDoIsDone, 
                updateAll,
                clearAllCompleted,
            } as toDoContextState}>

            {children}

        </toDoContext.Provider>
    );
}


// transformando o contexto em hook
export function useTodo(): toDoContextState{
    const context = useContext(toDoContext);

    if(!context){
        throw new Error('o Contexto de ToDo só pode ser utlizidado juntamente com o ToDoProvider.');
    }

    return context;
}