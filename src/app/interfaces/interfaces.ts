
export interface Task {
    // id?: string
    description: string;
    realizada: boolean;
    position: Position;
}

interface Position {
    lat: string;
    lng: string;
}