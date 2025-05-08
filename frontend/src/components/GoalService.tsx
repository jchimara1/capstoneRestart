import {Goal} from "./Goal.ts";
import axios, {AxiosResponse} from "axios";

type fetchHabit = () => Promise<Goal[]>;





export const fetchGoals : fetchHabit =() => (
    axios.get('/api/goals').then((r: AxiosResponse<Goal[]>) => r.data)
)


export const postNewGoal = (data: Goal) => (
    axios.post('/api/goals', data)
        .then((r: AxiosResponse<Goal[]>) => r.data)
)

export const editGoal = (data:Goal, id: number|null) => (
    axios.put(`api/goals/${id}`, data)
)


export const deleteGoal = (id: number|null) => {
    axios.delete(`api/goals/${id}`).then((r:AxiosResponse<Goal[]>) => r.data)
    return "item deleted"
}

