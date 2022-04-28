import { useAlert } from "context/AlertContext";
import { nanoid } from "nanoid";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  useDeleteImageMutation,
  useEditOrganizationMutation,
  useUploadImageMutation,
} from "services/mutations";
import { About } from "types";
import { toBase64 } from "utils/toBase64";
import { Button } from "./button";
import { Heading } from "./heading";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
const initialState: About & { localImageUrl: string } = {
  id: "",
  title: "",
  description: "",
  localImageUrl: "/assets/images/no-image.svg",
};

type Props = {
  prevAbout?: About[];
  editedAbout?: About;
  cb: () => void;
};

export const EditAbout = ({ prevAbout, editedAbout, cb }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();
  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: updateAbout } = useEditOrganizationMutation();
  const [about, setAbout] = useState(
    editedAbout
      ? {
          ...editedAbout,
          localImageUrl: editedAbout?.image?.url || initialState.localImageUrl,
        }
      : initialState
  );
  const [file, setFile] = useState<File | null>(null);

  const validate = () => {
    let message: string | undefined;

    const { title, description } = about;

    if (!title?.trim().length && !description?.trim().length && !file) {
      message = "Please fill at least one field";
    }

    return message;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
        setAbout({ ...about, localImageUrl: URL.createObjectURL(file) });
      }
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const message = validate();
      if (message) {
        setAlert({
          type: "danger",
          message,
        });
        return;
      }

      setIsLoading(true);

      if (editedAbout && file) {
        if (editedAbout?.image) deleteImage(editedAbout.image.id);
        const base64 = await toBase64(file);
        const newImage = await uploadImage(base64);
        const updatedAbout = prevAbout?.map((a) => {
          if (a.id === editedAbout.id) {
            return {
              ...a,
              title: about.title,
              description: about.description,
              image: newImage,
            };
          }
          return a;
        });
        await updateAbout({ about: updatedAbout });
        setIsLoading(false);
        cb();
        setAlert({
          type: "success",
          message: "About Updated.",
        });
        return;
      }

      if (editedAbout && !file) {
        const updatedAbout = prevAbout?.map((a) => {
          if (a.id === editedAbout.id) {
            return {
              ...a,
              title: about.title,
              description: about.description,
            };
          }
          return a;
        });

        await updateAbout({ about: updatedAbout });
        setIsLoading(false);
        cb();
        setAlert({
          type: "success",
          message: "About Updated.",
        });
        return;
      }

      if (!editedAbout && file) {
        const base64 = await toBase64(file);
        const image = await uploadImage(base64);
        const id = nanoid();
        const { title, description } = about;
        await updateAbout({
          about: [...(prevAbout || []), { id, title, description, image }],
        });
        setIsLoading(false);
        cb();
        setAlert({
          type: "success",
          message: "About Added",
        });
        return;
      }
      const id = nanoid();
      const { title, description } = about;
      await updateAbout({
        about: [...(prevAbout || []), { id, title, description, image: null }],
      });
      setIsLoading(false);
      cb();
      setAlert({
        type: "success",
        message: "About Added.",
      });
    } catch (error) {
      setIsLoading(false);
      cb();
      setAlert({
        type: "danger",
        // @ts-ignore
        message: error?.message || "Unable to edit/add About",
      });
    }
  };
  return (
    <>
      <Heading className="text-center">
        {editedAbout ? "Edit" : "Add"} About
      </Heading>
      <form onSubmit={handleSubmit}>
        <div>
          <Label>Title</Label>
          <Input name="title" value={about.title} onChange={onChange} />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            rows={5}
            name="description"
            value={about.description}
            onChange={onChange}
          />
        </div>
        <div>
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
              blurDataURL={about.localImageUrl}
              src={about.localImageUrl}
              alt="avatar"
            />
          </div>
        </div>
        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </>
  );
};
