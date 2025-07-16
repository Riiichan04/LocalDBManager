import { FeatureType } from "@/types/FeatureType";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PowerRoundedIcon from '@mui/icons-material/PowerRounded';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import '@/styles/featureBar.css'

type FeatureBarProps = {
    currentFeature: FeatureType,
    setCurrentFeature: (newFeature: FeatureType) => void
}

export default function FeatureBar({ currentFeature, setCurrentFeature }: FeatureBarProps) {
    return (
        <div className="flex feature-bar">
            <div className={(currentFeature === FeatureType.HOME ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.HOME)}
            >
                <HomeRoundedIcon sx={{fontSize: '2rem'}} />
                Trang chủ
            </div>

            <div className={(currentFeature === FeatureType.CONNECTION ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.CONNECTION)}
            >
                <PowerRoundedIcon sx={{fontSize: '2rem'}} />
                Connection
            </div>

            <div className={(currentFeature === FeatureType.QUERY ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.QUERY)}
            >
                <BackupTableRoundedIcon sx={{fontSize: '2rem'}} />
                Query
            </div>

            <div className={(currentFeature === FeatureType.TABLE ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.TABLE)}
            >
                <TableChartRoundedIcon sx={{fontSize: '2rem'}} />
                Table
            </div>

            <div className={(currentFeature === FeatureType.INDEX ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.INDEX)}
            >
                <ListRoundedIcon sx={{fontSize: '2rem'}} />
                Index
            </div>

            <div className={(currentFeature === FeatureType.VIEW ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.VIEW)}
            >
                <VisibilityRoundedIcon sx={{fontSize: '2rem'}} />
                View
            </div>

            <div className={(currentFeature === FeatureType.FUNCTION ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.FUNCTION)}
            >
                <FunctionsRoundedIcon sx={{fontSize: '2rem'}} />
                Function
            </div>

            <div className={(currentFeature === FeatureType.USER ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.USER)}
            >
                <GroupRoundedIcon sx={{fontSize: '2rem'}} />
                User
            </div>

            <div className={(currentFeature === FeatureType.TRIGGER ? "active-feature " : " ") + "flex flex-col items-center justify-center flex-1"}
                onClick={() => setCurrentFeature(FeatureType.TRIGGER)}
            >
                <BoltRoundedIcon sx={{fontSize: '2rem'}} />
                Trigger
            </div>
        </div>
    )
}