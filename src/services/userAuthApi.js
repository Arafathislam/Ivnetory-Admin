import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const apiUrl = process.env.REACT_APP_API;
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8002/api/` }),
  // baseQuery: fetchBaseQuery({ baseUrl: `https://ziaul-imzi.tech/api` }),
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: 'user/register',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'user/login',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'user/resetemail',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `user/reset-password/${id}/${token}`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: `user/loggeduser`,
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),

    // change user password
    changeUserPassword: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: 'user/cnpsw',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),


    /// admin register
    registerAdmin: builder.mutation({
      query: (user) => {
        return {
          url: 'admin/register/psw/screct',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

// login admin
    loginAdmin: builder.mutation({
      query: (user) => {
        return {
          url: 'admin/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

// change password admin

changeAdminPassword: builder.mutation({
  query: ({ actualData, token }) => {
    return {
      url: 'admin/cnpsw',
      method: 'POST',
      body: actualData,
      headers: {
        'authorization': `Bearer ${token}`,
      }
    }
  }
}),












    // code before here

  }),




})

export const { useRegisterUserMutation, useLoginUserMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation,useLoginAdminMutation,useRegisterAdminMutation,useChangeAdminPasswordMutation } = userAuthApi