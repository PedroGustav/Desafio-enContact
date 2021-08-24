import styled, { css } from 'styled-components';

export const Container = styled.footer`
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #FFF;
    padding: 16px;

    p{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        color: #777777;
        margin-right: 90px;
    }

    >button{
        font-size: 14px;
        color: #777777;
        background-color: transparent;
        outline: transparent;
        border: none;
        margin-left: 60px;

        &:hover{
            color: #555555;
            text-decoration: underline;
        }
    }
`;

interface FilterButtonProps{
    isActive: boolean;
}
export const FilterButton = styled.button<FilterButtonProps>`

    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    outline: none;
    background-color: transparent;
    padding: 3px 7px;
    border-radius: 2px;
    font-size: 14px;
    color: #777777;

    ${(props) => props.isActive 
    ?
        css`
            border: 1px solid rgba(175,47,47,0.2);
        `
    : 
        css`
        border: 1px solid transparent;
        `
    }
    
    & + button{
        margin-left: 16px;
    }

    &:hover{
        border: 1px solid rgba(175,47,47,0.1);
    }
        


`;