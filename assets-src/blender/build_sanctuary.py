"""
Sweet Psilocybe — Blender 4.x Sanctuary Generator (gateway-skin/v1)

Usage:
  blender --background --python assets-src/blender/build_sanctuary.py

Produces:
  - assets-src/blender/sweet_psilocybe_sanctuary.blend  (editable source, NOT shipped)
  - public/skins/sweet-psilocybe/sanctuary.glb          (Draco-compressed runtime GLB)

Conventions (per gateway-skin/v1):
  - Meter units, Y-up on glTF export, +Z forward, origin at ground (0, 0, 0)
  - Semantic material slots: sp_primary_cap, sp_secondary_cap, sp_stem, sp_gills, sp_moss, sp_emissive
"""

import math
import os
import bpy


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def make_material(name, base_rgba, roughness=0.5, metallic=0.0, emission_rgba=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = base_rgba
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission_rgba and emission_strength > 0:
        bsdf.inputs["Emission Color"].default_value = emission_rgba
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat


def build_sanctuary():
    clear_scene()

    mat_primary_cap = make_material(
        "sp_primary_cap",
        (0.96, 0.69, 0.81, 1.0),
        roughness=0.28,
        metallic=0.1,
        emission_rgba=(0.96, 0.69, 0.81, 1.0),
        emission_strength=0.45,
    )
    mat_secondary_cap = make_material(
        "sp_secondary_cap",
        (0.66, 0.75, 0.69, 1.0),
        roughness=0.35,
        emission_rgba=(0.66, 0.75, 0.69, 1.0),
        emission_strength=0.35,
    )
    mat_stem = make_material("sp_stem", (0.97, 0.95, 0.94, 1.0), roughness=0.68)
    mat_gills = make_material(
        "sp_gills",
        (1.0, 0.89, 0.93, 1.0),
        roughness=0.4,
        emission_rgba=(1.0, 0.89, 0.93, 1.0),
        emission_strength=0.9,
    )
    mat_moss = make_material("sp_moss", (0.16, 0.28, 0.23, 1.0), roughness=0.92)

    # Mossy mound (origin at z=0)
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=2.1, depth=0.45, location=(0, 0, 0.225))
    mound = bpy.context.active_object
    mound.name = "sanctuary_mound"
    mound.data.materials.append(mat_moss)

    # Hero stem
    bpy.ops.mesh.primitive_cone_add(
        vertices=24, radius1=0.42, radius2=0.22, depth=2.2, location=(0, 0, 1.4)
    )
    stem = bpy.context.active_object
    stem.name = "hero_stem"
    stem.data.materials.append(mat_stem)

    # Hero cap dome
    bpy.ops.mesh.primitive_uv_sphere_add(segments=36, ring_count=18, radius=1.7, location=(0, 0, 2.35))
    cap = bpy.context.active_object
    cap.name = "hero_cap"
    cap.scale = (1.0, 1.0, 0.58)
    bpy.ops.object.transform_apply(scale=True)
    cap.data.materials.append(mat_primary_cap)

    # Hero gills ring
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=1.55, depth=0.06, location=(0, 0, 2.18))
    gills = bpy.context.active_object
    gills.name = "hero_gills"
    gills.data.materials.append(mat_gills)

    # Satellite mushrooms
    satellites = [
        (-1.2, 0.5, 0.42),
        (1.15, 0.45, 0.36),
        (-0.8, -0.85, 0.32),
        (0.85, -0.8, 0.34),
    ]
    for idx, (x, y, s) in enumerate(satellites):
        bpy.ops.mesh.primitive_cylinder_add(
            vertices=16, radius=0.22 * s, depth=1.6 * s, location=(x, y, 0.35 + 0.8 * s)
        )
        s_stem = bpy.context.active_object
        s_stem.name = f"satellite_stem_{idx}"
        s_stem.data.materials.append(mat_stem)

        bpy.ops.mesh.primitive_uv_sphere_add(
            segments=20, ring_count=12, radius=1.15 * s, location=(x, y, 0.35 + 1.55 * s)
        )
        s_cap = bpy.context.active_object
        s_cap.name = f"satellite_cap_{idx}"
        s_cap.scale = (1.0, 1.0, 0.55)
        bpy.ops.object.transform_apply(scale=True)
        s_cap.data.materials.append(mat_secondary_cap if idx % 2 == 0 else mat_primary_cap)

    # Smooth shading
    for obj in bpy.data.objects:
        if obj.type == "MESH":
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.shade_smooth()

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    blend_out = os.path.join(repo_root, "assets-src", "blender", "sweet_psilocybe_sanctuary.blend")
    glb_dir = os.path.join(repo_root, "public", "skins", "sweet-psilocybe")
    os.makedirs(glb_dir, exist_ok=True)
    glb_out = os.path.join(glb_dir, "sanctuary.glb")

    bpy.ops.wm.save_as_mainfile(filepath=blend_out)
    bpy.ops.export_scene.gltf(
        filepath=glb_out,
        export_format="GLB",
        export_yup=True,
        export_apply=True,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
    )
    print(f"Exported normalized gateway GLB -> {glb_out}")


if __name__ == "__main__":
    build_sanctuary()
