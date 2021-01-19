import 'source-map-support/register'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
//import {createTodo} from '../dataAccess/toDoData'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { requestnewToDo } from '../dataRequest/toDoDataRequest'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const logger = createLogger('createTodo')
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    logger.info("Adding new todo = " + newTodo.name)
    const userId = getUserId(event)
    

    const todoItem = await requestnewToDo(newTodo, userId)

    console.log("todo created")


return todoItem


 
 
}


