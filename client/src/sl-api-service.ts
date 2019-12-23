export enum SiteId {
    Slussen = 9192,
}

class SlApiService {
    /**
     * fetchRealTimeData
     * @param siteId
     * The Id of the station to retrieve data from
     */
    public async fetchRealTimeData(siteId: SiteId) {
        this._fetchData(`/api/realtime?siteId=${siteId}`);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    private async _fetchData(url: string) {
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
        console.error(body);
    }
}

export const slApi = new SlApiService();
