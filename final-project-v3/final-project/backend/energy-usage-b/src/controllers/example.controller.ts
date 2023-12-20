import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('protected')
export class ExampleController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProtectedResource() {
    return "Bu kaynak yalnızca doğrulanmış kullanıcılar tarafından görülebilir.";
  }
}
