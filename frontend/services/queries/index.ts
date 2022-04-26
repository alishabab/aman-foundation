import { useQuery } from "react-query";
import { CacheKeys } from "services/cacheKeys";
import api from "services/api";
import { Campaign } from "types";
export const getCampaigns = async () => {
  const res = await api.get<{ data: Campaign[] }>("/campaigns");
  return res.data.data;
};

export const getCampaign = async (slug: string) => {
  const res = await api.get<{ data: Campaign }>(`/campaigns/${slug}`);
  return res.data.data;
};

export const useGetCampaignsQuery = () => {
  return useQuery(CacheKeys.Campaigns, getCampaigns);
};

export const useGetCampaignQuery = ({ slug }: { slug: string }) => {
  return useQuery([CacheKeys.Campaigns, slug], () => getCampaign(slug));
};
