import Link from "next/link";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, AddCampaign } from "components";
import { getCampaigns, useGetCampaignsQuery } from "services/queries";

import { Heading } from "components/heading";
import { Campaign } from "types";
import {
  useDeleteCampaignMutation,
  useDeleteImageMutation,
} from "services/mutations";

const Campaigns = () => {
  const [addCampaign, setAddCampaign] = useState(false);
  const [editedCampaign, setEditedCampaign] = useState<null | Campaign>(null);
  const [deletingCampaign, setDeletingCampaign] = useState<null | Campaign>(
    null
  );
  const session = useSession();
  const { data: campaigns, error, isLoading } = useGetCampaignsQuery();

  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync } = useDeleteCampaignMutation();

  const handleDeleteCampaign = async ({
    filename,
    slug,
  }: {
    filename: string;
    slug: string;
  }) => {
    try {
      await mutateAsync(slug);
      await deleteImage(filename);
    } catch (err) {
      // @ts-ignore
      alert(err.message);
    }
  };

  return (
    <div className="px-2 py-4">
      {addCampaign && (
        <Modal isOpen={addCampaign} onClick={() => setAddCampaign(false)}>
          <AddCampaign />
        </Modal>
      )}

      {editedCampaign && (
        <Modal
          isOpen={!!editedCampaign}
          onClick={() => setEditedCampaign(null)}>
          <AddCampaign campaign={editedCampaign} />
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
                secondary
                className="w-32"
                onClick={() => {
                  handleDeleteCampaign({
                    filename: deletingCampaign.imageUrl,
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
      {/* {session?.data?.isAdmin && (
        <Button
          secondary
          className="mb-2 w-64"
          onClick={() => setAddCampaign(true)}>
          Add Campaign
        </Button>
      )} */}
      <Button
        secondary
        className="mb-2 w-64"
        onClick={() => setAddCampaign(true)}>
        Add Campaign
      </Button>
      {campaigns?.map(
        ({ slug, id, title, description, imageUrl, isHighlighted }) => (
          <div key={slug} className="mb-8 relative">
            <>
              <div className="absolute top-4 left-4 flex space-x-4 ">
                <button
                  className="text-secondary-600"
                  onClick={() => {
                    setEditedCampaign({
                      id,
                      slug,
                      title,
                      description,
                      imageUrl,
                      isHighlighted,
                    });
                  }}>
                  <FontAwesomeIcon icon={faEdit} size="2x" />
                </button>
                <button
                  className="text-secondary-600"
                  onClick={() => {
                    setDeletingCampaign({
                      id,
                      slug,
                      title,
                      description,
                      imageUrl,
                      isHighlighted,
                    });
                  }}>
                  <FontAwesomeIcon icon={faTrash} size="2x" />
                </button>
              </div>
              <div className="absolute top-4 right-4">
                <FontAwesomeIcon
                  className={`${
                    isHighlighted ? "text-primary-600" : "text-gray-600"
                  }`}
                  icon={faStar}
                  size="2x"
                />
              </div>
            </>

            <Link passHref href={`/campaigns/${slug}`}>
              <a>
                <div className="shadow-md rounded-md">
                  <div
                    style={{ backgroundImage: `url(/uploads/${imageUrl})` }}
                    className={`h-[30vh] bg-cover rounded-md`}></div>
                  <div className="py-2 px-4">
                    <Heading>{title}</Heading>
                    <p>{description}</p>
                    <Button
                      rounded
                      onClick={(e) => e.preventDefault()}
                      className="mt-2">
                      Support
                    </Button>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        )
      )}
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
