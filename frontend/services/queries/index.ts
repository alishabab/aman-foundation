import { useQuery } from "react-query";
import api from "services/api";
import { Campaign } from "types";
export const getCampaigns = async () => {
  const res = await api.get<{ data: Campaign[] }>("/campaigns");
  return res.data.data;
};

export const useGetCampaignsQuery = () => {
  return useQuery("campaigns", getCampaigns);
};
