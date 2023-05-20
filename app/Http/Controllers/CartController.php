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
    public function addProduct(OrderItemRequest $request) {

        $productName = $request->product_name;
        $item = Product::where('product_name', $productName)->first();
        $productId = $item->product_id;
        $productQuantity = $request->quantity;

        $cartItem = new Cart();
        $cartItem->customer = 'guest';
        $cartItem->product_id = $productId;
        $cartItem->quantity = $productQuantity;

        $productStock = Product::where('product_id', $cartItem->product_id)->value('stock');

        if($cartItem->quantity > $productStock) {
            return response()->json(['status' => 'There are not enough products. Product stock available is '.$productStock]);
        } else {
            $existingCartItem = Cart::where('customer', $cartItem->customer)->where('product_id', $cartItem->product_id)->first();

        if ($existingCartItem) {
            $existingCartItem->update(['quantity' => $cartItem->quantity]);
            return response()->json($existingCartItem);
        } else {
            $cartItem->save();
            return response()->json($cartItem);
        }
        }
        }

    public function showCart() {
        $cartItems = Cart::where('customer', 'guest')->pluck('product_id')->all();
        $cart = DB::table('products')
        ->join('carts', 'products.product_id', '=', 'carts.product_id')
        ->whereIn('products.product_id', $cartItems)->get();
        return $cart;
    }

    public function deleteCartItem(string $id) {
        return Cart::where('customer', 'guest')->where('product_id', $id)->delete();
    }

    public function placeOrder(Request $request) {
        $order = new Order();
        $order->customer = 'guest';
        $order->phone = $request->phone;
        $order->deliveryAddress = $request->delivery_address;
        $order->comments = $request->comments;
        $order->order_total = 50000;

        $order->save();

        

        $orderItems = Product::where();

    }

}

