// src/HousePriceForm.jsx
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const HousePriceForm = () => {
    const [formData, setFormData] = useState({
        bathrooms: '',
        square_footage: '',
        lot_size: '',
        year_built: '',
        bedrooms: ''
    });

    const [error, setError] = useState({});
    const [predictedPrice, setPredictedPrice] = useState(null);
    // const BASE_URL = 'http://127.0.0.1:5000';
    const BASE_URL = 'https://sea-lion-app-2o5e9.ondigitalocean.app';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.bathrooms || formData.bathrooms < 1 || formData.bathrooms > 6) {
            newErrors.bathrooms = 'Bathrooms must be between 1 and 6';
        }
        if (!formData.square_footage || formData.square_footage < 500 || formData.square_footage > 10000) {
            newErrors.square_footage = 'Square footage must be between 500 and 10000';
        }
        if (!formData.lot_size || formData.lot_size < 1000 || formData.lot_size > 50000) {
            newErrors.lot_size = 'Lot size must be between 1000 and 50000';
        }
        if (!formData.year_built || formData.year_built < 1900 || formData.year_built > new Date().getFullYear()) {
            newErrors.year_built = 'Year built must be valid';
        }
        if (!formData.bedrooms || formData.bedrooms < 1 || formData.bedrooms > 10) {
            newErrors.bedrooms = 'Bedrooms must be between 1 and 10';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);
            return;
        }

        try {
            // Make the API request to your Flask API
            const response = await axios.post(`${BASE_URL}/predict`, formData);
            setPredictedPrice(response.data.predicted_price);
        } catch (err) {
            console.error('Error predicting house price', err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '400px', width: '100%' }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    House Price Prediction Testing
                </Typography>
                <TextField
                    fullWidth
                    label="Bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    error={!!error.bathrooms}
                    helperText={error.bathrooms}
                    margin="normal"
                    inputProps={{ min: 1, max: 6 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Square Footage"
                    name="square_footage"
                    type="number"
                    value={formData.square_footage}
                    onChange={handleChange}
                    error={!!error.square_footage}
                    helperText={error.square_footage}
                    margin="normal"
                    inputProps={{ min: 500, max: 10000 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Lot Size"
                    name="lot_size"
                    type="number"
                    value={formData.lot_size}
                    onChange={handleChange}
                    error={!!error.lot_size}
                    helperText={error.lot_size}
                    margin="normal"
                    inputProps={{ min: 1000, max: 50000 }}
                    required
                />
                <TextField
                    fullWidth
                    label="Year Built"
                    name="year_built"
                    type="number"
                    value={formData.year_built}
                    onChange={handleChange}
                    error={!!error.year_built}
                    helperText={error.year_built}
                    margin="normal"
                    inputProps={{ min: 1900, max: new Date().getFullYear() }}
                    required
                />
                <TextField
                    fullWidth
                    label="Bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    error={!!error.bedrooms}
                    helperText={error.bedrooms}
                    margin="normal"
                    inputProps={{ min: 1, max: 10 }}
                    required
                />
                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
                    Predict Price
                </Button>

                {predictedPrice && (
                    <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                        Predicted Price: ${predictedPrice.toFixed(2)}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default HousePriceForm;
