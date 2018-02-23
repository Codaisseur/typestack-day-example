import { JsonController, Get, Param, Put, Body, NotFoundError, Post } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {
    
    @Get('/users/:id')
    getUser(
        @Param('id') id: number
    ) {
        return User.findOneById(id)
    }

    @Get('/users')
    async getUsers() {
        return {
            users: await User.find()
        }
    }

    @Put('/users/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ) {
        const user = await User.findOneById(id)
        if (!user) throw new NotFoundError(`This user does not exist`)
        return User.merge(user, update).save()
    }

    @Post('/users')
    createUser(
        @Body() user: User
    ) {
        return user.save()
    }
}