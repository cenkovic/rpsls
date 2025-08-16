import { randomNumber, getRandomChoiceOption } from './random';
import { availableChoices } from './choices';

global.fetch = jest.fn();

describe('randomNumber', () => {
  it('should return a random number when API call is successful', async () => {
    const mockResponse = { random_number: 42 };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await randomNumber();
    expect(result).toBe(mockResponse.random_number);
    expect(fetch).toHaveBeenCalledWith('https://codechallenge.boohma.com/random');
  });

  it('should throw an error when API call fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(randomNumber()).rejects.toThrow('HTTP error! status: 500');
    expect(fetch).toHaveBeenCalledWith('https://codechallenge.boohma.com/random');
  });
});

describe('getRandomChoiceOption', () => {
  it('should return a valid choice option based on the random number', async () => {
    const mockRandomNumber = 10;
    const choiceIndex = mockRandomNumber % availableChoices.length;

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ random_number: mockRandomNumber }),
    } as Response);

    const result = await getRandomChoiceOption();
    expect(result).toEqual(availableChoices[choiceIndex]);
  });

  it('should cover all possible random numbers', async () => {
    for (let i = 0; i < availableChoices.length; i++) {
      const mockRandomNumber = i;

      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ random_number: mockRandomNumber }),
      } as Response);

      const result = await getRandomChoiceOption();
      const choiceIndex = mockRandomNumber % availableChoices.length;
      expect(result).toEqual(availableChoices[choiceIndex]);
    }
  });

  it('should handle error propagation from randomNumber when fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(getRandomChoiceOption()).rejects.toThrow('HTTP error! status: 404');
  });
});
