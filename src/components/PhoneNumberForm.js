import React, { useState } from 'react';
import apiClient from '../gateway/apiGateway';

// Define an enum or an array of valid country codes
const validCountryCodes = ['+1', '+27', '+44', '+91', '+49']; // Add more country codes as needed

// Function to validate the entered country code
const isValidCountryCode = (countryCode) => {
  return validCountryCodes.includes(countryCode);
};

const PhoneNumberForm = () => {
  const [quantity, setQuantity] = useState(0);
  const [countryCode, setCountryCode] = useState('');
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateNumbers = () => {
    const numbers = Array.from({ length: quantity }, () => generateRandomPhoneNumber(countryCode));
    setGeneratedNumbers(numbers);
  };

  const generateRandomPhoneNumber = (code) => {
    const phoneNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    return `${code}${phoneNumber}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isValidCountryCode(countryCode)) {
        setError('Invalid country code');
        return;
      }

      if (generatedNumbers.length === 0) {
        setError('Please generate phone numbers first');
        return;
      }

      // Sending generated numbers to the backend using the API client
      const response = await apiClient.post('/validate-phone-numbers', {
        phoneNumberData: generatedNumbers.map(number => ({ phoneNumber: number, countryCode })),
      });

      // Process the backend response and set validation result
      setValidationResult({
        validCount: response.data.filter((result) => result.isValid).length,
        percentage:
          ((response.data.filter((result) => result.isValid).length / generatedNumbers.length) * 100).toFixed(2),
      });
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <br />
        <label>
          Country Code:
          <input type="text" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleGenerateNumbers}>Generate Numbers</button>
        <br />
        {generatedNumbers.length > 0 && (
          <div>
            Generated Phone Numbers:
            <ul>
              {generatedNumbers.map((number, index) => (
                <li key={index}>{number}</li>
              ))}
            </ul>
          </div>
        )}
        <br />
        <button type="submit" disabled={generatedNumbers.length === 0}>Validate</button>
      </form>
      {validationResult && (
        <div>
          Out of the {quantity} numbers generated, {validationResult.validCount} were found to be valid for the country,
          which calculates to {validationResult.percentage}% valid results.
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default PhoneNumberForm;
