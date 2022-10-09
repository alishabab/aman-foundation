import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CSSProperties } from "react";
import { About } from "types";
import { Heading } from "./heading";
import { useSession } from "next-auth/react";

type Props = About & {
  className?: string;
  style?: CSSProperties;
  onClickEdit: () => void;
  onClickDelete: () => void;
};
export const AboutCard = ({
  title,
  image,
  description,
  onClickEdit,
  onClickDelete,
  className,
  style,
}: Props) => {
  const session = useSession();
  return (
    <div className={`relative ${className}`} style={style}>
      {session?.data?.isAdmin && (
        <div className="text-secondary-600 flex">
          <div className="ml-auto flex space-x-4">
            <button onClick={onClickEdit}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
            </button>
            <button onClick={onClickDelete}>
              <FontAwesomeIcon icon={faTrash} size="2x" />
            </button>
          </div>
        </div>
      )}
      {title && <Heading className="text-center mb-2">{title}</Heading>}
      {image && (
        <Image
          src={image.url}
          width="100%"
          height="90%"
          layout="responsive"
          objectFit="fill"
          alt="story"
          blurDataURL={image.url}
        />
      )}
      {description && <p className="mt-2 whitespace-pre-wrap">{description}</p>}
    </div>
  );
};
