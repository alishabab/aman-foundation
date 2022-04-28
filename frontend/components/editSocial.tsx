import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { SocialOptions } from "utils/socialOptions";
import { SocialIcons } from "utils/socialIcons";
import { SocialLink, SocialMediaType } from "types";
import { Input } from "./input";
import { Select } from "./select";
import { Label } from "./label";
import { Button } from "./button";
import { useAlert } from "context/AlertContext";
import { useEditOrganizationMutation } from "services/mutations";
import { isValidUrl } from "utils/isValidUrl";
import { Heading } from "./heading";
type Props = SocialLink & { handleDelete: (name: SocialMediaType) => void };

const AddedSocial = ({ name, url, handleDelete }: Props) => {
  return (
    <div className="flex items-center py-0.5">
      <FontAwesomeIcon
        icon={SocialIcons[name]}
        className="text-primary-600 w-1/12"
      />
      <p className="text-sm text-gray-600 w-7/12">{url}</p>
      <button
        className="text-secondary-600"
        onClick={() => {
          handleDelete(name);
        }}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

const initialState: SocialLink = {
  name: SocialOptions[0].value,
  url: "https://",
};

type EditSocialProps = { socialLinks?: SocialLink[]; cb: () => void };

export const EditSocial = ({ socialLinks, cb }: EditSocialProps) => {
  const [addedSocial, setAddedSocial] = useState(socialLinks || []);
  const [newSocial, setNewSocial] = useState(initialState);
  const { mutateAsync: updateSocial } = useEditOrganizationMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();
  const handleAdd = () => {
    if (addedSocial.map(({ name }) => name).includes(newSocial.name)) {
      setAlert({
        type: "danger",
        message: "Already added.",
      });
      return;
    }
    if (!isValidUrl(newSocial.url)) {
      setAlert({
        type: "danger",
        message: "Invalid url.",
      });
      return;
    }
    setAddedSocial([...addedSocial, newSocial]);
    setNewSocial(initialState);
  };

  const handleDelete = (name: string) => {
    setAddedSocial(addedSocial.filter((social) => social.name !== name));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateSocial({ socialLinks: addedSocial });
      setIsLoading(false);
      cb();
      setAlert({
        type: "success",
        message: "Social links updated.",
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
      <Heading className="text-center">Edit Social Links</Heading>
      <div className="flex flex-col space-y-2 pt-2">
        <div>
          <Label>Select Social Media</Label>
          <Select
            options={SocialOptions}
            value={newSocial.name}
            onChange={(e) => {
              setNewSocial({
                ...newSocial,
                name: e.target.value as SocialMediaType,
              });
            }}
          />
        </div>
        <div>
          <Label>Enter Url</Label>
          <Input
            value={newSocial.url}
            onChange={(e) => {
              setNewSocial({ ...newSocial, url: e.target.value });
            }}
          />
        </div>
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="border-t-2 border-gray-200">
        <div className="py-2">
          {addedSocial?.map(({ name, url }) => (
            <AddedSocial
              key={name}
              name={name}
              url={url}
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
