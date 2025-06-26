<?php

namespace App\Http\Controllers\Pages\KaPmb;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GelombangPmb;

class SetupPmbController extends Controller
{
    public function index(Request $request)
    {
        $query = GelombangPmb::query();
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
    $gelombang = $query->get();
        return inertia('kapmb/setup-pmb/index', [
            'gelombang' => $gelombang
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tahun' => 'required|integer',
        ]);
        $gelombang = GelombangPmb::create($validated);
        return redirect()->back()->with('success', 'Gelombang PMB berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tahun' => 'required|integer',
        ]);
        $gelombang = GelombangPmb::findOrFail($id);
        $gelombang->update($validated);
        return redirect()->back()->with('success', 'Gelombang PMB berhasil diupdate');
    }

    public function destroy($id)
    {
        $gelombang = GelombangPmb::findOrFail($id);
        $gelombang->delete();
        return redirect()->back()->with('success', 'Gelombang PMB berhasil dihapus');
    }
}
