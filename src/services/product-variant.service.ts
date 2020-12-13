import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  ProductVariantUpdateInput,
  ProductVariant,
  ProductVariantCreateInput,
  ProductVariantWhereUniqueInput,
  ProductVariantWhereInput,
  ProductVariantOrderByInput,
} from '@prisma/client';

@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}

  async productVariant(
    productVariantWhereUniqueInput: ProductVariantWhereUniqueInput,
  ): Promise<ProductVariant | null> {
    return this.prisma.productVariant.findUnique({
      where: productVariantWhereUniqueInput,
    });
  }

  async productVariants(params: {
    skip?: number;
    take?: number;
    cursor?: ProductVariantWhereUniqueInput;
    where?: ProductVariantWhereInput;
    orderBy?: ProductVariantOrderByInput;
  }): Promise<ProductVariant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productVariant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProductVariant(
    data: ProductVariantCreateInput,
  ): Promise<ProductVariant> {
    return this.prisma.productVariant.create({
      data,
    });
  }

  async updateProductVariant(params: {
    where: ProductVariantWhereUniqueInput;
    data: ProductVariantUpdateInput;
  }): Promise<ProductVariant> {
    const { where, data } = params;
    return this.prisma.productVariant.update({
      data,
      where,
    });
  }

  async deleteProductVariant(
    where: ProductVariantWhereUniqueInput,
  ): Promise<ProductVariant> {
    return this.prisma.productVariant.delete({
      where,
    });
  }
}
