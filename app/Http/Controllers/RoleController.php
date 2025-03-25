<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function get()
    {
        $data = Role::withCount('users')->get();
        return response()->json($data);
    }
}
