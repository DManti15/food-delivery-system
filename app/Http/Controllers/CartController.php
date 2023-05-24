<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\OrderItemRequest;

class CartController extends Controller
{
    public function addProduct(OrderItemRequest $request)
    {

        $productName = $request->product_name;
        $item = Product::where('product_name', $productName)->first();
        $productId = $item->product_id;
        $productQuantity = $request->quantity;


        $cartItem = new Cart();
        $cartItem->customer = 'guest';
        $cartItem->product_id = $productId;
        $cartItem->quantity = (int)$productQuantity;


        $productStock = Product::where('product_id', $cartItem->product_id)->value('stock');

        if ($cartItem->quantity > $productStock) {
            return response()->json(['status' => 'There are not enough products. Product stock available is ' . $productStock]);
        } else {
            $existingCartItem = Cart::where('customer', $cartItem->customer)->where('product_id', $cartItem->product_id)->first();

            if ($existingCartItem) {
                $existingCartItem->quantity = $cartItem->quantity;
                $existingCartItem->save();
                return response()->json($existingCartItem);
            } else {
                $cartItem->save();
                return response()->json($cartItem);
            }
        }
    }

    public function showCart()
    {
        $cartItems = Cart::where('customer', 'guest')->pluck('product_id')->all();
        $cart = DB::table('products')
            ->join('carts', 'products.product_id', '=', 'carts.product_id')
            ->whereIn('products.product_id', $cartItems)->get();
        return $cart;
    }

    public function deleteCartItem(string $id)
    {
        return Cart::where('customer', 'guest')->where('product_id', $id)->delete();
    }

    public function placeOrder(Request $request)
    {

        if (empty($request->cart_items)) {
            return response()->json(['status' => 'The shopping cart is empty, please add a product first.']);
        } else {

            $order = new Order();
            $order->customer = 'guest';
            $order->phone = $request->phone;
            $order->delivery_address = $request->delivery_address;
            $order->comments = $request->comments;
            $order->order_total = $request->order_total;
            $order->save();

            $order = Order::where('customer', 'guest')->orderBy('created_at', 'desc')->first();
            $cartItems = $request->cart_items;

            foreach ($cartItems as $cartItem) {
                $productStock = Product::where('product_id', $cartItem['product_id'])->value('stock');

                if ($cartItem['quantity'] > $productStock) {
                    return response()->json(['status' => 'There are not enough products. Product stock available is ' . $productStock]);
                } else {
                    Product::where('product_id', $cartItem['product_id'])->decrement('stock', $cartItem['quantity']);
                    $orderItem = new OrderItem();
                    $orderItem->order_id = $order['order_id'];
                    $orderItem->product_id = $cartItem['product_id'];
                    $orderItem->quantity = $cartItem['quantity'];
                    $orderItem->price = $cartItem['quantity'] * $cartItem['price'];
                    $orderItem->save();
                }
            }

            Cart::where('customer', 'guest')->delete();
        }
    }
}
