import {ExpensesDetail} from "../consts/models";

export const Expenses: Array<ExpensesDetail> = [
    {
        value: 192.12,
        name: "The pair of shoes",
        id: "exp1",
        date: new Date(new Date().setDate(new Date().getDate()-1))
    },
    {
        value: 100,
        name: "The pair of plants",
        id: "exp2",
        date: new Date(new Date().setDate(new Date().getDate()-2))
    },
        {
        value: 12.12,
        name: "Food",
        id: "exp3",
        date: new Date(new Date().setDate(new Date().getDate()-6))
    },
    {
        value: 89.12,
        name: "Gaming mouse",
        id: "exp4",
        date: new Date(new Date().setDate(new Date().getDate()-10))
    },
]