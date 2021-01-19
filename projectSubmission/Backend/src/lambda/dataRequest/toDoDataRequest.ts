import { createLogger } from '../../utils/logger'
import 'source-map-support/register'
import {gettoDosbyUser} from '../dataAccess/toDoData'
const todotablename = process.env.TODOS_TABLE

import {createTodo} from '../dataAccess/toDoData'
import {UpdateItem} from '../dataAccess/toDoData'
import {deleteItem} from '../dataAccess/toDoData'


import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'


export async function requesttoDosbyUser(userId: string) {
    const logger = createLogger('requestTodosbuUser')

    const result = await gettoDosbyUser(userId)

    logger.info("getting items from table ", todotablename, " for ", userId)

    logger.info("retrieved items from " + todotablename + " for user " + userId)
    const items = result.Items
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ items})

    }
}


export async function requestnewToDo(newTodo: CreateTodoRequest, userId: string) {
    
    const logger = createLogger('requestnewTodo')

    logger.info("Adding new todo to table = " + newTodo.name)

    

    const todoItem = await createTodo(newTodo, userId)




return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({item: todoItem})
}

}



export async function requestToDoUpdate(updatedTodo: UpdateTodoRequest, todoId: string, userId: string) {
    
    const logger = createLogger('requestTodoUpdate')

    logger.info("Adding new todo to table = " + updatedTodo.name)

    const cupdatedTodo = await UpdateItem(updatedTodo, todoId, userId)
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        }, body: JSON.stringify({ item: { cupdatedTodo } })

    }

    
}


export async function requestToDoDelete(todoId: string, userId: string) {
    
    const deleteTodo = await deleteItem(todoId, userId)

  

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(deleteTodo)




    }
    
}


