<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Ramsey\Uuid\Type\Decimal;

class UserPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /*
    protected function prepareForValidation()
    {
        $this->merge([
            'ProductName' => str($this->str),
            'ProductDescription' => str($this->str),
            'Price' => dec($this->Decimal),
            'Stock' => inte,
        ]);
    }
    */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|string|unique:users,Email',
            'password' => 'required|string'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Username is required!',
            'email.required' => 'Email is required!',
            'password.required' => 'Password is required!'
        ];
    }
}
