import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';

import { ProductResolver } from './graphql/resolvers/product.resolver';
import { PrismaService } from './services/prisma.service';
import { ProductService } from './services/product.service';
import { ProductVariantService } from './services/product-variant.service';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      typePaths: ['./**/*.graphql'],
    }),
  ],
  providers: [
    PrismaService,
    ProductService,
    ProductResolver,
    ProductVariantService,
  ],
})
export class AppModule {}
