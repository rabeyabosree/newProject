import axios from 'axios'
import { useState } from 'react'
import { createContext } from 'react'

export const ChallengContext = createContext()

export function ChallengContextProvider({ children }) {
    const [challengs, setChallengs] = useState({})

    const BACKEND_API = "http://localhost:5000"

    // challenge generate 
    const generateChalenge = async (challengData) => {
        try {
            const token = localStorage.getItem('token')
            const challenge = await axios.get(`${BACKEND_API}/api/challengs/challenge`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: challengData
            })
            
            setChallengs(challenge.data.challenge)

        } catch (error) {
            console.error("challenge error", error)

        }
    }

    return (
        <ChallengContext.Provider value={{ challengs, generateChalenge }}>
            {children}
        </ChallengContext.Provider>
    )
}

