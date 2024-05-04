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
