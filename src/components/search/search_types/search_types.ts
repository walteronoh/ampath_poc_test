interface PatientSearchTypes {
    display: string;
    uuid: string;
    person: PersonInfoTypes
}

interface PersonInfoTypes {
    uuid: string;
    display: string;
    gender: string;
    age: string;
    birthdate: string;
}

interface ModalOptions {
    isOpen: boolean;
    modalText: string;
    mode: string;
    uuid: string;
}

export enum MODALMODES { VISITMODE = 'visitmode', VITALMODE = 'vitalmode' };

export const ModalOptionsProps = {
    isOpen: false,
    modalText: '',
    mode: '',
    uuid: ''
}

export type { PatientSearchTypes, ModalOptions }