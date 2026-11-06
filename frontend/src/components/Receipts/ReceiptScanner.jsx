import ReceiptService from "../../services/ReceiptService";
import CategoryService from '../../services/CategoryService';
import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { MenuItem, Snackbar, TextField } from "@mui/material";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import Select from '@mui/material/Select';
import Alert from "@mui/material/Alert";

const ReceiptScanner = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [date, setDate] = useState("");

    const handleScan = async () => {
        setLoading(true);
        try {
            const data = await ReceiptService.scanReceipt(file);
            setResult(data);
            setItems(data.items)
            setDate(data.date ?? "")
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (index, field, value) => {
        setItems(items.map((item, i) => i === index ? { ...item, [field]:value } : item));
    };

    const handleDelete = (index) => {
        setItems(items.filter((item, i) => i !== index));
    };
    
    const handleConfirm = async () => {
        const empty = items.some(item => !item.name || item.totalPrice === null || item.totalPrice === "" || !date);
        if (empty) {
            setError("Uzupełnij nazwę i cenę w pozycjach.")
            return;
        }
        setError("");

        const expenses = items.map((item) => ({
            name: item.name,
            amount: Number(item.totalPrice),
            date: date,
            categoryId: item.categoryId || null
        }));
        try {
            await ReceiptService.confirmReceipt(expenses);
            setResult(null);
            setItems([]);
            setOpen(true)
        } catch (error) {
            console.error(error);
        }
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const categoriesData = await CategoryService.getAllCategories();
        setCategories(categoriesData)
    };

    return (
        <div>
            <input type="file" accept="image/jpeg,image/png"
                onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={handleScan} disabled={!file || loading}>
                {loading ? "Skanuje" : "Skanuj"}
            </button>
            {result && (
                <Box maxWidth={850} mx="auto">
                    <h2>({result.store}) ({result.date})</h2>
                    <TextField
                        type="date"
                        label="Data paragonu"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nazwa</TableCell>
                                    <TableCell>Ilość</TableCell>
                                    <TableCell>Cena</TableCell>
                                    <TableCell>Kategoria</TableCell>
                                    <TableCell>Usuń</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <TextField value={item.name ?? ""} onChange={(e) => handleChange(index, "name", e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={item.quantity ?? ""} onChange={(e) => handleChange(index, "quantity", e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={item.totalPrice ?? ""} onChange={(e) => handleChange(index, "totalPrice", e.target.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <Select value={item.categoryId ?? ""} onChange={(e) => handleChange(index, "categoryId", e.target.value)}>
                                                <MenuItem value="">brak</MenuItem>
                                                {categories.map(c => (
                                                    <MenuItem key={c.id} value={c.id}>{c.categoryName}</MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {error &&  <Alert severity="error">{error}</Alert>}
                    <Button onClick={handleConfirm}>Zatwierdz</Button>
                </Box>
            )}
            <Snackbar
                open={open}
                autoHideDuration={5000}
                message="Wydatki zostały dodane prawidłowo."
                onClose={handleClose}
                />
        </div>
    );
};

export default ReceiptScanner;