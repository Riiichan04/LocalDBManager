// import { getConnection } from '@/services/connectionService';
// import { DatabaseConnection } from '@/types/Connection';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import { useEffect, useState } from 'react';

type ManageConnectionFeatureBarProps = {
    updateAddNewConnectionForm: () => void
}

export default function ManageConnectionFeatureBar(props: ManageConnectionFeatureBarProps) {
    return (
        <div className="grid grid-cols-12 gap-4 p-2 border">
            <div className="col-span-10"></div>
            <div className="col-span-2">
                <button className="p-1 px-2 rounded flex content-center main-cta-button cursor-pointer"
                    onClick={props.updateAddNewConnectionForm}
                >
                    <AddRoundedIcon className="pe-1" />
                    Thêm một connection
                </button>
            </div>
        </div>
    )
}