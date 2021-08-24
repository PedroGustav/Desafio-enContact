import styled from 'styled-components';


export const Container = styled.header`

    width: 100%;
    height: 65px;
    display: flex;
    padding: 0.75rem;
    background-color: #FFF;
    box-shadow: 0px 3px  20px 15px rgba(0,0,0,0.02);

    button{
        border: none;
        background: none;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form{
        display: flex;
        align-items: center;
    }
    input{
        flex: 1;
        border: none;
        outline: none;
        margin-left: 1rem;
        font-size: 1.5rem;
        color: #4D4D4D;

        &::placeholder{
            font-size: 1.5rem;
            font-weight: 400;
            color: #E6E6E6;
            font-family: Arial, Helvetica, sans-serif;
            cursor: text;
            font-style: italic;
        }
    }


`;