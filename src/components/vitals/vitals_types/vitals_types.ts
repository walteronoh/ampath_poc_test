interface VitalTypes {
    concept: {
        obsDatetime: string
    },
    obsDatetime: string
    location: {
        display: string,
        parentLocation: {
            display: string
        }
    },
    encounter: {
        obs: Array<{
            display: string
        }>
    }
}

interface VitalProps {
    uuid: string
}

export type { VitalProps, VitalTypes }