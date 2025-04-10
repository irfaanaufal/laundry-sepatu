<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Feature\StoreRequest as FeatureStore;
use App\Http\Requests\Feature\UpdateRequest as FeatureUpdate;
use Illuminate\Support\Facades\DB;

class FeatureController extends Controller
{
    public function get()
    {
        $data = Feature::with(['variants'])->get();
        return response()->json($data);
    }

    public function index()
    {
        return Inertia::render('feature/page', [
            'title' => 'Feature'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('feature/create', [
            'title' => 'Create Feature'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FeatureStore $request)
    {
        DB::transaction(function() use($request) {
            $validated = $request->validated();
            $validated['picture'] = $request->file('picture')->store('features');
            $validated['price'] = intval($validated['price']);
            Feature::create($validated);
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully to create new feature data!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        //
    }
}
