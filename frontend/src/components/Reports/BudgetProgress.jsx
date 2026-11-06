import React, { useState, useEffect } from 'react';
import ExpenseService from '../../services/ExpenseService'
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress';

import { keyframes } from '@emotion/react';


const BudgetProgress = () => {
    const [budgetprogress, setBudgetProgress] = useState(null);
    useEffect(() => {
        const month = dayjs().month() + 1;
        const year = dayjs().year();
        fetchBudgetProgress(month, year);
    }, []);
    const fetchBudgetProgress = async (month, year) => {
        try {
            const budgetProgress = await ExpenseService.getBudgetProgress(month, year);
            setBudgetProgress(budgetProgress);
        } catch (error) {
            console.error(error);
        }
        
    };

    if(budgetprogress?.limit == null) {
        return <Typography>Nie masz jeszcze ustawionego limitu.</Typography>
    };
    
    const { spent, limit } = budgetprogress; 

    const rawPercentage = (spent / limit) * 100;
    const displayPercentage = Math.round(rawPercentage);
    const progressValue = Math.min(rawPercentage, 100);

    const getColour = (rawPercentage) => {
        if (rawPercentage < 50) return '#5ab35f';
        if (rawPercentage < 100) return '#fb7100';
        else return '#fc0000';
    }

    const colour = getColour(rawPercentage);

    const animation = keyframes`
    from { transform: translateX(-100%); }
    `;

    return (
        <Box sx={{ width: 400, margin: '20px auto', p: 35 }}>
            <Typography>
                Wydano {spent} zł z {limit} zł ({displayPercentage}%)
            </Typography>
            
            <LinearProgress
                variant="determinate"
                value={progressValue} 
                sx={{
                    height: 16,
                    borderRadius: 8,
                    '& .MuiLinearProgress-bar': {
                    backgroundColor: colour,
                    borderRadius: 8,
                    animation: `${animation} 0.8s ease-in-out`,
                    },
                }}
            />
        </Box>
    );

}

export default BudgetProgress;