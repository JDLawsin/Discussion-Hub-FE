import ViewThreadContainer from "@/features/thread/components/ViewThreadContainer";
import { getThreadById } from "@/features/thread/services/thread";
import { getUserVoteType } from "@/features/vote/services/vote";

interface Props {
  params: Promise<{ threadId: string }>;
}

const ViewThreadPage = async ({ params }: Props) => {
  const { threadId } = await params;
  const [thread, voteType] = await Promise.all([
    await getThreadById(threadId),
    await getUserVoteType("thread", threadId),
  ]);

  return (
    <div className="page-container">
      <ViewThreadContainer thread={thread} userVoteType={voteType} />
    </div>
  );
};

export default ViewThreadPage;
