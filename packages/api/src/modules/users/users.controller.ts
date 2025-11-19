import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PublicUserDto } from './dto/public-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly svc: UsersService) {}

  @Post('register')
  @ApiOkResponse({ type: PublicUserDto })
  async register(@Body() dto: RegisterDto): Promise<PublicUserDto> {
    return this.svc.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: PublicUserDto })
  async login(@Body() dto: LoginDto): Promise<PublicUserDto> {
    return this.svc.login(dto);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOkResponse({ schema: { example: { ok: true } } })
  logout() {
    return this.svc.logout();
  }
}
