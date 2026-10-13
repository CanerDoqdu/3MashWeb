import bpy
import bmesh
import math
import numpy as np
from collections import defaultdict
from mathutils import Vector

SOURCE = r"C:\Users\caner\Downloads\Mashp16L_Meshy_textured.blend"
OUTPUT = r"C:\Users\caner\Downloads\Mashp16L_Lid_Animation.blend"
FASCIA_TEXTURE = r"C:\Users\caner\Downloads\MashP16L_Fascia_Albedo.png"

bpy.ops.wm.open_mainfile(filepath=SOURCE)
body = bpy.data.objects["Mesh_0"]

def analyze_components():
    mesh = body.data
    parent = list(range(len(mesh.vertices)))

    def find(index):
        while parent[index] != index:
            parent[index] = parent[parent[index]]
            index = parent[index]
        return index

    for edge in mesh.edges:
        a, b = map(int, edge.vertices)
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb

    stats = defaultdict(lambda: [0, [math.inf] * 3, [-math.inf] * 3])
    for vertex in mesh.vertices:
        root = find(vertex.index)
        point = body.matrix_world @ vertex.co
        record = stats[root]
        record[0] += 1
        for axis in range(3):
            record[1][axis] = min(record[1][axis], point[axis])
            record[2][axis] = max(record[2][axis], point[axis])

    roots = sorted(stats, key=lambda root: stats[root][0], reverse=True)
    rank = {root: index for index, root in enumerate(roots)}
    uv_layer = mesh.uv_layers.active.data
    material = next(mat for mat in mesh.materials if mat and mat.use_nodes)
    image_node = next(
        node for node in material.node_tree.nodes
        if node.type == "TEX_IMAGE" and node.image and node.image.name == "Image_0"
    )
    mapping = image_node.inputs["Vector"].links[0].from_node
    scale = mapping.inputs["Scale"].default_value
    offset = mapping.inputs["Location"].default_value
    image = image_node.image
    pixels = np.asarray(image.pixels[:], dtype=np.float32).reshape(
        image.size[1], image.size[0], 4
    )
    colors = np.zeros((len(roots), 3), dtype=np.float64)
    face_counts = np.zeros(len(roots), dtype=np.int64)
    for polygon in mesh.polygons:
        component = rank[find(polygon.vertices[0])]
        uv = np.mean([uv_layer[loop].uv[:] for loop in polygon.loop_indices], axis=0)
        u = (uv[0] * scale[0] + offset[0]) % 1.0
        v = (uv[1] * scale[1] + offset[1]) % 1.0
        x = min(int(u * image.size[0]), image.size[0] - 1)
        y = min(int(v * image.size[1]), image.size[1] - 1)
        colors[component] += pixels[y, x, :3]
        face_counts[component] += 1

    lid_roots = set()
    for index, root in enumerate(roots):
        if not face_counts[index]:
            continue
        low, high = stats[root][1], stats[root][2]
        rgb = colors[index] / face_counts[index]
        center_z = (low[2] + high[2]) * 0.5
        center_x = (low[0] + high[0]) * 0.5
        if high[2] > 0.85 and rgb[1] > max(rgb[0] * 1.45, 0.12):
            lid_roots.add(root)

    return {v.index for v in mesh.vertices if find(v.index) in lid_roots}


def separate_vertices(name, vertex_indices):
    before = set(bpy.data.objects)
    bpy.context.view_layer.objects.active = body
    bpy.ops.object.mode_set(mode="EDIT")
    bm = bmesh.from_edit_mesh(body.data)
    bm.verts.ensure_lookup_table()
    bm.verts.index_update()
    bm.select_mode = {"VERT"}
    for vertex in bm.verts:
        vertex.select_set(vertex.index in vertex_indices)
    for edge in bm.edges:
        edge.select_set(all(vertex.index in vertex_indices for vertex in edge.verts))
    for face in bm.faces:
        face.select_set(all(vertex.index in vertex_indices for vertex in face.verts))
    bm.select_flush_mode()
    bmesh.update_edit_mesh(body.data, loop_triangles=False, destructive=False)
    bpy.ops.mesh.separate(type="SELECTED")
    bpy.ops.object.mode_set(mode="OBJECT")
    separated = list(set(bpy.data.objects) - before)
    if len(separated) != 1:
        raise RuntimeError(f"Expected one separated object for {name}, found {len(separated)}.")
    separated[0].name = name
    separated[0].data.name = f"{name}_Mesh"
    return separated[0]


lid_vertices = analyze_components()
if not lid_vertices:
    raise RuntimeError("Could not identify the textured lid mesh.")
lid = separate_vertices("Lid_Hood", lid_vertices)
body.name = "Printer_Housing"


def find_fascia_logo_faces():
    mesh = body.data
    parent = list(range(len(mesh.vertices)))

    def find(index):
        while parent[index] != index:
            parent[index] = parent[parent[index]]
            index = parent[index]
        return index

    for edge in mesh.edges:
        a, b = map(int, edge.vertices)
        root_a, root_b = find(a), find(b)
        if root_a != root_b:
            parent[root_a] = root_b

    bounds = defaultdict(lambda: [0, [math.inf] * 3, [-math.inf] * 3])
    for vertex in mesh.vertices:
        root = find(vertex.index)
        point = body.matrix_world @ vertex.co
        record = bounds[root]
        record[0] += 1
        for axis in range(3):
            record[1][axis] = min(record[1][axis], point[axis])
            record[2][axis] = max(record[2][axis], point[axis])

    component_bounds = defaultdict(lambda: [0, [math.inf] * 3, [-math.inf] * 3])
    component_faces = defaultdict(list)
    for vertex in mesh.vertices:
        root = find(vertex.index)
        point = body.matrix_world @ vertex.co
        record = component_bounds[root]
        record[0] += 1
        for axis in range(3):
            record[1][axis] = min(record[1][axis], point[axis])
            record[2][axis] = max(record[2][axis], point[axis])

    for polygon in mesh.polygons:
        component_faces[find(polygon.vertices[0])].append(polygon)

    logo_roots = set()
    for root, (count, low, high) in component_bounds.items():
        center_x = (low[0] + high[0]) * 0.5
        center_z = (low[2] + high[2]) * 0.5
        if (
            20 <= count <= 350
            and -0.09 <= center_x <= 0.04
            and 0.19 <= center_z <= 0.26
            and low[1] < -0.53
            and high[1] < -0.50
            and high[0] - low[0] < 0.08
            and high[2] - low[2] < 0.07
        ):
            logo_roots.add(root)

    logo_faces = [
        polygon
        for root in logo_roots
        for polygon in component_faces[root]
    ]
    if len(logo_roots) < 2:
        raise RuntimeError(
            f"Expected the raised fascia lettering, found {len(logo_roots)} islands."
        )
    return logo_faces


