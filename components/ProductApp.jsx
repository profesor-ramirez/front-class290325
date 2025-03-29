import { useEffect, useState } from "react"
import { listProducts } from "./productos";
import { TextField, Box, Button, Typography, Modal } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ProductApp = () => {

    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({});
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        //console.log(e.target.name,e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const insertar = () => {
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
        };

        fetch('http://127.0.0.1:5000/api/products/', options)
        .then(response => response.json())
        .then(data => {
            setProducts(data);
            handleClose();
        });
    }

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/products/')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
        setProducts(listProducts);
    }, []);

    return (
        <>
            <h1>Productos</h1>

            <Button onClick={handleOpen}>Crear Producto</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Crear Producto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                            id="product_name"
                            label="Nombre del producto"
                            name="name"
                            value={form.name}
                            onChange={(event) => {
                                handleChange(event);
                            }}
                        />
                        <TextField
                            id="product_price"
                            label="Precio del producto"
                            name="price"
                            value={form.price}
                            onChange={(event) => {
                                handleChange(event);
                            }}
                        />
                        <TextField
                            id="product_description"
                            label="Descripcion del producto"
                            name="description"
                            value={form.description}
                            onChange={(event) => {
                                handleChange(event);
                            }}
                        />
                        <Button variant="contained" onClick={() => insertar()}>Crear</Button>
                    </Typography>
                </Box>
            </Modal>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>price</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prd => {
                        return (
                            <>
                                <tr key={prd.id}>
                                    <td>{prd.id}</td>
                                    <td>{prd.name}</td>
                                    <td>{prd.price}</td>
                                    <td>{prd.description}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}