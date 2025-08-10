import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { FaPen, FaTimes } from "react-icons/fa";

import { TComment } from "@/src/types";
import { useUpdateCommentMutation } from "@/src/redux/features/comments/commetApi";

type TModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comment: Partial<TComment>;
};

type FormData = {
  modifiedComment: string;
};

export default function EditCommentModal({ setOpen, comment }: TModalProps) {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      modifiedComment: comment?.comment,
    },
  });
  const [updateComment, { isLoading }] = useUpdateCommentMutation();

 const onSubmit = async (data: FormData) => {
  const modifiedComment = { comment: data.modifiedComment };

  try {
    const response = await updateComment({
      commentId: comment?._id as string,
      payload: modifiedComment,
    }).unwrap();

    // Close the modal immediately after success
    setOpen(false);

    toast.success("Comment updated successfully!");
  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  }
};

  return (
    <section className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 overflow-y-auto">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl relative flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white/80 dark:bg-gray-900/80 rounded-2xl flex justify-center items-center">
            <ClipLoader
              aria-label="Loading Spinner"
              color="#3B82F6"
              loading={isLoading}
              size={40}
              speedMultiplier={0.8}
            />
          </div>
        )}

        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Comment
          </h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200"
            type="button"
            onClick={() => setOpen(false)}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-grow">
          <div className="flex items-center space-x-3">
            <FaPen className="text-blue-500 text-xl flex-shrink-0" />
            <textarea
              rows={4}
              {...register("modifiedComment", { required: true })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-y"
            />
          </div>
        </div>

        <div className="p-4 flex justify-end space-x-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 text-base font-semibold rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <ClipLoader
                aria-label="Loading Spinner"
                color="#ffffff"
                loading={isLoading}
                size={20}
                speedMultiplier={0.8}
              />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
