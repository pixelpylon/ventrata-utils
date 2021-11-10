export namespace Entities {
    export interface IPricing {
        original: number
        currency: string
    }

    export interface IUnitItem {
        unitId: string
        unit: IUnit
    }

    export interface IContact {
        fullName: string
        firstName: string
        lastName: string
        emailAddress: string
        phoneNumber: string
        locales: string[]
        country: string
    }

    export interface IOption {
        id: string
        internalName: string
        reference: string
        title: string
        units: IUnit[]
    }

    export interface IRestriction {
        minAge: number
        maxAge: number
    }

    export interface IUnit {
        type: string
        id: string
        internalName: string
        reference: string
        restrictions: IRestriction
        title: string
        titlePlural: string
        subtitle: string
    }

    export interface IProduct {
        title: string
        internalName: string
        reference: string
        options: IOption[]
    }

    export interface IReseller {
        name: string
        id: string
    }

    export interface IBooking {
        supplierReference: string
        uuid: string
        availabilityId: string
        status: string
        contact: IContact
        product: IProduct
        option: IOption,
        unitItems: IUnitItem[]
        pricing: IPricing
        availability: IAvailability
        reseller: IReseller | null
        notes: string
    }

    export interface IAvailability {
        localDateTimeStart: string
        available: boolean
        capacity: number
        status: string
        id: string
    }

    export interface IUnitCounter {
        id: string
        quantity: number
    }

    export interface ICalendarDay {
        available: boolean
        capacity: number
        localDate: string
        status: string
        vacancies: number
    }
}