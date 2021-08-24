import styled, { css } from 'styled-components';
import checkedSvg from '../../../assets/checked.svg';

export const Container = styled.li`
    list-style: none;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #EDEDED;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    position: relative;



    input[type="checkbox"]{
        -webkit-appearance: none;
        width: 1.25rem;
        height: 1.25rem;
        border: 1px solid #ADADAD;
        border-radius: 4px;
        margin-right: 1rem;
        transition: all 0.2s;
        z-index: 1;

        &:checked{
            background-color: #3D3D3D;
            border-color: #5D5D5D;

            & + label{
                text-decoration: line-through;
                color: #ADADAD;
            }
        }

        &:focus, &:hover{
            box-shadow: 0 0 3px #ADADADaa;
            border-color: #DDDDDD;
        }

        &:after {
        content: "";
        width: 1.8rem;
        height: 1.8rem;
        position: absolute;
        left: 8px;
        top: 15px;
        background-image: url(${checkedSvg});
        background-size: 40px;
        background-repeat: no-repeat;
        background-position: center;
    }

    }


    button{
        display: none;
        border: none;
        outline: none;
        color: #CC000055;
        height: 100%;
        background: transparent;
        transition: color 0.2s;

        &:hover{
            color: #CC0000;
        }
    }

    &:hover button{
        display: block;
    }
`;

interface TitleProps{
    isEditing: boolean;

}
export const Title = styled.label<TitleProps>`
    ${(props) => props.isEditing ?
       css`
            display: none;
       `
    :
        css`
            display: block;
        `
    }

    user-select: none;
    flex: 1;
    font-size: 1.5rem;
    color: #4D4D4D;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    z-index: 1;

`;

export const EditInput = styled.input<TitleProps>`

    ${(props) => props.isEditing
    ?
        css`
            display: flex;
        `
    :
        css`
            display: none;
        `
    }

    color: #4D4D4D;
    cursor: default;
    font-size: 1.5rem;
    height: 100%;
    position: absolute;
    z-index: 0;
    left: 48px;
    border: 0;
    outline: none;
    transition: all 0.2s;

    &:focus{
        border: 1px solid #0000bb;
        box-shadow: inset 0 0 15px 10px rgba(0,0,200, 0.03);
    }
`;