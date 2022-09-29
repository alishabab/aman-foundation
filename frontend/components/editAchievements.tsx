import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Achievement, Image as TImage } from "types";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { useAlert } from "context/AlertContext";
import {
  useDeleteImageMutation,
  useEditOrganizationMutation,
  useUploadImageMutation,
} from "services/mutations";
import { Heading } from "./heading";
import { Textarea } from "./textarea";
import { isValidImage } from "utils/isValidImage";
import { toBase64 } from "utils/toBase64";

type Props = Achievement & { handleDelete: (title: string) => void };
const AddedAchievement = ({ title, handleDelete }: Props) => {
  return (
    <div className="flex items-center justify-between p-0.5">
      <p className="text-sm text-gray-600 w-7/12">
        {title.substring(0, 16)}...
      </p>
      <button
        className="text-secondary-600"
        onClick={() => {
          handleDelete(title);
        }}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

const initialState: Achievement = {
  title: "",
  description: "",
};

type EditAchievementsProps = {
  achievements?: Achievement[];
  cover?: TImage;
  cb: () => void;
};

export const EditAchievements = ({
  achievements,
  cover,
  cb,
}: EditAchievementsProps) => {
  const [addedAchievements, setAddedAchievements] = useState(
    achievements || []
  );
  const [newAchievement, setNewAchievement] = useState(initialState);
  const [imageState, setImageState] = useState({
    file: null as File | null,
    localImageUrl: cover?.url || "/assets/images/no-image.svg",
  });
  const { mutateAsync: updateAchievements } = useEditOrganizationMutation();
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValid = await isValidImage(file);
      if (!isValid) {
        alert("Invalid image file");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setImageState({
        localImageUrl: objectUrl,
        file: file,
      });
    }
  };

  const handleAdd = () => {
    if (!newAchievement.title.trim().length) {
      setAlert({
        type: "danger",
        message: "Title is mandatory",
      });
      return;
    }
    if (addedAchievements.length >= 4) {
      setAlert({
        type: "danger",
        message: "Max 4 achievements.",
      });
      return;
    }
    setAddedAchievements([...addedAchievements, newAchievement]);
    setNewAchievement(initialState);
  };

  const handleDelete = (title: string) => {
    setAddedAchievements(addedAchievements.filter((a) => a.title !== title));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (imageState.file && cover?.id) {
        await deleteImage(cover.id);
        const base64 = await toBase64(imageState.file);
        const newImage = await uploadImage(base64);
        await updateAchievements({
          acheivements: addedAchievements,
          cover: newImage,
        });
      } else if (imageState.file && !cover?.id) {
        const base64 = await toBase64(imageState.file);
        const newImage = await uploadImage(base64);
        await updateAchievements({
          acheivements: addedAchievements,
          cover: newImage,
        });
      } else {
        await updateAchievements({
          acheivements: addedAchievements,
        });
      }

      setIsLoading(false);
      cb();
      setAlert({
        type: "success",
        message: "Achievements updated.",
      });
    } catch (err) {
      setIsLoading(false);
      cb();
      setAlert({
        type: "danger",
        // @ts-ignore
        message: err?.message || "Error while saving",
      });
    }
  };

  return (
    <>
      <Heading className="text-center">Edit Achievements</Heading>
      <div className="flex flex-col space-y-2 pt-2">
        <div>
          <Label>Enter title</Label>
          <Input
            name="title"
            value={newAchievement.title}
            onChange={(e) => {
              setNewAchievement({
                ...newAchievement,
                title: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <Label>Enter Description</Label>
          <Textarea
            name="description"
            value={newAchievement.description}
            onChange={(e) => {
              setNewAchievement({
                ...newAchievement,
                description: e.target.value,
              });
            }}
          />
        </div>
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="border-t-2 border-gray-200">
        <div className="py-2">
          {addedAchievements?.map(({ title, description }) => (
            <AddedAchievement
              key={title}
              title={title}
              description={description}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <Label>Image Upload</Label>
        <div className="flex items-center text-secondary-600">
          <Input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            className="w-3/6 mr-8"
            onChange={onFileChange}
          />
          <Image
            width={100}
            height={100}
            blurDataURL={imageState.localImageUrl}
            src={imageState.localImageUrl}
            alt="cover"
          />
        </div>
        <Button loading={isLoading} onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};
