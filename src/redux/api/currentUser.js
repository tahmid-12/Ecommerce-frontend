import { baseAPI } from "@/redux/api/index";

const currentUser = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: "/users/current",
      }),
      providesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    updateCurrentUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //     console.log(arg);
      //     const patch = dispatch(baseAPI.util.updateQueryData("getCurrentUser", arg.id, (draft) => {
      //         return { ...draft, ...arg };
      //     }));
      //
      //     try {
      //         await queryFulfilled;
      //     } catch {
      //         patch.undo();
      //     }
      // }
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation,useLogoutUserMutation } =
  currentUser;
