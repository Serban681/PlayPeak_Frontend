// import { User } from "@/models/User";
// import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
// import { Root } from "postcss";

// const intitalState: User = {
//     id: -1,
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     defaultDeliveryAddress: {
//         id: -1,
//         streetLine: '',
//         postalCode: '',
//         city: '',
//         county: '',
//         country: ''
//     },
//     defaultBillingAddress: {
//         id: -1,
//         streetLine: '',
//         postalCode: '',
//         city: '',
//         county: '',
//         country: ''
//     }
// } 

// const userSlice = createSlice({
//     name: 'user',
//     initialState: intitalState,
//     reducers: {
//         setUser(state, action) {
//             state = {
//                 ...action.payload
//             }

//             return state;
//         }
//     }
// })

// const selectSelf = (state: any) => state;

// export default userSlice.reducer;

// export const { setUser } = userSlice.actions;

// export const selectUser = createDraftSafeSelector(selectSelf, state => state.user) as (state: Root) => User;
