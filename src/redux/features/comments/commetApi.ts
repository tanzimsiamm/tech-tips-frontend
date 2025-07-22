import { TComment } from "@/src/types";
import baseApi from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<{ data: TComment[] }, { postId: string }>({
      query: (query) => ({
        url: `/comments/${query.postId}`,
        method: "GET",
        params: query,
      }),
      providesTags: ["Comments"],
    }),

    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments", "Posts"],
    }),

    addComment: builder.mutation<TComment, TComment>({
      query: (comment) => ({
        url: `/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Posts", "Comments"],
    }),

    updateComment: builder.mutation<
      TComment,
      { commentId: string; payload: Partial<TComment> }
    >({
      query: ({ commentId, payload }) => ({
        url: `/comments/${commentId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Posts", "Comments"],
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApi;
