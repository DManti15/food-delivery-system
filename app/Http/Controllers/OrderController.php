<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\OrderStatusRequest;
use App\Models\Order;

class OrderController extends Controller
{
    public function showOrders() {
        $orders = response()->json(Order::with('orderItems.product')->get());
        return $orders;
    }

    public function showOrder(string $id)
    {
        $data = json_decode(Order::find($id));
        return $data;
    }

    public function editOrderStatus(OrderStatusRequest $request, string $id) {
        $data = Order::find($id);
        $data->update($request->all());
        return $data;
    }
}
