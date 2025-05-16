import axios from 'axios';
import { error } from 'console';
export interface Question{
    qnId:number;
    qnInWords: string;
    qImage?: string;
    options: string[];
    answer: string;
}

export interface Participant{
    participantId?:number;
    name:string;
    score?:number;
    timeTaken?: number
}

export const getParticipantFromAPI = async() =>{
    try{
    const response = await axios.get<Participant[]>("https://localhost:7260/api/participant");
    console.log(response.data)
    return response.data
    
    }catch(error){
        console.log(error);
    }
}

export const getQuestionsFromAPI = async() =>{
    try{
    const response = await axios.get<Question[]>("https://localhost:7260/api/questions");
    return response.data;
    console.log("Response from API:", response.data);
    }catch(error){
        console.log(error);
    }
}

export const postParicipantAPI = async(participant:Participant) =>{
    try{
    const response = await axios.post<Participant>('https://localhost:7260/api/participant', participant);
    console.log(response.data);
    return response.data;}
    catch (error) {
        console.log(error);
    }
}

export const putParticipantAPI = async(participant:Participant)=>{
    if(!participant.participantId) throw new Error("id required");
    await axios.put(`https://localhost:7260/api/participant/${participant.participantId}`, participant).then((response)=>{
        console.log(response.data);
        return response.data;
    }).catch(error=>{
        console.log(error);
    });
}