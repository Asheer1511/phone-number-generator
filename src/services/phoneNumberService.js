import apiClient from '../gateway/apiGateway';

const PhoneNumberService = {
  validatePhoneNumbers: async (phoneNumberData) => {
    try {
      const response = await apiClient.post('/validate-phone-numbers', { phoneNumberData });
      return response.data;
    } catch (error) {
      throw new Error('Failed to validate phone numbers');
    }
  },
};

export default PhoneNumberService;
