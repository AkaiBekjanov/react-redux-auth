import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const authUser=createAsyncThunk(
    "post/authUser",
    async(payload,{rejectWithValue})=>{
    
        try{
           
            const res=await axios.post(`http://localhost:8080/${payload.params}`,payload.user)
            
            console.log(res)
            if(res.status != 201 && payload.params == "register"){
              throw new Error("Ошибка в запросе")
            }
            if(res.status != 200 && payload.params == "login"){
              throw new Error("Ошибка в запросе")
            }
      
             return res.data;
        }
        catch(err){
             return rejectWithValue(err.message)
        }
    }
)
const initialState = {
    login:null,
    email:null,
    error:null,
    status:"",
    token:null
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
     
  },
  extraReducers:(builder)=>{
          builder.addCase(authUser.pending,(state,action)=>{
                  state.status="loading";
                  state.error=null;
                  state.token=null
          })
          builder.addCase(authUser.rejected,(state,action)=>{
            state.status="error";
            state.error=action.payload;
    })
    builder.addCase(authUser.fulfilled,(state,action)=>{
        state.status="fulfilled";
        state.error=null;
})

  }
  
})


export default authSlice.reducer