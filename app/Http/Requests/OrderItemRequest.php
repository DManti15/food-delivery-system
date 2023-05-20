<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'product_name' => 'required|string',
            'customer' => 'required|string',
            'quantity' => 'required|decimal:0,2'
        ];
    }

    public function messages(): array
    {
        return [
            'product_name.required' => 'Product name is required!',
            'customer.required' => 'Customer is required!',
            'quantity.required' => 'Quantity is required!'
        ];
    }
}
