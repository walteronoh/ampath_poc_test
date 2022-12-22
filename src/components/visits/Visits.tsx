
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import viewPatientVisits from './visits_api_service/visits_api_service';
import { VisitProps, VisitTypes } from './visits_types/visits_types';


function Visits(props: VisitProps) {
    const [data, setData] = useState<Array<VisitTypes>>([]);
    const handleLoad = async () => {
        const visits = await viewPatientVisits(props.uuid);
        setData(visits);
    }
    useEffect(() => {
        if (props.uuid)
            handleLoad();
    }, [props.uuid]);

    const columns: TableColumn<VisitTypes>[] = [
        {
            name: 'Visit',
            selector: row => row.display,
        },
    ];

    return (
        <>
            <div>
                <DataTable
                    columns={columns}
                    data={data}
                    striped
                    persistTableHead
                    highlightOnHover
                    pagination
                    fixedHeader
                />
            </div>
        </>
    );
}

export default Visits;