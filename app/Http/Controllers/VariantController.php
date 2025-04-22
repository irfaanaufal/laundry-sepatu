<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Http\Requests\Feature\StoreRequest as FeatureStore;
use App\Http\Requests\Feature\UpdateRequest as FeatureUpdate;
use Illuminate\Support\Facades\DB;

class VariantController extends Controller
{
    public function get(Feature $feature)
    {
        $data = Variant::where('feature_id', $feature->id)->get();
        return response()->json($data);
    }

    public function getId(Feature $feature, Variant $variant)
    {
        $data = Variant::find($variant->id);
        return response()->json($data);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Feature $feature)
    {
        return Inertia::render('feature/variant-create', [
            'title' => 'Create Feature Variant',
            'feature' => $feature
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FeatureStore $request, Feature $feature)
    {
        DB::transaction(function() use($request, $feature) {
            $validated = $request->validated();
            $validated['feature_id'] = $feature->id;
            $validated['slug'] = Str::slug($validated['name']);
            $validated['picture'] = $request->file('picture')->store('variants');
            $validated['price'] = intval($validated['price']);
            Variant::create($validated);
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully to create new feature variant data!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Variant $variant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature, Variant $variant)
    {
        return Inertia::render('feature/variant-edit', [
            'title' => 'Edit Feature Variant',
            'feature' => $feature,
            'variant' => $variant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FeatureUpdate $request, Feature $feature, Variant $variant)
    {
        DB::transaction(function() use ($request, $feature, $variant) {
            $validated = $request->validated();
            $validated['slug'] = Str::slug($validated['name']);
            if ($request->hasFile('picture')) {
                $validated['picture'] = $request->file('picture')->store('variants');
                unlink('storage/' . $feature->picture);
            }
            $variant->update($validated);
        });
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully to edit feature variant data!',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Variant $variant)
    {
        //
    }
}
