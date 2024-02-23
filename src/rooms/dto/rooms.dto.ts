enum ROOM_TYPE {
    SINGLE = "SINGLE",
    DOUBLE = "DOUBLE"
}


export class RoomsDto {

    roomType: ROOM_TYPE;
    roomDescription: string;
    amenities: string[]; // Define amenities as an array of strings
    pricePerDay: number; // Assuming price is a numeric value
    availability: boolean;
    images: string[]; // Define images as an array of strings
}