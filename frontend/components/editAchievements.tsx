import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Achievement } from "types";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { useAlert } from "context/AlertContext";
import { useEditOrganizationMutation } from "services/mutations";
import { Heading } from "./heading";
import { Textarea } from "./textarea";

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

type EditAchievementsProps = { achievements?: Achievement[]; cb: () => void };

export const EditAchievements = ({
  achievements,
  cb,
}: EditAchievementsProps) => {
  const [addedAchievements, setAddedAchievements] = useState(
    achievements || []
  );
  const [newAchievement, setNewAchievement] = useState(initialState);
  const { mutateAsync: updateAchievements } = useEditOrganizationMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();
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
      await updateAchievements({ acheivements: addedAchievements });
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
        <Button loading={isLoading} onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};
