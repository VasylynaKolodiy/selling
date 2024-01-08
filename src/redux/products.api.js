import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({

    reducerPath: 'products/Api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/',
    }),

    endpoints: build => ({

        getProducts: build.query({
            query: () => ({
                url: 'products',
            })
        }),

    })
})
export const {useGetProductsQuery} = productsApi;