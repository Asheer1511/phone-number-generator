import React, { useState } from 'react';

const PhoneNumberGenerator = () => {
  const [quantity, setQuantity] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const handleQuantityChange = (event) => {
    const inputQuantity = event.target.value;
    if (!isNaN(inputQuantity) && inputQuantity > 0) {
      setQuantity(inputQuantity);
    } else {
      // Handle invalid quantity input
      // You can show an error message or take appropriate action
    }
  };

  const handleCountryCodeChange = (event) => {
    const inputCountryCode = event.target.value;
    // You may apply additional validation for country code format
    setCountryCode(inputCountryCode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quantity && countryCode) {
      const generatedNumbersArray = [];
      for (let i = 0; i < quantity; i++) {
        const phoneNumber = generatePhoneNumber(countryCode); // Placeholder function for generating numbers
        generatedNumbersArray.push(phoneNumber);
      }
      setGeneratedNumbers(generatedNumbersArray);
    }
  };

  const generatePhoneNumber = (countryCode) => {
    // Placeholder function to simulate phone number generation
    // Replace this with your actual logic to generate valid phone numbers
    return `+${countryCode}${Math.floor(Math.random() * 10000000000)}`;
  };

  return (
    <div>
      <h1>Phone Number Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="quantityInput">Quantity:</label>
          <input
            type="number"
            id="quantityInput"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter quantity"
          />
        </div>
        <div>
          <label htmlFor="countryCodeInput">Country Code:</label>
          <input
            type="text"
            id="countryCodeInput"
            value={countryCode}
            onChange={handleCountryCodeChange}
            placeholder="Enter country code"
          />
        </div>
        <button type="submit">Generate Numbers</button>
      </form>
      <div>
        <h2>Generated Phone Numbers:</h2>
        <ul>
          {generatedNumbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhoneNumberGenerator;
