import Image from "next/image";
import { NextPage } from "next";
import { Heading, Button, Input, Label, Textarea } from "components";
import { ChangeEvent, useState } from "react";
import {
  useAddStoryMutation,
  useEditStoryMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
} from "services/mutations";
import { Story } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "context/AlertContext";
import { isValidImage } from "utils/isValidImage";
import { toBase64 } from "utils/toBase64";
interface IProps {
  story?: Story;
  cb: () => void;
}

type InitialState = Omit<Story, "createdAt" | "updatedAt" | "addedBy"> & {
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
  isImpact: false,
};

export const AddStory: NextPage<IProps> = ({ story, cb }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();
  const [state, setState] = useState(
    story
      ? {
          ...story,
          file: null,
          localImageUrl: story.image.url,
        }
      : initialState
  );

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: addStory } = useAddStoryMutation();
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: editStory } = useEditStoryMutation();

  const validateFields = () => {
    const { title, description, file } = state;
    let message: undefined | string;

    if (!title.trim().length || !description.trim().length) {
      message = "Fill required fields.";
      return message;
    }

    if (!story && !file) {
      message = "Please select image";
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
    const { slug, title, description, image, isImpact, file } = state;

    try {
      if (story && !file) {
        await editStory({
          title,
          description,
          slug,
          image,
          isImpact,
        });
      } else if (story && file) {
        await deleteImage(image.id);
        const base64 = await toBase64(file);
        const newImage = await uploadImage(base64);
        await editStory({
          title,
          description,
          slug,
          image: newImage,
          isImpact,
        });
      } else if (file) {
        const base64 = await toBase64(file);
        const image = await uploadImage(base64);
        await addStory({
          title,
          description,
          image,
          isImpact,
        });
      }
      setIsLoading(false);
      cb();
      setAlert({
        type: "success",
        message: "Story Added.",
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
        {story ? "Edit Story" : "Add New Story"}{" "}
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

        <div className="flex space-x-4 my-4">
          <div className="flex items-center space-x-2">
            <Label>Impact Story</Label>
            <button
              type="button"
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  isImpact: !prevState.isImpact,
                }));
              }}
              className={`${
                state.isImpact ? "text-primary-600" : "text-gray-600"
              }`}>
              <FontAwesomeIcon icon={faStar} size="2x" />
            </button>
          </div>
        </div>

        <Button className="mt-2" type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
