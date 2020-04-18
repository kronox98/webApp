export interface Task {
    id: string;
    descripcion: string;
    realizada: boolean;
    position: Position;
}

interface Position {
    lat: number;
    lng: number;
}