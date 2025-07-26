import baseApi from "../../api/baseApi";

export type TNotification = {
  userEmail: string;
  text: string;
  commentedUserPic: string;
  commentedUser: string;
  date: string;
  isRead: boolean;
};

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (email: string) => ({
        url: `/notification/${email}`,
        method: "GET",
      }),
    }),

    sendNotification: builder.mutation({
      query: (notification: TNotification) => ({
        url: `/notification/push`,
        method: "POST",
        body: notification,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const { useSendNotificationMutation, useGetNotificationsQuery } =
  notificationApi;