def make_control(name, location, child, action_name, keys, axis):
    pivot = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(pivot)
    pivot.empty_display_type = "CIRCLE"
    pivot.empty_display_size = 0.08
    pivot.location = location
    bpy.context.view_layer.update()
    child.parent = pivot
    child.matrix_parent_inverse = pivot.matrix_world.inverted()
    for frame, value in keys:
        child_value = pivot.rotation_euler if axis == "ROTATION" else pivot.location
        if axis == "ROTATION":
            child_value.x = math.radians(value)
            pivot.keyframe_insert(data_path="rotation_euler", index=0, frame=frame)
        else:
            child_value.z = value
            pivot.keyframe_insert(data_path="location", index=2, frame=frame)
    action = pivot.animation_data.action
    action.name = action_name
    for curve in action.fcurves:
        for keyframe in curve.keyframe_points:
            keyframe.interpolation = "BEZIER"
    return pivot


make_control(
    "Lid_Pivot",
    (0.19, 0.42, 1.10),
    lid,
    "Lid - Open and Close",
    [(1, 0), (30, 70), (60, 0)],
    "ROTATION",
)

if not bpy.data.images.get(FASCIA_TEXTURE):
    fascia_image = bpy.data.images.load(FASCIA_TEXTURE)
else:
    fascia_image = bpy.data.images[FASCIA_TEXTURE]
fascia_image.pack()

fascia_material = bpy.data.materials.new("Control Fascia - Clean P16L Texture")
fascia_material.diffuse_color = (0.35, 0.40, 0.46, 1.0)
fascia_material.use_nodes = True
fascia_nodes = fascia_material.node_tree.nodes
fascia_nodes.clear()
fascia_output = fascia_nodes.new("ShaderNodeOutputMaterial")
fascia_bsdf = fascia_nodes.new("ShaderNodeBsdfPrincipled")
fascia_bsdf.inputs["Roughness"].default_value = 0.48
fascia_bsdf.inputs["Metallic"].default_value = 0.12
fascia_texture = fascia_nodes.new("ShaderNodeTexImage")
fascia_texture.image = fascia_image
fascia_material.node_tree.links.new(
    fascia_texture.outputs["Color"], fascia_bsdf.inputs["Base Color"]
)
fascia_material.node_tree.links.new(
    fascia_bsdf.outputs["BSDF"], fascia_output.inputs["Surface"]
)

fascia_uv = body.data.uv_layers.active
if fascia_uv is None:
    raise RuntimeError("The printer housing has no UV map for the fascia texture.")

fascia_bounds = (-0.20, 0.60, 0.14, 0.30)
fascia_faces = []
for polygon in body.data.polygons:
    center = body.matrix_world @ polygon.center
    normal = (body.matrix_world.to_3x3() @ polygon.normal).normalized()
    if (
        fascia_bounds[0] <= center.x <= fascia_bounds[1]
        and fascia_bounds[2] <= center.z <= fascia_bounds[3]
        and center.y < -0.47
        and normal.y < -0.50
    ):
        fascia_faces.append(polygon)

if len(fascia_faces) < 1000:
    raise RuntimeError(
        f"Expected the front fascia faces, found only {len(fascia_faces)}."
    )

body.data.materials.append(fascia_material)
fascia_material_index = len(body.data.materials) - 1
for polygon in fascia_faces:
    polygon.material_index = fascia_material_index
    for loop_index, vertex_index in zip(polygon.loop_indices, polygon.vertices):
        point = body.matrix_world @ body.data.vertices[vertex_index].co
        fascia_uv.data[loop_index].uv = (
            min(1.0, max(0.0, (point.x - fascia_bounds[0]) / (fascia_bounds[1] - fascia_bounds[0]))),
            min(1.0, max(0.0, (point.z - fascia_bounds[2]) / (fascia_bounds[3] - fascia_bounds[2]))),
        )

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = 60
scene.timeline_markers.clear()
scene.timeline_markers.new("Lid open", frame=1)
scene.timeline_markers.new("Lid closed", frame=30)
scene.frame_set(1)
scene.render.fps = 24

for image in bpy.data.images:
    if image.source == "FILE" and not image.packed_file:
        image.pack()

bpy.ops.object.select_all(action="DESELECT")
body.select_set(True)
bpy.context.view_layer.objects.active = body
bpy.ops.wm.save_as_mainfile(filepath=OUTPUT)
print(
    "SAVED", OUTPUT,
    "lid_vertices", len(lid.data.vertices),
    "body_vertices", len(body.data.vertices),
    "fascia_faces", len(fascia_faces),
    "removed_logo_components", removed_logo_components,
    "removed_logo_vertices", removed_logo_vertices,
    "lid_objects", lid.name,
)
