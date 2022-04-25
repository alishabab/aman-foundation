import { GetServerSideProps } from "next";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { Button, Modal, AddCampaign } from "components";
import { getCampaigns, useGetCampaignsQuery } from "services/queries";

import { Heading } from "components/heading";
import { Campaign } from "types";
import {
  useDeleteCampaignMutation,
  useDeleteImageMutation,
} from "services/mutations";
import { CampaignCard } from "components/campaignCard";

const Campaigns = () => {
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);
  const [isDeletingCampaign, setIsDeletingCampaign] = useState(false);
  const [editedCampaign, setEditedCampaign] = useState<null | Campaign>(null);
  const [deletingCampaign, setDeletingCampaign] = useState<null | Campaign>(
    null
  );
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: deleteCampaign } = useDeleteCampaignMutation();
  const session = useSession();
  const { data: campaigns } = useGetCampaignsQuery();
  const handleDeleteCampaign = async ({
    imageId,
    slug,
  }: {
    imageId: string;
    slug: string;
  }) => {
    setIsDeletingCampaign(true);
    try {
      await deleteImage(imageId);
      await deleteCampaign(slug);
      setIsDeletingCampaign(false);
      setDeletingCampaign(null);
    } catch (err) {
      setIsDeletingCampaign(false);
    }
  };

  const onCompleted = () => {
    setEditedCampaign(null);
    setDeletingCampaign(null);
    setIsAddingCampaign(false);
    setIsDeletingCampaign(false);
  };

  return (
    <div className="px-2 py-4">
      {isAddingCampaign && (
        <Modal
          isOpen={isAddingCampaign}
          onClick={() => setIsAddingCampaign(false)}>
          <AddCampaign cb={onCompleted} />
        </Modal>
      )}

      {editedCampaign && (
        <Modal
          isOpen={!!editedCampaign}
          onClick={() => setEditedCampaign(null)}>
          <AddCampaign campaign={editedCampaign} cb={onCompleted} />
        </Modal>
      )}

      {deletingCampaign && (
        <Modal
          isOpen={!!deletingCampaign}
          onClick={() => setDeletingCampaign(null)}>
          <>
            <Heading className="text-center mb-16">Delete Campaign?</Heading>
            <div className="flex justify-center space-x-8">
              <Button
                loading={isDeletingCampaign}
                secondary
                className="w-32"
                onClick={() => {
                  handleDeleteCampaign({
                    imageId: deletingCampaign.image.id,
                    slug: deletingCampaign.slug,
                  });
                }}>
                Yes
              </Button>
              <Button
                className="w-32"
                onClick={() => {
                  setDeletingCampaign(null);
                }}>
                No
              </Button>
            </div>
          </>
        </Modal>
      )}
      {/* @ts-ignore */}
      {session?.data?.isAdmin && (
        <Button
          secondary
          className="mb-2 w-64"
          onClick={() => setIsAddingCampaign(true)}>
          Add Campaign
        </Button>
      )}

      {campaigns?.map((campaign) => (
        <CampaignCard
          key={campaign.slug}
          campaign={campaign}
          onClickEdit={() => {
            setEditedCampaign(campaign);
          }}
          onClickDelete={() => {
            setDeletingCampaign(campaign);
          }}
        />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("campaigns", getCampaigns);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Campaigns;
