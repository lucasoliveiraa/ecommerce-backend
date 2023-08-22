import { Roles } from 'src/decorators/roles.decorator';
import { CategoryService } from './category.service';
import { ReturnCategory } from './dto/return-category.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserType } from 'src/user/enum/user-type.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategory } from './dto/create-category.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return (await this.categoryService.findAllCategories()).map(
      category => new ReturnCategory(category),
    );
  }

  @Roles(UserType.Admin)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategory);
  }
}
