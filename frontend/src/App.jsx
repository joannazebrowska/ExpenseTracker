import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import CategoryForm from './components/Category form/CategoryForm';
import CategoryList from './components/CategoryList/CategoryList';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [refreshExpenses , setRefreshExpenses] = useState(false);
    const handleExpenseAdded = () => {
        setRefreshExpenses(!refreshExpenses);
    };

    const [refreshCategories, setRefreshCategories] = useState(false);
    const handleCategoryAdded = () => {
        setRefreshCategories(!refreshCategories);
    }; 

    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<LoginForm /> } />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<><ExpenseList key={refreshExpenses} /> <ExpenseForm onExpenseAdded={handleExpenseAdded} /> </>} /> 
                <Route path="/categories" element={<><CategoryList key={refreshCategories} /> <CategoryForm onCategoryAdded={handleCategoryAdded} /> </> } />
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    );
}
export default App;