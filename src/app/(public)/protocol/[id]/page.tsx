import {
  checkIfUserHasReviewed,
  getProtocolById,
} from "@/features/protocol/services/protocol";
import ViewProtocolContainer from "@/features/protocol/components/ViewProtocolContainer";

interface Props {
  params: Promise<{ id: string }>;
}

const ViewProtocolPage = async ({ params }: Props) => {
  const { id } = await params;
  const [protocol, hasReviewed] = await Promise.all([
    await getProtocolById(id),
    await checkIfUserHasReviewed(id),
  ]);

  return (
    <div className="page-container">
      <ViewProtocolContainer data={protocol} hasReviewed={hasReviewed} />
    </div>
  );
};

export default ViewProtocolPage;
