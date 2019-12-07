import $ from "jquery";

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

        // const resp = await fetch("https://randomuser.me/api/?results=10");
        // console.log(await resp.json());
        // const resp = await fetch(
        //     "https://api.sl.se/api2/realtimedeparturesV4",
        //     {
        //         method: "GET", // *GET, POST, PUT, DELETE, etc.
        //         mode: "no-cors", // no-cors, *cors, same-origin
        //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //         credentials: "same-origin", // include, *same-origin, omit
        //         headers: {
        //             "Content-Type": "application/json",
        //             // 'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         redirect: "follow", // manual, *follow, error
        //         referrer: "no-referrer", // no-referrer, *client
        //     }
        // );
        // console.log(await resp.text());

        try {
            await this._fetchData(baseUrl, params);
            // .then(async resp => console.log(await resp.text()));
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

        $.ajax({
            url: url.href,
            contentType: "application/json",
            dataType: "jsonp",
            responseType: "application/json",
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "application/json",
            },
            success: function(data) {
                console.error(data);
            },
            error: function(jqXHR, exception) {
                var msg = "";
                if (jqXHR.status === 0) {
                    msg = "Not connected.\n Verify Network.";
                } else if (jqXHR.status == 404) {
                    msg = "Requested page not found. [404]";
                } else if (jqXHR.status == 500) {
                    msg = "Internal Server Error [500].";
                } else if (exception === "parsererror") {
                    msg = "Requested JSON parse failed.";
                } else if (exception === "timeout") {
                    msg = "Time out error.";
                } else if (exception === "abort") {
                    msg = "Ajax request aborted.";
                } else {
                    msg = "Uncaught Error.\n" + jqXHR.responseText;
                }
                alert(msg);
            },
        });
        // // Default options are marked with *
        // return fetch(url.href, {
        //     method: "GET", // *GET, POST, PUT, DELETE, etc.
        //     mode: "cors", // no-cors, *cors, same-origin
        //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: "include", // include, *same-origin, omit
        //     headers: {
        //         // "Content-Type": "application/json;charset=UTF-8",
        //         "Access-Control-Allow-Origin": "*",
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: "follow", // manual, *follow, error
        //     referrer: "no-referrer", // no-referrer, *client
        // });
    }
}

export const slApi = new SlApiService();
