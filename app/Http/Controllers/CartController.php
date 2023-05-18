<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addProduct(Request $request) {
/* 
        $product = response()->json($request->input('product_id'));
        dump($product);
        $productId = Product::where('product_name', $product)->first(['product_id']);
        dump($productId);
        $productQuantity = $request->input('quantity');
        dump($productQuantity);

        $productCheck = Product::where('product_id', $productId)->first();

        if ($productCheck) {

            /*
            if (Cart::where('product_name', $productId)->where('customer', $request->session()->all())->exists()) {

                return response()->json(['status' => $productCheck->product_name.' already added to cart.']);

            }
            else {
                */
            $cartItem = new Cart();
            /*$cartItem->customer = $request->session()->all(); */
            $cartItem->product_id = 4;
            $cartItem->quantity = 4;
            $cartItem->save();
            return response()->json(['status' => ' added to cart.']);
            }

        }

