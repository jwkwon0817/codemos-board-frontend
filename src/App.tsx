import React from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { BoardCreatePage } from './pages/BoardCreatePage';
import { Home } from './pages/Home';
import { BoardUpdatePage } from './pages/BoardUpdatePage';

export interface BoardType {
    id: number;
    title: string;
    content: string;
    createdDate: Date;
    modifiedDate: Date;
}

export interface CommentType {
    id: number;
    content: string;
    createdDate: Date;
    modifiedDate: Date;
    boardId: number;
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={ '/' } element={ <RootLayout /> }>
            <Route index element={ <Home /> } />
            <Route path={ '/create' } element={ <BoardCreatePage /> } />
            <Route path={ '/update/:id' } element={ <BoardUpdatePage /> } />
        </Route>,
    ),
);

const App = () => {
    return (
        <RouterProvider router={ router } />
    );
};

export default App;
