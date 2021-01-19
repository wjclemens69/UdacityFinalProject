import 'source-map-support/register'
//import { getUserId } from '../utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
//import {deleteItem} from '../dataAccess/toDoData'
import {requestToDoDelete} from '../dataRequest/toDoDataRequest'



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)


    const todoId = event.pathParameters.todoId

    console.log("Trying to delete ", todoId)

   

    const deleteTodo = await requestToDoDelete(todoId, userId)

return deleteTodo


    

    // return {
    //     statusCode: 201,
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Credentials': true
    //     },
    //     body: JSON.stringify(deleteTodo)




    // }
}


