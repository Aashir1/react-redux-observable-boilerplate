export default class Service {
    static state = {
        currentUser: null,
        dataObj: {
            '1': { type: 'product', id: '1', name: 'Apple', consumeable: true },
            '5': { type: 'product', id: '5', name: 'Shampo', qty: 15, consumeable: true },
            '2': { type: 'locker', id: '2', name: 'Locker 1', current: { uid: '', product: [], assignDate: '', checkoutDate: "", checkout: "" }, history: [], isAvailable: true },
            '7': { type: 'locker', id: '7', name: 'Locker 2', current: { uid: '', product: [], assignDate: '', checkoutDate: "", checkout: "" }, history: [], isAvailable: true },
            '3': {
                type: 'member', id: '3', name: 'Yousuf Qutubuddin', current: { lockerId: '', product: [], assignDate: "", checkoutDate: "" }, history: [], imageUrl: 'https://scontent.fkhi1-1.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/29178880_10155930717065469_7482973953040875527_n.jpg?_nc_cat=0&oh=29d1a2b29d28f01f9d65ee92844f4a39&oe=5C0A2526', userData: []
            },
            '4': {
                type: 'member',
                id: '4',
                name: 'Qutubuddin',
                current: { lockerId: '', product: [], assignData: "", checkoutDate: "" },
                history: [],
                imageUrl: null,
                userData: []
            },
            5: { name: 'Towel', qty: 10, consumeable: false },
            6: { name: 'Shampo', qty: 15, consumeable: true }
        },
        inventory: {
            '1': { type: 'product', id: '1', qty: 29, name: 'Apple', consumeable: true },
            '5': { type: 'product', id: '5', name: 'Shampo', qty: 15, consumeable: true },
            5: { type: 'product', id: 4, name: 'Towel', qty: 10, consumeable: false },
        },
        // dataObj: {
        //     '000555555': { type: 'product', id: '000555555', name: 'Apple', consumeable: true },
        //     '000666666': { type: 'product', id: '000666666', name: 'Shampo', qty: 15, consumeable: true },
        //     '000333333': { type: 'locker', id: '000333333', name: 'Locker 1', current: { uid: '', product: [], checkDate: "", checkout: "" }, history: [], isAvailable: true },
        //     '000444444': { type: 'locker', id: '000444444', name: 'Locker 2', current: { uid: '', product: [], checkDate: "", checkout: "" }, history: [], isAvailable: true },
        //     '000111111': {
        //         type: 'member', id: '000111111', name: 'Yousuf Qutubuddin', current: { lockerId: '', product: [], assignData: "", checkoutDate: "" }, history: [], imageUrl: 'https://scontent.fkhi1-1.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/29178880_10155930717065469_7482973953040875527_n.jpg?_nc_cat=0&oh=29d1a2b29d28f01f9d65ee92844f4a39&oe=5C0A2526', userData: []
        //     },
        //     '000222222': {
        //         type: 'member',
        //         id: '000222222',
        //         name: 'Qutubuddin',
        //         current: { lockerId: '', product: [], assignData: "", checkoutDate: "" },
        //         imageUrl: null,
        //         userData: []
        //     },
        //     5: { name: 'Towel', qty: 10, consumeable: false },
        //     6: { name: 'Shampo', qty: 15, consumeable: true }
        // },
        // inventory: {
        //     '000555555': { type: 'product', id: '000555555', qty: 29, name: 'Apple', consumeable: true },
        //     '000666666': { type: 'product', id: '000666666', name: 'Shampo', qty: 15, consumeable: true },
        //     5: { type: 'product', id: 4, name: 'Towel', qty: 10, consumeable: false },
        // },
        lockers: {
            L1: {},
            L2: { name: 'Locker 2', current: null, history: [], isAvailable: true },
            L3: { name: 'Locker 3', current: null, history: [], isAvailable: true }
        },
        data: [
            {
                id: 'M1',
                name: 'Yousuf Qutubuddin',
                imageUrl: 'https://scontent.fkhi1-1.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/29178880_10155930717065469_7482973953040875527_n.jpg?_nc_cat=0&oh=29d1a2b29d28f01f9d65ee92844f4a39&oe=5C0A2526',
                userData: [
                    // {
                    //     item: 'Shampoo',
                    //     qty: 2
                    // },
                    // {
                    //     item: 'soap',
                    //     qty: 3
                    // },
                    // {
                    //     item: 'surf',
                    //     qty: 5
                    // },
                    // {
                    //     item: 'botal',
                    //     qty: 1
                    // }
                ]
            },
            {
                id: 'M2',
                name: 'Qutubuddin',
                imageUrl: null,
                userData: []
            }
        ]
    }
}