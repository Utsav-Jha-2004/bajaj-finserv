const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running!');
});

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            const errorResponse = {
                is_success: false,
                user_id: '',
                email: '',
                roll_number: '',
                odd_numbers: [],
                even_numbers: [],
                alphabets: [],
                special_characters: [],
                sum: '0',
                concat_string: '',
                error: "The 'data' key with an array is required."
            };
            return res.status(400).json(errorResponse);
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabeticalChars = [];

        const user_id = "adarsh_choudhary_29082004";
        const email = "adarsh.choudhary2022@vitbhopal.ac.in";
        const roll_number = "22BCE11048";

        data.forEach(item => {
            if (!isNaN(Number(item))) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabeticalChars.push(...item);
            } else {
                special_characters.push(item);
            }
        });

        let concat_string = "";
        const reversedChars = alphabeticalChars.reverse();
        reversedChars.forEach((char, index) => {
            concat_string += (index % 2 === 0) ? char.toUpperCase() : char.toLowerCase();
        });

        const response = {
            is_success: true,
            user_id,
            email,
            roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string
        };

        return res.status(200).json(response);

    } catch (error) {
        const errorResponse = {
            is_success: false,
            user_id: '',
            email: '',
            roll_number: '',
            odd_numbers: [],
            even_numbers: [],
            alphabets: [],
            special_characters: [],
            sum: '0',
            concat_string: '',
            error: error.message
        };
        return res.status(500).json(errorResponse);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
