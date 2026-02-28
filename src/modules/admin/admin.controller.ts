import { Controller, Get, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AdminService } from './admin.service';
import { QueryUsersAdminDto } from './dto/query-users-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Platform overview stats' })
  getStats() {
    return this.adminService.getStats();
  }

  @Get('users')
  @ApiOperation({ summary: 'List all users' })
  getUsers(@Query() dto: QueryUsersAdminDto) {
    return this.adminService.getUsers(dto);
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'Get user detail with stats' })
  getUser(@Param('id') id: string) {
    return this.adminService.getUser(id);
  }

  @Patch('users/:id')
  @ApiOperation({ summary: 'Update user (role, isActive, name)' })
  updateUser(
    @CurrentUser('id') adminId: string,
    @Param('id') id: string,
    @Body() dto: UpdateUserAdminDto,
  ) {
    return this.adminService.updateUser(adminId, id, dto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(
    @CurrentUser('id') adminId: string,
    @Param('id') id: string,
  ) {
    return this.adminService.deleteUser(adminId, id);
  }
}
