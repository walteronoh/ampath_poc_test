
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import searchUser from './search_api_service/search_api_service';
import { PatientSearchTypes } from './search_types/search_types';


function Search() {
    const [name, setName] = useState('');

    const columns: TableColumn<PatientSearchTypes>[] = [
        {
            name: 'Patient Name',
            selector: row => row.person.display,
        },
        {
            name: 'Age',
            selector: row => row.person.age,
        },
        {
            name: 'Gender',
            selector: row => row.person.gender,
        },
        {
            name: 'Visits',
            selector: row => row.person.gender,
            button: true,
            cell: (row) => <button onClick={() => handleVisitClick(row)}>View</button>,
        },
        {
            name: 'Vitals',
            button: true,
            cell: (row) => <button onClick={() => handleVitalClick(row)}>View</button>,
        }
    ];

    const [data, setData] = useState<Array<PatientSearchTypes>>([]);

    const handleSearch = async () => {
        // Fetch patients
        const result = await searchUser(name);
        setData(result);
    }

    const handleVisitClick = (row: PatientSearchTypes) => {
         // Show visits modal
        console.log(row.uuid);
    }

    const handleVitalClick = (row: PatientSearchTypes) => {
        // Show vitals modal
        console.log(row.uuid);
    }

    return (
        <>
            <div>
                <input type='search' placeholder='Search Patient' onChange={e => setName(e.target.value)} />
                <input type='button' value='Search' onClick={handleSearch} />
                <div>
                    <DataTable
                        title='Patients'
                        columns={columns}
                        data={data}
                        striped
                        persistTableHead
                        highlightOnHover
                        pagination
                    />
                </div>
            </div>
        </>
    );
}

export default Search;