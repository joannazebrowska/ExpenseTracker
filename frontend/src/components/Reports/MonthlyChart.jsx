import React, { useState, useEffect } from 'react';
import ExpenseService from '../../services/ExpenseService'

import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);
dayjs.locale('pl');

import Box from '@mui/material/Box';

import { BarChart } from '@mui/x-charts/BarChart';

const MonthlyChart  = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    useEffect(() => {
        fetchSummary();
    }, []);
    const fetchSummary = async () => {
        try {
            const monthlyData = await ExpenseService.getMonthlyData();
            setMonthlyData(monthlyData);
        } catch (error) {
            console.error(error);
        }
    };    
    console.log('monthlyData:', monthlyData);
        
    const chartData = monthlyData.map((item) => {
    const date = dayjs({ year: item.year, month: item.month - 1 });
        return {
            label: date.format("MMMM YYYY"),
            total: item.total 
        };
    });

    const labels = chartData.map((item) => item.label);
    const totals = chartData.map((item) => item.total)

    return (
        <Box maxWidth={600} maxHeight={100} mx="auto">
        <BarChart
            xAxis={[{ data: labels, scaleType: 'band' }]}
            series={[{ data: totals }]}
            height={300}
        />
        </Box>
        
    );
};

export default MonthlyChart;

