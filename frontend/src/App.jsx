import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import LoginForm from './components/Login/LoginForm';
import RegisterForm from './components/Register/RegisterForm';
import CategoryForm from './components/Category form/CategoryForm';
import CategoryList from './components/CategoryList/CategoryList';
import { Box } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar/NavBar';
import ExpenseChart from './components/Reports/ExpenseChart';

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
        <NavBar />
            <Routes>
                <Route path="/" element={<LoginForm /> } />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/expenses" element={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                        <ExpenseList key={refreshExpenses} />
                    </Box>
                    } /> 
                <Route path="/categories" element={
                    <Box>
                        <CategoryForm onCategoryAdded={handleCategoryAdded} /> 
                        <CategoryList key={refreshCategories} />
                    </Box>
                    } />
                <Route path="/reports" element={<ExpenseChart />} />
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    );
}
export default App;