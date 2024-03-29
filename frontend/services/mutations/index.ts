import { useMutation, useQueryClient } from "react-query";
import { CacheKeys } from "services/cacheKeys";
import api from "services/api";
import { Campaign, Image, Achievement, About, SocialLink, Story } from "types";
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

const addStory = async (
  story: Omit<Story, "id" | "slug" | "createdAt" | "updatedAt" | "addedBy">
) => {
  const res = await api.post<{ success: boolean }>("/stories", story);
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

const editStory = async (
  story: Omit<Story, "createdAt" | "updatedAt" | "addedBy">
) => {
  const res = await api.put<{ success: boolean }>(
    `/stories/${story.slug}`,
    story
  );
  return res.data.success;
};

const deleteCampaign = async (slug: string) => {
  const res = await api.post<{ success: boolean }>(`/campaigns/${slug}`);
  return res.data.success;
};

const deleteStory = async (slug: string) => {
  const res = await api.post<{ success: boolean }>(`/stories/${slug}`);
  return res.data.success;
};

type EditOrganizationOptions = {
  name?: string;
  logo?: Image;
  cover?: Image;
  acheivements?: Achievement[];
  about?: About[];
  socialLinks?: SocialLink[];
};

const editOrganization = async (options: EditOrganizationOptions) => {
  const res = await api.put<{ success: boolean }>("/organization", {
    ...options,
  });
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

export const useAddStoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(CacheKeys.Stories);
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

export const useEditStoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(editStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(CacheKeys.Stories);
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

export const useDeleteStoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteStory, {
    onSuccess: () => {
      queryClient.invalidateQueries(CacheKeys.Stories);
    },
  });
};

export const useEditOrganizationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(editOrganization, {
    onSuccess: () => {
      queryClient.invalidateQueries(CacheKeys.Organization);
    },
  });
};
