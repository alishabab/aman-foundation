import Image from "next/image";
import { NextPage } from "next";
import { Heading, Button, Input, Label, Textarea } from "components";
import { ChangeEvent, useState } from "react";
import {
  useAddCampaignMutation,
  useEditCampaignMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
} from "services/mutations";
import { Campaign } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "context/AlertContext";
import { isValidImage } from "utils/isValidImage";
import { toBase64 } from "utils/toBase64";
interface IProps {
  campaign?: Campaign;
  cb: () => void;
}

type InitialState = Omit<Campaign, "createdAt" | "updatedAt" | "addedBy"> & {
  file: null | File;
  localImageUrl: string;
};

const initialState: InitialState = {
  title: "",
  description: "",
  slug: "",
  localImageUrl: "/assets/images/no-image.svg",
  image: {
    id: "",
    url: "",
  },
  file: null,
  isHighlighted: false,
  isCompleted: false,
  startedAt: new Date().toISOString().split("T")[0],
  completedAt: undefined,
  noOfBenificiaries: 0,
};

export const AddCampaign: NextPage<IProps> = ({ campaign, cb }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();
  const [state, setState] = useState(
    campaign
      ? {
          ...campaign,
          file: null,
          localImageUrl: campaign.image.url,
        }
      : initialState
  );

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: addCampaign } = useAddCampaignMutation();
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: editCampaign } = useEditCampaignMutation();

  const validateFields = () => {
    const { title, description, file, isCompleted, completedAt } = state;
    let message: undefined | string;

    if (!title.trim().length || !description.trim().length) {
      message = "Fill required fields.";
      return message;
    }

    if (!campaign && !file) {
      message = "Please select image";
      return message;
    }

    if (isCompleted && !completedAt) {
      message = "Please select completed date";
      return message;
    }

    return message;
  };

  const handleSubmit = async () => {
    const message = validateFields();
    if (message) {
      setAlert({ type: "danger", message });
      return;
    }
    setIsLoading(true);
    const {
      slug,
      title,
      description,
      image,
      isHighlighted,
      isCompleted,
      startedAt,
      completedAt,
      noOfBenificiaries,
      file,
    } = state;

    try {
      if (campaign && !file) {
        await editCampaign({
          title,
          description,
          slug,
          image,
          isHighlighted,
          isCompleted,
          noOfBenificiaries,
          startedAt,
          completedAt,
        });
      } else if (campaign && file) {
        await deleteImage(image.id);
        const base64 = await toBase64(file);
        const newImage = await uploadImage(base64);
        await editCampaign({
          title,
          description,
          slug,
          image: newImage,
          isHighlighted,
          isCompleted,
          noOfBenificiaries,
          startedAt,
          completedAt,
        });
      } else if (file) {
        const base64 = await toBase64(file);
        const image = await uploadImage(base64);
        await addCampaign({
          title,
          description,
          image,
          isHighlighted,
          isCompleted,
          noOfBenificiaries,
          startedAt,
          completedAt,
        });
      }
      setIsLoading(false);
      cb();
      setAlert({
        type: "success",
        message: "Campaign Added.",
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValid = await isValidImage(file);
      if (!isValid) {
        alert("Invalid image file");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setState((prevState) => ({
        ...prevState,
        localImageUrl: objectUrl,
        file: file,
      }));
    }
  };

  return (
    <div>
      <Heading className="text-center">
        {campaign ? "Edit Campaign" : "Add New Campaign"}{" "}
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          value={state.title}
          onChange={onChange}
        />
        <Label>Description</Label>
        <Textarea
          rows={6}
          name="description"
          value={state.description}
          onChange={onChange}
        />
        <Label>Benificeries so far</Label>
        <Input
          type="number"
          name="noOfBenificiaries"
          value={state.noOfBenificiaries}
          onChange={onChange}
        />
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
            blurDataURL={state.localImageUrl}
            src={state.localImageUrl}
            alt="avatar"
          />
        </div>

        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="startedAt"
            // @ts-ignore
            value={state.startedAt}
            onChange={onChange}
          />
        </div>
        <div className="flex space-x-4 my-4">
          <div className="flex items-center space-x-2">
            <Label>Highlight</Label>
            <button
              type="button"
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isHighlighted: !prevState.isHighlighted,
                }));
              }}
              className={`${
                state.isHighlighted ? "text-primary-600" : "text-gray-600"
              }`}>
              <FontAwesomeIcon icon={faStar} size="2x" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Label>Mark Completed</Label>
            <button
              type="button"
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isCompleted: !prevState.isCompleted,
                }));
              }}
              className={`${
                state.isCompleted ? "text-primary-600" : "text-gray-600"
              }`}>
              <FontAwesomeIcon
                icon={state.isCompleted ? faCheckSquare : faSquare}
                size="2x"
              />
            </button>
          </div>
        </div>

        {state.isCompleted && (
          <div>
            <Label>End Date</Label>
            <Input
              type="date"
              name="completedAt"
              // @ts-ignore
              value={state.completedAt}
              onChange={onChange}
            />
          </div>
        )}

        <Button className="mt-2" type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
