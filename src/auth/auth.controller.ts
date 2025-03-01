import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAuths() {
    return this.authService.findAll();
  }

  @Post(':usuarioId')
  async crearAuth(
    @Param('usuarioId') usuarioId: number,
    @Body() authData: { email: string; password_hash: string },
  ) {
    return this.authService.crearAuthParaUsuario(usuarioId, authData);
  }
}
