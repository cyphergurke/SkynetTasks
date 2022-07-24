import { useContext, useState } from 'react'
import { PortalContext } from '../../Context/PortalContext';


import './settings.css'





export const Settings: React.FC = () => {
    const portalContext = useContext(PortalContext);
    // const { selectedPortal, setSelectedPortal } = usePortalContext();
    // const [customPortal, setCustomPortal] = useState<customportal | null>(null);

    if (portalContext.selectedPortal === null) {
        portalContext.setSelectedPortal("https://FilePortal.org/");
    }

    const handlePortalinput = (e: string) => {
        if (e !== null) {
            //   setCustomPortal(e)
        }
        portalContext.setSelectedPortal(e)
    }

    console.log(portalContext.selectedPortal)
    return (
        <div className='portalsettings' >

            <div className='defaultPortals'>
                <p>Change Portal</p>
                <div>
                    <button onClick={() => portalContext.setSelectedPortal("https://siasky.net/")}>
                        SiaSky
                    </button>
                </div>
                <div>
                    <button onClick={() => portalContext.setSelectedPortal("https://siasky.net/")}>
                        SomeotherPortal
                    </button>
                </div>
            </div>

            <div className='customportal'>
                <p> Set custom Portal</p>
                <input placeholder="Your Portal" onChange={(e) => handlePortalinput(e.target.value)} />
                <button >SetPortal</button>

            </div>



        </div >
    )
}

