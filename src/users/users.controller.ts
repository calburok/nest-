import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  DefaultValuePipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailPipe } from 'src/email/email.pipe';
import { SuimPipe } from 'src/suim/suim.pipe';

enum Lolposition {
  Top = 'TOP',
  Junggle = 'JG',
  Middle = 'MID',
  Ad = 'AD',
  Surport = 'Surport',
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/kim/:id')
  findKim(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return {
      id: id,
    };
  }

  @Get('/lee')
  findLee(@Query('isHuman', ParseBoolPipe) isHuman: boolean) {
    return {
      isHuman: isHuman,
    };
  }

  @Get('/park/:position')
  findPark(
    @Param('position', new ParseEnumPipe(Lolposition)) position: Lolposition,
  ) {
    return {
      position: position,
    };
  }

  @Get('/choi')
  findChoi(
    @Query('count', new DefaultValuePipe(1), ParseIntPipe) count: number,
    @Query('min', new DefaultValuePipe(100), ParseIntPipe) min: number,
  ) {
    return {
      min,
      count,
    };
  }

  @Post('/jeon')
  @UsePipes(new ValidationPipe({ transform: true }))
  findJeon(@Body() dto: CreateUserDto) {
    return {
      dto: dto,
    };
  }

  // 수정된 findBro 메서드
  @Post('/bro')
  @UsePipes(EmailPipe)
  findBro(@Body() email: string) {
    return {
      email: email,
    };
  }
  @Post('/suim')
  @UsePipes(SuimPipe)
  findSuim(@Body() bread: string, coffee: string) {
    return {
      bread: bread,
      coffee: coffee,
    };
  }
}
