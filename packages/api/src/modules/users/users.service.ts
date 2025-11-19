import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../../database/models/usuario.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcryptjs';

type PublicUser = { id: number; nome: string | null; login: string };

@Injectable()
export class UsersService {
  constructor(@InjectModel(Usuario) private readonly users: typeof Usuario) {}

  private toPublic(u: Usuario): PublicUser {
    return { id: u.id, nome: u.nome, login: u.login };
  }

  async register(dto: RegisterDto): Promise<PublicUser> {
    const exists = await this.users.findOne({ where: { login: dto.login } });
    if (exists) throw new BadRequestException('login_already_in_use');

    const now = new Date();
    const rounds: number = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const senhaHash: string = await bcrypt.hash(dto.senha, rounds);

    const user = await this.users.create({
      nome: dto.nome,
      login: dto.login,
      senha: senhaHash,
      criado_em: now,
      alterado_em: now,
    });

    return this.toPublic(user);
  }

  async login(dto: LoginDto): Promise<PublicUser> {
    const user: Usuario | null = await this.users.findOne({
      where: { login: dto.login },
    });
    if (!user) throw new UnauthorizedException('invalid_credentials');

    const ok: boolean = await bcrypt.compare(dto.senha, user.senha);
    if (!ok) throw new UnauthorizedException('invalid_credentials');

    return this.toPublic(user);
  }

  logout(): { ok: true } {
    return { ok: true };
  }
}
