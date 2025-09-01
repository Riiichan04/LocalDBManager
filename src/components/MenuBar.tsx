import { MenuBarType } from '@/types/FeatureType';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PowerRoundedIcon from '@mui/icons-material/PowerRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

type MenuBarProps = {
    currentMenuBarFeature: MenuBarType,
    updateCurrentMenuBarFeature: (menuType: MenuBarType) => void
}

export default function MenuBar({ currentMenuBarFeature, updateCurrentMenuBarFeature }: MenuBarProps) {
    return (
        <div className="col-span-2 border-e relative" style={{ height: '100vh' }}>
            <div className="flex flex-col justify-center items-center mb-5">
                <h3>Local DB Manager</h3>
            </div>

            <div className={`${currentMenuBarFeature === MenuBarType.HOME ? "active-feature " : "menu-feature"} p-1 px-2 select-none cursor-pointer items-center justify-center flex-1`}
                onClick={() => updateCurrentMenuBarFeature(MenuBarType.HOME)}
            >
                <HomeRoundedIcon sx={{ fontSize: '2rem' }} />
                <span className="ms-1">
                    Trang chủ
                </span>
            </div>

            <div className={`${currentMenuBarFeature === MenuBarType.CONNECTION ? "active-feature " : "menu-feature"} p-1 px-2 select-none cursor-pointer items-center justify-center flex-1`}
                onClick={() => updateCurrentMenuBarFeature(MenuBarType.CONNECTION)}
            >
                <PowerRoundedIcon sx={{ fontSize: '2rem' }} />
                <span className="ms-1">
                    Connection
                </span>
            </div>

            <div className='absolute inset-x-0 bottom-0'>
                <div className={`${currentMenuBarFeature === MenuBarType.SETTING ? "active-feature " : "menu-feature"} p-1 px-2 select-none cursor-pointer items-center justify-center flex-1`}
                    onClick={() => updateCurrentMenuBarFeature(MenuBarType.SETTING)}
                >
                    <SettingsRoundedIcon sx={{ fontSize: '2rem' }} />
                    <span className="ms-1">
                        Cài đặt
                    </span>
                </div>
            </div>



        </div>
    )
}