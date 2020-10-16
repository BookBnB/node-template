import { IsOptional, IsString, MaxLength, IsNumber, IsPositive } from 'class-validator'
import {
    Body,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    QueryParams
} from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'
import IUserRepository from "../domain/repositories/UserRepository";

class CreateUserBody {
    @IsString()
    name!: string

    @IsOptional()
    @MaxLength(20, { each: true })
    hobbies: string[] = []
}

class PaginationQuery {
    @IsNumber()
    @IsPositive()
    public limit!: number

    @IsNumber()
    @IsOptional()
    public offset?: number;
}

@OpenAPI({
    security: [{ basicAuth: [] }]
})

@JsonController('/users')
export class UserController {
    private readonly users: IUserRepository;

    constructor(users: IUserRepository) {
        this.users = users
    }

    @Get('/')
    @OpenAPI({ summary: 'Return a list of users' })
    getAll(@QueryParams() query: PaginationQuery) {
        return this.users.getAll();
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Return a single user' })
    getOne(@Param('id') id: number) {
        return { name: 'User #' + id }
    }

    @Post('/')
    @OpenAPI({ summary: 'Create a new user' })
    createUser(@Body({ validate: true }) body: CreateUserBody) {
        return { ...body, id: 3 }
    }

    @Put('/')
    createManyUsers(@Body({ type: CreateUserBody }) body: CreateUserBody[]) {
        return {}
    }
}
