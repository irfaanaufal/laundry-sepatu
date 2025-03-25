<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\User\StoreRequest as UserStore;
use App\Http\Requests\User\UpdateRequest as UserUpdate;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function get()
    {
        $data = User::with('roles')->get();
        // dd($data);
        return response()->json($data);
    }

    public function index()
    {
        return Inertia::render('users/page', [
            'title' => "User"
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create', [
            'title' => "Create User"
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('users/edit', [
            'title' => "Edit User",
            'user' => $user->load('roles')
        ]);
    }

    public function store(UserStore $request)
    {
        DB::transaction(function() use($request) {
            $validated = $request->validated();
            $validated['password'] = Hash::make($validated['phone']);
            $user = User::create($validated);
            $user->assignRole($validated['roles']);
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully to create new user data!'
        ]);
    }

    public function update(UserUpdate $request, User $user)
    {
        DB::transaction(function() use($request, $user) {
            $validated = $request->validated();
            // $validated['password'] = Hash::make($validated['phone']);
            $user->update($validated);
            $user->removeRole($validated['roles']);
            $user->assignRole($validated['roles']);
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully to edit user data!'
        ]);
    }
}
