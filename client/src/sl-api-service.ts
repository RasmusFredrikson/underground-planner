export enum SiteId {
    Slussen = 9192,
}

class SlApiService {
    private readonly _realtidApiKey = "4d2534968afe446eba10b8415adf0599";

    /**
     * fetchRealTimeData
     * @param siteId
     * The Id of the station to retrieve data from
     */
    public async fetchRealTimeData(siteId: SiteId) {
        const baseUrl = "https://api.sl.se/api2/realtimedeparturesV4.json";
        const params = {
            key: this._realtidApiKey,
            siteid: siteId.toString(),
            timewindow: "60",
            origin: "*",
        };

        try {
            await this._fetchData(baseUrl, params);
            // console.log(await response.json()); // JSON-string from `response.json()` call
        } catch (error) {
            console.error(error);
        }
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    private async _fetchData(baseUrl: string, params: any = {}) {
        const url = new URL(`${baseUrl}`);
        Object.keys(params).forEach(key =>
            url.searchParams.append(key, params[key])
        );

        // Default options are marked with *
        return fetch(url.href, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                // "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        });
    }
}

export const slApi = new SlApiService();
