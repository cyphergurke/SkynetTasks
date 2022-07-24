import React, { createContext, useState, ReactNode } from 'react'


type Portal = {
    portal: string
}

type ContextType = {
    selectedPortal: Portal | string
    setSelectedPortal: React.Dispatch<React.SetStateAction<Portal | string>>
}

export const PortalContext = createContext<ContextType>({} as ContextType);

const PortalProvider = ({ children }: { children: ReactNode }) => {

    const [selectedPortal, setSelectedPortal] = useState<Portal | string>("https://siasky.net/");


    return (
        <PortalContext.Provider value={{ selectedPortal, setSelectedPortal }}>
            {children}
        </PortalContext.Provider >
    );
}
export default PortalProvider