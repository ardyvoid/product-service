import { Resolver, Parent, Query, Args, ResolveField } from '@nestjs/graphql';
import { ProductService } from '../../services/product.service';
import { ProductVariantService } from '../../services/product-variant.service';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private productService: ProductService,
    private productVariantService: ProductVariantService,
  ) {}

  @Query()
  async findProduct(@Args('id') id: number) {
    return this.productService.product({
      id,
    });
  }

  @ResolveField()
  async variants(@Parent() product) {
    return this.productVariantService.productVariants({
      where: {
        productId: product.id,
      },
    });
  }
}
