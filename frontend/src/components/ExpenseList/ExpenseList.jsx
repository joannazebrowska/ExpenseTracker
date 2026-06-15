import React, { useState, useEffect } from 'react';
import ExpenseListItem from './ExpenseListItem';
import ExpenseService from '../../services/ExpenseService'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        fetchExpenses();
    }, []);
    const fetchExpenses = async () => {
        try {
            const expensesData = await ExpenseService.getAllExpenses();
            setExpenses(expensesData);
        } catch (error) {
            console.error('error fetching expenses:', error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await ExpenseService.deleteExpense(id);
            fetchExpenses();
        } catch (error) {
            console.error('error deleting expense:', error)
        }
    };
    const handleEdit = () => {
        fetchExpenses();
    };

    return (
        <div className="container">
            <Box maxWidth={850} mx="auto">
            <h2 className="my-4">Lista Wydatków</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa wydatku</TableCell>
                            <TableCell>Cena</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Kategoria</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                     <TableBody>
                        {expenses.map(expense => (
                            <ExpenseListItem key={expense.id} expense={expense} onDelete={() => handleDelete(expense.id)} onEdit={handleEdit} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </div>
    );
};
export default ExpenseList;
