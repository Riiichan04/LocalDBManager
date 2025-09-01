import { Theme } from "@/types/Theme"
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react"

type SettingProps = {
    currentTheme: Theme
    updateCurrentTheme: (theme: Theme) => void
}

export default function SettingComponent(props: SettingProps) {
    const [activeSetting, setActiveSetting] = useState("")

    const changeTheme = (theme: string) => {
        props.updateCurrentTheme(theme === "default" ? Theme.DEFAULT : Theme.DARK)
        localStorage.setItem("theme", theme === "default" ? "light-theme" : "dark-theme")
        window.__setTheme(theme === "default" ? "light-theme" : "dark-theme");
    }

    return (
        <div className="py-2 h-full overflow-auto">
            <h3 className="font-semibold ps-5">Cài đặt</h3>
            <div className="grid-cols-12 grid mt-10 ps-2">
                <div className="col-span-2">
                    <div className={`rounded cursor-pointer h-fit p-2 select-none flex gap-2 ${activeSetting === "display" ? 'active-table-bar' : 'menu-feature'}`}
                        onClick={() => setActiveSetting("display")}
                    >
                        <BrushRoundedIcon />
                        <p>Hiển thị</p>
                    </div>
                    <div className={`rounded cursor-pointer h-fit p-2 select-none col-span-2 flex gap-2 ${activeSetting === "info" ? 'active-table-bar' : 'menu-feature'}`}
                        onClick={() => setActiveSetting("info")}
                    >
                        <InfoIcon />
                        <p>Thông tin</p>
                    </div>
                </div>
                <div className="col-span-10 p-2 ms-5">
                    {activeSetting === "display" && <DisplaySetting currentTheme={props.currentTheme} changeTheme={changeTheme} />}
                    {activeSetting === "info" && <InfoSetting />}
                </div>
            </div>
        </div>
    )
}

type DisplaySettingProps = {
    currentTheme: Theme
    changeTheme: (theme: string) => void
}
const DisplaySetting = (props: DisplaySettingProps) => {
    return (
        <div className="flex flex-col mt-1">
            <h3 className="font-normal border-b border-b-gray-500 pb-5 mb-5" style={{ width: '100%' }}>Chủ đề</h3>
            <div className="mb-3 grid grid-cols-12">
                <label className="flex items-center gap-1 col-span-2">
                    <input className="w-4 h-4" type="radio" name="theme" id="default-theme"
                        value="default" checked={props.currentTheme === Theme.DEFAULT}
                        onChange={() => props.changeTheme("default")}
                    />
                    Mặc định
                </label>

                <div className="flex gap-1 mt-3 col-span-10">
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#f5f5f5' }}></div>
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#0e171b' }}></div>
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#019ce0' }}></div>
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#ffa500' }}></div>
                </div>
            </div>

            <div className="mb-3 grid grid-cols-12">
                <label className="flex items-center gap-1 col-span-2">
                    <input className="w-4 h-4" type="radio" name="theme" id="dark-theme"
                        value="dark" checked={props.currentTheme === Theme.DARK}
                        onChange={() => props.changeTheme("dark")}
                    />
                    Dark
                </label>
                <div className="flex gap-1 mt-3 col-span-10">
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#162228' }}></div>
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#faf9f6' }}></div>
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#019ce0' }}></div>
                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#ffa500' }}></div>
                </div>
            </div>
        </div>
    )
}

const InfoSetting = () => {
    return (
        <div className="flex flex-col mt-1">
            <h3 className="font-normal border-b border-b-gray-500 pb-5 mb-5" style={{ width: '100%' }}>Thông tin</h3>
            <div>
                <p className="mb-3">Phiên bản hiện tại: <span className="font-semibold inline text-lg">v1.0.0</span></p>
                <p className="mb-3">Được cập nhật vào 27/08/2025</p>
            </div>
        </div>
    )
}