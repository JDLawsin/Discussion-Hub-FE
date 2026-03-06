import StarDisplay from "@/global/components/ui/StarDisplay";
import { timeAgo } from "@/global/libs/dates";
import { Review } from "../types/types";
import Avatar from "@/global/components/ui/Avatar";
import clsx from "clsx";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AuthorMenu from "@/global/components/ui/AuthorMenu";
import { toast } from "react-toastify";
import { deleteReview } from "../actions/actions";

interface Props {
  review: Review;
  mutate: () => void;
}

const ReviewCard = ({ review, mutate }: Props) => {
  const { user } = useAuth();
  const isAuthor = user?.id === review.author.id;

  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
      mutate();
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
      <div className="flex items-start gap-3">
        <Avatar
          name={review.author.name}
          classname="text-teal-600! bg-teal-100!"
        />
        <div
          className={clsx("flex-1 min-w-0", !review.feedback && "self-center")}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-800">
                {review.author.name}
              </span>
              <StarDisplay rating={review.rating} />
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="text-xs text-gray-400 shrink-0">
                {timeAgo(review.createdAt)}
              </span>

              {isAuthor && (
                <AuthorMenu
                  size="sm"
                  editAction={{
                    type: "callback",
                    onEdit: () => {},
                  }}
                  editLabel="Edit Review"
                  deleteTitle="Delete Review"
                  deleteDescription="This will permanently delete the review. This action cannot be undone."
                  deleteLabel="Delete"
                  onDelete={handleDelete}
                  isIconHorizontal={false}
                />
              )}
            </div>
          </div>
          {review.feedback && (
            <p className="text-sm text-gray-600">{review.feedback}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
