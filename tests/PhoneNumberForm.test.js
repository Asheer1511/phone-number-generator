// Import necessary testing libraries and dependencies
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PhoneNumberForm from '../src/components/PhoneNumberForm'; 

jest.mock('@testing-library/jest-dom/extend-expect', () => ({
    __esModule: true,
    default: () => {},
  }));
  
describe('PhoneNumberForm component', () => {
  it('renders form inputs and submit button', () => {
    const { getByLabelText, getByText } = render(<PhoneNumberForm />);
    
    // Check if form inputs and buttons are rendered
    expect(getByLabelText('Quantity:')).toBeInTheDocument();
    expect(getByLabelText('Country Code:')).toBeInTheDocument();
    expect(getByText('Generate Numbers')).toBeInTheDocument();
    expect(getByText('Validate')).toBeInTheDocument();
  });

  it('generates phone numbers and displays them', () => {
    const { getByLabelText, getByText } = render(<PhoneNumberForm />);
    
    // Simulate user input and generate phone numbers
    fireEvent.change(getByLabelText('Quantity:'), { target: { value: '5' } });
    fireEvent.change(getByLabelText('Country Code:'), { target: { value: '+1' } });
    fireEvent.click(getByText('Generate Numbers'));
    
    // Check if the generated phone numbers are displayed
    const generatedNumbersList = getByText('Generated Phone Numbers:');
    expect(generatedNumbersList).toBeInTheDocument();
    expect(generatedNumbersList.querySelectorAll('li')).toHaveLength(5); // Assuming 5 numbers are generated
  });

  it('submits form and displays validation result', async () => {
    const { getByLabelText, getByText } = render(<PhoneNumberForm />);
    
    // Simulate user input and generate phone numbers
    fireEvent.change(getByLabelText('Quantity:'), { target: { value: '5' } });
    fireEvent.change(getByLabelText('Country Code:'), { target: { value: '+1' } });
    fireEvent.click(getByText('Generate Numbers'));
    
    // Submit form for validation
    fireEvent.click(getByText('Validate'));

    // Assuming the validation result would be displayed after some time
    await waitFor(() => {
      const validationResult = getByText(/Out of the 5 numbers generated/i);
      expect(validationResult).toBeInTheDocument();
    });
  });
});
