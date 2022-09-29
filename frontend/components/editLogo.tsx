import Image from "next/image";
import { Heading, Button, Input, Label } from "components";
import { ChangeEvent, useState } from "react";
import {
  useUploadImageMutation,
  useDeleteImageMutation,
  useEditOrganizationMutation,
} from "services/mutations";
import { Image as TImage } from "types";
import { useAlert } from "context/AlertContext";
import { isValidImage } from "utils/isValidImage";
import { toBase64 } from "utils/toBase64";
interface IProps {
  name?: string;
  logo?: TImage;
  cb: () => void;
}

export const EditLogo = ({ name, logo, cb }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useAlert();
  const [state, setState] = useState({
    file: null as File | null,
    name: name,
    logo: logo,
    localImageUrl: logo?.url || "/assets/images/no-image.svg",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const { mutateAsync: uploadImage } = useUploadImageMutation();
  const { mutateAsync: editNameAndLogo } = useEditOrganizationMutation();
  const { mutateAsync: deleteImage } = useDeleteImageMutation();

  const validateFields = () => {
    const { name, file } = state;
    let message: undefined | string;

    if (!name?.trim().length) {
      message = "Fill required fields.";
      return message;
    }

    if (!logo?.url && !file) {
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
    const { name, file } = state;

    try {
      if (logo?.url && !file) {
        await editNameAndLogo({
          name,
        });
      } else if (logo?.id && file) {
        await deleteImage(logo.id);
        const base64 = await toBase64(file);
        const newImage = await uploadImage(base64);
        await editNameAndLogo({
          name,
          logo: newImage,
        });
      } else if (!logo?.id && file) {
        const base64 = await toBase64(file);
        const newImage = await uploadImage(base64);
        await editNameAndLogo({
          name,
          logo: newImage,
        });
      }
      setIsLoading(false);
      cb();
      setAlert({
        type: "success",
        message: "Updated successfully",
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
      <Heading className="text-center">Update name and logo</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <Label>Name</Label>
        <Input type="text" name="name" value={state.name} onChange={onChange} />
        <Label>Image Upload</Label>
        <div className="flex items-center text-secondary-600">
          <Input
            type="file"
            accept="image/png, image/jpg, image/jpeg image/svg"
            className="w-3/6 mr-8"
            onChange={onFileChange}
          />
          <Image
            width={100}
            height={100}
            blurDataURL={state.localImageUrl}
            src={state.localImageUrl}
            alt="logo"
          />
        </div>

        <Button className="mt-2" type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
