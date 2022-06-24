import { GetServerSideProps } from "next";
import { useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { Button, Modal, AddStory } from "components";
import { getStories, useGetStoriesQuery } from "services/queries";

import { Heading } from "components/heading";
import { Story } from "types";
import {
  useDeleteStoryMutation,
  useDeleteImageMutation,
} from "services/mutations";
import { StoryCard } from "components/storyCard";
import { useAlert } from "context/AlertContext";
import { CacheKeys } from "services/cacheKeys";

const Stories = () => {
  const { setAlert } = useAlert();
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [isDeletingStory, setIsDeletingStory] = useState(false);
  const [editedStory, setEditedStory] = useState<null | Story>(null);
  const [deletingStory, setDeletingStory] = useState<null | Story>(null);
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: deleteStory } = useDeleteStoryMutation();
  const session = useSession();
  const { data: stories } = useGetStoriesQuery();
  const handleDeleteStory = async ({
    imageId,
    slug,
  }: {
    imageId: string;
    slug: string;
  }) => {
    setIsDeletingStory(true);
    try {
      await deleteImage(imageId);
      await deleteStory(slug);
      setIsDeletingStory(false);
      setDeletingStory(null);
      setAlert({
        type: "success",
        message: "Story Deleted.",
      });
    } catch (err) {
      setIsDeletingStory(false);
    }
  };

  const onCompleted = () => {
    setEditedStory(null);
    setDeletingStory(null);
    setIsAddingStory(false);
    setIsDeletingStory(false);
  };

  return (
    <div className="px-2">
      {isAddingStory && (
        <Modal isOpen={isAddingStory} onClick={() => setIsAddingStory(false)}>
          <AddStory cb={onCompleted} />
        </Modal>
      )}

      {editedStory && (
        <Modal isOpen={!!editedStory} onClick={() => setEditedStory(null)}>
          <AddStory story={editedStory} cb={onCompleted} />
        </Modal>
      )}

      {deletingStory && (
        <Modal isOpen={!!deletingStory} onClick={() => setDeletingStory(null)}>
          <>
            <Heading className="text-center mb-16">Delete Story?</Heading>
            <div className="flex justify-center space-x-8">
              <Button
                loading={isDeletingStory}
                secondary
                className="w-32"
                onClick={() => {
                  handleDeleteStory({
                    imageId: deletingStory.image.id,
                    slug: deletingStory.slug,
                  });
                }}>
                Yes
              </Button>
              <Button
                className="w-32"
                onClick={() => {
                  setDeletingStory(null);
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
          className="mb-2"
          onClick={() => setIsAddingStory(true)}>
          Add Story
        </Button>
      )}

      {stories?.map((story) => (
        <StoryCard
          key={story.slug}
          story={story}
          onClickEdit={() => {
            setEditedStory(story);
          }}
          onClickDelete={() => {
            setDeletingStory(story);
          }}
        />
      ))}
    </div>
  );
};

// Temporary commented to see performance

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(CacheKeys.Stories, getStories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Stories;
