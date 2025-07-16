import dynamic from "next/dynamic";

export function iconLoader(iconName: string) {
    return dynamic(() => import(`@mui/icons-material/${iconName}`), {
        ssr: false
    })
}