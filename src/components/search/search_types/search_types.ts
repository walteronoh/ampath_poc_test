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
}

export type { PatientSearchTypes }