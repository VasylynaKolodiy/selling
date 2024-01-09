import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({

    reducerPath: 'products/Api',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE_URL,
    }),

    endpoints: build => ({

        getProducts: build.query({
            query: () => ({
                url: 'products',
            }),
            providesTags: () =>  ['Products'],
        }),

        addProduct: build.mutation({
            query: (body) => ({
                url: 'products',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products']
        }),
    })
})
export const {useGetProductsQuery, useAddProductMutation} = productsApi;