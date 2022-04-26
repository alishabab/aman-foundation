import { useMutation, useQueryClient } from "react-query";
import { CacheKeys } from "services/cacheKeys";
import api from "services/api";
import { Campaign } from "types";
const uploadImage = async (file: string | ArrayBuffer | null) => {
  const res = await api.post<{ image: { url: string; id: string } }>(
    "/upload",
    {
      data: file,
      headers: { "Content-Type": "application/json" },
    }
  );

  return res.data.image;
};

export const useUploadImageMutation = () => {
  return useMutation(uploadImage);
};

const deleteImage = async (id: string) => {
  const res = await api.post<{ success: boolean }>(`/upload/${id}`);
  return res.data.success;
};

export const useDeleteImageMutation = () => {
  return useMutation(deleteImage);
};

const addCampaign = async (
  campaign: Omit<
    Campaign,
    "id" | "slug" | "createdAt" | "updatedAt" | "addedBy"
  >
) => {
  const res = await api.post<{ success: boolean }>("/campaigns", campaign);
  return res.data.success;
};

const editCampaign = async (
  campaign: Omit<Campaign, "createdAt" | "updatedAt" | "addedBy">
) => {
  const res = await api.put<{ success: boolean }>(
    `/campaigns/${campaign.slug}`,
    campaign
  );
  return res.data.success;
};

const deleteCampaign = async (slug: string) => {
  const res = await api.post<{ success: boolean }>(`/campaigns/${slug}`);
  return res.data.success;
};

export const useAddCampaignMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries(CacheKeys.Campaigns);
    },
  });
};

export const useEditCampaignMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(editCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries(CacheKeys.Campaigns);
    },
  });
};

export const useDeleteCampaignMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries(CacheKeys.Campaigns);
    },
  });
};
