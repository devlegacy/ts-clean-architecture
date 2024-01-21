import {
  AddCartItemCommand,
  CartResponse,
  CheckoutCartCommand,
  CreateCartCommand,
  FindCartQuery,
  SubtractCartItemCommand,
} from '@/Contexts/Land/Carts/application/index.js'
import { CartItemRequestDto, CartRequestDto } from '@/Contexts/Land/Carts/infrastructure/index.js'
import { Body, Controller, Get, Param, Post, Put } from '@/Contexts/Shared/domain/Common/index.js'
import { CommandBus, QueryBus, Uuid } from '@/Contexts/Shared/domain/index.js'
import { JoiUuidPipe } from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes/index.js'

@Controller('carts')
export class CartController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':cartId')
  async show(@Param('cartId', JoiUuidPipe) cartId: string) {
    const query = new FindCartQuery(cartId)
    const { cart } = await this.queryBus.ask<CartResponse>(query)

    // TODO: Improve response methods on CartResponse class
    return {
      data: cart,
      links: {
        self: `/carts/${cart.id}`,
      },
      relationships: {
        carts: {
          links: {
            self: `/users/${cart.userId}`,
          },
        },
      },
    }
  }

  @Post()
  async create(@Body() cart: CartRequestDto) {
    const command = new CreateCartCommand(cart)
    this.commandBus.dispatch(command)

    return {
      data: cart,
      links: {
        self: `/carts/${cart.id}`,
      },
    }
  }

  @Post(':cartId/checkout')
  async checkout(@Param('cartId', JoiUuidPipe) cartId: string) {
    const orderId = Uuid.random().toString()
    const command = new CheckoutCartCommand({
      cartId,
      orderId,
    })
    this.commandBus.dispatch(command)

    return {
      relationships: {
        order: {
          links: {
            self: `/order/${orderId}`,
          },
        },
      },
    }
  }

  // it could be split into add and subtract specific controller
  @Put(':cartId')
  async update(@Body() cartItem: CartItemRequestDto) {
    if (cartItem.quantity < 0) {
      const command = new SubtractCartItemCommand(cartItem)
      this.commandBus.dispatch(command)
    } else if (cartItem.quantity > 0) {
      const command = new AddCartItemCommand(cartItem)
      this.commandBus.dispatch(command)
    }

    return cartItem
  }
}
