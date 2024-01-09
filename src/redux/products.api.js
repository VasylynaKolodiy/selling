import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({

    reducerPath: 'products/Api',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/',
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