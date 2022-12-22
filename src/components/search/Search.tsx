import './Search.css';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import searchUser from './search_api_service/search_api_service';
import { MODALMODES, ModalOptions, ModalOptionsProps, PatientSearchTypes } from './search_types/search_types';
import Modal from 'react-modal';
import Visits from '../visits/Visits';
import Vitals from '../vitals/Vitals';
import moment from 'moment';

function Search() {
    const [name, setName] = useState('');
    const [modalOptions, setModalOptions] = useState<ModalOptions>(ModalOptionsProps);

    const columns: TableColumn<PatientSearchTypes>[] = [
        {
            name: 'Patient Name',
            selector: row => row.person.display,
        },
        {
            name: 'Gender',
            selector: row => row.person.gender,
        },
        {
            name: 'Date Of Birth',
            selector: row => moment(row.person.birthdate).format("YYYY-MM-DD"),
        },
        {
            name: 'Age',
            selector: row => row.person.age,
        },
        {
            name: 'Visits',
            selector: row => row.person.gender,
            button: true,
            cell: (row) => <button className='table-btn' onClick={() => handleVisitClick(row)}>View</button>,
        },
        {
            name: 'Vitals',
            button: true,
            cell: (row) => <button className='table-btn' onClick={() => handleVitalClick(row)}>View</button>,
        }
    ];

    const [data, setData] = useState<Array<PatientSearchTypes>>([]);

    const handleSearch = async () => {
        // Fetch patients
        const result = await searchUser(name);
        setData(result);
    }

    const handleVisitClick = (row: PatientSearchTypes) => {
        setModalOptions({
            isOpen: true,
            modalText: 'Patient Visits.',
            mode: MODALMODES.VISITMODE,
            uuid: row.uuid
        });
    }

    const handleVitalClick = (row: PatientSearchTypes) => {
        setModalOptions({
            isOpen: true,
            modalText: 'Patient Vitals.',
            mode: MODALMODES.VITALMODE,
            uuid: row.uuid
        });
    }

    function closeModal() {
        setModalOptions(ModalOptionsProps);
    }

    return (
        <div>
            <div className='search-inputs'>
                {/* <div> */}
                <label>Search Patient.</label><br />
                <input type='search' placeholder='Search Patient' onChange={e => setName(e.target.value)} />
                {/* </div> */}
                <input type='button' value='Search' onClick={handleSearch} />
            </div>
            <div>
                <DataTable
                    title='Patient List'
                    columns={columns}
                    data={data}
                    striped
                    persistTableHead
                    highlightOnHover
                    pagination
                />
                <Modal
                    isOpen={modalOptions.isOpen}
                    onRequestClose={closeModal}
                    shouldCloseOnOverlayClick={false}
                >
                    <button className='modal-btn' onClick={closeModal}>Close</button>
                    <h4>{modalOptions.modalText}</h4>
                    {
                        modalOptions.mode === MODALMODES.VISITMODE
                            ? <Visits uuid={modalOptions.uuid} />
                            : <Vitals uuid={modalOptions.uuid} />
                    }
                </Modal>
            </div>
        </div>
    );
}

export default Search;