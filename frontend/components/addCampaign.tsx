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
import { faStar } from "@fortawesome/free-solid-svg-icons";
interface IProps {
  campaign?: Campaign;
  cb: () => void;
}

type InitialState = Omit<Campaign, "createdAt" | "updatedAt" | "addedBy"> & {
  file: null | File;
  localImageUrl: string;
};

const initialState: InitialState = {
  id: "",
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
};

export const AddCampaign: NextPage<IProps> = ({ campaign, cb }) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: addCampaign } = useAddCampaignMutation();
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: editCampaign } = useEditCampaignMutation();

  const handleSubmit = async () => {
    setIsLoading(true);
    const { id, slug, title, description, image, isHighlighted, file } = state;

    try {
      if (campaign && !file) {
        await editCampaign({
          id,
          title,
          description,
          slug,
          image,
          isHighlighted,
        });
      } else if (campaign && file) {
        await deleteImage(image.id);
        const base64 = await toBase64(file);
        const newImage = await uploadImage(base64);
        await editCampaign({
          id,
          title,
          description,
          slug,
          image: newImage,
          isHighlighted,
        });
      } else if (file) {
        const base64 = await toBase64(file);
        const image = await uploadImage(base64);
        await addCampaign({ title, description, image, isHighlighted });
      }
      setIsLoading(false);
      cb();
    } catch (error) {
      // @ts-ignore
      alert(error.message);
      setIsLoading(false);
    }
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      <Label>Title</Label>
      <Input type="text" name="title" value={state.title} onChange={onChange} />
      <Label>Description</Label>
      <Textarea
        rows={6}
        name="description"
        value={state.description}
        onChange={onChange}
      />
      <Label>Image Upload</Label>
      <div className="flex items-center text-secondary-600">
        <Input type="file" className="w-3/6 mr-8" onChange={onFileChange} />
        <Image
          width={100}
          height={100}
          blurDataURL={state.localImageUrl}
          src={state.localImageUrl}
          alt="avatar"
        />
      </div>
      <div className="flex items-center space-x-8">
        <Label>Highlight</Label>
        <button
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
      <Button className="mt-2" onClick={handleSubmit} loading={isLoading}>
        Submit
      </Button>
    </div>
  );
};
