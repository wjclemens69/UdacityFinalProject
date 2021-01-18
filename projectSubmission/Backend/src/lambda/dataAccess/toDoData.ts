
import * as AWSXray from 'aws-xray-sdk'

import { createLogger } from '../../utils/logger'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import * as  uuid from 'uuid'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

//import { getUserId } from '../utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

//import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
const todotablename = process.env.TODOS_TABLE


export async function gettoDosbyUser(userId: string) {

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()
    


    const logger = createLogger('getTodo')
    logger.info("getting items from table ", todotablename, " for ", userId)
    const params = {
        TableName: todotablename,
        Key: 'userId',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        },
        ScanIndexForward: false
    };
    const result = await todoClient.query(params).promise()
    return result

}

export async function createTodo(newTodo: CreateTodoRequest, userId: string) {

    const logger = createLogger('createTodo')

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()


    //const todoClient = new AWS.DynamoDB.DocumentClient()




    const itemid = uuid.v4()
    const date = new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    const name = newTodo.name
    const dueDate = newTodo.dueDate


    newTodo.todoId = itemid
    newTodo.createdAt = date
    newTodo.userId = userId
    newTodo.done = "false"
    newTodo.attachmentUrl = ""


    const toDoForPost = {
        userId: userId,
        todoId: itemid,
        createdAt: date,
        name: name,
        newTodoName: name,
        dueDate: dueDate,
        done: false,
        attachmentUrl: ''

    }
    logger.info("creating new to do based on :" + toDoForPost)

    await todoClient.put({
        TableName: todotablename,
        Item: toDoForPost

    }).promise()

    logger.info("creating new to do based on :" + toDoForPost + "has been created")
    return toDoForPost






}


export async function UpdateItem(updatedTodo: UpdateTodoRequest, todoId: string, userId: string) {
    const logger = createLogger('UpdateTodo')


    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()

//    const todoClient = new AWS.DynamoDB.DocumentClient()

    const done = updatedTodo.done
    const name = updatedTodo.name
    const dueDate = updatedTodo.dueDate

    console.log(todoId, ": ", updatedTodo)



    const key = {
        userId: userId,
        todoId: todoId,

    }



    var params = {
        TableName: todotablename,
        Key: key,

        UpdateExpression: "set #done = :done, #name = :name, #dueDate = :dueDate",
        ExpressionAttributeNames: {
            "#done": "done",
            "#name": "name",
            "#dueDate": "dueDate"
        },

        ExpressionAttributeValues: {
            ":done": done,
            ":name": name,
            ":dueDate": dueDate
        },
        ReturnValues: "UPDATED_NEW"



    };

    logger.info("upadating todo with ID "+ todoId )


    await todoClient.update(params).promise();

logger.info(" todo updated "+ todoId )

    return updatedTodo


}


export async function deleteItem(todoId: string, userId: string) {

    const logger = createLogger('UpdateTodo')

    const XAWS = AWSXray.captureAWS(AWS)
    const todoClient = new XAWS.DynamoDB.DocumentClient()

    //const todoClient = new AWS.DynamoDB.DocumentClient()
logger.info(" todo deleting "+ todoId )


    const deleteTodo = await todoClient.delete({
        TableName: todotablename,
        Key: { userId: userId, todoId: todoId }
    }).promise()
    logger.info(" todo deleted "+ todoId )


    return deleteTodo


}
