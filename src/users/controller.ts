import { JsonController, Get, Param, Put, Body, NotFoundError, Post, Authorized } from 'routing-controllers'
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

    @Authorized()
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
    async createUser(
        @Body() user: User
    ) {
        const { password, ...rest } = user
        const entity = User.create(rest)
        await entity.setPassword(password)
        return entity.save()
    }
}