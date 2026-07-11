import json
import re

log_path = r"C:\Users\Sayed\.gemini\antigravity-ide\brain\1402606c-86ca-4dec-af55-4a8aa6b645cb\.system_generated\logs\transcript_full.jsonl"
files_to_find = [
    "specialization-step.tsx",
    "strength-step.tsx",
    "profile-photo-step.tsx",
    "profile-information-step.tsx",
    "review-step.tsx"
]

file_contents = {f: "" for f in files_to_find}

with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            # Check for file viewing or creation output
            if "content" in data:
                content = data["content"]
                for file_name in files_to_find:
                    if file_name in content:
                        # try to find the complete file content if viewed
                        if "File Path:" in content and file_name in content:
                            lines = content.split('\n')
                            extracting = False
                            extracted_lines = []
                            for l in lines:
                                if re.match(r'^\d+: ', l):
                                    extracted_lines.append(l.split(': ', 1)[1])
                            if extracted_lines:
                                file_contents[file_name] = '\n'.join(extracted_lines)
                                
        except Exception as e:
            pass

for fname, fcontent in file_contents.items():
    if fcontent:
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(fcontent)
        print(f"Restored {fname}")
    else:
        print(f"Could not find content for {fname}")
