import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button, Heading } from "components";
import { Campaign } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

interface Props {
  campaign: Campaign;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export const CampaignCard: NextPage<Props> = ({
  campaign,
  onClickEdit,
  onClickDelete,
}) => {
  const session = useSession();
  const { slug, id, title, description, image, isHighlighted } = campaign;
  return (
    <div key={slug} className="mb-8 relative">
      {/* @ts-ignore */}
      {session?.data?.isAdmin && (
        <>
          <div className="absolute top-4 left-4 flex space-x-4 ">
            <button className="text-secondary-600" onClick={onClickEdit}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
            </button>
            <button className="text-secondary-600" onClick={onClickDelete}>
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
      )}

      <Link passHref href={`/campaigns/${slug}`}>
        <a>
          <div className="shadow-md rounded-md">
            <div
              style={{ backgroundImage: `url(${image.url})` }}
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
  );
};