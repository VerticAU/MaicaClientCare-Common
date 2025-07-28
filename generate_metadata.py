import os

# 👇 Replace this with your actual project structure
classes_path = './src/classes'

template = """<?xml version="1.0" encoding="UTF-8"?>
<ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <status>Active</status>
</ApexClass>
"""

for filename in os.listdir(classes_path):
    if filename.endswith('.cls'):
        base = filename[:-4]
        meta_filename = f"{base}.cls-meta.xml"
        meta_filepath = os.path.join(classes_path, meta_filename)

        if not os.path.exists(meta_filepath):
            with open(meta_filepath, 'w') as f:
                f.write(template)
            print(f"✅ Created: {meta_filename}")
        else:
            print(f"✔️ Exists: {meta_filename}")
