import axios from "axios";

export default {
    getQuote() {
        const options = {
            method: 'GET',
            url: 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote',
            params: {token: 'ipworld.info'},
            headers: {
                'x-rapidapi-key': '1c02a66a32msh2dcd35084ef2ec9p1df4f5jsnbbd339055482',
                'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
            }
        };
        
        return axios.request(options);
    }
}