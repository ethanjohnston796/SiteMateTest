import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PROXY_URL } from '../config';

export const dataApiSlice = createApi({
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: PROXY_URL + 'api/v1/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    readData: builder.query({
        query: id => `/issue/${id}`
    }),
    createData: builder.mutation({
        query: data => ({
            url: '/issue',
            method: 'POST',
            body: data
        }),
    }),
    updateData: builder.mutation({
        query: data => ({
            url: '/issue',
            method: 'PUT',
            body: data
        })
    }),
    deleteData: builder.mutation({
        query: id => ({
            url: `/issue/${id}`,
            method: 'DELETE'
        })
    })
  })
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useReadDataQuery, useCreateDataMutation, useDeleteDataMutation, useUpdateDataMutation } = dataApiSlice;