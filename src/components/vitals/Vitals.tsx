import moment from 'moment';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn, ExpanderComponentProps } from 'react-data-table-component';
import viewPatientVitals from './vitals_api_service/vitals_api_service';
import { VitalProps, VitalTypes } from './vitals_types/vitals_types';


function Vitals(props: VitalProps) {
    const [data, setData] = useState<Array<VitalTypes>>([]);
    const handleLoad = async () => {
        const visits = await viewPatientVitals(props.uuid);
        setData(visits);
    }
    useEffect(() => {
        if (props.uuid)
            handleLoad();
    }, [props.uuid]);
    useEffect(() => { }, [props.uuid]);
    const columns: TableColumn<VitalTypes>[] = [
        {
            name: 'Location',
            selector: row => row.location.display,
        },
        {
            name: 'Parent Location',
            selector: row => row.location.parentLocation.display,
        },
        {
            name: 'Date & Time',
            selector: row => moment(row.obsDatetime).format("YYYY-MM-DD HH:mm"),
        },
    ];

    const ExpandedComponent: React.FC<ExpanderComponentProps<any>> = ({ data }) => {
        const d: VitalTypes = data;
        return <>
            <h5>Observations</h5>
            {d.encounter.obs.map((v, i) => {
                return <li key={i}>{v.display}</li>
            })}
        </>;
    };

    return (
        <>
            <div>
                <DataTable
                    columns={columns}
                    data={data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
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

export default Vitals;