import { useContext } from "react";

import { PortalContext } from "../Context/PortalContext";

export const useLink = () => {
    const { selectedPortal, setPortal } = useContext(PortalContext);

    // console.log(typeof (selectedPortal))

    if (selectedPortal === undefined) {
        setPortal("https://FilePortal.org/")
    }

    const resolveLink = (url) => {


        if (url.includes("skynet://")) {
            return url.replace("skynet://", selectedPortal);
        }
        // if (!url || !url.includes("ipfs://")) return url;
        if (url.includes("ipfs://")) {
            return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
        }

    };

    return { resolveLink };
};