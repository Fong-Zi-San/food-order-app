// const [formState, dispatch] = useReducer(formReducer, initialFormState);

// export const initialFormState = {
//   name: "",
//   desc: "",
//   price: "",
//   nameInputError: false,
//   descInputError: false,
// };

// export const formReducer = (formState, action) => {
//   switch (action.type) {
//     case "CHANGED_INPUT": {
//       return {
//         ...formState,
//         [action.payload.name]: action.payload.value,
//       };
//     }
//     case "CLEARED_FORM": {
//       return {
//         ...formState,
//         name: "",
//         desc: "",
//         price: "",
//       };
//     }
//   }
// };
