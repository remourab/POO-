import { Location } from "./location"

export class Bike {
    constructor(
        public name: string,
        public type: string,
        public bodySize: number,
        public maxLoad: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public available: boolean = true,
        public Location: {
        latitude: number;
        longitude: number;
        city: string;
        timestamp: number;
      },
        public id?: string
    ) {}
}
