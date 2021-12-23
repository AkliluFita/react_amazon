import {createContext, useReducer} from 'react'
import Reducer from './reducer'

// initial state
const INITIAL_STATE ={
    basket: [],
    user:null
}

// prepare the data layer
export const Context = createContext(INITIAL_STATE);


// wrap out app and provide the data layer
export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)

    return(
        <Context.Provider
         value={[state, dispatch] }>
                {children}
        </Context.Provider>
    )
    }


