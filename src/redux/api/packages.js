import { baseAPI } from ".";

const packages = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: () => ({
        url: "/packages",
      }),
    }),
  }),
});

export const { useGetPackagesQuery } = packages;
