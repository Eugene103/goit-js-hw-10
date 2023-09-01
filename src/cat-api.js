import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_NoGF4HZpqXNIurZjr8xQmYVL5xBkYMTfSoZe6KaN02UpRbd69lpzVo7xof1fPt55";
export {fetchCatByBreed, fetchBreeds}

const url = 'https://api.thecatapi.com/v1';
const api_key = "live_NoGF4HZpqXNIurZjr8xQmYVL5xBkYMTfSoZe6KaN02UpRbd69lpzVo7xof1fPt55";

function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};
function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};
