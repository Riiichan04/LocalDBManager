import { Theme } from "@/types/Theme"
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';

type SettingProps = {
    currentTheme: Theme
    updateCurrentTheme: (theme: Theme) => void
}

export default function SettingComponent(props: SettingProps) {

    const changeTheme = (theme: string) => {
        props.updateCurrentTheme(theme === "default" ? Theme.DEFAULT : Theme.DARK)
        localStorage.setItem("theme", theme === "default" ? "light-theme" : "dark-theme")
        window.__setTheme(theme === "default" ? "light-theme" : "dark-theme");
    }

    return (
        <div className="p-2 h-full overflow-auto">
            <h3 className="font-semibold">Cài đặt</h3>
            <div className="grid-cols-12 grid mt-10 h-full">
                <div className="col-span-2 flex gap-2 border-e">
                    <BrushRoundedIcon />
                    <p>Hiển thị</p>
                </div>
                <div className="col-span-10 p-2">
                    {/* Temp */}
                    {/* Will be convert to a single component */}
                    <div className="flex gap-2">
                        <h5 className="font-semibold">Chủ đề:</h5>
                        <div className="flex flex-col mt-1">
                            <div className="mb-5">
                                <label className="flex items-center gap-1">
                                    <input className="w-4 h-4" type="radio" name="theme" id="default-theme"
                                        value="default" checked={props.currentTheme === Theme.DEFAULT}
                                        onChange={() => changeTheme("default")}
                                    />
                                    Mặc định
                                </label>

                                <div className="flex gap-1">
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#f5f5f5' }}></div>
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#0e171b' }}></div>
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#019ce0' }}></div>
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#ffa500' }}></div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="flex items-center gap-1">
                                    <input className="w-4 h-4" type="radio" name="theme" id="dark-theme"
                                        value="dark" checked={props.currentTheme === Theme.DARK}
                                        onChange={() => changeTheme("dark")}
                                    />
                                    Dark
                                </label>
                                <div className="flex gap-1">
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#162228' }}></div>
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#faf9f6' }}></div>
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#019ce0' }}></div>
                                    <div className="w-8 h-8 border rounded" style={{ backgroundColor: '#ffa500' }}></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}