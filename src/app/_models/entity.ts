export interface Flights {
    flightId: string;
    company: string;
      departure: string;
    arrival: string;
      destination: string;
      pickup: string;
      passengers: number;
    limitpassengers: number;
    passengerflightdetails: Passengerflightdetails[];
    item: IteMs[];
    meal: MeaLs[];
    services: Services[];
  }

export interface Passengerflightdetails {
      passengerID: string;
      wheelchair: boolean;
      infants: boolean;
      meals: boolean;
      ancillaryServices: boolean;
      seatPref: string;
      seat_number: string;
      checkin: boolean;
      item: IteMs[];
      flight: Flights;
      services: Services[];
      meal: MeaLs[];
    // passengerbookingdetails:Passengerbookingdetails;
  }
export interface Passengerbookingdetails {
    bookingID: string;
      name: string;
      age: number;
      passport: boolean;
      dob: Date;
      address: string;
    pnr: string;
    passengerflightdetails: Passengerflightdetails;
  }
export interface AncillaryServices {
    serviceID: string;
    magazine: boolean;
    headpillow: boolean;
    pets: boolean;
  }

export interface IteMs {
    itemName: string;
    itemType: string;
    price: number;
    itemID: number;
    }

export interface MeaLs {
    mealName: string;
    price: number;
    mealID: number;
    }

export interface Services {
      serviceName: string;
      serviceID: number;
    }
export interface Admin {
      adminID: string;
      companyName: string;
      password: string;
      role: number;
      profilepic;
      token?: string;
    }
