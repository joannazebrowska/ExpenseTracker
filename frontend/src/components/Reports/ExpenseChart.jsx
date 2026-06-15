import React, { useState, useEffect } from 'react';
import ExpenseService from '../../services/ExpenseService'

import { PieChart } from '@mui/x-charts/PieChart';

const ExpenseChart = () => {
    const [summary, setSummary] = useState([]);
    useEffect(() => {
        fetchSummary();
    }, []);
    const fetchSummary = async () => {
        try {
            const summaryData = await ExpenseService.getSummary();
            setSummary(summaryData);
        } catch (error) {
            console.error(error);
        }
    };

    const chartData = summary.map(summary => ({
        label: summary.categoryName,
        value: summary.total
    }));

    return (
        <PieChart
        series={[
            {
            data: chartData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
        ]}
        height={200}
        width={200}
        />
    );

};

export default ExpenseChart;