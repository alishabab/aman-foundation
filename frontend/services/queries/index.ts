import { useQuery } from "react-query";
import { CacheKeys } from "services/cacheKeys";
import api from "services/api";
import { Campaign, Organization } from "types";
export const getCampaigns = async () => {
  const res = await api.get<{ data: Campaign[] }>("/campaigns");
  return res.data.data;
};

export const getCampaign = async (slug: string) => {
  const res = await api.get<{ data: Campaign }>(`/campaigns/${slug}`);
  return res.data.data;
};

export const getOrganization = async () => {
  const res = await api.get<{ data: Organization }>("/organization");
  return res.data.data;
};

export const useGetCampaignsQuery = () => {
  return useQuery(CacheKeys.Campaigns, getCampaigns);
};

export const useGetCampaignQuery = ({ slug }: { slug: string }) => {
  return useQuery([CacheKeys.Campaign, slug], () => getCampaign(slug));
};

export const useGetOrganizationQuery = () => {
  return useQuery(CacheKeys.Organization, getOrganization);
};

export const getQuoteOfTheDay = async () => {
  const res = await fetch("https://quotes.rest/qod?language=en");
  const data = await res.json();
  return data.contents.quotes[0];
};

export const useGetQODQuery = () => {
  return useQuery(CacheKeys.QuoteOfTheDay, getQuoteOfTheDay);
};
