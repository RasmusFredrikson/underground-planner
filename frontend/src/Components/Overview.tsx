import React, { useEffect } from "react";
import { slApi, SiteId } from "../sl-api-service";

export const Overview = () => {
    useEffect(() => {});

    return (
        <span>
            <button
                onClick={async () => slApi.fetchRealTimeData(SiteId.Slussen)}
            >
                Hej
            </button>
            {`Overview`}
        </span>
    );
};
