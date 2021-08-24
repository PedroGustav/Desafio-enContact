import React from 'react';
import Footer from '../../components/Footer';
import { Header } from '../../components/Header';
import ToDoList from '../../components/ToDoList';

export default function Dashboard(){

    return(
        <>
            <Header/>
            <ToDoList/>
            <Footer/>
        </>
    );
}