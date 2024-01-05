import {v4 as uuidv4} from 'uuid';

export const products = [
    {
        id: uuidv4(),
        name: "product 1",
        description: "product 1 descriprion",
        price: "100",
        image: "http://...",
        coordinates: [50.4501, 30.5234],
    },
    {
        id: uuidv4(),
        name: "product 2",
        description: "product 2 descriprion",
        price: "200",
        image: "http://...",
        coordinates: [49.65, 23.86],
    },
    {
        id: uuidv4(),
        name: "product 3",
        description: "product 3 descriprion",
        price: "300",
        image: "http://...",
        coordinates: [50.12, 25.16],
    }
]