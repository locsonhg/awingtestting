export interface CampaignSubmit {
  information: {
    name: string;

    describe?: string;
  };

  subCampaigns: [
    {
      name: string;

      status: boolean;

      ads: [
        {
          name: string;

          quantity: number;
        }
      ];
    }
  ];
}

export type AdsType = {
  name: string;
  quantity: number;
  id: number;
};

export type SubCampaign = {
  name: string;
  status: boolean;
  ads: AdsType[];
};

export type CampaignInformation = {
  name: string;
  describe?: string;
};

export type Campaign = {
  information: CampaignInformation;
  subCampaigns: SubCampaign[];
};
