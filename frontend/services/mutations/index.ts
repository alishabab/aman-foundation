import { useMutation } from "react-query";
import api from "services/api";
import { Campaign } from "types";
const uploadImage = async (file: File | null) => {
  if (!file) throw new Error("No file");
  const form = new FormData();
  form.append("file", file);
  const res = await api.post<{ filename: string }>("/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.filename;
};

export const useUploadImageMutation = () => {
  return useMutation(uploadImage);
};

const deleteImage = async (filename: string) => {
  const res = await api.post<{ success: boolean }>(`/upload/${filename}`);
  return res.data.success;
};

export const useDeleteImageMutation = () => {
  return useMutation(deleteImage);
};

const addCampaign = async (campaign: Omit<Campaign, "id" | "slug">) => {
  const res = await api.post<{ success: boolean }>("/campaigns", campaign);
  return res.data.success;
};

export const useAddCampaignMutation = () => {
  return useMutation(addCampaign);
};

const editCampaign = async (campaign: Campaign) => {
  const res = await api.put<{ success: boolean }>(
    `/campaigns/${campaign.slug}`,
    campaign
  );
  return res.data.success;
};

export const useEditCampaignMutation = () => {
  return useMutation(editCampaign);
};

const deleteCampaign = async (slug: string) => {
  const res = await api.post<{ success: boolean }>(`/campaigns/${slug}`);
  return res.data.success;
};

export const useDeleteCampaignMutation = () => {
  return useMutation(deleteCampaign);
};
