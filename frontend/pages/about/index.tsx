import { useState } from "react";
import { Button, Heading, Modal } from "components";
import { AboutCard } from "components/aboutCard";
import { useSession } from "next-auth/react";
import { useGetOrganizationQuery } from "services/queries";
import { EditAbout } from "components/editAbout";
import { About } from "types";
import { useAlert } from "context/AlertContext";
import {
  useDeleteImageMutation,
  useEditOrganizationMutation,
} from "services/mutations";
const About = () => {
  const { setAlert } = useAlert();
  const session = useSession();
  const { data: organization } = useGetOrganizationQuery();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editedAbout, setEditedAbout] = useState<About | undefined>(undefined);
  const [deletedAbout, setDeletedAbout] = useState<About | undefined>(
    undefined
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutateAsync: deleteImage } = useDeleteImageMutation();
  const { mutateAsync: updateOrganization } = useEditOrganizationMutation();

  const handleDelete = async (about: About) => {
    try {
      setIsDeleting(true);
      if (deletedAbout?.image) await deleteImage(deletedAbout.image.id);
      const updatedAbout = organization?.about.filter(
        (a) => a.id !== deletedAbout?.id
      );
      await updateOrganization({ about: updatedAbout });
      setIsDeleting(false);
      setIsDelete(false);
      setDeletedAbout(undefined);
      setAlert({
        type: "success",
        message: "About Deleted.",
      });
    } catch (err) {
      setIsDeleting(false);
      setIsDelete(false);
      setAlert({
        type: "danger",
        // @ts-ignore
        message: err?.message || "Error deleting about.",
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={isAdd}
        onClick={() => {
          setIsAdd(false);
        }}>
        <EditAbout
          prevAbout={organization?.about}
          cb={() => {
            setIsAdd(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isEdit}
        onClick={() => {
          setIsEdit(false);
        }}>
        <EditAbout
          prevAbout={organization?.about}
          editedAbout={editedAbout}
          cb={() => {
            setIsEdit(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={isDelete}
        onClick={() => {
          setIsDelete(false);
        }}>
        <Heading className="text-center mb-16">Delete About</Heading>
        <div className="flex justify-center space-x-8">
          <Button
            loading={isDeleting}
            secondary
            className="w-32"
            onClick={() => {}}>
            Yes
          </Button>
          <Button
            className="w-32"
            onClick={() => {
              setIsDelete(false);
              setDeletedAbout(undefined);
            }}>
            No
          </Button>
        </div>
      </Modal>
      <div className="px-2">
        {session?.data?.isAdmin && (
          <Button
            className="mb-2"
            secondary
            onClick={() => {
              setIsAdd(true);
            }}>
            Add About Section
          </Button>
        )}
        {organization?.about.map((about) => (
          <AboutCard
            key={about.id}
            {...about}
            className="mb-8"
            onClickEdit={() => {
              setIsEdit(true);
              setEditedAbout(about);
            }}
            onClickDelete={() => {
              setIsDelete(true);
              setDeletedAbout(about);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default About;
