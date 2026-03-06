import {
  checkIfUserHasReviewed,
  getProtocolById,
} from "@/features/protocol/services/protocol";
import ViewProtocolContainer from "@/features/protocol/components/ViewProtocolContainer";

interface Props {
  params: Promise<{ protocolId: string }>;
}

const ViewProtocolPage = async ({ params }: Props) => {
  const { protocolId } = await params;
  const [protocol, hasReviewed] = await Promise.all([
    await getProtocolById(protocolId),
    await checkIfUserHasReviewed(protocolId),
  ]);

  return (
    <div className="page-container">
      <ViewProtocolContainer data={protocol} hasReviewed={hasReviewed} />
    </div>
  );
};

export default ViewProtocolPage;
