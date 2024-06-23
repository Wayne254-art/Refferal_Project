import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducers";
import depositReducer from "./reducers/deposits.reducers";
import withdrawalReducer from "./reducers/withdrawals.reducers";

const Store = configureStore({
    reducer: {
      user: userReducer,
      deposit: depositReducer,
      withdrawal: withdrawalReducer,
    },
  });
  
  export default Store;