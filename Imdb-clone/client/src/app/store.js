import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import movieReducer from "./features/movieSlice";
// import actorReducer from "./features/actorSlice";
// import producerReducer from "./features/producerSlice";


const store = configureStore({
   reducer:{
      auth:authReducer,
      movies:movieReducer,
      // producers:producerReducer,
      // actors:actorReducer
   }
});

export default store;